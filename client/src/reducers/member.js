import {
    LOAD_MEMBERS_REQUEST,
    LOAD_MEMBERS_SUCCESS,
    LOAD_MEMBERS_FAILURE,
} from "../actions/member";
import _ from "lodash";

const initialState = {
    isFetching: false,
    items: {}
};

function member(state = initialState, action) {
    switch (action.type) {
        case LOAD_MEMBERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case LOAD_MEMBERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: _.merge(state.items, _.keyBy(action.response, action.registerId))
            };
        case LOAD_MEMBERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default member;
