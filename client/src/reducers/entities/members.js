import {combineReducers} from "redux";
import {
    LOAD_MEMBERS_SUCCESS,
    UPDATE_MEMBERS_SUCCESS,
    ADD_MEMBER_SUCCESS,
    UPDATE_MEMBER_SUCCESS,
    DELETE_MEMBER_SUCCESS,
    LOAD_MEMBER_SUCCESS,
    LOAD_MEMBERSHIPS_SUCCESS
} from "../../actions/member";
import _ from "lodash";

function addMemberEntries(state, action) {

}

function addMemberEntry(state, action) {

}

function updateMemberEntry() {

}

function updateMemberEntries() {

}

function deleteMemberEntry() {

}

function updateMemberEntry() {

}

function addMembershipEntry() {

}

function addMemberIds(state, action) {

}

function addMemberId(state, action) {

}

function updateMemberId() {

}

function updateMemberIds() {

}

function deleteMemberId() {

}

function updateMemberId() {

}

function addMembershipId() {

}


function membersById(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function allMembers(state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    byId: membersById,
    allIds: allMembers
});