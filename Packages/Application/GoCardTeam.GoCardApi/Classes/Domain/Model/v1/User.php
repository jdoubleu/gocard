<?php
namespace GoCardTeam\GoCardApi\Domain\Model\v1;

/*
 * This file is part of the GoCardTeam.GoCardApi package.
 */

use Doctrine\ORM\Mapping as ORM;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Security\Account;

/**
 * @Flow\Entity
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue()
     * @ORM\Column(type="bigint")
     * @var integer
     */
    protected $uid;

    /**
     * @Flow\Validate(type="StringLength", options={ "minimum"=3, "maximum"=60})
     * @ORM\Column(length=60)
     * @var string
     */
    protected $displayName;

    /**
     * @Flow\Validate(type="StringLength", options={ "minimum"=5, "maximum"=255})
     * @Flow\Validate(type="EmailAddress")
     * @ORM\Column(length=255)
     * @var string
     */
    protected $email;

    /**
     * @ORM\OneToOne(cascade={"persist"})
     * @var Account
     */
    protected $account;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="RegularExpression", options={"regularExpression"="(new|verified|active)"})
     * @ORM\Column(type="string", columnDefinition="ENUM('new', 'verified', 'active')", nullable=false)
     * @var string
     */
    protected $status;

    /**
     * Init User
     */
    public function __construct()
    {
        assert(PHP_INT_SIZE == 8, "64Bit integers are not supported");
    }
    
    /**
     * @return int
     */
    public function getUid(): ?int
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
     * @return Account
     */
    public function getAccount(): ?Account
    {
        return $this->account;
    }

    /**
     * @param Account $account
     */
    public function setAccount(Account $account)
    {
        $this->account = $account;
    }

    /**
     * @return string
     */
    public function getDisplayName()
    {
        return $this->displayName;
    }

    /**
     * @param string $displayName
     * @return void
     */
    public function setDisplayName($displayName)
    {
        $this->displayName = $displayName;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return void
     */
    public function setEmail($email)
    {
        $this->email = $email;
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
     * Emits the account type
     * @return string either 'local' or 'extern'
     */
    public function getAccountType()
    {
        return $this->account->getAuthenticationProviderName() == 'LocalAuthenticationProvider' ? 'local' : 'extern';
    }

}
