import {ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS} from "../actions/registration";

function registration(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };
        case ADD_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };
        default:
            return state;
    }
}

export default registration;