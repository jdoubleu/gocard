import {combineReducers} from "redux";
import {
    ADD_MEMBER_SUCCESS,
    DELETE_MEMBER_SUCCESS,
    LOAD_MEMBER_SUCCESS,
    LOAD_MEMBERS_SUCCESS,
    LOAD_MEMBERSHIPS_SUCCESS,
    UPDATE_MEMBER_SUCCESS,
    UPDATE_MEMBERS_SUCCESS
} from "../../actions/member";

import _ from "lodash";

function addMemberIds(state, action) {
    const {response} = action;
    return _.union(state, _.map(response, 'id'));
}

function addMemberId(state, action) {
    const {response} = action;
    return _.union(state, _.map(response, 'id'));
}

function updateMemberId(state, action) {
    const {response} = action;
    return _.concat(_.omit(state, response.id), response.id);
}

function updateMemberIds(state, action) {
    const {response} = action;
    return _.union(_.concat(state, _.map(response, 'id')));
}

function deleteMemberId(state, action) {
    return _.pull(state, action.id);
}

function addMembershipId(state, action) {
    const {response} = action;
    return _.union(_.concat(state, _.map(response, 'id')));
}

function membersById(state = {}, action) {
    switch (action.type) {
        case ADD_MEMBER_SUCCESS:
        case LOAD_MEMBER_SUCCESS:
            return addMemberEntry(state, action);
        case LOAD_MEMBERS_SUCCESS:
            return addMemberEntries(state, action);
        case UPDATE_MEMBERS_SUCCESS:
            return updateMemberEntries(state, action);
        case UPDATE_MEMBER_SUCCESS:
            return updateMemberEntry(state, action);
        case DELETE_MEMBER_SUCCESS:
            return deleteMemberEntry(state, action);
        case LOAD_MEMBERSHIPS_SUCCESS:
            return addMembershipEntry(state, action);
        default:
            return state;
    }
}

function addMemberEntry(state, action) {
    const {response} = action;
    return _.assign({}, state, _.keyBy(response, 'id'));
}

function addMemberEntries(state, action) {
    const {response} = action;
    return _.assign({}, state, _.keyBy(response, 'id'));
}

function updateMemberEntry(state, action) {
    const {response} = action;
    return _.assign({}, state, _.keyBy(response, 'id'));
}

function updateMemberEntries(state, action) {
    const {response} = action;
    return _.assign({}, state, _.keyBy(response, 'id'));
}

function deleteMemberEntry(state, action) {
    return _.omit(state, action.id);
}

function addMembershipEntry(state, action) {
    const {response} = action;
    return _.assign({}, state, _.keyBy(response, 'id'));
}

function allMembers(state = [], action) {
    switch (action.type) {
        case ADD_MEMBER_SUCCESS:
        case LOAD_MEMBER_SUCCESS:
            return addMemberId(state, action);
        case LOAD_MEMBERS_SUCCESS:
            return addMemberIds(state, action);
        case UPDATE_MEMBERS_SUCCESS:
            return updateMemberIds(state, action);
        case UPDATE_MEMBER_SUCCESS:
            return updateMemberId(state, action);
        case DELETE_MEMBER_SUCCESS:
            return deleteMemberId(state, action);
        case LOAD_MEMBERSHIPS_SUCCESS:
            return addMembershipId(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: membersById,
    allIds: allMembers
});