/*jshint -W069 */
/**
 * GoCard API
 * @class Client
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Client = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Client(options) {
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
     * @name Client#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    Client.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
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
     * @name Client#setApiKey
     * @param {string} value - apiKey's value
     * @param {string} headerOrQueryName - the header or query name to send the apiKey at
     * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
     */
    Client.prototype.setApiKey = function(value, headerOrQueryName, isQuery) {
        this.apiKey.value = value;
        this.apiKey.headerOrQueryName = headerOrQueryName;
        this.apiKey.isQuery = isQuery;
    };
    /**
     * Set Auth headers
     * @method
     * @name Client#setAuthHeaders
     * @param {object} headerParams - headers object
     */
    Client.prototype.setAuthHeaders = function(headerParams) {
        var headers = headerParams ? headerParams : {};
        if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
            headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
        }
        return headers;
    };

    /**
     * This will list all registers a user is allowed to see
     * @method
     * @name Client#findAllRegisters
     * @param {object} parameters - method options and parameters
     */
    Client.prototype.findAllRegisters = function(parameters) {
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
     * @name Client#addRegister
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Register object that needs to be added
     */
    Client.prototype.addRegister = function(parameters) {
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
     * @name Client#findByRegisterById
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of register to get
     */
    Client.prototype.findByRegisterById = function(parameters) {
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
     * @name Client#updateRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of register that needs to be updated
     * @param {} parameters.name - Updated name of the pet
     */
    Client.prototype.updateRegister = function(parameters) {
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

        if (parameters['name'] !== undefined) {
            body = parameters['name'];
        }

        if (parameters['name'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Delete a register
     * @method
     * @name Client#deleteRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of register that should be deleted
     */
    Client.prototype.deleteRegister = function(parameters) {
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
     * @name Client#findByCardsByRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of register which cards to get
     */
    Client.prototype.findByCardsByRegister = function(parameters) {
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
     * @name Client#addCardsToRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID register the cards should be added to
     * @param {} parameters.cards - Cards to be created
     */
    Client.prototype.addCardsToRegister = function(parameters) {
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
     * @name Client#findMembersByRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     */
    Client.prototype.findMembersByRegister = function(parameters) {
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
     * @name Client#updateMembersOfRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {} parameters.members - Members to be updated
     */
    Client.prototype.updateMembersOfRegister = function(parameters) {
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
     * @name Client#addMembersToRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {} parameters.member - Member to be added
     */
    Client.prototype.addMembersToRegister = function(parameters) {
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
     * @name Client#getMemberByRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {} parameters.member - Member to be updated
     */
    Client.prototype.getMemberByRegister = function(parameters) {
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
     * @name Client#deleteMemberOfRegister
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.registerId - ID of the register
     * @param {integer} parameters.memberId - ID of the member which should be removed
     */
    Client.prototype.deleteMemberOfRegister = function(parameters) {
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
     * Updates multiple cards
     * @method
     * @name Client#updateCards
     * @param {object} parameters - method options and parameters
     * @param {} parameters.cards - Cards to be updated
     */
    Client.prototype.updateCards = function(parameters) {
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
     * @name Client#getCard
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.cardId - ID of the card to get
     */
    Client.prototype.getCard = function(parameters) {
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
     * @name Client#updateCard
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.cardId - ID of the card which needs to be updated
     */
    Client.prototype.updateCard = function(parameters) {
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
     * @name Client#deleteCard
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.cardId - ID of the card which should be deleted
     */
    Client.prototype.deleteCard = function(parameters) {
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
     * @name Client#addUser
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Created user object
     */
    Client.prototype.addUser = function(parameters) {
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
     * @name Client#loginUser
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.email - The email address for login
     * @param {string} parameters.password - The password for login in clear text
     */
    Client.prototype.loginUser = function(parameters) {
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

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Invalidates the access token
     * @method
     * @name Client#logoutUser
     * @param {object} parameters - method options and parameters
     */
    Client.prototype.logoutUser = function(parameters) {
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

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Get user by user id
     * @method
     * @name Client#getUserById
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.userId - ID of the user
     */
    Client.prototype.getUserById = function(parameters) {
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
     * @name Client#updateUser
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.userId - ID of the user
     * @param {} parameters.body - Updated user object
     */
    Client.prototype.updateUser = function(parameters) {
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

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes a user from the system.

    After this the user will automatically be logged out

     * @method
     * @name Client#deleteUser
     * @param {object} parameters - method options and parameters
         * @param {integer} parameters.userId - ID of the user which should be deleted
     */
    Client.prototype.deleteUser = function(parameters) {
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
     * Generates a password reset token for the current logged in user
     * @method
     * @name Client#requestPasswordResetToken
     * @param {object} parameters - method options and parameters
     */
    Client.prototype.requestPasswordResetToken = function(parameters) {
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

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Generates a link with a temporary reset token which will be send to
    the users email address.

     * @method
     * @name Client#requestPasswordReset
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.email - Email address of the user
     */
    Client.prototype.requestPasswordReset = function(parameters) {
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
     * @name Client#updatePassword
     * @param {object} parameters - method options and parameters
         * @param {integer} parameters.resetToken - Token to change a password
         * @param {} parameters.body - Password data
     */
    Client.prototype.updatePassword = function(parameters) {
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

    return Client;
})();

exports.Client = Client;