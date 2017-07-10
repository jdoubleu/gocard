import API from "../lib/ApiClient";

const apiConnection = new API.ApiClient("http://localhost/api/v1");

//User actions
export const CARDS_REQUEST = 'CARDS_REQUEST';
export const CARDS_SUCCESS = 'CARDS_SUCCESS';
export const CARDS_FAILURE = 'CARDS_FAILURE';

function cardsRequest() {
    return {
        type: CARDS_REQUEST,
        isFetching: true,
    }
}

function cardsSuccess(cards, registerId) {
    return {
        type: CARDS_SUCCESS,
        isFetching: false,
        registerId,
        cards
    }
}

function cardsFailure(err) {
    return {
        type: CARDS_FAILURE,
        isFetching: false,
        errorMessage: err
    }
}

export function loadCards(registerId) {
    return (dispatch, getState) => {
        dispatch(cardsRequest());
        apiConnection.findByCardsByRegister({registerId: registerId, $queryParameters: {access_token: getState().auth.token.access_token}})
            .then(response => {
                cardsSuccess(response.body)
            }).catch(err => {
            cardsFailure(err)
        });

    }
}

