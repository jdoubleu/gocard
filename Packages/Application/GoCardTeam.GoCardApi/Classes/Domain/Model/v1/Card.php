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
     * @Flow\Validate(type="UniqueArrayItems")
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
     * @ORM\Column(type="string", columnDefinition="ENUM('single-choice', 'multiple-choice', 'text-input', 'self-validate')")
     * @var string
     */
    protected $type;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @ORM\Column(type="text")
     * @var CardContent
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
}