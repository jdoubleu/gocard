<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1\Card;

use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\ValueObject(embedded=true)
 */
class TextInput extends AbstractCardContent
{

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="Text")
     * @Flow\Validate(type="StringLength", options={"minimum":1})
     * @ORM\Column(type="text")
     * @var string
     */
    protected $correctAnswer;

    /**
     * @return string
     */
    public function getCorrectAnswer(): string
    {
        return $this->correctAnswer;
    }

    /**
     * @param string $correctAnswer
     */
    public function setCorrectAnswer(string $correctAnswer)
    {
        $this->correctAnswer = $correctAnswer;
    }

    /**
     * Represent the card content as an array
     * @return array
     */
    public function toArray(): array
    {
        return [
            'correct' => $this->correctAnswer
        ];
    }
}