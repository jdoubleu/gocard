import {
    addRegister as apiAddRegister,
    deleteRegister as apiDeleteRegister,
    findAllRegisters as apiFindAllRegisters
} from "../lib/ApiClient";

export const LOAD_REGISTERS_REQUEST = 'LOAD_REGISTERS_REQUEST';
export const LOAD_REGISTERS_SUCCESS = 'LOAD_REGISTERS_SUCCESS';
export const LOAD_REGISTERS_FAILURE = 'LOAD_REGISTERS_FAILURE';

export function loadRegisters() {
    return {
        types: [LOAD_REGISTERS_REQUEST, LOAD_REGISTERS_SUCCESS, LOAD_REGISTERS_FAILURE],
        callAPI: () => apiFindAllRegisters({})
    }
}

export const ADD_REGISTER_REQUEST = 'ADD_REGISTER_REQUEST';
export const ADD_REGISTER_SUCCESS = 'ADD_REGISTER_SUCCESS';
export const ADD_REGISTER_FAILURE = 'ADD_REGISTER_FAILURE';

export function addRegister(body) {
    return {
        types: [ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_REGISTER_FAILURE],
        callAPI: () => apiAddRegister({body})
    }
}

export const DELETE_REGISTER_REQUEST = 'DELETE_REGISTER_REQUEST';
export const DELETE_REGISTER_SUCCESS = 'DELETE_REGISTER_SUCCESS';
export const DELETE_REGISTER_FAILURE = 'DELETE_REGISTER_FAILURE';

export function deleteRegister(registerId) {
    return {
        types: [DELETE_REGISTER_REQUEST, DELETE_REGISTER_SUCCESS, DELETE_REGISTER_FAILURE],
        callAPI: () => apiDeleteRegister({registerId}),
        payload: {registerId}
    }
}

export const STORE_SELECTED_TAGS = 'STORE_SELECTED_TAGS';

export function storeSelectedTags(tags, registerId) {
    return {
        type: STORE_SELECTED_TAGS,
        registerId,
        tags
    }
}