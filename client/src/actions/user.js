import {
    addUser as apiAddUser,
    deleteUser as apiDeleteUser,
    getUserById as apiGetUserById,
    requestPasswordReset as apiRequestPasswordReset,
    searchUsersByName as apiSearchUsersByName,
    updatePassword as apiUpdatePassword,
    updateUser as apiUpdateUser
} from "../lib/ApiClient";
import {isStateInvalidated} from "../utils/index";

/**
 * Actions for Users. Action to Load, Update, Delete and Add. Aswell as Password Actions.
 */
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export function getUserById(userId) {
    return {
        types: [LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE],
        shouldInvalidate: true,
        shouldCallAPI: (state) => isStateInvalidated(state.entities.users.byId[userId]),
        callAPI: () => apiGetUserById({userId})
    };
}

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export function addUser(body) {
    return {
        types: [ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiAddUser({body: {...body, status: 'new'}})
    };
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export function updateUser(userId, body) {
    return {
        types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiUpdateUser({userId, body})
    };
}

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export function deleteUser(userId) {
    return {
        types: [DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiDeleteUser({userId}),
        payload: {userId}
    };
}

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

export function updatePassword(resetToken, body) {
    return {
        types: [UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE],
        callAPI: () => apiUpdatePassword({resetToken, body})
    };
}

export const REQUEST_PASSWORD_RESET_REQUEST = 'REQUEST_PASSWORD_RESET_REQUEST';
export const REQUEST_PASSWORD_RESET_SUCCESS = 'REQUEST_PASSWORD_RESET_SUCCESS';
export const REQUEST_PASSWORD_RESET_FAILURE = 'REQUEST_PASSWORD_RESET_FAILURE';

export function requestPasswordReset(email) {
    return {
        types: [REQUEST_PASSWORD_RESET_REQUEST, REQUEST_PASSWORD_RESET_SUCCESS, REQUEST_PASSWORD_RESET_FAILURE],
        callAPI: () => apiRequestPasswordReset({email})
    }
}

export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';

export function searchUsers(name) {
    return {
        types: [SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS, SEARCH_USERS_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiSearchUsersByName({name})
    };
}
