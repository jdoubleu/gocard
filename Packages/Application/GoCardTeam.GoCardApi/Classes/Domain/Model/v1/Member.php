<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1;

use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 * @ORM\Table(uniqueConstraints={@ORM\UniqueConstraint(name="user_register", columns={"user","register"})})
 */
class Member implements \JsonSerializable
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
     * @ORM\ManyToOne()
     * @var User
     */
    protected $user;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="RegularExpression", options={"regularExpression"="(owner|editor|subscriber)"})
     * @ORM\Column(type="string", columnDefinition="SET('owner', 'editor', 'subscriber')")
     * @var string
     */
    protected $role;

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
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return int
     */
    public function getUsersUid()
    {
        return ($user = $this->getUser()) != null ? $user->getUid() : null;
    }

    /**
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @param string $role
     */
    public function setRole($role)
    {
        $this->role = $role;
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
            'id' => $this->getUid(),
            'user' => $this->getUser()->getUid(),
            'register' => $this->getRegister()->getUid(),
            'role' => $this->getRole()
        ];
    }
}