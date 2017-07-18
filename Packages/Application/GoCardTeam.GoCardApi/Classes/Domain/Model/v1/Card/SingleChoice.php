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
     * @Flow\Validate(type="GoCardTeam\GoCardApi\Validation\Validator\UniqueArrayItemsValidator")
     * @var array
     */
    protected $answers;

    /**
     * @param int $correctAnswer
     * @param array $answers
     */
    public function __construct($correctAnswer, array $answers)
    {
        $this->correctAnswer = $correctAnswer;
        $this->answers = $answers;
    }

    /**
     * @return int
     */
    public function getCorrectAnswer(): int
    {
        return $this->correctAnswer;
    }

    /**
     * @return array
     */
    public function getAnswers(): array
    {
        return $this->answers;
    }

    /**
     * Represent the card content as an array
     * @return array
     */
    public function toArray(): array
    {
        return [
            'correct' => $this->correctAnswer,
            'answers' => $this->answers
        ];
    }
}