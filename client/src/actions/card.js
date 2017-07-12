import {findByCardsByRegister as apiFindByCardsByRegister} from "../lib/ApiClient"

export const LOAD_CARDS_REQUEST = 'LOAD_CARDS_REQUEST';
export const LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS';
export const LOAD_CARDS_FAILURE = 'LOAD_CARDS_FAILURE';

export function loadCards(registerId) {
    return {
        types: [LOAD_CARDS_REQUEST, LOAD_CARDS_SUCCESS, LOAD_CARDS_FAILURE],
        callAPI: () => apiFindByCardsByRegister({registerId}),
        payload: {registerId}
    }
}

