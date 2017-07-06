import {ADD_USER_SUCCESS, ADD_USER_REQUEST, ADD_USER_FAILURE} from '../actions/registration'

function registration(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case ADD_USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case ADD_USER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.message
            });
        default:
            return state;
    }
}

export default registration