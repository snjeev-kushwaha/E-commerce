import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from '../constants/userConstants';
import config from '../config';
// import { useCookies } from 'react-cookie';

// Login user
export const login = (email, password) => async (dispatch) => {
    try {
        // const [cookies, setCookie] = useCookies(['name']);
        dispatch({ type: LOGIN_REQUEST });

        const configs = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post(
            `${config.URL}/user/login`,
            { email, password },
            configs
        );
        console.log("data p", data);
        localStorage.setItem("token", data.token);
        // setCookie("token", data.token);
        console.log(data.token, 'data')
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    };
};

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const configs = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post(
            `${config.URL}/user/register`,
            userData,
            configs
        );

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const data = await axios.get(`${config.URL}/user/me`);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
}

// Logout User
export const logOut = () => async (dispatch) => {
    try {

        await axios.get(`${config.URL}/user/logout`);

        dispatch({ type: LOGOUT_SUCCESS });
    }
    catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}


// Update Profile user
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_FAIL });

        const configs = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.put(
            `${config.URL}/user/me/update`,
            userData,
            configs
        );

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
    }
}

// Update Password user
export const updatePasword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const configs = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            `${config.URL}/user/password/update`,
            passwords,
            configs
        );

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

// Forgot Password user
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const configs = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post(
            `${config.URL}/user/password/forgot`,
            email,
            configs
        );

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    }
    catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

// Reset Password user
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const configs = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            `${config.URL}/user/password/reset/${token}`,
            passwords,
            configs
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

// get All User  (for admin)
export const getAllUser = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USER_REQUEST });

        const data = await axios.get(`${config.URL}/user/admin`);
        dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
    }
    catch (error) {
        dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message })
    }
}

// get UserDetails  (for admin)
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const data = await axios.get(`${config.URL}/user/admin/${id}`);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message })
    }
}

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const configs = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            `${config.URL}/user/admin/${id}`,
            userData,
            configs
        );

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })
    }
}

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_SUCCESS });

        const { data } = await axios.delete(
            `${config.URL}/user/admin/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message })
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
};
