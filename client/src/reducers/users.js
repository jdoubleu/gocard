import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_FAILURE,
    MEMBERS_SUCCESS,
    MEMBERS_REQUEST,
    MEMBERS_FAILURE
} from "../actions/users";
import _ from "lodash";

const initialState = {
    isFetching: false,
    users: {},
    members: {}
};

function users(state = initialState, action) {
    switch (action.type) {
        case USERS_REQUEST:
        case MEMBERS_REQUEST:
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
                    ..._.keyBy({...action.user}, 'uid')
                }
            };
        case USERS_FAILURE:
        case MEMBERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.errorMessage
            };
        case MEMBERS_SUCCESS:
            let newMembers = state.members || {};
            newMembers[action.registerId] =[
                ...action.members
            ];
            return {
                ...state,
                isFetching: false,
                selectedMembers: newMembers
            };
        default:
            return state;
    }
}

export default users;
