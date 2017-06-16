# GoCardApi.RegistersApi

All URIs are relative to *http://localhost/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addRegister**](RegistersApi.md#addRegister) | **POST** /registers | Add a new register
[**deleteRegister**](RegistersApi.md#deleteRegister) | **DELETE** /registers/{registerId} | Delete a register
[**getCardsOfRegister**](RegistersApi.md#getCardsOfRegister) | **GET** /registers/{registerId}/cards/ | Get all cards of this register
[**getMembersOfRegister**](RegistersApi.md#getMembersOfRegister) | **GET** /registers/{registerId}/members/ | Get all members of this register
[**getRegisterById**](RegistersApi.md#getRegisterById) | **GET** /registers/{registerId} | Find register by ID
[**registersRegisterIdCardsPost**](RegistersApi.md#registersRegisterIdCardsPost) | **POST** /registers/{registerId}/cards/ | Create multiple new cards
[**registersRegisterIdMembersMemberIdDelete**](RegistersApi.md#registersRegisterIdMembersMemberIdDelete) | **DELETE** /registers/{registerId}/members/{memberId} | Remove a member from this register
[**registersRegisterIdMembersMemberIdPost**](RegistersApi.md#registersRegisterIdMembersMemberIdPost) | **POST** /registers/{registerId}/members/{memberId} | Update member of a register
[**registersRegisterIdMembersPost**](RegistersApi.md#registersRegisterIdMembersPost) | **POST** /registers/{registerId}/members/ | Add member to this register
[**registersRegisterIdMembersPut**](RegistersApi.md#registersRegisterIdMembersPut) | **PUT** /registers/{registerId}/members/ | Update members of this register
[**updateRegisterWithForm**](RegistersApi.md#updateRegisterWithForm) | **POST** /registers/{registerId} | Update a register by ID


<a name="addRegister"></a>
# **addRegister**
> Register addRegister(body)

Add a new register



### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var body = new GoCardApi.Register(); // Register | Register object that needs to be added


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.addRegister(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Register**](Register.md)| Register object that needs to be added | 

### Return type

[**Register**](Register.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteRegister"></a>
# **deleteRegister**
> deleteRegister(registerId)

Delete a register



### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of register that should be deleted


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteRegister(registerId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of register that should be deleted | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getCardsOfRegister"></a>
# **getCardsOfRegister**
> [Card] getCardsOfRegister(registerId)

Get all cards of this register

Returns all cards of the given register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of register which cards to get


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getCardsOfRegister(registerId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of register which cards to get | 

### Return type

[**[Card]**](Card.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getMembersOfRegister"></a>
# **getMembersOfRegister**
> [Member] getMembersOfRegister(registerId)

Get all members of this register

Returns all members of the given register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of the register


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getMembersOfRegister(registerId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of the register | 

### Return type

[**[Member]**](Member.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getRegisterById"></a>
# **getRegisterById**
> Register getRegisterById(registerId)

Find register by ID

Returns a single register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of register to get


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getRegisterById(registerId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of register to get | 

### Return type

[**Register**](Register.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="registersRegisterIdCardsPost"></a>
# **registersRegisterIdCardsPost**
> [Card] registersRegisterIdCardsPost(registerId, cards)

Create multiple new cards

Creates multiple new cards and adds them to a register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID register the cards should be added to

var cards = [new GoCardApi.Card()]; // [Card] | Cards to be created


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.registersRegisterIdCardsPost(registerId, cards, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID register the cards should be added to | 
 **cards** | [**[Card]**](Card.md)| Cards to be created | 

### Return type

[**[Card]**](Card.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="registersRegisterIdMembersMemberIdDelete"></a>
# **registersRegisterIdMembersMemberIdDelete**
> registersRegisterIdMembersMemberIdDelete(registerId, memberId)

Remove a member from this register

Removes a member from a register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of the register

var memberId = 789; // Number | ID of the member which should be removed


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.registersRegisterIdMembersMemberIdDelete(registerId, memberId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of the register | 
 **memberId** | **Number**| ID of the member which should be removed | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="registersRegisterIdMembersMemberIdPost"></a>
# **registersRegisterIdMembersMemberIdPost**
> registersRegisterIdMembersMemberIdPost(registerId, member)

Update member of a register

Updates a specific member of a register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of the register

var member = new GoCardApi.Member(); // Member | Member to be updated


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.registersRegisterIdMembersMemberIdPost(registerId, member, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of the register | 
 **member** | [**Member**](Member.md)| Member to be updated | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="registersRegisterIdMembersPost"></a>
# **registersRegisterIdMembersPost**
> registersRegisterIdMembersPost(registerId, member)

Add member to this register

Adds a new member to this register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of the register

var member = new GoCardApi.Member(); // Member | Member to be added


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.registersRegisterIdMembersPost(registerId, member, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of the register | 
 **member** | [**Member**](Member.md)| Member to be added | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="registersRegisterIdMembersPut"></a>
# **registersRegisterIdMembersPut**
> registersRegisterIdMembersPut(registerId, members)

Update members of this register

Updates all members with their permission of this register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of the register

var members = [new GoCardApi.Member()]; // [Member] | Members to be updated


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.registersRegisterIdMembersPut(registerId, members, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of the register | 
 **members** | [**[Member]**](Member.md)| Members to be updated | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateRegisterWithForm"></a>
# **updateRegisterWithForm**
> updateRegisterWithForm(registerId, opts)

Update a register by ID



### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.RegistersApi();

var registerId = 789; // Number | ID of register that needs to be updated

var opts = { 
  'name': new GoCardApi.Register() // Register | Updated name of the pet
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.updateRegisterWithForm(registerId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerId** | **Number**| ID of register that needs to be updated | 
 **name** | [**Register**](Register.md)| Updated name of the pet | [optional] 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

