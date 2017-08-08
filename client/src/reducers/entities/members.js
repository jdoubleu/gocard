import {combineReducers} from "redux";
import {
    ADD_MEMBER_SUCCESS,
    ADD_MEMBERS_SUCCESS,
    DELETE_MEMBER_SUCCESS,
    LOAD_MEMBER_SUCCESS,
    LOAD_MEMBERS_SUCCESS,
    LOAD_MEMBERSHIPS_SUCCESS,
    UPDATE_MEMBER_SUCCESS,
    UPDATE_MEMBERS_SUCCESS
} from "../../actions/member";

import _ from "lodash";
import {DELETE_REGISTER_SUCCESS} from "../../actions/register";
import {DELETE_USER_SUCCESS} from "../../actions/user";

function addMemberEntry(state, action) {
    const {response} = action;
    return _.assign({}, state, _.keyBy(response, 'id'));
}

function addMemberEntries(state, action) {
    const {response, registerId} = action;
    return _.assign({}, _.omitBy(state, {'register': registerId}), _.keyBy(response, 'id'));
}

function updateMemberEntry(state, action) {
    const {response} = action;
    return _.assign({}, state, _.keyBy(response, 'id'));
}

function updateMemberEntries(state, action) {
    const {response, registerId} = action;
    return _.assign({}, _.omitBy(state, ['register', registerId]), _.keyBy(response, 'id'));
}

function deleteMemberEntry(state, action) {
    return _.omit(state, action.id);
}

function addMembershipEntries(state, action) {
    const {response, userId} = action;
    return _.assign({}, _.omitBy(state, ['user', userId]), _.keyBy(response, 'id'));
}

function deleteMemberEntriesByRegister(state, action) {
    const {registerId} = action;
    return _.omitBy(state, ['register', registerId]);
}

function deleteMemberEntriesByUser(state, action) {
    const {userId} = action;
    return _.omitBy(state, ['user', userId]);
}

function membersById(state = {}, action) {
    switch (action.type) {
        case ADD_MEMBER_SUCCESS:
        case LOAD_MEMBER_SUCCESS:
            return addMemberEntry(state, action);
        case LOAD_MEMBERS_SUCCESS:
        case ADD_MEMBERS_SUCCESS:
            return addMemberEntries(state, action);
        case UPDATE_MEMBERS_SUCCESS:
            return updateMemberEntries(state, action);
        case UPDATE_MEMBER_SUCCESS:
            return updateMemberEntry(state, action);
        case DELETE_MEMBER_SUCCESS:
            return deleteMemberEntry(state, action);
        case LOAD_MEMBERSHIPS_SUCCESS:
            return addMembershipEntries(state, action);
        case DELETE_REGISTER_SUCCESS:
            return deleteMemberEntriesByRegister(state, action);
        case DELETE_USER_SUCCESS:
            return deleteMemberEntriesByUser(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: membersById,
});