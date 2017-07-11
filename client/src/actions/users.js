import API from "../lib/ApiClient";

const apiConnection = new API.ApiClient("http://localhost/api/v1");

//User actions
export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

function usersRequest() {
    return {
        type: USERS_REQUEST,
        isFetching: true,
    }
}

function usersSuccess(user) {
    return {
        type: USERS_SUCCESS,
        isFetching: false,
        user
    }
}

function usersFailure(err) {
    return {
        type: USERS_FAILURE,
        isFetching: false,
        errorMessage: err
    }
}

export function loadUser(userId) {
    return (dispatch, getState) => {
        dispatch(usersRequest());
        apiConnection.getUserById({userId: userId, $queryParameters: {access_token: getState().auth.token.access_token}})
            .then(response => {
                usersSuccess(response.body)
            }).catch(err => {
                usersFailure(err)
        });

    }
}

export const MEMBERS_REQUEST = 'MEMBERS_REQUEST';
export const MEMBERS_SUCCESS = 'MEMBERS_SUCCESS';
export const MEMBERS_FAILURE = 'MEMBERS_FAILURE';

function membersRequest() {
    return {
        type: MEMBERS_REQUEST,
        isFetching: true,
    }
}

function membersSuccess(members, registerId) {
    return {
        type: MEMBERS_SUCCESS,
        isFetching: false,
        registerId,
        members
    }
}

function membersFailure(err) {
    return {
        type: MEMBERS_FAILURE,
        isFetching: false,
        errorMessage: err
    }
}

export function loadMembers(registerId) {
    return (dispatch, getState) => {
        dispatch(membersRequest());
        apiConnection.findMembersByRegister({registerId: registerId, $queryParameters: {access_token: getState().auth.token.access_token}})
            .then(response => {
                membersSuccess(response.body, registerId)
            }).catch(err => {
            membersFailure(err)
        });

    }
}


