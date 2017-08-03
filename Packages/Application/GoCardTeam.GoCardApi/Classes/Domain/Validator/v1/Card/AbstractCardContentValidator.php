<?php

namespace GoCardTeam\GoCardApi\Domain\Validator\v1\Card;

use GoCardTeam\GoCardApi\Domain\Model\v1\Card\AbstractCardContent;
use Neos\Flow\Validation\Exception\InvalidValidationOptionsException;
use Neos\Flow\Validation\Validator\AbstractValidator;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Validation\ValidatorResolver;
use Neos\Utility\TypeHandling;

/**
 * Special entity validator for the CardContent value object.
 * This object is mutable on request therefore needing special validation.
 * This validator fetches the current type and resolves validators for this type.
 *
 * @Flow\Scope("singleton")
 */
class AbstractCardContentValidator extends AbstractValidator
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
        if ($value instanceof AbstractCardContent) {
            $additionalValidators = $this->validatorResolver->getBaseValidatorConjunction(TypeHandling::getTypeForValue($value));
            $this->result = $additionalValidators->validate($value);
        }
    }
}