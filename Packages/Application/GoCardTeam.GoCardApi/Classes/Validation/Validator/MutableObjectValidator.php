<?php

namespace GoCardTeam\GoCardApi\Validation\Validator;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Validation\Exception\InvalidValidationOptionsException;
use Neos\Flow\Validation\Validator\GenericObjectValidator;
use Neos\Flow\Validation\Validator\ObjectValidatorInterface;
use Neos\Flow\Validation\ValidatorResolver;
use Neos\Utility\TypeHandling;

/**
 * Validator for mutate property types.
 * Emits the type on validating and not on reflection.
 *
 * @Flow\Scope("prototype")
 */
class MutableObjectValidator extends GenericObjectValidator
{

    /**
     * @var array
     */
    protected $supportedOptions = [
        'originalType' => [\stdClass::class, 'Original type which will be available on reflection', 'string', true]
    ];

    /**
     * @Flow\Inject
     * @var ValidatorResolver
     */
    protected $validatorResolver;

    /**
     * Resolves validators using the ValidatorResolver for the given value type.
     *
     * @param mixed $object
     * @throws InvalidValidationOptionsException
     */
    protected function isValid($object)
    {
        if (($type = TypeHandling::getTypeForValue($object)) != TypeHandling::parseType($this->options['originalType'])['type']) {
            $additionalValidators = $this->validatorResolver->getBaseValidatorConjunction($type);
            if ($additionalValidators instanceof ObjectValidatorInterface) {
                $additionalValidators->setValidatedInstancesContainer($this->validatedInstancesContainer);
            }
            $this->result = $additionalValidators->validate($object);
        }
    }
}