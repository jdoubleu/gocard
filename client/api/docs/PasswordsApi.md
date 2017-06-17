# GoCardApi.PasswordsApi

All URIs are relative to *http://localhost/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**requestPasswordReset**](PasswordsApi.md#requestPasswordReset) | **POST** /users/password | Request a password reset token
[**requestPasswordResetToken**](PasswordsApi.md#requestPasswordResetToken) | **GET** /users/password | Request a password reset token for the current user
[**updatePassword**](PasswordsApi.md#updatePassword) | **PUT** /users/password | Change user&#39;s password


<a name="requestPasswordReset"></a>
# **requestPasswordReset**
> requestPasswordReset(username)

Request a password reset token

Generates a link with a temporary reset token which will be send to the users email address. 

### Example
```javascript
var GoCardApi = require('go_card_api');

var apiInstance = new GoCardApi.PasswordsApi();

var username = "username_example"; // String | Username of user


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.requestPasswordReset(username, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| Username of user | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="requestPasswordResetToken"></a>
# **requestPasswordResetToken**
> &#39;String&#39; requestPasswordResetToken()

Request a password reset token for the current user

Generates a password reset token for the current logged in user

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.PasswordsApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.requestPasswordResetToken(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

**&#39;String&#39;**

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updatePassword"></a>
# **updatePassword**
> updatePassword(resetToken, body)

Change user&#39;s password

Updates the user&#39;s password  You need to get a resetToken first 

### Example
```javascript
var GoCardApi = require('go_card_api');

var apiInstance = new GoCardApi.PasswordsApi();

var resetToken = 789; // Number | Token to change a password

var body = new GoCardApi.Body(); // Body | Password data


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.updatePassword(resetToken, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resetToken** | **Number**| Token to change a password | 
 **body** | [**Body**](Body.md)| Password data | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

