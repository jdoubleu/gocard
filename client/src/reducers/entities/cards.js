import {combineReducers} from "redux";

function cardsById(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function allCards(state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    byId: cardsById,
    allIds: allCards
});