import {
    deleteCard as apiDeleteCard,
    findByCardsByRegister as apiFindByCardsByRegister,
    updateCard as apiUpdateCard,
    updateCards as apiUpdateCards
} from "../lib/ApiClient";

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

export const UPDATE_CARD_REQUEST = 'UPDATE_CARD_REQUEST';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const UPDATE_CARD_FAILURE = 'UPDATE_CARD_FAILURE';

export function updateCard(cardId, body) {
    return {
        types: [UPDATE_CARD_REQUEST, UPDATE_CARD_SUCCESS, UPDATE_CARD_FAILURE],
        callAPI: () => apiUpdateCard({cardId, body}),
    }
}

export const UPDATE_CARDS_REQUEST = 'UPDATE_CARDS_REQUEST';
export const UPDATE_CARDS_SUCCESS = 'UPDATE_CARDS_SUCCESS';
export const UPDATE_CARDS_FAILURE = 'UPDATE_CARDS_FAILURE';

export function updateMultipleCards(cards) {
    return {
        types: [UPDATE_CARDS_REQUEST, UPDATE_CARDS_SUCCESS, UPDATE_CARDS_FAILURE],
        callAPI: () => apiUpdateCards({cards}),
    }
}

export const DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DELETE_CARD_FAILURE = 'DELETE_CARD_FAILURE';

export function deleteCard(cardId) {
    return {
        types: [DELETE_CARD_REQUEST, DELETE_CARD_SUCCESS, DELETE_CARD_FAILURE],
        callAPI: () => apiDeleteCard({cardId}),
    }
}