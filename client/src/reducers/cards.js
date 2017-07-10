import {
    CARDS_REQUEST,
    CARDS_SUCCESS,
    CARDS_FAILURE
} from "../actions/cards";

const initialState = {
    isFetching: false,
    cards: []
};

function cards(state = initialState, action) {
    switch (action.type) {
        case CARDS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case CARDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                cards: [...state.cards, action.cards]
            };
        case CARDS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
}

export default cards;
