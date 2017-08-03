<?php

namespace GoCardTeam\GoCardApi\Validation\Validator;

use Neos\Flow\Validation\Validator\AbstractValidator;
use Neos\Flow\Annotations as Flow;

/**
 * Validator to verify distinct items in a collection
 * Yet this validator only checks for unique items which are unique after converting them to strings.
 *
 * @Flow\Scope("singleton")
 */
class UniqueArrayItemsValidator extends AbstractValidator
{

    /**
     * Check if $value is valid. If it is not valid, needs to add an error
     * to Result.
     *
     * @param mixed $value
     * @return void
     */
    protected function isValid($value)
    {
        if (count(array_unique($value)) != count($value)) {
            $this->addError('There are non-unique items in the given collection!', 1499102898);
        }
    }
}