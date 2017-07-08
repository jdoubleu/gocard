<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1;

use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 */
class Member
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
    protected $user;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="RegularExpression", options={"regularExpression"="(new|verified|active)"})
     * @ORM\Column(type="string", columnDefinition="SET('read', 'write', 'update')")
     * @var string
     */
    protected $status;

    /**
     * @ORM\ManyToOne(inversedBy="members")
     * @var Register
     */
    protected $register;

    /**
     * Initialize this entity
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
     * @param int $uid
     */
    public function setUid(int $uid)
    {
        $this->uid = $uid;
    }

    /**
     * @return User
     */
    public function getUser(): ?User
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return string
     */
    public function getStatus(): string
    {
        return $this->status;
    }

    /**
     * @param string $status
     */
    public function setStatus(string $status)
    {
        $this->status = $status;
    }

    /**
     * @return Register
     */
    public function getRegister(): ?Register
    {
        return $this->register;
    }

    /**
     * @param Register $register
     */
    public function setRegister(Register $register)
    {
        $this->register = $register;
    }
}