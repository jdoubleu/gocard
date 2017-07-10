import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAILURE
} from "../actions/users";

const initialState = {
    isFetching: false,
    users: {}
};

function users(state = initialState, action) {
    switch (action.type) {
        case USERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: {
                    ...state.users,
                    [action.user.uid]: action.user
                }
            };
        case USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
}

export default users;
