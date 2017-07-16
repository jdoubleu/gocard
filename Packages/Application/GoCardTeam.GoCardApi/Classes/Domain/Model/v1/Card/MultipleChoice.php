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
     * @var int[]
     */
    protected $correctAnswers;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="GoCardTeam\GoCardApi\Validation\Validator\UniqueArrayItemsValidator")
     * @var string[]
     */
    protected $answers;

    /**
     * Initialize this object
     */
    public function __construct()
    {
        $this->correctAnswers = new ArrayCollection();
        $this->answers = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getCorrectAnswers()
    {
        return $this->correctAnswers;
    }

    /**
     * @return \string[]
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
            'answers' => $this->answers->toArray()
        ];
    }
}