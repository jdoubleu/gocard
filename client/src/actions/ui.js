/**
 * Actions for Ui State. Ui State is used for learing
 */
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

export const SET_SELECTED_SETTINGS = 'SET_SELECTED_SETTINGS';

export function setSelectedSettings(registerId, mode, tags) {
    return {
        type: SET_SELECTED_SETTINGS,
        payload: {registerId, mode, tags}
    };
}

export const ADD_CARD_RESULT = 'ADD_CARD_RESULT';

export function addResult(cardId, answer, correct) {
    return {
        type: ADD_CARD_RESULT,
        payload: {cardId, answer, correct}
    };
}

export const SET_LAST_CORRECT = 'SET_LAST_CORRECT';

export function setLastCorrect(correct) {
    return {
        type: SET_LAST_CORRECT,
        payload: correct
    };
}

export const INIT_CARD_RESULT = 'INIT_CARD_RESULT';

export function resetResults() {
    return {
        type: INIT_CARD_RESULT
    };
}

export const SET_LAST_CARD = 'SET_LAST_CARD';

export function setLastCard(currentCard) {
    return {
        type: SET_LAST_CARD,
        payload: currentCard
    };
}


