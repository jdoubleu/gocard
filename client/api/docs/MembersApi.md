# GoCardApi.MembersApi

All URIs are relative to *http://localhost/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getMembersOfRegister**](MembersApi.md#getMembersOfRegister) | **GET** /registers/{registerId}/members/ | Get all members of this register
[**registersRegisterIdMembersMemberIdDelete**](MembersApi.md#registersRegisterIdMembersMemberIdDelete) | **DELETE** /registers/{registerId}/members/{memberId} | Remove a member from this register
[**registersRegisterIdMembersMemberIdPost**](MembersApi.md#registersRegisterIdMembersMemberIdPost) | **POST** /registers/{registerId}/members/{memberId} | Update member of a register
[**registersRegisterIdMembersPost**](MembersApi.md#registersRegisterIdMembersPost) | **POST** /registers/{registerId}/members/ | Add member to this register
[**registersRegisterIdMembersPut**](MembersApi.md#registersRegisterIdMembersPut) | **PUT** /registers/{registerId}/members/ | Update members of this register


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

var apiInstance = new GoCardApi.MembersApi();

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

var apiInstance = new GoCardApi.MembersApi();

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

var apiInstance = new GoCardApi.MembersApi();

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

var apiInstance = new GoCardApi.MembersApi();

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

var apiInstance = new GoCardApi.MembersApi();

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

