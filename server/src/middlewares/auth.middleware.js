import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Get the token from cookies or Authorization header
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        // If no token is provided, throw an unauthorized error
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

   
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Unauthorized request: Invalid token");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Unauthorized request: Token has expired");
        } else if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, "Unauthorized request: Invalid token");
        } else {
            // General error handling
            throw new ApiError(401, "Unauthorized request: Failed to authenticate token");
        }
    }
});
