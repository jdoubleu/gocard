import {SEARCH_USERS_SUCCESS, SEARCH_USERS_REQUEST} from "../../actions/user";

import _ from "lodash";
import {CLEAR_SEARCH_USER} from "../../actions/ui";

function addFoundUsers(state, action) {
    const {response} = action;
    return {
        ...state,
        foundUsers: [response]
    };
}

function addSearchValue(state, action) {
    return {
        ...state,
        foundUsers: [],
        search: action.search
    };
}

function clearSearchValue(state, action) {
    return {
        ...state,
        search: ""
    };
}

export default function ui(state = {}, action) {
    switch (action.type) {
        case SEARCH_USERS_REQUEST:
            return addSearchValue(state, action);
        case SEARCH_USERS_SUCCESS:
            return addFoundUsers(state, action);
        case CLEAR_SEARCH_USER:
            return clearSearchValue(state, action);
        default:
            return state;
    }
}