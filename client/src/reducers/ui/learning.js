import {combineReducers} from "redux";
import {ADD_CURRENT_CARD, ADD_LEARN_MODE, SET_LAST_RESULT, SET_SHOW_RESULT} from "../../actions/ui";

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

function setShowResult(state, action) {
    return {
        ...state,
        showResult: action.payload
    };
}

function setLastResult(state, action) {
    return {
        ...state,
        lastResult: action.payload
    };
}

function misc(state = {}, action) {
    switch (action.type) {
        case ADD_CURRENT_CARD:
            return addCurrentCard(state, action);
        case ADD_LEARN_MODE:
            return addLearnMode(state, action);
        case SET_SHOW_RESULT:
            return setShowResult(state, action);
        case SET_LAST_RESULT:
            return setLastResult(state, action);
        default:
            return state;
    }
}

function resultsById(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function allResults(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    misc: misc,
    ResultsById: resultsById,
    ResultsAllIds: allResults
})


/*
entities
 -score
  -byId
   -scoreId => cardId, score, userId
  -allIds


-Ui
    -LearnMode
        -misc
            tags
            mode
        -byId:
            -cardId => cardId, answer, correct
        -allIds
*/
