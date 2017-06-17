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
    root.GoCardApi.Register = factory(root.GoCardApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Register model module.
   * @module model/Register
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Register</code>.
   * @alias module:model/Register
   * @class
   * @param id {Number} 
   * @param owner {Number} 
   * @param title {String} 
   * @param description {String} register description
   */
  var exports = function(id, owner, title, description) {
    var _this = this;

    _this['id'] = id;
    _this['owner'] = owner;

    _this['title'] = title;
    _this['description'] = description;
  };

  /**
   * Constructs a <code>Register</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Register} obj Optional instance to populate.
   * @return {module:model/Register} The populated <code>Register</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('owner')) {
        obj['owner'] = ApiClient.convertToType(data['owner'], 'Number');
      }
      if (data.hasOwnProperty('crdate')) {
        obj['crdate'] = ApiClient.convertToType(data['crdate'], 'Date');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {Number} owner
   */
  exports.prototype['owner'] = undefined;
  /**
   * @member {Date} crdate
   */
  exports.prototype['crdate'] = undefined;
  /**
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * register description
   * @member {String} description
   */
  exports.prototype['description'] = undefined;



  return exports;
}));

