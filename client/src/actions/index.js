import API from '../lib/ApiClient';

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

//User actions
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

function requestUser() {
    return {
        type: USER_REQUEST,
        isFetching: true,
        user: null,
    }
}

function receiveUser(user) {
    return {
        type: USER_SUCCESS,
        isFetching: false,
        user: user
    }
}

function userError(err) {
    return {
        type: USER_FAILURE,
        isFetching: false,
        message: err
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
                dispatch(loginError());
                return Promise.reject();
            }
        );
    }
}

export function getUser(email) {
    return (dispatch, getState) => {
        //apiConnection.setApiKey(access_token,"access_token",true); :TODO set API key
        dispatch(requestUser());
        apiConnection.getUserByEmail({email: email, $queryParameters: {access_token: getState().auth.access_token}}).then( //:TODO remove API key
            response => {
                dispatch(receiveUser(response.body));
            }
        ).catch(err => {
                console.log("Error: ", err);
                dispatch(userError(err));
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

