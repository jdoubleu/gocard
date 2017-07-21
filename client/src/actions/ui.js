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