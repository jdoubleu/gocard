import {
    addRegister as apiAddRegister,
    deleteRegister as apiDeleteRegister,
    findAllRegisters as apiFindAllRegisters,
    findRegisterById as apiFindRegisterById,
    updateRegister as apiUpdateRegister
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

export const LOAD_REGISTER_REQUEST = 'LOAD_REGISTER_REQUEST';
export const LOAD_REGISTER_SUCCESS = 'LOAD_REGISTER_SUCCESS';
export const LOAD_REGISTER_FAILURE = 'LOAD_REGISTER_FAILURE';

export function loadRegister(registerId) {
    return {
        types: [LOAD_REGISTER_REQUEST, LOAD_REGISTER_SUCCESS, LOAD_REGISTER_FAILURE],
        callAPI: () => apiFindRegisterById({registerId})
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

export const UPDATE_REGISTER_REQUEST = 'UPDATE_REGISTER_REQUEST';
export const UPDATE_REGISTER_SUCCESS = 'UPDATE_REGISTER_SUCCESS';
export const UPDATE_REGISTER_FAILURE = 'UPDATE_REGISTER_FAILURE';

export function updateRegister(registerId, body) {
    return {
        types: [UPDATE_REGISTER_REQUEST, UPDATE_REGISTER_SUCCESS, UPDATE_REGISTER_FAILURE],
        callAPI: () => apiUpdateRegister({registerId, body})
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