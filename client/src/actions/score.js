import {
    createCardStatistic as apiCreateCardStatistic,
    getCardStatisticByRegisterAndUser as apiGetCardStatisticByRegisterAndUser,
    getCardStatisticByCardAndUser as apiGetCardStatisticByCardAndUser
} from "../lib/ApiClient";


export const ADD_SCORE_REQUEST = 'ADD_SCORE_REQUEST';
export const ADD_SCORE_SUCCESS = 'ADD_SCORE_SUCCESS';
export const ADD_SCORE_FAILURE = 'ADD_SCORE_FAILURE';

export function addScore(cardId, body) {
    return {
        types: [ADD_SCORE_REQUEST, ADD_SCORE_SUCCESS, ADD_SCORE_FAILURE],
        callAPI: () => apiCreateCardStatistic({cardId: cardId, body: body})
    }
}

export const LOAD_SCORE_REQUEST = 'LOAD_SCORE_REQUEST';
export const LOAD_SCORE_SUCCESS = 'LOAD_SCORE_SUCCESS';
export const LOAD_SCORE_FAILURE = 'LOAD_SCORE_FAILURE';

export function loadAllScores(registerId, userId) {
    return {
        types: [LOAD_SCORE_REQUEST, LOAD_SCORE_SUCCESS, LOAD_SCORE_FAILURE],
        callAPI: () => apiGetCardStatisticByRegisterAndUser({register:registerId, user:userId})
    }
}

export const LOAD_CARDSCORE_REQUEST = 'LOAD_CARDSCORE_REQUEST';
export const LOAD_CARDSCORE_SUCCESS = 'LOAD_CARDSCORE_SUCCESS';
export const LOAD_CARDSCORE_FAILURE = 'LOAD_CARDSCORE_FAILURE';

export function loadCardScore(cardId, userId) {
    return {
        types: [LOAD_CARDSCORE_REQUEST, LOAD_CARDSCORE_SUCCESS, LOAD_CARDSCORE_FAILURE],
        callAPI: () => apiGetCardStatisticByCardAndUser({cardId:cardId, userId:userId})
    }
}




