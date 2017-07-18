import {combineReducers} from "redux";
import {DELETE_CARD_SUCCESS, LOAD_CARDS_SUCCESS, UPDATE_CARD_SUCCESS, UPDATE_CARDS_SUCCESS} from "../../actions/card";
import {_} from "lodash";

function addMultipleCardIds(state, action) {
    const {response} = action;
    return _.union(state, _.map(response, 'id'));
}

function addCard(state, action) {
    const {response} = action;
    return _.merge(state, _.keyBy(response, 'id'));
}

function updateSingleCardId(state, action) {
    const {response} = action;
    return _.concat(_.omit(state, response.id), response.id);
}

function updateMultipleCardIds(state, action) {
    const {response} = action;
    return _.union(_.concat(state, _.map(response, 'id')));
}

function deleteCard(state, action) {
    return _.omit(state, action.cardId);
}

function deleteCardId(state, action) {
    return _.pull(state, action.cardId)
}


function cardsById(state = {}, action) {
    switch (action.type) {
        case LOAD_CARDS_SUCCESS:
        case UPDATE_CARD_SUCCESS:
        case UPDATE_CARDS_SUCCESS:
            return addCard(state, action);
        case DELETE_CARD_SUCCESS:
            return deleteCard(state, action);
        default:
            return state;
    }
}

function allCards(state = [], action) {
    switch (action.type) {
        case LOAD_CARDS_SUCCESS:
            return addMultipleCardIds(state, action);
        case UPDATE_CARD_SUCCESS:
            return updateSingleCardId(state, action);
        case UPDATE_CARDS_SUCCESS:
            return updateMultipleCardIds(state, action);
        case DELETE_CARD_SUCCESS:
            return deleteCardId(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: cardsById,
    allIds: allCards
});