import API from "../lib/ApiClient";

const apiConnection = new API.ApiClient("http://localhost/api/v1");

//User actions
export const REGISTERS_REQUEST = 'REGISTERS_REQUEST';
export const REGISTERS_SUCCESS = 'REGISTERS_SUCCESS';
export const REGISTERS_FAILURE = 'REGISTERS_FAILURE';

function registersRequest() {
    return {
        type: REGISTERS_REQUEST,
        isFetching: true,
    }
}

function registersSuccess(registers) {
    return {
        type: REGISTERS_SUCCESS,
        isFetching: false,
        registers
    }
}

function registersFailure(err) {
    return {
        type: REGISTERS_FAILURE,
        isFetching: false,
        errorMessage: err
    }
}

export function getRegisters() {
    return (dispatch, getState) => {
        dispatch(registersRequest());
        apiConnection.findAllRegisters({$queryParameters: {access_token: getState().auth.token.access_token}})
            .then(
                response => {
                    dispatch(registersSuccess(response.body));
                }
            ).catch(err => {
                dispatch(registersFailure(err));
            }
        );
    }
}

