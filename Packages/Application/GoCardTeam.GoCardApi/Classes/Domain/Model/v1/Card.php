<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1;

use Doctrine\Common\Collections\ArrayCollection;
use GoCardTeam\GoCardApi\Domain\Model\v1\Card\AbstractCardContent;
use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 */
class Card implements \JsonSerializable
{

    /**
     * @Flow\Identity
     * @ORM\Id
     * @ORM\GeneratedValue()
     * @ORM\Column(type="bigint")
     * @var integer
     */
    protected $uid;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @ORM\ManyToOne()
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
     * @Flow\Validate(type="GoCardTeam\GoCardApi\Validation\Validator\UniqueArrayItemsValidator")
     * @ORM\Column(type="simple_array", nullable=true)
     * @var array
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
     * @ORM\Column(type="string", columnDefinition="ENUM('single-choice', 'multiple-choice', 'text-input', 'self-validate')")
     * @var string
     */
    protected $type;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @ORM\Column(type="object")
     * @var AbstractCardContent
     */
    protected $content;

    /**
     * @ORM\ManyToOne(inversedBy="cards")
     * @var Register
     */
    protected $register;

    /**
     * Construct Card
     */
    public function __construct()
    {
    }

    /**
     * @return int
     */
    public function getUid()
    {
        return $this->uid;
    }

    /**
     * @param int $uid
     */
    public function setUid($uid)
    {
        $this->uid = $uid;
    }

    /**
     * @return User
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param User $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
    }

    /**
     * @return \DateTime
     */
    public function getCrdate()
    {
        return $this->crdate;
    }

    /**
     * @param \DateTime $crdate
     */
    public function setCrdate($crdate)
    {
        $this->crdate = $crdate;
    }

    /**
     * @return array
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * @param array $tags
     */
    public function setTags($tags)
    {
        $this->tags = $tags;
    }

    /**
     * @return string
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * @param string $question
     */
    public function setQuestion($question)
    {
        $this->question = $question;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return AbstractCardContent
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param AbstractCardContent $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return Register
     */
    public function getRegister()
    {
        return $this->register;
    }

    /**
     * @param Register $register
     */
    public function setRegister($register)
    {
        $this->register = $register;
    }

    /**
     * Specify data which should be serialized to JSON
     * This data will be used by the JsonView to display the output
     */
    function jsonSerialize()
    {
        return [
            'id' => $this->uid,
            'author' => $this->author->getUid(),
            'crdate' => $this->crdate,
            'register' => $this->getRegister()->getUid(),
            'tags' => $this->tags,
            'question' => $this->question,
            'type' => $this->type,
            'content' => $this->content
        ];
    }
}