import {combineReducers} from "redux";
import {DELETE_CARD_SUCCESS, LOAD_CARDS_SUCCESS, UPDATE_CARD_SUCCESS, UPDATE_CARDS_SUCCESS, ADD_CARD_SUCCESS} from "../../actions/card";
import {_} from "lodash";

function addCardIds(state, action) {
    const {response} = action;
    return _.union(state, _.map(response, 'id'));
}

function addCardId(state, action) {
    const {response} = action;
    return _.union(state, _.map(response, 'id'));
}

function addCardEntry(state, action) {
    const {response} = action;
    return _.merge(state, _.keyBy(response, 'id'));
}

function updateCardId(state, action) {
    const {response} = action;
    return _.concat(_.omit(state, response.id), response.id);
}

function updateCardIds(state, action) {
    const {response} = action;
    return _.union(_.concat(state, _.map(response, 'id')));
}

function deleteCardEntry(state, action) {
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
            return addCardEntry(state, action);
        case DELETE_CARD_SUCCESS:
            return deleteCardEntry(state, action);
        case ADD_CARD_SUCCESS:
            return addCardId(state, action);
        default:
            return state;
    }
}

function allCards(state = [], action) {
    switch (action.type) {
        case LOAD_CARDS_SUCCESS:
            return addCardIds(state, action);
        case UPDATE_CARD_SUCCESS:
            return updateCardId(state, action);
        case UPDATE_CARDS_SUCCESS:
            return updateCardIds(state, action);
        case DELETE_CARD_SUCCESS:
            return deleteCardId(state, action);
        case ADD_CARD_SUCCESS:
            return addCardEntry(state, action);
        default:
            return state;
    }
}

export default combineReducers({
    byId: cardsById,
    allIds: allCards
});