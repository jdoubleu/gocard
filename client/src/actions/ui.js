export const CLEAR_SEARCH_USER = 'CLEAR_SEARCH_USER';

export function clearSearchValue() {
    return {
        type: CLEAR_SEARCH_USER,
    };
}

export const ADD_CURRENT_CARD = 'ADD_CURRENT_CARD';

export function addCurrentCard(card) {
    return {
        type: ADD_CURRENT_CARD,
        payload: card
    };
}

export const ADD_LEARN_MODE = 'ADD_LEARN_MODE';

export function addLearnMode(mode) {
    return {
        type: ADD_LEARN_MODE,
        payload: mode
    };
}

export const SET_SHOW_RESULT = 'SET_SHOW_RESULT';

export function setShowResult(showResult) {
    return {
        type: SET_SHOW_RESULT,
        payload: showResult
    };
}

export const SET_LAST_RESULT = 'SET_LAST_RESULT';

export function setLastResult(lastResult) {
    return {
        type: SET_LAST_RESULT,
        payload: lastResult
    };
}