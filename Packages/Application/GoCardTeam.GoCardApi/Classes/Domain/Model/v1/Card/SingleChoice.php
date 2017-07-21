<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1\Card;

use Doctrine\Common\Collections\ArrayCollection;
use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\ValueObject(embedded=true)
 */
class SingleChoice extends AbstractCardContent
{

    /**
     * @Flow\Validate(type="NotEmpty")
     * @ORM\Column(type="smallint")
     * @var int
     */
    protected $correctAnswer;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="GoCardTeam\GoCardApi\Validation\Validator\ArrayItemsNotEmptyValidator")
     * @Flow\Validate(type="GoCardTeam\GoCardApi\Validation\Validator\UniqueArrayItemsValidator")
     * @var array
     */
    protected $options;

    /**
     * @param int $correctAnswer
     * @param array $options
     */
    public function __construct($correctAnswer, $options)
    {
        $this->correctAnswer = $correctAnswer;
        $this->options = $options;
    }

    /**
     * @return int
     */
    public function getCorrectAnswer()
    {
        return $this->correctAnswer;
    }

    /**
     * @return array
     */
    public function getOptions()
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
            'correct' => $this->correctAnswer,
            'options' => $this->options
        ];
    }
}