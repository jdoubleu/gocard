import {combineReducers} from "redux";
import {
    ADD_CARD_RESULT,
    ADD_CURRENT_CARD,
    INIT_CARD_RESULT,
    SET_LAST_CARD,
    SET_LAST_CORRECT,
    SET_LAST_RESULT,
    SET_SELECTED_SETTINGS,
    SET_SHOW_RESULT
} from "../../actions/ui";
import _ from "lodash";

/**
 * Reducer for redux to store data for learning
 * Stores data for current learning session (answered Cards, tags, mode)
 */

function addCurrentCard(state, action) {
    return {
        ...state,
        currentCard: action.card
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

function addSettings(state, action) {
    return _.assign({}, state, {
        mode: action.payload.mode,
        tags: action.payload.tags
    });
}

function setLastCorrect(state, action) {
    return _.assign({}, state, {
        lastCorrect: action.payload
    });
}

function resetShowResult(state, action) {
    return {
        ...state,
        showResult: false
    };
}

function setLastCard(state, action) {
    return _.assign({}, state, {
        lastCard: action.payload
    });
}

function misc(state = {}, action) {
    switch (action.type) {
        case ADD_CURRENT_CARD:
            return addCurrentCard(state, action);
        case SET_SHOW_RESULT:
            return setShowResult(state, action);
        case SET_LAST_RESULT:
            return setLastResult(state, action);
        case SET_SELECTED_SETTINGS:
            return addSettings(state, action);
        case SET_LAST_CORRECT:
            return setLastCorrect(state, action);
        case INIT_CARD_RESULT:
            return resetShowResult(state, action);
        case SET_LAST_CARD:
            return setLastCard(state, action);
        default:
            return state;
    }
}

function addResultEntry(state, action) {
    return _.assign({}, state, {
        [action.payload.cardId]: {
            cardId: action.payload.cardId,
            answer: action.payload.answer,
            correct: action.payload.correct
        }
    });
}

function resetResultEntrys(state, action) {
    return {};
}

function resultById(state = {}, action) {
    switch (action.type) {
        case ADD_CARD_RESULT:
            return addResultEntry(state, action);
        case INIT_CARD_RESULT:
            return resetResultEntrys(state, action);
        default:
            return state;
    }
}

function addResultId(state, action) {
    return _.uniq(_.concat(state, action.payload.cardId));
}

function resetResultIds(state, action) {
    return [];
}

function allResults(state = [], action) {
    switch (action.type) {
        case ADD_CARD_RESULT:
            return addResultId(state, action);
        case INIT_CARD_RESULT:
            return resetResultIds(state, action);
        default:
            return state;
    }
}


export default combineReducers({
    misc: misc,
    byId: resultById,
    allIds: allResults
})


/*
entities
 -score
  -byId
   -scoreId => cardId, score, userId
  -allIds

-Ui
    -LearnSettings
        -byId:
            tags
            mode
        -AllIds
    -learning
        -misc
            tags
            mode
        -byId:
            -cardId => cardId, answer, correct: true
            -cardId => cardId, answer, correct: null    getNextCard = getAllCardIdsByTags - allIds
            -cardId => cardId, answer, correct: false
        -allIds
*/
