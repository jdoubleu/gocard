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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.GoCardApi) {
      root.GoCardApi = {};
    }
    root.GoCardApi.ValidationResponseErrors = factory(root.GoCardApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ValidationResponseErrors model module.
   * @module model/ValidationResponseErrors
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>ValidationResponseErrors</code>.
   * @alias module:model/ValidationResponseErrors
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ValidationResponseErrors</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ValidationResponseErrors} obj Optional instance to populate.
   * @return {module:model/ValidationResponseErrors} The populated <code>ValidationResponseErrors</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('field')) {
        obj['field'] = ApiClient.convertToType(data['field'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
    }
    return obj;
  }

  /**
   * Fieldname of an invalid field
   * @member {String} field
   */
  exports.prototype['field'] = undefined;
  /**
   * Error message belonging this field
   * @member {String} message
   */
  exports.prototype['message'] = undefined;



  return exports;
}));

