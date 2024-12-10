import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        console.log("token generated")

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError(500, "Something went wrong in generating refresh and access tokens");
    }
};


const googleAuth = asyncHandler(async (req, res) => {
    console.log("Received request for Google auth");
    console.log("Request body:", req.body);

    const { accessToken, refreshToken } = req.body;

    if (!accessToken || !refreshToken) {
        console.log("Missing tokens");
        return res.status(400).json(new ApiResponse(400, null, "Tokens are required"));
    }

    try {
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedAccessToken._id);

        if (!user) {
            console.log("User not found");
            return res.status(401).json(new ApiResponse(401, null, "User not found"));
        }

        console.log('Stored Refresh Token:', user.refreshToken);

        if (user.refreshToken !== refreshToken) {
            console.log("Invalid refresh token");
            return res.status(401).json(new ApiResponse(401, null, "Invalid refresh token"));
        }

        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();

        user.refreshToken = newRefreshToken;
        await user.save();

        console.log("User authenticated successfully");
        return res.status(200).json(
            new ApiResponse(200, { user, accessToken: newAccessToken, refreshToken: newRefreshToken }, "User logged in successfully")
        );
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json(new ApiResponse(401, null, "Invalid tokens"));
    }
});


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, employeeId, phoneNumber, password, conformPassword } = req.body;

    console.log(fullName, email, employeeId, phoneNumber, password, conformPassword);

    if ([fullName, email, employeeId, phoneNumber, password, conformPassword].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ phoneNumber }, { employeeId }]
    });

    if (existedUser) {
        throw new ApiError(409, "Employee with employeeId or phoneNumber already exists");
    }
  
    const avatarLocalPath = req.files?.avatar[0]?.path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Image file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Image file is required")
    }

    if (!(password === conformPassword)) {
        throw new ApiError(400, "Password and Confirm password do not match");
    }

    const user = await User.create({
        fullName,
        email,
        employeeId,
        password,
        avatar: avatar.url,
        phoneNumber,
        provider: 'Employee',
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const logoutUser = asyncHandler( async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, 
        {
            new: true
        }
    )
    const options = {
        httpOnly : true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{},"User logout Successfully"))
})

async function loginUser(req, res) {
    const { employeeId, password } = req.body;

    try {
        const user = await User.findOne({ employeeId });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const tokens = await generateAccessAndRefreshTokens(user._id);

        // Send tokens in the response
        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true, // to prevent XSS attacks
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({ user, tokens });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorize request")
    }
    // decode token
    try {
        const decodedToken=jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expire or used")
        }
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json (
            new ApiResponse (200, {accessToken, refreshToken: newRefreshToken},"Access token refreshed")
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword, conformPassword}=req.body
    
    if(!(newPassword ===conformPassword)) {
        throw new ApiError(400, "Conform password not match")
    }
    // req.id from auth.middleware
    const user = await User.findById(req.user?._id)

    // check passward user.mode -- custome domain
    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "old password not match")
    }

    user.password=newPassword

   await user.save({ validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200,user, "Password changed successfull"))

})

const getCurrentUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id);
    return res
    .status(200)
    .json(new ApiResponse(200, user, "current user fetched successfully"))
})

const getUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findOne().select("-password -employeeId");
    
    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found"));
    }
    
    return res.status(200).json(new ApiResponse(200, user, "Current user data sent successfully"));
});

const updateAccountDetails = asyncHandler( async(req, res) => {
    const {phoneNumber, employeeId} = req.body

    if(!phoneNumber || !employeeId) {
        throw new ApiError(400, "required employeeId or phoneNumber")
    }

    const  user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            phoneNumber:phoneNumber,
            employeeId:employeeId
        }
    }, {new:true}

    ).select("-password")   // password not update

    return res
    .status(200)
    .json(new ApiResponse(200, user, "phoneNumber or employeeId updated successfull"))

})



export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    getUserDetails,
    updateAccountDetails,
    // updateUserAvatar,
    // updateUserCoverImage,
    // getUserChannelProfile,
    googleAuth,

 };
