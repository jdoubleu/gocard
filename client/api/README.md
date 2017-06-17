# go_card_api

GoCardApi - JavaScript client for go_card_api
GoCard API
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 1.0.0
- Package version: 1.0.0
- Build package: io.swagger.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install go_card_api --save
```

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var GoCardApi = require('go_card_api');

var defaultClient = GoCardApi.ApiClient.instance;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = "YOUR API KEY"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix['access_token'] = "Token"

var api = new GoCardApi.CardsApi()

var registerId = 789; // {Number} ID register the cards should be added to

var cards = [new GoCardApi.Card()]; // {[Card]} Cards to be created


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.addCardsToRegister(registerId, cards, callback);

```

## Documentation for API Endpoints

All URIs are relative to *http://localhost/api/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*GoCardApi.CardsApi* | [**addCardsToRegister**](docs/CardsApi.md#addCardsToRegister) | **POST** /registers/{registerId}/cards/ | Create multiple new cards
*GoCardApi.CardsApi* | [**deleteCard**](docs/CardsApi.md#deleteCard) | **DELETE** /cards/{cardId} | Delete a card
*GoCardApi.CardsApi* | [**findByCardsByRegister**](docs/CardsApi.md#findByCardsByRegister) | **GET** /registers/{registerId}/cards/ | Get all cards of this register
*GoCardApi.CardsApi* | [**getCard**](docs/CardsApi.md#getCard) | **GET** /cards/{cardId} | Get a card by ID
*GoCardApi.CardsApi* | [**updateCard**](docs/CardsApi.md#updateCard) | **POST** /cards/{cardId} | Update a card
*GoCardApi.CardsApi* | [**updateCards**](docs/CardsApi.md#updateCards) | **PUT** /cards/ | Update multiple cards
*GoCardApi.MembersApi* | [**addMembersToRegister**](docs/MembersApi.md#addMembersToRegister) | **POST** /registers/{registerId}/members/ | Add member to this register
*GoCardApi.MembersApi* | [**deleteMemberOfRegister**](docs/MembersApi.md#deleteMemberOfRegister) | **DELETE** /registers/{registerId}/members/{memberId} | Remove a member from this register
*GoCardApi.MembersApi* | [**findMembersByRegister**](docs/MembersApi.md#findMembersByRegister) | **GET** /registers/{registerId}/members/ | Get all members of this register
*GoCardApi.MembersApi* | [**getMemberByRegister**](docs/MembersApi.md#getMemberByRegister) | **POST** /registers/{registerId}/members/{memberId} | Update member of a register
*GoCardApi.MembersApi* | [**updateMembersOfRegister**](docs/MembersApi.md#updateMembersOfRegister) | **PUT** /registers/{registerId}/members/ | Update members of this register
*GoCardApi.PasswordsApi* | [**requestPasswordReset**](docs/PasswordsApi.md#requestPasswordReset) | **POST** /users/password | Request a password reset token
*GoCardApi.PasswordsApi* | [**requestPasswordResetToken**](docs/PasswordsApi.md#requestPasswordResetToken) | **GET** /users/password | Request a password reset token for the current user
*GoCardApi.PasswordsApi* | [**updatePassword**](docs/PasswordsApi.md#updatePassword) | **PUT** /users/password | Change user&#39;s password
*GoCardApi.RegistersApi* | [**addCardsToRegister**](docs/RegistersApi.md#addCardsToRegister) | **POST** /registers/{registerId}/cards/ | Create multiple new cards
*GoCardApi.RegistersApi* | [**addMembersToRegister**](docs/RegistersApi.md#addMembersToRegister) | **POST** /registers/{registerId}/members/ | Add member to this register
*GoCardApi.RegistersApi* | [**addRegister**](docs/RegistersApi.md#addRegister) | **POST** /registers | Add a new register
*GoCardApi.RegistersApi* | [**deleteMemberOfRegister**](docs/RegistersApi.md#deleteMemberOfRegister) | **DELETE** /registers/{registerId}/members/{memberId} | Remove a member from this register
*GoCardApi.RegistersApi* | [**deleteRegister**](docs/RegistersApi.md#deleteRegister) | **DELETE** /registers/{registerId} | Delete a register
*GoCardApi.RegistersApi* | [**findAllRegisters**](docs/RegistersApi.md#findAllRegisters) | **GET** /registers | Gets all registers
*GoCardApi.RegistersApi* | [**findByCardsByRegister**](docs/RegistersApi.md#findByCardsByRegister) | **GET** /registers/{registerId}/cards/ | Get all cards of this register
*GoCardApi.RegistersApi* | [**findByRegisterById**](docs/RegistersApi.md#findByRegisterById) | **GET** /registers/{registerId} | Find register by ID
*GoCardApi.RegistersApi* | [**findMembersByRegister**](docs/RegistersApi.md#findMembersByRegister) | **GET** /registers/{registerId}/members/ | Get all members of this register
*GoCardApi.RegistersApi* | [**getMemberByRegister**](docs/RegistersApi.md#getMemberByRegister) | **POST** /registers/{registerId}/members/{memberId} | Update member of a register
*GoCardApi.RegistersApi* | [**updateMembersOfRegister**](docs/RegistersApi.md#updateMembersOfRegister) | **PUT** /registers/{registerId}/members/ | Update members of this register
*GoCardApi.RegistersApi* | [**updateRegister**](docs/RegistersApi.md#updateRegister) | **POST** /registers/{registerId} | Update a register by ID
*GoCardApi.UsersApi* | [**addUser**](docs/UsersApi.md#addUser) | **POST** /users | Create a user
*GoCardApi.UsersApi* | [**deleteUser**](docs/UsersApi.md#deleteUser) | **DELETE** /users/{userId} | Delete user
*GoCardApi.UsersApi* | [**getUserById**](docs/UsersApi.md#getUserById) | **GET** /users/{userId} | Get user by user id
*GoCardApi.UsersApi* | [**loginUser**](docs/UsersApi.md#loginUser) | **GET** /users/login | Log in the user
*GoCardApi.UsersApi* | [**logoutUser**](docs/UsersApi.md#logoutUser) | **GET** /users/logout | Log out the current user
*GoCardApi.UsersApi* | [**requestPasswordReset**](docs/UsersApi.md#requestPasswordReset) | **POST** /users/password | Request a password reset token
*GoCardApi.UsersApi* | [**requestPasswordResetToken**](docs/UsersApi.md#requestPasswordResetToken) | **GET** /users/password | Request a password reset token for the current user
*GoCardApi.UsersApi* | [**updatePassword**](docs/UsersApi.md#updatePassword) | **PUT** /users/password | Change user&#39;s password
*GoCardApi.UsersApi* | [**updateUser**](docs/UsersApi.md#updateUser) | **PUT** /users/{userId} | Update user


## Documentation for Models

 - [GoCardApi.Body](docs/Body.md)
 - [GoCardApi.Card](docs/Card.md)
 - [GoCardApi.Member](docs/Member.md)
 - [GoCardApi.MultipleValidationResponse](docs/MultipleValidationResponse.md)
 - [GoCardApi.MultipleValidationResponseItems](docs/MultipleValidationResponseItems.md)
 - [GoCardApi.Register](docs/Register.md)
 - [GoCardApi.User](docs/User.md)
 - [GoCardApi.ValidationResponse](docs/ValidationResponse.md)
 - [GoCardApi.ValidationResponseErrors](docs/ValidationResponseErrors.md)


## Documentation for Authorization


### api_key

- **Type**: API key
- **API key parameter name**: access_token
- **Location**: URL query string
