import API from '../lib/ApiClient';

const apiConnection = new API.ApiClient("http://localhost/api/v1");


//User actions
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

function requestUser() {
    return {
        type: USER_REQUEST,
        isFetching: true,
        user: null,
    }
}

function receiveUser(user) {
    return {
        type: USER_SUCCESS,
        isFetching: false,
        user: user
    }
}

function userError(err) {
    return {
        type: USER_FAILURE,
        isFetching: false,
        message: err
    }
}


export function getUser(email) {
    return (dispatch, getState) => {
        //apiConnection.setApiKey(access_token,"access_token",true); :TODO set API key
        dispatch(requestUser());
        apiConnection.getUserByEmail({email: email, $queryParameters: {access_token: getState().auth.access_token}}).then( //:TODO remove API key
            response => {
                dispatch(receiveUser(response.body));
            }
        ).catch(err => {
                console.log("Error: ", err);
                dispatch(userError(err));
            }
        );
    }
}