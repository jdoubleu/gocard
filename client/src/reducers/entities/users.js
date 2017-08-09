import {combineReducers} from "redux";
import {DELETE_USER_SUCCESS, LOAD_USER_SUCCESS, SEARCH_USERS_SUCCESS, UPDATE_USER_SUCCESS} from "../../actions/user";
import {LOAD_CURRENT_USER_SUCCESS} from "../../actions/auth";
import _ from "lodash";

/**
 * Reducer for redux to handle user entities
 * Methods to update, add, delete user entities into state
 */

function addUserEntry(state, action) {
    const {response} = action;

    return _.assign({}, state, _.keyBy([response], 'id'));
}

function addUserEntries(state, action) {
    const {response} = action;

    return _.assign({}, state, _.keyBy(response, 'id'));
}

function updateUserEntry(state, action) {
    const {response} = action;

    return _.assign({}, state, _.keyBy([response], 'id'));
}

function deleteUserEntry(state, action) {
    const {userId} = action;

    return _.omit(state, userId);
}

function usersById(state = {}, action) {
    switch (action.type) {
        case LOAD_CURRENT_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return addUserEntry(state, action);
        case SEARCH_USERS_SUCCESS:
            return addUserEntries(state, action);
        case UPDATE_USER_SUCCESS:
            return updateUserEntry(state, action);
        case DELETE_USER_SUCCESS:
            return deleteUserEntry(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: usersById,
});