import {findMembersByRegister as apiFindMembersByRegister} from "../lib/ApiClient";

export const LOAD_MEMBERS_REQUEST = 'LOAD_MEMBERS_REQUEST';
export const LOAD_MEMBERS_SUCCESS = 'LOAD_MEMBERS_SUCCESS';
export const LOAD_MEMBERS_FAILURE = 'LOAD_MEMBERS_FAILURE';

export function loadMembers(registerId) {
    return {
        types: [LOAD_MEMBERS_REQUEST, LOAD_MEMBERS_SUCCESS, LOAD_MEMBERS_FAILURE],
        callAPI: () => apiFindMembersByRegister({registerId}),
        payload: {registerId}
    }
}