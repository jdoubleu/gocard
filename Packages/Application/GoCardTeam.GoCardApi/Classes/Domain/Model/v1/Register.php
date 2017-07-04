<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1;

use Doctrine\Common\Collections\ArrayCollection;
use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 */
class Register
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
    protected $owner;

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
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="Text")
     * @ORM\Column(type="text")
     * @var string
     */
    protected $description;

    /**
     * @var ArrayCollection<Card>
     */
    protected $cards;

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
    public function getOwner(): User
    {
        return $this->owner;
    }

    /**
     * @param User $owner
     */
    public function setOwner(User $owner)
    {
        $this->owner = $owner;
    }

    /**
     * @return int
     */
    public function getOwnersUid(): int
    {
        return $this->getOwner()->getUid();
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
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description)
    {
        $this->description = $description;
    }

    /**
     * @return ArrayCollection
     */
    public function getCards(): ArrayCollection
    {
        return $this->cards;
    }

    /**
     * @param ArrayCollection $cards
     */
    public function setCards(ArrayCollection $cards)
    {
        $this->cards = $cards;
    }
}