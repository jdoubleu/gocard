import {
    LOAD_CARDS_REQUEST,
    LOAD_CARDS_SUCCESS,
    LOAD_CARDS_FAILURE
} from "../actions/card";
import _ from "lodash";

const initialState = {
    isFetching: false,
    items: {}
};

function cards(state = initialState, action) {
    switch (action.type) {
        case LOAD_CARDS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case LOAD_CARDS_SUCCESS:
            let newCards = state.items || {};
            newCards[action.registerId] = [
                ...action.items
            ];
            return {
                ...state,
                isFetching: false,
                items: newCards
            };
        case LOAD_CARDS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default cards;
