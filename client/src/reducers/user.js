import { USER_FAILURE, USER_SUCCESS, USER_REQUEST} from "../actions/user";

function user(state = {
    isFetching: false,
}, action) {
    switch (action.type){
        case USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.user
            });
        case USER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.message
            });
        default:
            return state;
    }
}

export default user
