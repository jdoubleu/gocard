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
     * @Flow\Validate(type="UniqueArrayItems")
     * @ORM\Embedded
     * @var string[]
     */
    protected $answers;

    /**
     * Initialize this object
     */
    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    /**
     * @return int
     */
    public function getCorrectAnswer(): int
    {
        return $this->correctAnswer;
    }

    /**
     * @param int $correctAnswer
     */
    public function setCorrectAnswer(int $correctAnswer)
    {
        $this->correctAnswer = $correctAnswer;
    }

    /**
     * @return ArrayCollection
     */
    public function getAnswers(): ArrayCollection
    {
        return $this->answers;
    }

    /**
     * @param ArrayCollection $answers
     */
    public function setAnswers(ArrayCollection $answers)
    {
        $this->answers = $answers;
    }

    /**
     * Represent the card content as an array
     * @return array
     */
    public function toArray(): array
    {
        return [
            'correct' => $this->correctAnswer,
            'answers' => $this->answers->toArray()
        ];
    }
}