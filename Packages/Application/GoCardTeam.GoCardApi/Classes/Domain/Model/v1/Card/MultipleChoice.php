<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1\Card;

use Doctrine\Common\Collections\ArrayCollection;
use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\ValueObject(embedded=true)
 */
class MultipleChoice extends AbstractCardContent
{

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="GoCardTeam\GoCardApi\Validation\Validator\UniqueArrayItemsValidator")
     * @ORM\Column(type="simple_array")
     * @var array
     */
    protected $correctAnswers;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="GoCardTeam\GoCardApi\Validation\Validator\UniqueArrayItemsValidator")
     * @var array
     */
    protected $options;

    /**
     * @param array $correctAnswers
     * @param array $options
     */
    public function __construct(array $correctAnswers, array $options)
    {
        $this->correctAnswers = $correctAnswers;
        $this->options = $options;
    }

    /**
     * @return array
     */
    public function getCorrectAnswers(): array
    {
        return $this->correctAnswers;
    }

    /**
     * @return array
     */
    public function getOptions(): array
    {
        return $this->options;
    }

    /**
     * Represent the card content as an array
     * @return array
     */
    public function toArray(): array
    {
        return [
            'corrects' => $this->correctAnswers,
            'options' => $this->options
        ];
    }
}