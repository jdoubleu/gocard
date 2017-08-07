import {combineReducers} from "redux";
import {
    ADD_MEMBER_SUCCESS,
    ADD_MEMBERS_SUCCESS,
    CLEAR_MEMBERS,
    DELETE_MEMBER_SUCCESS,
    LOAD_MEMBER_SUCCESS,
    LOAD_MEMBERS_SUCCESS,
    LOAD_MEMBERSHIPS_SUCCESS,
    UPDATE_MEMBER_SUCCESS,
    UPDATE_MEMBERS_SUCCESS
} from "../../actions/member";

import _ from "lodash";

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

function deleteMemberEntries(state, action) {
    return _.omit(state, action.ids);
}

function membersById(state = {}, action) {
    switch (action.type) {
        case ADD_MEMBER_SUCCESS:
        case LOAD_MEMBER_SUCCESS:
            return addMemberEntry(state, action);
        case LOAD_MEMBERS_SUCCESS:
        case ADD_MEMBERS_SUCCESS:
        case LOAD_MEMBERSHIPS_SUCCESS:
            return addMemberEntries(state, action);
        case UPDATE_MEMBERS_SUCCESS:
            return updateMemberEntries(state, action);
        case UPDATE_MEMBER_SUCCESS:
            return updateMemberEntry(state, action);
        case DELETE_MEMBER_SUCCESS:
            return deleteMemberEntry(state, action);
        case CLEAR_MEMBERS:
            return deleteMemberEntries(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: membersById,
});