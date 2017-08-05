import {combineReducers} from "redux";
import {
    ADD_CARD_SUCCESS,
    DELETE_CARD_SUCCESS,
    LOAD_CARD_SUCCESS,
    LOAD_CARDS_SUCCESS,
    UPDATE_CARD_SUCCESS
} from "../../actions/card";
import _ from "lodash";

function addCardEntry(state, action) {
    const {response} = action;

    return _.assign({}, state, {[response.id]: response});
}

function updateCardEntry(state, action) {
    const {response} = action;

    return _.assign({}, state, {[response.id]: response});
}

function deleteCardEntry(state, action) {
    const {cardId} = action;

    return _.omit(state, cardId);
}

function addCardEntries(state, action) {
    const {response} = action;

    return _.assign({}, state, _.keyBy(response, 'id'));
}

function cardsById(state = {}, action) {
    switch (action.type) {
        case LOAD_CARD_SUCCESS:
        case ADD_CARD_SUCCESS:
            return addCardEntry(state, action);
        case UPDATE_CARD_SUCCESS:
            return updateCardEntry(state, action);
        case DELETE_CARD_SUCCESS:
            return deleteCardEntry(state, action);
        case LOAD_CARDS_SUCCESS:
            return addCardEntries(state, action);
        default:
            return state;
    }
}


function addCardId(state, action) {
    const {response} = action;

    return _.uniq(_.concat(state, response.id));
}

function deleteCardId(state, action) {
    const {cardId} = action;

    return _.pull(state, cardId);
}

function updateCardId(state, action) {
    const {cardId, response} = action;

    return _.concat(_.pull(state, cardId), response.id);
}

function addCardIds(state, action) {
    const {response} = action;

    return _.union(state, _.map(response, 'id'));
}

function allCards(state = [], action) {
    switch (action.type) {
        case LOAD_CARD_SUCCESS:
        case ADD_CARD_SUCCESS:
            return addCardId(state, action);
        case UPDATE_CARD_SUCCESS:
            return updateCardId(state, action);
        case DELETE_CARD_SUCCESS:
            return deleteCardId(state, action);
        case LOAD_CARDS_SUCCESS:
            return addCardIds(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: cardsById,
    allIds: allCards
});