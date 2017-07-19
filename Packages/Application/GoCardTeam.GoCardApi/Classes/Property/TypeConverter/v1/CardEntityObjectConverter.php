<?php

namespace GoCardTeam\GoCardApi\Property\TypeConverter\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;
use Neos\Flow\Annotations as Flow;

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
     */
    public function getSourceChildPropertiesToBeConverted($source)
    {
        $filteredSource = parent::getSourceChildPropertiesToBeConverted($source);

        if (
            !empty($filteredSource['content'])
            && is_array($filteredSource['content'])
            && !empty($filteredSource['type'])
            && !array_key_exists('__type', $filteredSource['content'])
        ) {
            switch ($filteredSource['type']) {
                case 'single-choice':
                    $filteredSource['content']['__type'] = Card\SingleChoice::class;
                    break;
                case 'multiple-choice':
                    $filteredSource['content']['__type'] = Card\MultipleChoice::class;
                    break;
                case 'text-input':
                    $filteredSource['content']['__type'] = Card\TextInput::class;
                    break;
                case 'self-validate':
                    $filteredSource['content']['__type'] = Card\SelfValidate::class;
                    break;
            }
        }

        return $filteredSource;
    }
}