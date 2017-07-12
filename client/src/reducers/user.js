import {
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
} from "../actions/user";
import {
    LOAD_CURRENT_USER_REQUEST,
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_CURRENT_USER_FAILURE
} from "../actions/auth";
import _ from "lodash";

const initialState = {
    isFetching: false,
    items: {}
};

function user(state = initialState, action) {
    switch (action.type) {
        case LOAD_CURRENT_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case LOAD_CURRENT_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: _.merge(state.items, _.keyBy([action.response], 'uid'))
            };
        case LOAD_CURRENT_USER_FAILURE:
        case LOAD_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default user;
