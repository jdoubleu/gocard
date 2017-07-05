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
     * @ORM\OneToMany()
     * @var ArrayCollection<string>
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
     * @return int
     */
    public function getUid(): int
    {
        return $this->uid;
    }

    /**
     * @param int $uid
     */
    public function setUid(int $uid)
    {
        $this->uid = $uid;
    }

    /**
     * @return User
     */
    public function getAuthor(): User
    {
        return $this->author;
    }

    /**
     * @param User $author
     */
    public function setAuthor(User $author)
    {
        $this->author = $author;
    }

    /**
     * @return \DateTime
     */
    public function getCrdate(): \DateTime
    {
        return $this->crdate;
    }

    /**
     * @param \DateTime $crdate
     */
    public function setCrdate(\DateTime $crdate)
    {
        $this->crdate = $crdate;
    }

    /**
     * @return ArrayCollection
     */
    public function getTags(): ArrayCollection
    {
        return $this->tags;
    }

    /**
     * @param ArrayCollection $tags
     */
    public function setTags(ArrayCollection $tags)
    {
        $this->tags = $tags;
    }

    /**
     * @return string
     */
    public function getQuestion(): string
    {
        return $this->question;
    }

    /**
     * @param string $question
     */
    public function setQuestion(string $question)
    {
        $this->question = $question;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType(string $type)
    {
        $this->type = $type;
    }

    /**
     * @return CardContent
     */
    public function getContent(): CardContent
    {
        return $this->content;
    }

    /**
     * @param CardContent $content
     */
    public function setContent(CardContent $content)
    {
        $this->content = $content;
    }
}