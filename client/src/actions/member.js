import {
    addMembersToRegister as apiAddMembersToRegister,
    addMemberToRegister as apiAddMemberToRegister,
    deleteMemberOfRegister as apiDeleteMemberOfRegister,
    findMemberByRegisterAndUser as apiFindMemberByRegisterAndUser,
    findMembersByRegister as apiFindMembersByRegister,
    getMembersByUser as apiGetMembersByUser,
    updateMemberByRegister as apiUpdateMemberByRegister, updateMemberSetOfRegister,
    updateMembersOfRegister as apiUpdateMembersByRegister
} from "../lib/ApiClient";
import {areStatesInvalidated} from "../utils/index";
import _ from "lodash";

export const LOAD_MEMBER_REQUEST = 'LOAD_MEMBER_REQUEST';
export const LOAD_MEMBER_SUCCESS = 'LOAD_MEMBER_SUCCESS';
export const LOAD_MEMBER_FAILURE = 'LOAD_MEMBER_FAILURE';

export function loadMemberByRegister(registerId, user) {
    return {
        types: [LOAD_MEMBER_REQUEST, LOAD_MEMBER_SUCCESS, LOAD_MEMBER_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiFindMemberByRegisterAndUser({registerId, user}),
        payload: {registerId}
    }
}

export const LOAD_MEMBERS_REQUEST = 'LOAD_MEMBERS_REQUEST';
export const LOAD_MEMBERS_SUCCESS = 'LOAD_MEMBERS_SUCCESS';
export const LOAD_MEMBERS_FAILURE = 'LOAD_MEMBERS_FAILURE';

export function loadMembersByRegister(registerId) {
    return {
        types: [LOAD_MEMBERS_REQUEST, LOAD_MEMBERS_SUCCESS, LOAD_MEMBERS_FAILURE],
        shouldInvalidate: true,
        shouldCallAPI: (state) => areStatesInvalidated(_.filter(state.entities.members.byId, ['register', registerId])),
        callAPI: () => apiFindMembersByRegister({registerId}),
        payload: {registerId}
    }
}

export const LOAD_MEMBERSHIPS_REQUEST = 'LOAD_MEMBERSHIPS_REQUEST';
export const LOAD_MEMBERSHIPS_SUCCESS = 'LOAD_MEMBERSHIPS_SUCCESS';
export const LOAD_MEMBERSHIPS_FAILURE = 'LOAD_MEMBERSHIPS_FAILURE';

export function loadMembershipsByUser(userId) {
    return {
        types: [LOAD_MEMBERSHIPS_REQUEST, LOAD_MEMBERSHIPS_SUCCESS, LOAD_MEMBERSHIPS_FAILURE],
        shouldInvalidate: true,
        shouldCallAPI: (state) => areStatesInvalidated(_.filter(state.entities.cards.byId, ['user', userId])),
        callAPI: () => apiGetMembersByUser({userId}),
        payload: {userId}
    }
}

export const ADD_MEMBER_REQUEST = 'ADD_MEMBER_REQUEST';
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE';

export function addMemberToRegister(registerId, member) {
    return {
        types: [ADD_MEMBER_REQUEST, ADD_MEMBER_SUCCESS, ADD_MEMBER_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiAddMemberToRegister({registerId, member}),
        payload: {registerId}
    }
}


export const ADD_MEMBERS_REQUEST = 'ADD_MEMBERS_REQUEST';
export const ADD_MEMBERS_SUCCESS = 'ADD_MEMBERS_SUCCESS';
export const ADD_MEMBERS_FAILURE = 'ADD_MEMBERS_FAILURE';

export function addMembersToRegister(registerId, members) {
    return {
        types: [ADD_MEMBERS_REQUEST, ADD_MEMBERS_SUCCESS, ADD_MEMBERS_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiAddMembersToRegister({registerId, members}),
        payload: {registerId}
    }
}

export const UPDATE_MEMBER_REQUEST = 'UPDATE_MEMBER_REQUEST';
export const UPDATE_MEMBER_SUCCESS = 'UPDATE_MEMBER_SUCCESS';
export const UPDATE_MEMBER_FAILURE = 'UPDATE_MEMBER_FAILURE';

export function updateMemberByRegister(registerId, member) {
    return {
        types: [UPDATE_MEMBER_REQUEST, UPDATE_MEMBER_SUCCESS, UPDATE_MEMBER_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiUpdateMemberByRegister({registerId, member}),
        payload: {registerId}
    }
}

export const UPDATE_MEMBERS_REQUEST = 'UPDATE_MEMBERS_REQUEST';
export const UPDATE_MEMBERS_SUCCESS = 'UPDATE_MEMBERS_SUCCESS';
export const UPDATE_MEMBERS_FAILURE = 'UPDATE_MEMBERS_FAILURE';

export function updateMembersByRegister(registerId, members) {
    return {
        types: [UPDATE_MEMBERS_REQUEST, UPDATE_MEMBERS_SUCCESS, UPDATE_MEMBERS_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiUpdateMembersByRegister({registerId, members}),
        payload: {registerId}
    }
}
export const UPDATE_MEMBERSHIP_SET_REQUEST = 'UPDATE_MEMBERSHIP_SET_REQUEST';
export const UPDATE_MEMBERSHIP_SET_SUCCESS = 'UPDATE_MEMBERSHIP_SET_SUCCESS';
export const UPDATE_MEMBERSHIP_SET_FAILURE = 'UPDATE_MEMBERSHIP_SET_FAILURE';

export function updateMemberSetByRegister(registerId, members) {
    return {
        types: [UPDATE_MEMBERSHIP_SET_REQUEST, UPDATE_MEMBERSHIP_SET_SUCCESS, UPDATE_MEMBERSHIP_SET_FAILURE],
        shouldInvalidate: true,
        callAPI: () => updateMemberSetOfRegister({registerId, member: members}),
        payload: {registerId}
    }
}

export const DELETE_MEMBER_REQUEST = 'DELETE_MEMBER_REQUEST';
export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS';
export const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE';

export function deleteMemberByRegister(registerId, memberId) {
    return {
        types: [DELETE_MEMBER_REQUEST, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiDeleteMemberOfRegister({registerId, memberId}),
        payload: {registerId, memberId}
    }
}
