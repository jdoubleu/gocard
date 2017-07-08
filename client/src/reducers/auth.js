import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../actions/auth";

function auth(state = {
    isFetching: false,
    isAuthenticated: false,
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                token: action.token,
                errorMessage: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                tokens: null
            };
        default:
            return state;
    }
}

export default auth;
