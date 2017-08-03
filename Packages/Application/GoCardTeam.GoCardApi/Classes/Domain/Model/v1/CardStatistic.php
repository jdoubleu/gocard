<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1;

use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * Statistics for a card
 *
 * @Flow\Entity
 */
class CardStatistic implements \JsonSerializable
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
     * @ORM\ManyToOne()
     * @var Card
     */
    protected $card;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @var string
     */
    protected $value;

    /**
     * @Flow\Validate(type="NotEmpty")
     * @Flow\Validate(type="DateTime")
     * @ORM\Column(type="datetime")
     * @var \DateTime
     */
    protected $date;

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
    public function getUser(): User
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
     * @return Card
     */
    public function getCard(): Card
    {
        return $this->card;
    }

    /**
     * @param Card $card
     */
    public function setCard(Card $card)
    {
        $this->card = $card;
    }

    /**
     * @return string
     */
    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @param string $value
     */
    public function setValue(string $value)
    {
        $this->value = $value;
    }

    /**
     * @return \DateTime
     */
    public function getDate(): \DateTime
    {
        return $this->date;
    }

    /**
     * @param \DateTime $date
     */
    public function setDate(\DateTime $date)
    {
        $this->date = $date;
    }

    /**
     * Specify data which should be serialized to JSON
     * This data will be used by the JsonView to display the output
     */
    function jsonSerialize()
    {
        return [
            'id' => $this->uid,
            'user' => $this->user->getUid(),
            'card' => $this->card->getUid(),
            'value' => $this->value,
            'date' => $this->value
        ];
    }
}