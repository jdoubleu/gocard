import {USER_FAILURE, USER_REQUEST, USER_SUCCESS} from "../actions/user";

function user(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ...action.user
            };
        case USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };
        default:
            return state;
    }
}

export default user;
