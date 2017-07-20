/* eslint-disable */
"use strict";
/**
 * API Client
 */

import request from 'request';
import Q from 'q';
import EventEmitter from 'events';

/*
 * Helper functions
 */
function mergeQueryParams(parameters, queryParameters) {
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters)
            .forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName]
            });
    }
    return queryParameters;
}

/**
 * API Client class
 */
class ApiClient extends EventEmitter {

    /**
     * GoCard API
     * @class ApiClient
     * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
     * @param {string} [domainOrOptions.domain] - The project domain
     * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
     */
    constructor(options) {
        super();

        let domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'http://localhost/api/v1';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.apiKey = (typeof options === 'object') ? (options.apiKey ? options.apiKey : {}) : {};
    }

    /**
     * HTTP Request
     *
     * @param {string} actionName - api action name
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    request(actionName, method, url, parameters, body, headers, queryParameters, form, deferred) {
        let emit = this.emit;
        let ev = {
            proceed: true,
            data: {}
        };
        emit.apply(this, ['beforeRequest', actionName, ev].concat(Array.from(arguments)));

        if (!ev.proceed) {
            deferred.resolve(ev.data);
        }

        let req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                emit.apply(this, ['requestFailure', actionName, req].concat(Array.from(arguments)));
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
                }
                emit.apply(this, ['requestSuccess', actionName, ev, body, req].concat(Array.from(arguments)));
                if (!ev.proceed) {
                    deferred.resolve(ev.data);
                }

                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        emit.apply(this, ['afterRequest', actionName, req]);
    }

    /**
     * Set Api Key
     *
     * @param {string} value - apiKey's value
     * @param {string} headerOrQueryName - the header or query name to send the apiKey at
     * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
     */
    setApiKey(value, headerOrQueryName, isQuery) {
        this.apiKey.value = value;
        this.apiKey.headerOrQueryName = headerOrQueryName;
        this.apiKey.isQuery = isQuery;
    }
    /**
     * Set Auth headers
     *
     * @param {object} headerParams - headers object
     */
    setAuthHeaders(headerParams) {
        let headers = headerParams ? headerParams : {};
        if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
            headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
        }
        return headers;
    }

    /**
     * Set Auth query parameters
     *
     * @param {object} queryParams - query object
     */
    setAuthQueryParams(queryParams) {
        let query = queryParams ? queryParams : {};
        if (this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
            query[this.apiKey.headerOrQueryName] = this.apiKey.value;
        }
        return query;
    }
}

/**
 * @var ApiClient client instance of an api client
 */
let client = new ApiClient();

export default client;

/*
 * API Models
 */
const Models = {
    /**
     * Register
     */
    Register: {
        'id': 'number',
        'owner': 'number',
        'crdate': 'string',
        'title': 'string',
        'description': 'string',
    },

    /**
     * Card
     */
    Card: {
        'id': 'number',
        'author': 'number',
        'crdate': 'string',
        'register': 'number',
        'tags': 'array',
        'question': 'string',
        'type': [ /* "single-choice" | "multiple-choice" | "text-input" | "self-validate" */ ],
        'content': [ /* {"$ref":"#/definitions/SingleChoice"} | {"$ref":"#/definitions/MultipleChoice"} | {"$ref":"#/definitions/TextInput"} | {"$ref":"#/definitions/SelfValidate"} */ ],
    },

    /**
     * SingleChoice
     *
     * CardContent for single-choice
     */
    SingleChoice: {
        'correct': 'number',
        'options': 'array',
    },

    /**
     * MultipleChoice
     *
     * CardContent for multiple-choice
     */
    MultipleChoice: {
        'corrects': 'array',
        'options': 'array',
    },

    /**
     * TextInput
     *
     * CardContent for text-input
     */
    TextInput: {
        'answer': 'string',
    },

    /**
     * SelfValidate
     *
     * CardContent for self-validate
     */
    SelfValidate: {
        'answer': 'string',
    },

    /**
     * User
     */
    User: {
        'id': 'number',
        'displayName': 'string',
        'email': 'string',
        'status': [ /* "new" | "verified" | "active" */ ],
        'accountType': [ /* "local" | "extern" */ ],
    },

    /**
     * Member
     */
    Member: {
        'id': 'number',
        'user': 'number',
        'register': 'number',
        'role': 'array',
    },

    /**
     * RegisterActivity
     */
    RegisterActivity: {
        'id': 'number',
        'initiator': 'number',
        'type': [ /* "view" | "run" */ ],
        'date': 'string',
    },

    /**
     * AccessTokenResponse
     */
    AccessTokenResponse: {
        'access_token': 'string',
    },

    /**
     * ValidationResponse
     *
     * An api response usually thrown if the supplied data was invalid
     */
    ValidationResponse: {
        'errors': 'array',
    },

    /**
     * MultipleValidationResponse
     *
     * Same as ValidationResponse but for multiple elements
     */
    MultipleValidationResponse: {
        'items': 'array',
    },

};

/*
 * API Methods
 */

/**
 * This will list all registers a user is allowed to see
 *
 * @param {object} parameters - method options and parameters
 */
export function findAllRegisters(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];
    headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('findAllRegisters', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Add a new register
 *
 * @param {object} parameters - method options and parameters
 * @param {} parameters.body - Register object that needs to be added
 */
export function addRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];
    headers['Content-Type'] = ['application/json'];

    if (parameters['body'] !== undefined) {
        body = parameters['body'];
    }

    if (parameters['body'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: body'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('addRegister', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Returns a single register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of register to get
 */
export function findRegisterById(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('findRegisterById', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Update a register by ID
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of register that needs to be updated
 * @param {} parameters.body - GoCard API
 */
export function updateRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];
    headers['Content-Type'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['body'] !== undefined) {
        body = parameters['body'];
    }

    if (parameters['body'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: body'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('updateRegister', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Delete a register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of register that should be deleted
 */
export function deleteRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('deleteRegister', 'DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Returns all cards of the given register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of register which cards to get
 */
export function findCardsByRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/cards/';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('findCardsByRegister', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Creates a single new cards and adds it to a register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID register the cards should be added to
 * @param {} parameters.card - Card to be created
 */
export function addCardToRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/cards/';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['card'] !== undefined) {
        body = parameters['card'];
    }

    if (parameters['card'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: card'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('addCardToRegister', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Creates multiple new cards and adds them to a register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID register the cards should be added to
 * @param {} parameters.cards - Cards to be created
 */
export function addCardsToRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/cards/multiple';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['cards'] !== undefined) {
        body = parameters['cards'];
    }

    if (parameters['cards'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: cards'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('addCardsToRegister', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Returns all members of the given register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 */
export function findMembersByRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/members/';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('findMembersByRegister', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Adds a new member to this register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 * @param {} parameters.member - Member to be added
 */
export function addMemberToRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/members/';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['member'] !== undefined) {
        body = parameters['member'];
    }

    if (parameters['member'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: member'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('addMemberToRegister', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Adds multiple new members to the given register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 * @param {} parameters.member - Member to be added
 */
export function addMembersToRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/members/multiple';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['member'] !== undefined) {
        body = parameters['member'];
    }

    if (parameters['member'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: member'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('addMembersToRegister', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Updates all members with their permission of this register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 * @param {} parameters.members - Members to be updated
 */
export function updateMembersOfRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/members/multiple';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['members'] !== undefined) {
        body = parameters['members'];
    }

    if (parameters['members'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: members'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('updateMembersOfRegister', 'PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Updates a specific member of a register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 * @param {} parameters.member - Member to be updated
 */
export function updateMemberByRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/members/{memberId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['member'] !== undefined) {
        body = parameters['member'];
    }

    if (parameters['member'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: member'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('updateMemberByRegister', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Removes a member from a register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 * @param {integer} parameters.memberId - ID of the member which should be removed
 */
export function deleteMemberOfRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/members/{memberId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    path = path.replace('{memberId}', parameters['memberId']);

    if (parameters['memberId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: memberId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('deleteMemberOfRegister', 'DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Returns the member object of the given register and user
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 * @param {integer} parameters.user - ID of the user
 */
export function findMemberByRegisterAndUser(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/members/findByUser';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['user'] !== undefined) {
        queryParameters['user'] = parameters['user'];
    }

    if (parameters['user'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: user'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('findMemberByRegisterAndUser', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Lists all activities of the register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 */
export function getRegisterActivities(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/activities/';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('getRegisterActivities', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Registers a new activity of a user for the given register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 * @param {integer} parameters.userId - ID of the user
 */
export function createRegisterActivityOfUserForRegister(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/activities/';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    if (parameters['userId'] !== undefined) {
        queryParameters['userId'] = parameters['userId'];
    }

    if (parameters['userId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: userId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('createRegisterActivityOfUserForRegister', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Lists all activities of the register of the given user
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.registerId - ID of the register
 * @param {integer} parameters.userId - ID of the user
 */
export function getRegisterActivitiesForUser(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/registers/{registerId}/activities/{userId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{registerId}', parameters['registerId']);

    if (parameters['registerId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: registerId'));
        return deferred.promise;
    }

    path = path.replace('{userId}', parameters['userId']);

    if (parameters['userId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: userId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('getRegisterActivitiesForUser', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Adds a new single card to a given register
 *
 * @param {object} parameters - method options and parameters
 * @param {} parameters.body - Card to be created
 */
export function addCard(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/cards/';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers['Accept'] = ['application/json'];

    if (parameters['body'] !== undefined) {
        body = parameters['body'];
    }

    if (parameters['body'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: body'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('addCard', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Returns the card of the supplied id
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.cardId - ID of the card to get
 */
export function getCard(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/cards/{cardId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{cardId}', parameters['cardId']);

    if (parameters['cardId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: cardId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('getCard', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Updates a card by given id
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.cardId - ID of the card which needs to be updated
 * @param {} parameters.body - GoCard API
 */
export function updateCard(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/cards/{cardId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{cardId}', parameters['cardId']);

    if (parameters['cardId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: cardId'));
        return deferred.promise;
    }

    if (parameters['body'] !== undefined) {
        body = parameters['body'];
    }

    if (parameters['body'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: body'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('updateCard', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Deletes a card and removes it from the register
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.cardId - ID of the card which should be deleted
 */
export function deleteCard(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/cards/{cardId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{cardId}', parameters['cardId']);

    if (parameters['cardId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: cardId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('deleteCard', 'DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Updates multiple cards
 *
 * @param {object} parameters - method options and parameters
 * @param {} parameters.cards - Cards to be updated
 */
export function updateCards(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/cards/multiple';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    if (parameters['cards'] !== undefined) {
        body = parameters['cards'];
    }

    if (parameters['cards'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: cards'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('updateCards', 'PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Create a new user
 *
 * @param {object} parameters - method options and parameters
 * @param {} parameters.body - Created user object
 */
export function addUser(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers['Accept'] = ['application/json'];

    if (parameters['body'] !== undefined) {
        body = parameters['body'];
    }

    if (parameters['body'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: body'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('addUser', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * If the credentials are valid it will return an access token for api calls
 *
 * @param {object} parameters - method options and parameters
 * @param {string} parameters.email - The email address for login
 * @param {string} parameters.password - The password for login in clear text
 */
export function loginUser(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/login';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers['Accept'] = ['application/json'];

    if (parameters['email'] !== undefined) {
        queryParameters['email'] = parameters['email'];
    }

    if (parameters['email'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: email'));
        return deferred.promise;
    }

    if (parameters['password'] !== undefined) {
        queryParameters['password'] = parameters['password'];
    }

    if (parameters['password'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: password'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('loginUser', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Invalidates the access token
 *
 * @param {object} parameters - method options and parameters
 */
export function logoutUser(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/logout';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('logoutUser', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Returns user data of the local user with the given ID.

This call will response with 403 if the access token is not allowed to fetch information about any user even if the user does not exist. This behavious prevents information leaks to outstanding api calls.

 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.userId - ID of the user
 */
export function getUserById(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/{userId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{userId}', parameters['userId']);

    if (parameters['userId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: userId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('getUserById', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Updates the user data
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.userId - ID of the user
 * @param {} parameters.body - Updated user object
 */
export function updateUser(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/{userId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{userId}', parameters['userId']);

    if (parameters['userId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: userId'));
        return deferred.promise;
    }

    if (parameters['body'] !== undefined) {
        body = parameters['body'];
    }

    if (parameters['body'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: body'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('updateUser', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Deletes a user from the system.

After this the user will automatically be logged out

 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.userId - ID of the user which should be deleted
 */
export function deleteUser(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/{userId}';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{userId}', parameters['userId']);

    if (parameters['userId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: userId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('deleteUser', 'DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Returns all member objects of a given user
 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.userId - ID of the user
 */
export function getMembersByUser(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/{userId}/memberships';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    path = path.replace('{userId}', parameters['userId']);

    if (parameters['userId'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: userId'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('getMembersByUser', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Returns user data of the local user with the given email address.

This call will response with 403 if the access token is not allowed to fetch information about any user even if the user does not exist. This behavious prevents information leaks to outstanding api calls.

 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.email - Email address of the user
 */
export function getUserByEmail(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/findByEmail';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    if (parameters['email'] !== undefined) {
        queryParameters['email'] = parameters['email'];
    }

    if (parameters['email'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: email'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('getUserByEmail', 'GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Generates a link with a temporary reset token which will be send to
the users email address.

 *
 * @param {object} parameters - method options and parameters
 * @param {string} parameters.email - Email address of the user
 */
export function requestPasswordReset(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/passwordReset';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers['Accept'] = ['application/json'];

    if (parameters['email'] !== undefined) {
        queryParameters['email'] = parameters['email'];
    }

    if (parameters['email'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: email'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('requestPasswordReset', 'POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}

/**
 * Updates the user's password

You need to get a resetToken first

 *
 * @param {object} parameters - method options and parameters
 * @param {integer} parameters.resetToken - Token to change a password
 * @param {} parameters.body - Password data
 */
export function updatePassword(parameters) {
    if (parameters === undefined) {
        parameters = {};
    }
    let deferred = Q.defer();
    let domain = client.domain,
        path = '/users/password';
    let body = {},
        queryParameters = {},
        headers = {},
        form = {};

    headers = client.setAuthHeaders(headers);
    queryParameters = client.setAuthQueryParams(queryParameters);
    headers['Accept'] = ['application/json'];

    if (parameters['resetToken'] !== undefined) {
        queryParameters['resetToken'] = parameters['resetToken'];
    }

    if (parameters['resetToken'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: resetToken'));
        return deferred.promise;
    }

    if (parameters['body'] !== undefined) {
        body = parameters['body'];
    }

    if (parameters['body'] === undefined) {
        deferred.reject(new Error('Missing required  parameter: body'));
        return deferred.promise;
    }

    queryParameters = mergeQueryParams(parameters, queryParameters);

    client.request('updatePassword', 'PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
}