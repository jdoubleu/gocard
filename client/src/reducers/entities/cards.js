import {combineReducers} from "redux";
import {
    ADD_CARD_SUCCESS,
    DELETE_CARD_SUCCESS,
    LOAD_CARD_SUCCESS,
    LOAD_CARDS_SUCCESS,
    UPDATE_CARD_SUCCESS
} from "../../actions/card";
import _ from "lodash";
import register from "../../registerServiceWorker";
import {DELETE_REGISTER_SUCCESS} from "../../actions/register";

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
    const {response, registerId} = action;

    return _.assign({}, _.omitBy(state, ['register', registerId]), _.keyBy(response, 'id'));
}

function deleteCardEntriesByRegister(state, action) {
    const {registerId} = action;
    return _.omitBy(state, ['register', registerId]);
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
        case DELETE_REGISTER_SUCCESS:
            return deleteCardEntriesByRegister(state, action);
        default:
            return state;
    }
}


export default combineReducers({
    byId: cardsById,
});