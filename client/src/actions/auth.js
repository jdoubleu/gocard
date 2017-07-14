import {
    getUserByEmail as apiGetUserByEmail,
    loginUser as apiLoginUser,
    logoutUser as apiLogoutUser
} from "../lib/ApiClient";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginUser(credentials) {
    return function (dispatch) {
        dispatch({
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            callAPI: () => apiLoginUser(credentials),
        }).then(
            response =>
                dispatch(getCurrentUser(credentials.email))
        );
    }
}

export const LOAD_CURRENT_USER_REQUEST = 'LOAD_CURRENT_USER_REQUEST';
export const LOAD_CURRENT_USER_SUCCESS = 'LOAD_CURRENT_USER_SUCCESS';
export const LOAD_CURRENT_USER_FAILURE = 'LOAD_CURRENT_USER_FAILURE';

export function getCurrentUser(email) {
    return {
        types: [LOAD_CURRENT_USER_REQUEST, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE],
        callAPI: () => apiGetUserByEmail({email})
    };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function logoutUser() {
    return {
        types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
        callAPI: () => apiLogoutUser({})
    }
}