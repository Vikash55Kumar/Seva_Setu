// import axios from 'axios';
// import { getAccessToken, setAccessToken } from '../utility/tokenUtils';
// import Cookies from 'js-cookie';
// import { deleteAllCookies } from '../utility/tokenUtils';
// import { toast } from 'react-toastify';
// import { 

//     GET_USER_REQUEST,
//     GET_USER_SUCCESS,
//     GET_USER_FAIL,

//     SIGNUP_REQUEST, 
//     SIGNUP_SUCCESS, 
//     SIGNUP_FAIL, 

//     LOGIN_SUCCESS,
//     LOGIN_FAIL,

//     LOGOUT_SUCCESS,
//     LOGOUT_FAIL,

//     LOAD_USER_REQUEST,
//     LOAD_USER_SUCCESS,
//     LOAD_USER_FAIL,

//     FORGOTPASSWORD_REQUEST,
//     FORGOTPASSWORD_SUCCESS,
//     FORGOTPASSWORD_FAIL,

//     GOOGLE_LOGIN_REQUEST,
//     GOOGLE_LOGIN_SUCCESS,
//     GOOGLE_LOGIN_FAIL,
    
// } from '../constants/userConstants';

// export const getUserDetails = () => async (dispatch) => {
//     try {
//       dispatch({ type: GET_USER_REQUEST });
  
//       const token = localStorage.getItem('accessToken'); // Adjust if using a different token key
//       if (!token) {
//         throw new Error('Token not found');
//       }
  
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
  
//       const {data} = await axios.get('/api/v1/users/getUserDetails', config); // Adjust the endpoint if necessary
  
//       dispatch({
//         type: GET_USER_SUCCESS,
//         payload: data,
//       });
  
//     } catch (error) {
//       dispatch({
//         type: GET_USER_FAIL,
//         payload: error.response?.data?.message || error.message,
//       });
//     }
//   };

// export const register = (formData) => async (dispatch) => {
//     try {
//         dispatch({ type: SIGNUP_REQUEST });

//         const response =await axios.post("/api/v1/users/register", formData, {
//             headers: {
//                 "Content-Type" :"multipart/form-data",
//             }
//         });

//         dispatch({
//             type: SIGNUP_SUCCESS,
//             payload: response.data
//         });
//         return response;

//     } catch (error) {
//         dispatch({
//             type: SIGNUP_FAIL,
//             payload: error.response.data.message || error.message
//         });
//         throw error;
//     }
// };

// export const login = (credentials) => async (dispatch) => {
//     try {
//       const response = await axios.post('/api/v1/users/login', credentials);
//       const { token } = response.data;
        
//       // Save token in cookies
//       Cookies.set('token', token, { expires: 7, path: '/' }); // Token will be stored for 7 days
//       dispatch({ type: LOGIN_SUCCESS, payload: response.data });
//       return response;
//     } catch (error) {
//       dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });

//       throw error;
//     }
//   };

// export const logout = () => async (dispatch) => {
//   try {
//       // Clear cookies
//       const deleteAllCookies = () => {
//           const cookies = document.cookie.split(";");

//           for (let i = 0; i < cookies.length; i++) {
//               const cookie = cookies[i];
//               const eqPos = cookie.indexOf("=");
//               const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//               document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
//           }
//       };
//       deleteAllCookies();

//       // Clear tokens from storage
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       sessionStorage.clear();

//       // Optionally, call your backend to log out
//       await axios.post('/api/v1/users/logout');

//       dispatch({ type: LOGOUT_SUCCESS });

//       setTimeout(() => {
//           toast.success('Logout successful');
//       }, 2000);

//   } catch (error) {
//       toast.error('Logout error:', error.response?.data?.message || error.message);
//       dispatch({
//           type: LOGOUT_FAIL,
//           payload: error.response?.data?.message || error.message,
//       });
//   }
// };

// export const forgetPassword = (userData) => async (dispatch) => {
//     try {
//         dispatch({ type: FORGOTPASSWORD_REQUEST });

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };

//         const response = await axios.post('/api/v1/users/forgetPassword', userData, config);

//         dispatch({
//             type: FORGOTPASSWORD_SUCCESS,
//             payload: response.data
//         });
//         return response;

//     } catch (error) {
//         dispatch({
//             type: FORGOTPASSWORD_FAIL,
//             payload: error.response.data.message || error.message,
//         });
//         throw error;
//     }
// };

// export const loadUsers = () => async (dispatch) => {
//     try {
//         dispatch({ type: LOAD_USER_REQUEST });

//         // Try to retrieve the token from localStorage first, then fallback to cookies
//         const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
//         console.log('Access token retrieved:', accessToken);

//         if (!accessToken) {
//             throw new Error("Access token not found");
//         }

//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         };

//         const { data } = await axios.get('/api/v1/users/getUser', config);
//         console.log('API response:', data);

//         dispatch({
//             type: LOAD_USER_SUCCESS,
//             payload: data
//         });

//     } catch (error) {
//         console.error('Error loading user:', error.response?.data?.message || error.message);
//         dispatch({
//             type: LOAD_USER_FAIL,
//             payload: error.response?.data?.message || error.message,
//         });
//     }
// };


// export const googleLogin = (tokens) => async (dispatch) => {
//   try {
//       dispatch({ type: GOOGLE_LOGIN_REQUEST });

//       const config = {
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       };

//       const response = await axios.post('/api/v1/users/googleLogin', tokens, config);

//       const { accessToken, refreshToken, user } = response.data.data;

//       // Store tokens in localStorage
//       localStorage.setItem('accessToken', accessToken);

//       localStorage.setItem('refreshToken', refreshToken);

//       // Dispatch success with user data
//       dispatch({
//           type: GOOGLE_LOGIN_SUCCESS,
//           payload: user,
//       });
//       toast.success("Login Successfully!")
//       return response;

//   } catch (error) {
//       toast.error('Google Login Error:', error.response.data.message || error.message);
//       dispatch({
//           type: GOOGLE_LOGIN_FAIL,
//           payload: error.response.data.message || error.message,
//       });

//       throw error;
//   }
// };





import { getAccessToken, setAccessToken } from '../utility/tokenUtils';
import Cookies from 'js-cookie';
import { deleteAllCookies } from '../utility/tokenUtils';
import { toast } from 'react-toastify';
import { 

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,

    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL, 

    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    FORGOTPASSWORD_REQUEST,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAIL,

    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAIL,
    
} from '../constants/userConstants';

import api from '../utility/api';


export const getUserDetails = () => async (dispatch) => {
    try {
      dispatch({ type: GET_USER_REQUEST });
  
      const token = localStorage.getItem('accessToken'); // Adjust if using a different token key
      if (!token) {
        throw new Error('Token not found');
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const {data} = await api.get("/users/getUserDetails", config); // Adjust the endpoint if necessary
  
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SIGNUP_REQUEST });

        const response =await api.post("/users/register", formData, {
            headers: {
                "Content-Type" :"multipart/form-data",
            }
        });

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.message || error.message
        });
        throw error;
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await api.post("/users/login", credentials);
        const { tokens } = response.data; // Adjust based on your response structure
        const { accessToken } = tokens; // Extract the access token

        if (!accessToken) {
            throw new Error('Access token not found');
        }
        
        // Save token in cookies
        Cookies.set('token', accessToken, { expires: 7, path: '/' }); // Token will be stored for 7 days
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });
        throw error;
    }
};

export const logout = () => async (dispatch) => {
  try {
      // Clear cookies
      const deleteAllCookies = () => {
          const cookies = document.cookie.split(";");

          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i];
              const eqPos = cookie.indexOf("=");
              const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          }
      };
      deleteAllCookies();

      // Clear tokens from storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.clear();

      // Optionally, call your backend to log out
    //   await api.post("/users/logout");

      dispatch({ type: LOGOUT_SUCCESS });

      setTimeout(() => {
          toast.success('Logout successful');
      }, 2000);

  } catch (error) {
      toast.error('Logout error: Please refresh the page to logout');
      dispatch({
          type: LOGOUT_FAIL,
          payload: error.response?.data?.message || error.message,
      });
  }
};

// export const logout = () => async (dispatch) => {
//     try {
//         // Clear cookies
//         const deleteAllCookies = () => {
//             const cookies = document.cookie.split(";");
//             for (let i = 0; i < cookies.length; i++) {
//                 const cookie = cookies[i];
//                 const eqPos = cookie.indexOf("=");
//                 const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//                 document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
//             }
//         };
//         deleteAllCookies();

//         // Get token before clearing it
//         const accessToken = localStorage.getItem('accessToken');
        
//         // Clear tokens from storage
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         sessionStorage.clear();

//         // Send logout request with token to backend (optional)
//         await api.post("/users/logout", {}, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         dispatch({ type: LOGOUT_SUCCESS });

//         setTimeout(() => {
//             toast.success('Logout successful');
//         }, 2000);

//     } catch (error) {
//         const errorMessage = error.response?.data?.message || error.message;
//         toast.error(`Logout error: ${errorMessage}`);
//         dispatch({
//             type: LOGOUT_FAIL,
//             payload: errorMessage,
//         });
//     }
// };

export const forgetPassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: FORGOTPASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await api.post('/users/forgetPassword', userData, config);

        dispatch({
            type: FORGOTPASSWORD_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: FORGOTPASSWORD_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const loadUsers = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        // Try to retrieve the token from localStorage first, then fallback to cookies
        const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
        console.log('Access token retrieved:', accessToken);

        if (!accessToken) {
            throw new Error("Access token not found");
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        const { data } = await api.get("/users/getUserDetails", config);
        console.log('API response:', data);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.error('Error:', error);
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response?.data?.message || error.message,
        });
      }
      
};

export const googleLogin = (tokens) => async (dispatch) => {
  try {
      dispatch({ type: GOOGLE_LOGIN_REQUEST });

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      };
      console.log("Making POST request to /users/googleLogin with tokens:", tokens);
 
      const response = await api.post('/users/googleLogin', tokens, config);

      const { accessToken, refreshToken, user } = response.data.data;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);

      localStorage.setItem('refreshToken', refreshToken);

      // Dispatch success with user data
      dispatch({
          type: GOOGLE_LOGIN_SUCCESS,
          payload: user,
      });
      toast.success("Login Successfully!")
      return response;

  } catch (error) {
      toast.error('Google Login Error:', error.response.data.message || error.message);
      dispatch({
          type: GOOGLE_LOGIN_FAIL,
          payload: error.response.data.message || error.message,
      });

      throw error;
  }
};

