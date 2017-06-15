# GoCardApi.Card

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** |  | [optional] 
**author** | **Number** | id of user who created this card | [optional] 
**crdate** | **Date** |  | [optional] 
**tags** | **[String]** |  | [optional] 
**question** | **String** |  | [optional] 
**type** | **String** | Which type this card&#39;s content is | [optional] 
**content** | **Object** | Anser content of this card depending of the type | [optional] 


<a name="TypeEnum"></a>
## Enum: TypeEnum


* `SingleChoice` (value: `"SingleChoice"`)

* `MultipleChoice` (value: `"MultipleChoice"`)

* `TextInput` (value: `"TextInput"`)

* `SelfValidation` (value: `"SelfValidation"`)




