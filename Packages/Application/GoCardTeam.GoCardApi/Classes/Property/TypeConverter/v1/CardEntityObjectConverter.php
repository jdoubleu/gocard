<?php

namespace GoCardTeam\GoCardApi\Property\TypeConverter\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use GoCardTeam\GoCardApi\Utility\ClassNameUtility;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Reflection\Exception\InvalidClassException;
use Neos\Utility\ObjectAccess;

/**
 * Special object converter for the card entities.
 * Those might change their `content` properties type.
 *
 * @Flow\Scope("singleton")
 */
class CardEntityObjectConverter extends PersistentObjectConverter
{

    /**
     * @var int
     */
    protected $priority = 111;

    /**
     * @param mixed $source
     * @param string $targetType
     * @return bool
     */
    public function canConvertFrom($source, $targetType)
    {
        return $targetType == Card::class || in_array($targetType, $this->reflectionService->getAllSubClassNamesForClass(Card::class));
    }

    /**
     * @param mixed $source
     * @return array
     * @throws InvalidClassException
     */
    public function getSourceChildPropertiesToBeConverted($source)
    {
        $source = parent::getSourceChildPropertiesToBeConverted($source);

        if (
            !empty($source['content'])
            && is_array($source['content'])
            && !empty($source['type'])
            && !array_key_exists('__type', $source['content'])
        ) {
            $className = 'GoCardTeam\GoCardApi\Domain\Model\v1\Card\\' . ClassNameUtility::convertSnakeCaseToPascalCase($source['type']);
            if ($this->objectManager->isRegistered($className)) {
                $source['content']['__type'] = $className;
            } else {
                throw new InvalidClassException(sprintf('Type %s given for card content could not be resolved to a target model type.', $source['type']));
            }
        }

        return $source;
    }
}