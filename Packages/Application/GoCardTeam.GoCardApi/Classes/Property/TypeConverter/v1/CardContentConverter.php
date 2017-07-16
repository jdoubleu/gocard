<?php

namespace GoCardTeam\GoCardApi\Property\TypeConverter\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Card\CardContent;
use Neos\Error\Messages\Error;
use Neos\Flow\Property\Exception;
use Neos\Flow\Property\PropertyMappingConfigurationInterface;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;

class CardContentConverter extends PersistentObjectConverter
{

    /**
     * @var int
     */
    protected $priority = 110;

    /**
     * @param mixed $source
     * @param string $targetType
     * @return bool
     */
    public function canConvertFrom($source, $targetType)
    {
        return $targetType == CardContent::class || in_array(CardContent::class, class_implements($targetType));
    }

    /**
     * Actually convert from $source to $targetType, taking into account the fully
     * built $convertedChildProperties and $configuration.
     *
     * The return value can be one of three types:
     * - an arbitrary object, or a simple type (which has been created while mapping).
     *   This is the normal case.
     * - NULL, indicating that this object should *not* be mapped (i.e. a "File Upload" Converter could return NULL if no file has been uploaded, and a silent failure should occur.
     * - An instance of \Neos\Error\Messages\Error -- This will be a user-visible error message later on.
     * Furthermore, it should throw an Exception if an unexpected failure (like a security error) occurred or a configuration issue happened.
     *
     * @param mixed $source
     * @param string $targetType
     * @param array $convertedChildProperties
     * @param PropertyMappingConfigurationInterface $configuration
     * @return mixed|Error the target type, or an error object if a user-error occurred
     * @throws Exception\TypeConverterException thrown in case a developer error occurred
     * @api
     */
    public function convertFrom($source, $targetType, array $convertedChildProperties = [], PropertyMappingConfigurationInterface $configuration = null)
    {
        return parent::convertFrom($source, $targetType, $convertedChildProperties, $configuration);
    }

    /**
     * @param mixed $source
     * @param string $originalTargetType
     * @param PropertyMappingConfigurationInterface|null $configuration
     * @return string
     */
    public function getTargetTypeForSource($source, $originalTargetType, PropertyMappingConfigurationInterface $configuration = null)
    {
        $targetType = $originalTargetType;

        $sourceProperties = array_keys($source);

        $candidates = [];

        if (is_array($source)) {
            $cardContentClasses = $this->reflectionService->getAllImplementationClassNamesForInterface(CardContent::class);

            // Emit differences between input and probably mappable type
            foreach ($cardContentClasses as $cardContentClassName) {
                $properties = $this->reflectionService->getClassPropertyNames($cardContentClassName);

                $diff = count(array_diff($sourceProperties, $properties));

                if (!array_key_exists($diff, $candidates)) {
                    $candidates[$diff] = [];
                }

                $candidates[$diff][] = $cardContentClassName;
            }

            $sortedCandidateMatches = array_keys($candidates);
            sort($sortedCandidateMatches, SORT_NUMERIC);

            // Select the class with the least differences
            if (count($candidates[$sortedCandidateMatches[0]]) > 1) {
                // TODO: Select the "right" class from multiple candidates
                $targetType = $candidates[$sortedCandidateMatches[0]][0];
            } else {
                $targetType = $candidates[$sortedCandidateMatches[0]][0];
            }
        }

        return $targetType;
    }
}