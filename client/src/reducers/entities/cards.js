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


export default combineReducers({
    byId: cardsById,
});