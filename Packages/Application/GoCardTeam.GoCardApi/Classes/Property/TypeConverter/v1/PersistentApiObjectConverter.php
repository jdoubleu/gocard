<?php

namespace GoCardTeam\GoCardApi\Property\TypeConverter\v1;

use Neos\Flow\Property\PropertyMappingConfigurationInterface;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;
use Neos\Flow\Annotations as Flow;

/**
 * Extends the default PersistentObjectConverter in that it will handle api models correctly.
 * For example it will allow integers for identifiers, because most models use integers for their `uid` property,
 * which is their identifier too.
 *
 * @Flow\Scope("singleton")
 */
class PersistentApiObjectConverter extends PersistentObjectConverter
{

    /**
     * Allow integer as source type because of `uid` property.
     *
     * @var array
     */
    protected $sourceTypes = ['string', 'array', 'integer'];

    /**
     * @var int
     */
    protected $priority = 105;

    /**
     * @param mixed $source
     * @param string $targetType
     * @return bool
     */
    public function canConvertFrom($source, $targetType)
    {
        $identifierProperties = $this->reflectionService->getPropertyNamesByAnnotation($targetType, Flow\Identity::class);
        $propertyCount = count($identifierProperties);

        /*
         * If there are more than one property for identity building, according to the Flow\Identity annotation, a
         * compound identifier would be created which can't be created by an integer.
         */
        if ($propertyCount == 0 || $propertyCount > 1) {
            return false;
        }

        $intermediate = parent::canConvertFrom($source, $targetType);
        $identifierPropertyType = $this->reflectionService->getClassSchema($targetType)->getProperty($identifierProperties[0])['type'];
        return $intermediate && $identifierPropertyType == 'integer';
    }

    /**
     * Handle case for when the identifier might be an integer
     *
     * @param mixed $source
     * @return array
     */
    public function getSourceChildPropertiesToBeConverted($source)
    {
        if (is_integer($source)) {
            return [];
        }
        return parent::getSourceChildPropertiesToBeConverted($source);
    }

    /**
     * Handle case when the source is an integer.
     * The PersistentObjectConverter only accepts a string or an array for conversion.
     *
     * @param mixed $source
     * @param string $targetType
     * @param array $convertedChildProperties
     * @param PropertyMappingConfigurationInterface|null $configuration
     * @return \Neos\Flow\Property\TypeConverter\Error\TargetNotFoundError|object
     */
    public function convertFrom($source, $targetType, array $convertedChildProperties = [], PropertyMappingConfigurationInterface $configuration = null)
    {
        if (is_integer($source)) {
            $source = (string) $source;
        } elseif (is_array($source)) {
            $identifierPropertyName = $this->reflectionService->getPropertyNamesByAnnotation($targetType, Flow\Identity::class)[0];

            if (array_key_exists($identifierPropertyName, $source)) {
                $source['__identity'] = (string) $source[$identifierPropertyName];
                unset($source[$identifierPropertyName]);
            }
        }

        return parent::convertFrom($source, $targetType, $convertedChildProperties, $configuration);
    }
}