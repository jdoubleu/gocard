import {
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_CURRENT_USER_FAILURE,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS
} from "../actions/auth";

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    token: {},
    userId: null
};

function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                error: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                token: action.response,
                error: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                error: action.error
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...initialState
            };
        case LOGOUT_FAILURE:
            return {
                ...initialState,
                error: action.error
            };
        case LOAD_CURRENT_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userId: action.response.uid
            };
        case LOAD_CURRENT_USER_FAILURE:
            return {
                ...initialState,
                message: action.error
            };
        default:
            return state;
    }
}

export default auth;
