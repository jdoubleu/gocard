/* eslint-disable */
/*jshint -W069 */
/**
 * GoCard API
 * @class ApiClient
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var ApiClient = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function ApiClient(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.apiKey = (typeof options === 'object') ? (options.apiKey ? options.apiKey : {}) : {};
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name ApiClient#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    ApiClient.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
        var req = {
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
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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
    };

    /**
     * Set Api Key
     * @method
     * @name ApiClient#setApiKey
     * @param {string} value - apiKey's value
     * @param {string} headerOrQueryName - the header or query name to send the apiKey at
     * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
     */
    ApiClient.prototype.setApiKey = function(value, headerOrQueryName, isQuery) {
        this.apiKey.value = value;
        this.apiKey.headerOrQueryName = headerOrQueryName;
        this.apiKey.isQuery = isQuery;
    };
    /**
     * Set Auth headers
     * @method
     * @name ApiClient#setAuthHeaders
     * @param {object} headerParams - headers object
     */
    ApiClient.prototype.setAuthHeaders = function(headerParams) {
        var headers = headerParams ? headerParams : {};
        if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
            headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
        }
        return headers;
    };

    /**
     * This will list all registers a user is allowed to see
     * @method
     * @name ApiClient#findAllRegisters
     * @param {object} parameters - method options and parameters
     */
    ApiClient.prototype.findAllRegisters = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Add a new register
     * @method
     * @name ApiClient#addRegister
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Register object that needs to be added
     */
    ApiClient.prototype.addRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns a single register
     * @method
     * @name ApiClient#findByRegisterById
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of register to get
     */
    ApiClient.prototype.findByRegisterById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{registerId}', parameters['registerId']);

        if (parameters['registerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: registerId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update a register by ID
     * @method
     * @name ApiClient#updateRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of register that needs to be updated
     * @param {} parameters.body - GoCard API
     */
    ApiClient.prototype.updateRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a register
     * @method
     * @name ApiClient#deleteRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of register that should be deleted
     */
    ApiClient.prototype.deleteRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{registerId}', parameters['registerId']);

        if (parameters['registerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: registerId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all cards of the given register
     * @method
     * @name ApiClient#findByCardsByRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of register which cards to get
     */
    ApiClient.prototype.findByCardsByRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/cards/';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{registerId}', parameters['registerId']);

        if (parameters['registerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: registerId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates multiple new cards and adds them to a register
     * @method
     * @name ApiClient#addCardsToRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID register the cards should be added to
     * @param {} parameters.cards - Cards to be created
     */
    ApiClient.prototype.addCardsToRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/cards/';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all members of the given register
     * @method
     * @name ApiClient#findMembersByRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     */
    ApiClient.prototype.findMembersByRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/members/';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{registerId}', parameters['registerId']);

        if (parameters['registerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: registerId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates all members with their permission of this register
     * @method
     * @name ApiClient#updateMembersOfRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {} parameters.members - Members to be updated
     */
    ApiClient.prototype.updateMembersOfRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/members/';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Adds a new member to this register
     * @method
     * @name ApiClient#addMembersToRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {} parameters.member - Member to be added
     */
    ApiClient.prototype.addMembersToRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/members/';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates a specific member of a register
     * @method
     * @name ApiClient#getMemberByRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {} parameters.member - Member to be updated
     */
    ApiClient.prototype.getMemberByRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/members/{memberId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Removes a member from a register
     * @method
     * @name ApiClient#deleteMemberOfRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {integer} parameters.memberId - ID of the member which should be removed
     */
    ApiClient.prototype.deleteMemberOfRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/members/{memberId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Lists all activities of the register
     * @method
     * @name ApiClient#getRegisterActivities
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     */
    ApiClient.prototype.getRegisterActivities = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/activities/';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{registerId}', parameters['registerId']);

        if (parameters['registerId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: registerId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Registers a new activity of a user for the given register
     * @method
     * @name ApiClient#createRegisterActivityOfUserForRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {integer} parameters.userId - ID of the user
     */
    ApiClient.prototype.createRegisterActivityOfUserForRegister = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/activities/';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Lists all activities of the register of the given user
     * @method
     * @name ApiClient#getRegisterActivitiesForUser
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {integer} parameters.userId - ID of the user
     */
    ApiClient.prototype.getRegisterActivitiesForUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/registers/{registerId}/activities/{userId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates multiple cards
     * @method
     * @name ApiClient#updateCards
     * @param {object} parameters - method options and parameters
     * @param {} parameters.cards - Cards to be updated
     */
    ApiClient.prototype.updateCards = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/cards/';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        if (parameters['cards'] !== undefined) {
            body = parameters['cards'];
        }

        if (parameters['cards'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: cards'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns the card of the supplied id
     * @method
     * @name ApiClient#getCard
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.cardId - ID of the card to get
     */
    ApiClient.prototype.getCard = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/cards/{cardId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{cardId}', parameters['cardId']);

        if (parameters['cardId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: cardId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates a card by given id
     * @method
     * @name ApiClient#updateCard
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.cardId - ID of the card which needs to be updated
     */
    ApiClient.prototype.updateCard = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/cards/{cardId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{cardId}', parameters['cardId']);

        if (parameters['cardId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: cardId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes a card and removes it from the register
     * @method
     * @name ApiClient#deleteCard
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.cardId - ID of the card which should be deleted
     */
    ApiClient.prototype.deleteCard = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/cards/{cardId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{cardId}', parameters['cardId']);

        if (parameters['cardId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: cardId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Create a new user
     * @method
     * @name ApiClient#addUser
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Created user object
     */
    ApiClient.prototype.addUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users';
        var body = {},
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * If the credentials are valid it will return an access token for api calls
     * @method
     * @name ApiClient#loginUser
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.email - The email address for login
     * @param {string} parameters.password - The password for login in clear text
     */
    ApiClient.prototype.loginUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users/login';
        var body = {},
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Invalidates the access token
     * @method
     * @name ApiClient#logoutUser
     * @param {object} parameters - method options and parameters
     */
    ApiClient.prototype.logoutUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users/logout';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns user data of the local user with the given ID.

    This call will response with 403 if the access token is not allowed to fetch information about any user even if the user does not exist. This behavious prevents information leaks to outstanding api calls.

     * @method
     * @name ApiClient#getUserById
     * @param {object} parameters - method options and parameters
         * @param {integer} parameters.userId - ID of the user
     */
    ApiClient.prototype.getUserById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users/{userId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{userId}', parameters['userId']);

        if (parameters['userId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates the user data
     * @method
     * @name ApiClient#updateUser
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.userId - ID of the user
     * @param {} parameters.body - Updated user object
     */
    ApiClient.prototype.updateUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users/{userId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes a user from the system.

    After this the user will automatically be logged out

     * @method
     * @name ApiClient#deleteUser
     * @param {object} parameters - method options and parameters
         * @param {integer} parameters.userId - ID of the user which should be deleted
     */
    ApiClient.prototype.deleteUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users/{userId}';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        path = path.replace('{userId}', parameters['userId']);

        if (parameters['userId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns user data of the local user with the given email address.

    This call will response with 403 if the access token is not allowed to fetch information about any user even if the user does not exist. This behavious prevents information leaks to outstanding api calls.

     * @method
     * @name ApiClient#getUserByEmail
     * @param {object} parameters - method options and parameters
         * @param {integer} parameters.email - Email address of the user
     */
    ApiClient.prototype.getUserByEmail = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users/findByEmail';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        if (parameters['email'] !== undefined) {
            queryParameters['email'] = parameters['email'];
        }

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: email'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Generates a link with a temporary reset token which will be send to
    the users email address.

     * @method
     * @name ApiClient#requestPasswordReset
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.email - Email address of the user
     */
    ApiClient.prototype.requestPasswordReset = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users/passwordReset';
        var body = {},
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

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates the user's password

    You need to get a resetToken first

     * @method
     * @name ApiClient#updatePassword
     * @param {object} parameters - method options and parameters
         * @param {integer} parameters.resetToken - Token to change a password
         * @param {} parameters.body - Password data
     */
    ApiClient.prototype.updatePassword = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain,
            path = '/users/password';
        var body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
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

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };

    return ApiClient;
})();

exports.ApiClient = ApiClient;