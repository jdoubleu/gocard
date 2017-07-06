import API from "../lib/ApiClient";

const apiConnection = new API.ApiClient("http://localhost/api/v1");


//User actions
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

function addUserRequest() {
    return {
        type: ADD_USER_REQUEST,
        isFetching: true,
    }
}

function addUserSuccess() {
    return {
        type: ADD_USER_SUCCESS,
        isFetching: false,
    }
}

function addUserFailure(err) {
    return {
        type: ADD_USER_FAILURE,
        isFetching: false,
        message: err
    }
}


export function addUser(userData) {
    return (dispatch, getState) => {
        //apiConnection.setApiKey(access_token,"access_token",true); :TODO set API key
        dispatch(addUserRequest());
        apiConnection.addUser(userData)
        .then( //:TODO remove API key
            response => {
                console.log("Success");
                console.log(response);
                dispatch(addUserSuccess());
            }
        ).catch(err => {
                console.log("Error: ", err);
                dispatch(addUserFailure(err));
            }
        );
    }
}

