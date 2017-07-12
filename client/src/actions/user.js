import {
    addUser as apiAddUser,
    deleteUser as apiDeleteUser,
    getUserByEmail as apiGetUserByEmail,
    getUserById as apiGetUserById,
    updateUser as apiUpdateUser
} from "../lib/ApiClient";

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export function getUserById(userId) {
    return {
        types: [LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE],
        callAPI: () => apiGetUserById({userId})
    };
}

export function getUserByEmail(email) {
    return {
        types: [LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE],
        callAPI: () => apiGetUserByEmail({email})
    };
}

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export function addUser(body) {
    return {
        types: [ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE],
        callAPI: () => apiAddUser({body})
    };
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export function updateUser(userId, body) {
    return {
        types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE],
        callAPI: () => apiUpdateUser({userId, body})
    };
}

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export function deleteUser(userId) {
    return {
        types: [DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE],
        callAPI: () => apiDeleteUser({userId})
    };
}