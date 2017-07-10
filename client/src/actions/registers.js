import API from "../lib/ApiClient";
import moment from "moment";

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
        apiConnection.findAllRegisters({
            $queryParameters: {access_token: getState().auth.token.access_token}
        }).then(
            response => {
                dispatch(registersSuccess(response.body));
            }
        ).catch(err => {
                dispatch(registersFailure(err));
            }
        );
    }
}

// -------------------

// User actions
export const ADD_REGISTER_REQUEST = 'ADD_REGISTER_REQUEST';
export const ADD_REGISTER_SUCCESS = 'ADD_REGISTER_SUCCESS';
export const ADD_REGISTER_FAILURE = 'ADD_REGISTER_FAILURE';

function addRegisterRequest() {
    return {
        type: ADD_REGISTER_REQUEST,
        isFetching: true
    }
}


function addRegisterSuccess(register) {
    return {
        type: ADD_REGISTER_SUCCESS,
        isFetching: false,
        register: register
    }
}

function addRegisterFailure(err) {
    return {
        type: ADD_REGISTER_FAILURE,
        isFetching: false,
        errorMessage: err
    }
}

export function addRegister(title, description) {
    return (dispatch, getState) => {
        dispatch(addRegisterRequest());
        apiConnection.addRegister({
            body: {
                title,
                description,
                owner: getState().auth.user.uid,
                crdate: moment().format(),
            },
            $queryParameters: {access_token: getState().auth.token.access_token}
        }).then(response => {
            console.log(response);
            dispatch(addRegisterSuccess(response));
        }).catch(err => {
            console.log("Error: ", err);
            dispatch(addRegisterFailure(err));
        })
    }
}

///----Get Members
//User actions
export const MEMBERS_REQUEST = 'MEMBERS_REQUEST';
export const MEMBERS_SUCCESS = 'MEMBERS_SUCCESS';
export const MEMBERS_FAILURE = 'MEMBERS_FAILURE';

function membersRequest() {
    return {
        type: MEMBERS_REQUEST,
        isFetching: true,
    }
}

function membersSuccess(users, registerId) {
    return {
        type: MEMBERS_SUCCESS,
        isFetching: false,
        members: {registerId: registerId, members: users}
    }
}

function membersFailure(err) {
    return {
        type: MEMBERS_FAILURE,
        isFetching: false,
        errorMessage: err
    }
}

export function getMembers(registerId) {
    return (dispatch, getState) => {
        dispatch(membersRequest());
        apiConnection.findMembersByRegister({registerId: registerId, $queryParameters: {access_token: getState().auth.token.access_token}})
            .then(response => {
                membersSuccess(response.body)
            }).catch(err => {
            membersFailure(err)
        });

    }
}