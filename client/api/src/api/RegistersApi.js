/**
 * GoCard API
 * GoCard API
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Card', 'model/Member', 'model/MultipleValidationResponse', 'model/Register', 'model/ValidationResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Card'), require('../model/Member'), require('../model/MultipleValidationResponse'), require('../model/Register'), require('../model/ValidationResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.GoCardApi) {
      root.GoCardApi = {};
    }
    root.GoCardApi.RegistersApi = factory(root.GoCardApi.ApiClient, root.GoCardApi.Card, root.GoCardApi.Member, root.GoCardApi.MultipleValidationResponse, root.GoCardApi.Register, root.GoCardApi.ValidationResponse);
  }
}(this, function(ApiClient, Card, Member, MultipleValidationResponse, Register, ValidationResponse) {
  'use strict';

  /**
   * Registers service.
   * @module api/RegistersApi
   * @version 1.0.0
   */

  /**
   * Constructs a new RegistersApi. 
   * @alias module:api/RegistersApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the addCardsToRegister operation.
     * @callback module:api/RegistersApi~addCardsToRegisterCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Card>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create multiple new cards
     * Creates multiple new cards and adds them to a register
     * @param {Number} registerId ID register the cards should be added to
     * @param {Array.<module:model/Card>} cards Cards to be created
     * @param {module:api/RegistersApi~addCardsToRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Card>}
     */
    this.addCardsToRegister = function(registerId, cards, callback) {
      var postBody = cards;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling addCardsToRegister");
      }

      // verify the required parameter 'cards' is set
      if (cards == undefined || cards == null) {
        throw new Error("Missing the required parameter 'cards' when calling addCardsToRegister");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [Card];

      return this.apiClient.callApi(
        '/registers/{registerId}/cards/', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the addMembersToRegister operation.
     * @callback module:api/RegistersApi~addMembersToRegisterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add member to this register
     * Adds a new member to this register
     * @param {Number} registerId ID of the register
     * @param {module:model/Member} member Member to be added
     * @param {module:api/RegistersApi~addMembersToRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.addMembersToRegister = function(registerId, member, callback) {
      var postBody = member;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling addMembersToRegister");
      }

      // verify the required parameter 'member' is set
      if (member == undefined || member == null) {
        throw new Error("Missing the required parameter 'member' when calling addMembersToRegister");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/registers/{registerId}/members/', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the addRegister operation.
     * @callback module:api/RegistersApi~addRegisterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Register} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new register
     * 
     * @param {module:model/Register} body Register object that needs to be added
     * @param {module:api/RegistersApi~addRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Register}
     */
    this.addRegister = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling addRegister");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Register;

      return this.apiClient.callApi(
        '/registers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteMemberOfRegister operation.
     * @callback module:api/RegistersApi~deleteMemberOfRegisterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove a member from this register
     * Removes a member from a register
     * @param {Number} registerId ID of the register
     * @param {Number} memberId ID of the member which should be removed
     * @param {module:api/RegistersApi~deleteMemberOfRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteMemberOfRegister = function(registerId, memberId, callback) {
      var postBody = null;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling deleteMemberOfRegister");
      }

      // verify the required parameter 'memberId' is set
      if (memberId == undefined || memberId == null) {
        throw new Error("Missing the required parameter 'memberId' when calling deleteMemberOfRegister");
      }


      var pathParams = {
        'registerId': registerId,
        'memberId': memberId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/registers/{registerId}/members/{memberId}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteRegister operation.
     * @callback module:api/RegistersApi~deleteRegisterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a register
     * 
     * @param {Number} registerId ID of register that should be deleted
     * @param {module:api/RegistersApi~deleteRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteRegister = function(registerId, callback) {
      var postBody = null;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling deleteRegister");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/registers/{registerId}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the findAllRegisters operation.
     * @callback module:api/RegistersApi~findAllRegistersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Register>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets all registers
     * This will list all registers a user is allowed to see
     * @param {module:api/RegistersApi~findAllRegistersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Register>}
     */
    this.findAllRegisters = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Register];

      return this.apiClient.callApi(
        '/registers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the findByCardsByRegister operation.
     * @callback module:api/RegistersApi~findByCardsByRegisterCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Card>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get all cards of this register
     * Returns all cards of the given register
     * @param {Number} registerId ID of register which cards to get
     * @param {module:api/RegistersApi~findByCardsByRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Card>}
     */
    this.findByCardsByRegister = function(registerId, callback) {
      var postBody = null;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling findByCardsByRegister");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [Card];

      return this.apiClient.callApi(
        '/registers/{registerId}/cards/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the findByRegisterById operation.
     * @callback module:api/RegistersApi~findByRegisterByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Register} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Find register by ID
     * Returns a single register
     * @param {Number} registerId ID of register to get
     * @param {module:api/RegistersApi~findByRegisterByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Register}
     */
    this.findByRegisterById = function(registerId, callback) {
      var postBody = null;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling findByRegisterById");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = Register;

      return this.apiClient.callApi(
        '/registers/{registerId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the findMembersByRegister operation.
     * @callback module:api/RegistersApi~findMembersByRegisterCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Member>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get all members of this register
     * Returns all members of the given register
     * @param {Number} registerId ID of the register
     * @param {module:api/RegistersApi~findMembersByRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Member>}
     */
    this.findMembersByRegister = function(registerId, callback) {
      var postBody = null;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling findMembersByRegister");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [Member];

      return this.apiClient.callApi(
        '/registers/{registerId}/members/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getMemberByRegister operation.
     * @callback module:api/RegistersApi~getMemberByRegisterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update member of a register
     * Updates a specific member of a register
     * @param {Number} registerId ID of the register
     * @param {module:model/Member} member Member to be updated
     * @param {module:api/RegistersApi~getMemberByRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.getMemberByRegister = function(registerId, member, callback) {
      var postBody = member;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling getMemberByRegister");
      }

      // verify the required parameter 'member' is set
      if (member == undefined || member == null) {
        throw new Error("Missing the required parameter 'member' when calling getMemberByRegister");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/registers/{registerId}/members/{memberId}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateMembersOfRegister operation.
     * @callback module:api/RegistersApi~updateMembersOfRegisterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update members of this register
     * Updates all members with their permission of this register
     * @param {Number} registerId ID of the register
     * @param {Array.<module:model/Member>} members Members to be updated
     * @param {module:api/RegistersApi~updateMembersOfRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateMembersOfRegister = function(registerId, members, callback) {
      var postBody = members;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling updateMembersOfRegister");
      }

      // verify the required parameter 'members' is set
      if (members == undefined || members == null) {
        throw new Error("Missing the required parameter 'members' when calling updateMembersOfRegister");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/registers/{registerId}/members/', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateRegister operation.
     * @callback module:api/RegistersApi~updateRegisterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update a register by ID
     * 
     * @param {Number} registerId ID of register that needs to be updated
     * @param {module:model/Register} name Updated name of the pet
     * @param {module:api/RegistersApi~updateRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateRegister = function(registerId, name, callback) {
      var postBody = name;

      // verify the required parameter 'registerId' is set
      if (registerId == undefined || registerId == null) {
        throw new Error("Missing the required parameter 'registerId' when calling updateRegister");
      }

      // verify the required parameter 'name' is set
      if (name == undefined || name == null) {
        throw new Error("Missing the required parameter 'name' when calling updateRegister");
      }


      var pathParams = {
        'registerId': registerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['api_key'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/registers/{registerId}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
