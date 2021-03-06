import {
    createCardStatistic as apiCreateCardStatistic,
    getCardStatisticByRegisterAndUser as apiGetCardStatisticByRegisterAndUser
} from "../lib/ApiClient";
import {areStatesInvalidated} from "../utils/index";
import _ from "lodash";

/**
 * Actions for Score. Load and Add.
 */
export const ADD_SCORE_REQUEST = 'ADD_SCORE_REQUEST';
export const ADD_SCORE_SUCCESS = 'ADD_SCORE_SUCCESS';
export const ADD_SCORE_FAILURE = 'ADD_SCORE_FAILURE';

export function addScore(cardId, body, registerId) {
    return {
        types: [ADD_SCORE_REQUEST, ADD_SCORE_SUCCESS, ADD_SCORE_FAILURE],
        shouldInvalidate: true,
        callAPI: () => apiCreateCardStatistic({cardId: cardId, body: body}),
        payload: {registerId}
    }
}

export const LOAD_SCORES_REQUEST = 'LOAD_SCORES_REQUEST';
export const LOAD_SCORES_SUCCESS = 'LOAD_SCORES_SUCCESS';
export const LOAD_SCORES_FAILURE = 'LOAD_SCORES_FAILURE';

export function loadAllScores(registerId, userId) {
    return {
        types: [LOAD_SCORES_REQUEST, LOAD_SCORES_SUCCESS, LOAD_SCORES_FAILURE],
        shouldInvalidate: true,
        shouldCallAPI: (state) => areStatesInvalidated(_.filter(state.entities.members.byId, {
            'register': registerId,
            'user': userId
        })),
        callAPI: () => apiGetCardStatisticByRegisterAndUser({register: registerId, user: userId}),
        payload: {userId, registerId}
    }
}





