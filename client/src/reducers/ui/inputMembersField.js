import {SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS} from "../../actions/user";
import {CLEAR_SEARCH_USER} from "../../actions/ui";

function addFoundUsersEntry(state, action) {
    const {response} = action;
    return {
        ...state,
        foundUsers: [response]
    };
}

function addSearchValueEntry(state, action) {
    return {
        ...state,
        foundUsers: [],
        search: action.search
    };
}

function clearSearchValueEntry(state, action) {
    return {
        ...state,
        search: ""
    };
}

export default function ui(state = {}, action) {
    switch (action.type) {
        case SEARCH_USERS_REQUEST:
            return addSearchValueEntry(state, action);
        case SEARCH_USERS_SUCCESS:
            return addFoundUsersEntry(state, action);
        case CLEAR_SEARCH_USER:
            return clearSearchValueEntry(state, action);
        default:
            return state;
    }
}