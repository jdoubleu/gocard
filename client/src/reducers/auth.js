import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    USER_FAILURE,
    USER_REQUEST,
    USER_SUCCESS
} from "../actions/auth";

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    token: {},
    user: {}
};

function auth(state = initialState, action) {
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
                ...initialState
            };
        case USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: {
                    ...state.user,
                    ...action.user
                }
            };
        case USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            };
        default:
            return state;
    }
}

export default auth;
