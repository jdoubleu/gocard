import API from "../lib/ApiClient";
import {logoutUser} from "../actions/auth";

export class RequestError {
    constructor(statusCode, body, message) {
        this.message = message;
        this.name = 'RequestError';
        this.statusCode = statusCode;
        this.body = body;
    }
}

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

                const response = error.response || {};
                const statusCode = response.statusCode;
                const body = response.body;

                switch (statusCode) {
                    case 400:
                        throw new RequestError(statusCode, body, 'Ooops! Anfrage invalide.');
                    case 401:
                        dispatch(logoutUser());
                        break;
                    case 404:
                        throw new RequestError(statusCode, body, 'Ooops! Route nicht gefunden.');
                    case 409:
                        throw new RequestError(statusCode, body, 'Ooops! Parameter wurden bereits verwendet.');
                    default:
                        throw new RequestError(statusCode, body, 'Ooops! Da ist was schiefgelaufen.');
                }

                throw error;
            }
        )
    }
};