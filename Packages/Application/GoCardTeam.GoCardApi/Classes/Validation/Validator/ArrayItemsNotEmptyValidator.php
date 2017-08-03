<?php

namespace GoCardTeam\GoCardApi\Validation\Validator;

use Neos\Flow\Validation\Exception\InvalidValidationOptionsException;
use Neos\Flow\Validation\Validator\AbstractValidator;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Validation\Validator\NotEmptyValidator;
use Neos\Flow\Validation\ValidatorResolver;

/**
 * Validates items of an array not being empty.
 *
 * @Flow\Scope("singleton")
 */
class ArrayItemsNotEmptyValidator extends AbstractValidator
{
    /**
     * @Flow\Inject
     * @var ValidatorResolver
     */
    protected $validatorResolver;

    /**
     * Check if $value is valid. If it is not valid, needs to add an error
     * to Result.
     *
     * @param mixed $value
     * @return void
     * @throws InvalidValidationOptionsException if invalid validation options have been specified in the constructor
     */
    protected function isValid($value)
    {
        if (!is_array($value)) {
            $this->addError('Property type is not an array', 1500566042);
        }

        $notEmptyValidator = $this->validatorResolver->createValidator(NotEmptyValidator::class);

        foreach ($value as $val) {
            if ($notEmptyValidator->validate($val)->hasErrors()) {
                $this->addError('Property has empty items', 1500566259);
                break 1;
            }
        }
    }
}