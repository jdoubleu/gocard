# GoCardApi.CardsApi

All URIs are relative to *http://localhost/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addCardsToRegister**](CardsApi.md#addCardsToRegister) | **POST** /registers/{registerId}/cards/ | Create multiple new cards
[**deleteCard**](CardsApi.md#deleteCard) | **DELETE** /cards/{cardId} | Delete a card
[**findByCardsByRegister**](CardsApi.md#findByCardsByRegister) | **GET** /registers/{registerId}/cards/ | Get all cards of this register
[**getCard**](CardsApi.md#getCard) | **GET** /cards/{cardId} | Get a card by ID
[**updateCard**](CardsApi.md#updateCard) | **POST** /cards/{cardId} | Update a card
[**updateCards**](CardsApi.md#updateCards) | **PUT** /cards/ | Update multiple cards


<a name="addCardsToRegister"></a>
# **addCardsToRegister**
> [Card] addCardsToRegister(registerId, cards)

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

var apiInstance = new GoCardApi.CardsApi();

var registerId = 789; // Number | ID register the cards should be added to

var cards = [new GoCardApi.Card()]; // [Card] | Cards to be created


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.addCardsToRegister(registerId, cards, callback);
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

<a name="deleteCard"></a>
# **deleteCard**
> deleteCard(cardId)

Delete a card

Deletes a card and removes it from the register

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.CardsApi();

var cardId = 789; // Number | ID of the card which should be deleted


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteCard(cardId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardId** | **Number**| ID of the card which should be deleted | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="findByCardsByRegister"></a>
# **findByCardsByRegister**
> [Card] findByCardsByRegister(registerId)

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

var apiInstance = new GoCardApi.CardsApi();

var registerId = 789; // Number | ID of register which cards to get


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.findByCardsByRegister(registerId, callback);
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

<a name="getCard"></a>
# **getCard**
> Card getCard(cardId)

Get a card by ID

Returns the card of the supplied id

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.CardsApi();

var cardId = 789; // Number | ID of the card to get


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getCard(cardId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardId** | **Number**| ID of the card to get | 

### Return type

[**Card**](Card.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateCard"></a>
# **updateCard**
> updateCard(cardId)

Update a card

Updates a card by given id

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.CardsApi();

var cardId = 789; // Number | ID of the card which needs to be updated


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.updateCard(cardId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardId** | **Number**| ID of the card which needs to be updated | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateCards"></a>
# **updateCards**
> updateCards(cards)

Update multiple cards

Updates multiple cards

### Example
```javascript
var GoCardApi = require('go_card_api');
var defaultClient = GoCardApi.ApiClient.default;

// Configure API key authorization: api_key
var api_key = defaultClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//api_key.apiKeyPrefix = 'Token';

var apiInstance = new GoCardApi.CardsApi();

var cards = [new GoCardApi.Card()]; // [Card] | Cards to be updated


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.updateCards(cards, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cards** | [**[Card]**](Card.md)| Cards to be updated | 

### Return type

null (empty response body)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

