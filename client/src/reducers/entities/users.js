import {combineReducers} from "redux";
import {DELETE_USER_SUCCESS, LOAD_USER_SUCCESS, UPDATE_USER_SUCCESS} from "../../actions/user";
import {LOAD_CURRENT_USER_SUCCESS} from "../../actions/auth";
import _ from "lodash";

function addUserEntry(state, action) {
    const {response} = action;

    return {
        ...state,
        [response.uid]: response
    };
}

function updateUserEntry(state, action) {
    const {response} = action;

    return {
        ...state,
        [response.uid]: {
            ...state[response.uid],
            ...response
        }
    };
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
        case UPDATE_USER_SUCCESS:
            return updateUserEntry(state, action);
        case DELETE_USER_SUCCESS:
            return deleteUserEntry(state, action);
        default:
            return state;
    }
}

function addUserId(state, action) {
    const {response} = action;

    return _.concat(state, response.uid);
}

function deleteUserId(state, action) {
    const {userId} = action;

    return _.omit(state, userId);
}

function updateUserId(state, action) {
    const {userId, response} = action;

    return _.concat(_.omit(state, userId), response.uid);
}

function allUsers(state = [], action) {
    switch (action.type) {
        case LOAD_CURRENT_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return addUserId(state, action);
        case UPDATE_USER_SUCCESS:
            return updateUserId(state, action);
        case DELETE_USER_SUCCESS:
            return deleteUserId(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: usersById,
    allIds: allUsers
});