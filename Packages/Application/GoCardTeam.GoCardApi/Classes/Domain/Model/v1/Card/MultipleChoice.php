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
    protected $answers;

    /**
     * @param array $correctAnswers
     * @param array $answers
     */
    public function __construct(array $correctAnswers, array $answers)
    {
        $this->correctAnswers = $correctAnswers;
        $this->answers = $answers;
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
            'correct' => $this->correctAnswers,
            'answers' => $this->answers
        ];
    }
}