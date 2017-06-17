# GoCardApi.Card

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** |  | 
**author** | **Number** | id of user who created this card | 
**crdate** | **Date** |  | [optional] 
**tags** | **[String]** |  | [optional] 
**question** | **String** |  | 
**type** | **String** | Which type this card&#39;s content is | 
**content** | **Object** | Anser content of this card depending of the type | 


<a name="TypeEnum"></a>
## Enum: TypeEnum


* `SingleChoice` (value: `"SingleChoice"`)

* `MultipleChoice` (value: `"MultipleChoice"`)

* `TextInput` (value: `"TextInput"`)

* `SelfValidation` (value: `"SelfValidation"`)




