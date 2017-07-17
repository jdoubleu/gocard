import API from "../lib/ApiClient";
import {SubmissionError} from "redux-form";

export default function ({dispatch, getState}) {
    return next => action => {
        const {
            types,
            callAPI,
            shouldCallAPI = () => true,
            payload = {},
            access_token = getState().auth.token.access_token || null
        } = action;

        if (!types) {
            // Normal action: pass it on
            return next(action)
        }

        if (
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.')
        }

        if (typeof callAPI !== 'function') {
            throw new Error('Expected callAPI to be a function.')
        }

        if (!shouldCallAPI(getState())) {
            return
        }

        if (!!access_token) {
            API.setApiKey(access_token, "access_token", true);
        }

        const [requestType, successType, failureType] = types;

        dispatch({
            ...payload,
            type: requestType
        });

        return callAPI().then(
            response =>
                dispatch({
                    ...payload,
                    response: response.body,
                    type: successType
                }),
            error => {
                dispatch({
                    ...payload,
                    type: failureType
                });
                if(error.response.statusCode === 500) {
                    throw new SubmissionError({_error: 'Ooops! Da ist was schiefgelaufen.'})
                }
                throw error;
            }
        )
    }
};