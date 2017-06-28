import API from '../lib/ApiClient';

const apiConnection = new API.ApiClient("http://localhost/api/v1");

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));
        return apiConnection.loginUser({
            email: creds.email,
            password: creds.password
        }).then(response => {
            const user = response.body;
            return ({user, response});
        }).then(({user, response}) => {
            if (response.response.statusCode !== 200) {
                // If there was a problem, we want to
                // dispatch the error condition
                dispatch(loginError(user.message));
                return Promise.reject(user);
            }
            else {
                // Dispatch the success action
                dispatch(receiveLogin(user));
            }
        }).catch(err => console.log("Error: ", err));
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        dispatch(receiveLogout());
    }
}

