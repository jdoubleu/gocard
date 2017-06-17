# GoCardApi.UsersApi

All URIs are relative to *http://localhost/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**changePassword**](UsersApi.md#changePassword) | **PUT** /users/password | Change user&#39;s password
[**createUser**](UsersApi.md#createUser) | **POST** /users | Create a user
[**deleteUser**](UsersApi.md#deleteUser) | **DELETE** /users/{userId} | Delete user
[**getUserById**](UsersApi.md#getUserById) | **GET** /users/{userId} | Get user by user id
[**loginUser**](UsersApi.md#loginUser) | **GET** /users/login | Log in the user
[**logoutUser**](UsersApi.md#logoutUser) | **GET** /users/logout | Log out the current user
[**requestResetToken**](UsersApi.md#requestResetToken) | **POST** /users/password | Request a password reset token
[**requestResetTokenForUser**](UsersApi.md#requestResetTokenForUser) | **GET** /users/password | Request a password reset token for the current user
[**updateUser**](UsersApi.md#updateUser) | **PUT** /users/{userId} | Update user


<a name="changePassword"></a>
# **changePassword**
> changePassword(resetToken, body)

Change user&#39;s password

Updates the user&#39;s password  You need to get a resetToken first 

### Example
```javascript
var GoCardApi = require('go_card_api');

var apiInstance = new GoCardApi.UsersApi();

var resetToken = 789; // Number | Token to change a password

var body = new GoCardApi.Body(); // Body | Password data


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.changePassword(resetToken, body, callback);
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

<a name="createUser"></a>
# **createUser**
> User createUser(body)

Create a user

Create a new user

### Example
```javascript
var GoCardApi = require('go_card_api');

var apiInstance = new GoCardApi.UsersApi();

var body = new GoCardApi.User(); // User | Created user object


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createUser(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**User**](User.md)| Created user object | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteUser"></a>
# **deleteUser**
> deleteUser(userId)

Delete user

Deletes a user from the system.  After this the user will automatically be logged out 

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.UsersApi();

var userId = 789; // Number | ID of the user which should be deleted


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteUser(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**| ID of the user which should be deleted | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getUserById"></a>
# **getUserById**
> User getUserById(userId)

Get user by user id



### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.UsersApi();

var userId = 789; // Number | ID of the user


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getUserById(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**| ID of the user | 

### Return type

[**User**](User.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="loginUser"></a>
# **loginUser**
> &#39;String&#39; loginUser(username, password)

Log in the user

If the credentials are valid it will return an access token for api calls

### Example
```javascript
var GoCardApi = require('go_card_api');

var apiInstance = new GoCardApi.UsersApi();

var username = "username_example"; // String | The user name for login

var password = "password_example"; // String | The password for login in clear text


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.loginUser(username, password, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| The user name for login | 
 **password** | **String**| The password for login in clear text | 

### Return type

**&#39;String&#39;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="logoutUser"></a>
# **logoutUser**
> logoutUser()

Log out the current user

Invalidates the access token

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.UsersApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.logoutUser(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="requestResetToken"></a>
# **requestResetToken**
> requestResetToken(username)

Request a password reset token

Generates a link with a temporary reset token which will be send to the users email address. 

### Example
```javascript
var GoCardApi = require('go_card_api');

var apiInstance = new GoCardApi.UsersApi();

var username = "username_example"; // String | Username of user


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.requestResetToken(username, callback);
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

<a name="requestResetTokenForUser"></a>
# **requestResetTokenForUser**
> &#39;String&#39; requestResetTokenForUser()

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

var apiInstance = new GoCardApi.UsersApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.requestResetTokenForUser(callback);
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

<a name="updateUser"></a>
# **updateUser**
> updateUser(userId, body)

Update user

Updates the user data

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.UsersApi();

var userId = 789; // Number | ID of the user

var body = new GoCardApi.User(); // User | Updated user object


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.updateUser(userId, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**| ID of the user | 
 **body** | [**User**](User.md)| Updated user object | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

