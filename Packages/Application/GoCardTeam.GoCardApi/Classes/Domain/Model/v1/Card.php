<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1;

use Doctrine\Common\Collections\ArrayCollection;
use GoCardTeam\GoCardApi\Domain\Model\v1\Card\CardContent;
use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\ValueObject()
 */
class Card
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue()
     * @ORM\Column(type="bigint")
     * @var integer
     */
    protected $uid;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @ORM\OneToOne()
     * @var User
     */
    protected $author;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="DateTime")
     * @ORM\Column(type="datetime")
     * @var \DateTime
     */
    protected $crdate;

    /**
     * @Flow\Validate(type="UniqueArrayItems")
     * @ORM\Column(type="simple_array")
     * @ORM\OneToMany(cascade={"persist"}, fetch="EAGER", orphanRemoval=true)
     * @var string[]
     */
    protected $tags;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="Text")
     * @ORM\Column(type="text")
     * @var string
     */
    protected $question;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="RegularExpression", options={"regularExpression"="(single-choice|multiple-choice|text-input|self-validate)"})
     * @ORM\Column(type="string", columnDefinition="ENUM('single-choice', 'multiple-choice', 'text-input', 'self-validate')", nullable=false)
     * @var string
     */
    protected $type;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @var CardContent
     */
    protected $content;

    /**
     * Construct Card
     */
    public function __construct()
    {
    }

    /**
     * @return int
     */
    public function getUid(): int
    {
        return $this->uid;
    }

    /**
     * @return User
     */
    public function getAuthor(): User
    {
        return $this->author;
    }

    /**
     * @return \DateTime
     */
    public function getCrdate(): \DateTime
    {
        return $this->crdate;
    }

    /**
     * @return ArrayCollection
     */
    public function getTags(): ArrayCollection
    {
        return $this->tags;
    }

    /**
     * @return string
     */
    public function getQuestion(): string
    {
        return $this->question;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return CardContent
     */
    public function getContent(): CardContent
    {
        return $this->content;
    }
}