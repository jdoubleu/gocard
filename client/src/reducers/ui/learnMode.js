import {ADD_CURRENT_CARD, ADD_LEARN_MODE} from "../../actions/ui"

function addCurrentCard(state, action) {
    return {
        ...state,
        currentCard: action.card
    };
}

function addLearnMode(state, action) {
    return {
        ...state,
        mode: action.mode
    };
}

export default function ui(state = {}, action) {
    switch (action.type) {
        case ADD_CURRENT_CARD:
            return addCurrentCard(state, action);
        case ADD_LEARN_MODE:
            return addLearnMode(state, action);
        default:
            return state;
    }
}