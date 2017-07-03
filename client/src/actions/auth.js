import API from '../lib/ApiClient';
import {getUser} from './user';

const apiConnection = new API.ApiClient("http://localhost/api/v1");


// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false
    }
}

function receiveLogin(access_token) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        access_token: access_token
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
        dispatch(requestLogin());
        return apiConnection.loginUser({
            email: creds.email,
            password: creds.password
        }).then(response => {
            const access_token = response.body;
            return (access_token);
        }).then((access_token) => {
            // Dispatch the success action
            dispatch(receiveLogin(access_token));
            dispatch(getUser(creds.email));
        }).catch(err => {
                console.log("Error: ", err);
                if(err.response.statusCode === 400) {
                    dispatch(loginError("Passwort oder E-Mail Adresse falsch!"));
                } else if(err.response.statusCode === 500) {
                    dispatch(loginError("Verbindung zum Server nicht möglich!"));
                } else {
                    dispatch(loginError("Irgendwas ist schiefgelaufen."));
                }
                return Promise.reject();
            }
        );
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        dispatch(receiveLogout());
    }
}