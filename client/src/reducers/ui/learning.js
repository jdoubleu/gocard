import {combineReducers} from "redux";
import {
    ADD_CURRENT_CARD,
    ADD_LEARN_MODE,
    SET_LAST_RESULT,
    SET_SHOW_RESULT,
    SET_SELECTED_SETTINGS, ADD_CARD_RESULT, SET_LAST_CORRECT, INIT_CARD_RESULT
} from "../../actions/ui";
import _ from "lodash";

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
    -LearnMode
        -misc
            tags
            mode
        -byId:
            -cardId => cardId, answer, correct: true
            -cardId => cardId, answer, correct: null    getNetxtCard = getAllCardIdsByTags - allIds
            -cardId => cardId, answer, correct: false
        -allIds
*/
