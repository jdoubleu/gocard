<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1;

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
     * @return int
     */
    public function getUid(): int
    {
        return $this->uid;
    }

    /**
     * @param int $uid
     * @return Register
     */
    public function setUid(int $uid): Register
    {
        $this->uid = $uid;
        return $this;
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
     * @return Register
     */
    public function setOwner(User $owner): Register
    {
        $this->owner = $owner;
        return $this;
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
     * @return Register
     */
    public function setCrdate(\DateTime $crdate): Register
    {
        $this->crdate = $crdate;
        return $this;
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
     * @return Register
     */
    public function setTitle(string $title): Register
    {
        $this->title = $title;
        return $this;
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
     * @return Register
     */
    public function setDescription(string $description): Register
    {
        $this->description = $description;
        return $this;
    }
}