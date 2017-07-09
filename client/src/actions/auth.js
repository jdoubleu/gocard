import API from "../lib/ApiClient";

const apiConnection = new API.ApiClient("http://localhost/api/v1");

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

function receiveLogin(token) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token
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

export function loginUser(creds) {
    return dispatch => {
        dispatch(requestLogin());
        return apiConnection.loginUser({
            email: creds.email,
            password: creds.password
        }).then(response => {
            dispatch(receiveLogin(response.body));
            dispatch(getUser(creds.email));
        }).catch(err => {
                console.log("Error: ", err);
                if (err.response.statusCode === 400) {
                    dispatch(loginError("Passwort oder E-Mail Adresse falsch!"));
                } else if (err.response.statusCode === 500) {
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
        user: {
            ...user
        }
    }
}

function userError(err) {
    return {
        type: USER_FAILURE,
        isFetching: false,
        message: err
    }
}


export function getUser(email) {
    return (dispatch, getState) => {
        dispatch(requestUser());
        apiConnection.getUserByEmail({
            email: email,
            $queryParameters: {access_token: getState().auth.token.access_token}
        }).then(
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

export function updateUser(user) {
    return (dispatch, getState) => {
        dispatch(requestUser());
        apiConnection.updateUser({
            userId: getState().auth.user.uid,
            body: user,
            $queryParameters: {access_token: getState().auth.token.access_token}
        }).then(
            response => {
                dispatch(receiveUser(user));
            }
        ).catch(err => {
                console.log("Error: ", err);
                dispatch(userError(err));
            }
        );
    }
}