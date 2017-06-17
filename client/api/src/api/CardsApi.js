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
    define(['ApiClient', 'model/Card', 'model/MultipleValidationResponse', 'model/ValidationResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Card'), require('../model/MultipleValidationResponse'), require('../model/ValidationResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.GoCardApi) {
      root.GoCardApi = {};
    }
    root.GoCardApi.CardsApi = factory(root.GoCardApi.ApiClient, root.GoCardApi.Card, root.GoCardApi.MultipleValidationResponse, root.GoCardApi.ValidationResponse);
  }
}(this, function(ApiClient, Card, MultipleValidationResponse, ValidationResponse) {
  'use strict';

  /**
   * Cards service.
   * @module api/CardsApi
   * @version 1.0.0
   */

  /**
   * Constructs a new CardsApi. 
   * @alias module:api/CardsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the addCardsToRegister operation.
     * @callback module:api/CardsApi~addCardsToRegisterCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Card>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create multiple new cards
     * Creates multiple new cards and adds them to a register
     * @param {Number} registerId ID register the cards should be added to
     * @param {Array.<module:model/Card>} cards Cards to be created
     * @param {module:api/CardsApi~addCardsToRegisterCallback} callback The callback function, accepting three arguments: error, data, response
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
     * Callback function to receive the result of the deleteCard operation.
     * @callback module:api/CardsApi~deleteCardCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a card
     * Deletes a card and removes it from the register
     * @param {Number} cardId ID of the card which should be deleted
     * @param {module:api/CardsApi~deleteCardCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteCard = function(cardId, callback) {
      var postBody = null;

      // verify the required parameter 'cardId' is set
      if (cardId == undefined || cardId == null) {
        throw new Error("Missing the required parameter 'cardId' when calling deleteCard");
      }


      var pathParams = {
        'cardId': cardId
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
        '/cards/{cardId}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the findByCardsByRegister operation.
     * @callback module:api/CardsApi~findByCardsByRegisterCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Card>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get all cards of this register
     * Returns all cards of the given register
     * @param {Number} registerId ID of register which cards to get
     * @param {module:api/CardsApi~findByCardsByRegisterCallback} callback The callback function, accepting three arguments: error, data, response
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
     * Callback function to receive the result of the getCard operation.
     * @callback module:api/CardsApi~getCardCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Card} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a card by ID
     * Returns the card of the supplied id
     * @param {Number} cardId ID of the card to get
     * @param {module:api/CardsApi~getCardCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Card}
     */
    this.getCard = function(cardId, callback) {
      var postBody = null;

      // verify the required parameter 'cardId' is set
      if (cardId == undefined || cardId == null) {
        throw new Error("Missing the required parameter 'cardId' when calling getCard");
      }


      var pathParams = {
        'cardId': cardId
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
      var returnType = Card;

      return this.apiClient.callApi(
        '/cards/{cardId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateCard operation.
     * @callback module:api/CardsApi~updateCardCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update a card
     * Updates a card by given id
     * @param {Number} cardId ID of the card which needs to be updated
     * @param {module:api/CardsApi~updateCardCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateCard = function(cardId, callback) {
      var postBody = null;

      // verify the required parameter 'cardId' is set
      if (cardId == undefined || cardId == null) {
        throw new Error("Missing the required parameter 'cardId' when calling updateCard");
      }


      var pathParams = {
        'cardId': cardId
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
        '/cards/{cardId}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateCards operation.
     * @callback module:api/CardsApi~updateCardsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update multiple cards
     * Updates multiple cards
     * @param {Array.<module:model/Card>} cards Cards to be updated
     * @param {module:api/CardsApi~updateCardsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateCards = function(cards, callback) {
      var postBody = cards;

      // verify the required parameter 'cards' is set
      if (cards == undefined || cards == null) {
        throw new Error("Missing the required parameter 'cards' when calling updateCards");
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
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/cards/', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
