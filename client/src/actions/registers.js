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

export const STORE_SELECTEDTAGS = 'STORE_SELECTEDTAGS';

function strSelectedTags(registerId, selectedTags) {
    return {
        type: STORE_SELECTEDTAGS,
        registerId,
        selectedTags
    }
}

export function storeSelectedTags(registerId, selectedTags) {
    return (dispatch, getState) => {
        dispatch(strSelectedTags(registerId, selectedTags));
    }
}

export const STORE_SELECTEDMODE = 'STORE_SELECTEDMODE';

function strSelectedMode(registerId, selectedMode) {
    return {
        type: STORE_SELECTEDMODE,
        registerId,
        selectedMode
    }
}

export function storeSelectedMode(registerId, selectedMode) {
    return (dispatch, getState) => {
        dispatch(strSelectedMode(registerId, selectedMode));
    }
}

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';


function getUserRequest() {
    return {
        type: GET_USER_REQUEST,
        isFetching: true
    }
}


function getUserSuccess(user, registerId) {
    return {
        type: GET_USER_SUCCESS,
        isFetching: false,
        registerId,
        user
    }
}

function getUserFailure(err) {
    return {
        type: GET_USER_FAILURE,
        isFetching: false,
        errorMessage: err
    }
}

export function getUserForRegister(userId, registerId) {
    return (dispatch, getState) => {
        dispatch(getUserRequest());
        apiConnection.getUserById({userId: userId, $queryParameters: {access_token: getState().auth.token.access_token}})
            .then(response => {
                getUserSuccess(response.body, registerId)
            }).catch(err => {
            getUserFailure(err)
        });
    }
}