import {
    addCard as apiAddCard,
    deleteCard as apiDeleteCard,
    findCardsByRegister as apiFindCardsByRegister,
    getCard as apiGetCard,
    updateCard as apiUpdateCard,
    updateCards as apiUpdateCards,
} from "../lib/ApiClient";
import _ from "lodash";
import {areStatesInvalidated, isStateInvalidated} from "../utils/index";

export const LOAD_CARDS_REQUEST = 'LOAD_CARDS_REQUEST';
export const LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS';
export const LOAD_CARDS_FAILURE = 'LOAD_CARDS_FAILURE';

export function loadCards(registerId, userId) {
    return {
        types: [LOAD_CARDS_REQUEST, LOAD_CARDS_SUCCESS, LOAD_CARDS_FAILURE],
        shouldInvalidate: true,
        shouldCallAPI: (state) => areStatesInvalidated(_.filter(state.entities.cards.byId, ['register', registerId])),
        callAPI: () => apiFindCardsByRegister({registerId}),
        payload: {registerId, userId}
    }
}

export const LOAD_CARD_REQUEST = 'LOAD_CARD_REQUEST';
export const LOAD_CARD_SUCCESS = 'LOAD_CARD_SUCCESS';
export const LOAD_CARD_FAILURE = 'LOAD_CARD_FAILURE';

export function loadCard(cardId) {
    return {
        types: [LOAD_CARD_REQUEST, LOAD_CARD_SUCCESS, LOAD_CARD_FAILURE],
        shouldInvalidate: true,
        shouldCallAPI: (state) => isStateInvalidated(state.entities.cards.byId[cardId]),
        callAPI: () => apiGetCard({cardId}),
    }
}


export const UPDATE_CARD_REQUEST = 'UPDATE_CARD_REQUEST';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const UPDATE_CARD_FAILURE = 'UPDATE_CARD_FAILURE';

export function updateCard(cardId, body) {
    return {
        types: [UPDATE_CARD_REQUEST, UPDATE_CARD_SUCCESS, UPDATE_CARD_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiUpdateCard({cardId, body}),
    }
}

export const UPDATE_CARDS_REQUEST = 'UPDATE_CARDS_REQUEST';
export const UPDATE_CARDS_SUCCESS = 'UPDATE_CARDS_SUCCESS';
export const UPDATE_CARDS_FAILURE = 'UPDATE_CARDS_FAILURE';

export function updateCards(cards) {
    return {
        types: [UPDATE_CARDS_REQUEST, UPDATE_CARDS_SUCCESS, UPDATE_CARDS_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiUpdateCards({cards}),
    }
}

export const DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DELETE_CARD_FAILURE = 'DELETE_CARD_FAILURE';

export function deleteCard(cardId) {
    return {
        types: [DELETE_CARD_REQUEST, DELETE_CARD_SUCCESS, DELETE_CARD_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiDeleteCard({cardId}),
        payload: {cardId}
    }
}

export const ADD_CARD_REQUEST = 'ADD_CARD_REQUEST';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';

export function addCard(registerId, body) {
    return {
        types: [ADD_CARD_REQUEST, ADD_CARD_SUCCESS, ADD_CARD_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiAddCard({body: _.assign(body, {register: registerId})})
    }
}








