<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1;

use Doctrine\Common\Collections\ArrayCollection;
use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 */
class Register implements \JsonSerializable
{

    /**
     * @Flow\Identity
     * @ORM\Id
     * @ORM\GeneratedValue()
     * @ORM\Column(type="consistent_bigint")
     * @var integer
     */
    protected $uid;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="DateTime")
     * @ORM\Column(type="datetime")
     * @var \DateTime
     */
    protected $crdate;

    /**
     * @Flow\Validate(type="StringLength", options={"minimum": 1, "maximum": 255})
     * @Flow\Validate(type="Label")
     * @ORM\Column(length=255)
     * @var string
     */
    protected $title;

    /**
     * @Flow\Validate(type="Text")
     * @ORM\Column(type="text", nullable=true)
     * @var string
     */
    protected $description;

    /**
     * @ORM\OneToMany(fetch="EXTRA_LAZY", orphanRemoval=true, mappedBy="register")
     * @var ArrayCollection<Card>
     */
    protected $cards;

    /**
     * @ORM\OneToMany(fetch="EXTRA_LAZY", orphanRemoval=true, mappedBy="register")
     * @var ArrayCollection<Member>
     */
    protected $members;

    /**
     * Initialize this entity
     */
    public function __construct()
    {
        $this->cards = new ArrayCollection();
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
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return ArrayCollection
     */
    public function getCards()
    {
        return $this->cards;
    }

    /**
     * @param ArrayCollection $cards
     */
    public function setCards($cards)
    {
        $this->cards = $cards;
    }

    /**
     * @return ArrayCollection
     */
    public function getMembers()
    {
        return $this->members;
    }

    /**
     * @param ArrayCollection $members
     */
    public function setMembers($members)
    {
        $this->members = $members;
    }

    /**
     * Specify data which should be serialized to JSON
     * This data will be used by the JsonView to display the output
     */
    function jsonSerialize()
    {
        return [
            'id' => $this->getUid(),
            'crdate' => $this->getCrdate(),
            'title' => $this->getTitle(),
            'description' => $this->getDescription()
        ];
    }
}