<?php

namespace GoCardTeam\GoCardApi\Domain\Repository\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use GoCardTeam\GoCardApi\Domain\Model\v1\CardStatistic;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Repository;

/**
 * @Flow\Scope("singleton")
 */
class CardStatisticRepository extends Repository
{

    /**
     * @param Card $card
     * @param User $user
     * @return CardStatistic[]
     */
    public function findByCardAndUser(Card $card, User $user)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd([
                $query->equals('card', $card->getUid()),
                $query->equals('user', $user->getUid())
            ])
        )->execute()->toArray();
    }

    /**
     * @param Register $register
     * @return CardStatistic[]
     */
    public function findByRegister(Register $register)
    {
        $cardIds = array_map(function($card) {
            /** @var Card $card */
            return $card->getUid();
        }, $register->getCards()->toArray());

        $query = $this->createQuery();
        return $query->matching(
            $query->in('card', $cardIds)
        )->execute()->toArray();
    }

    /**
     * @param Register $register
     * @param User $user
     * @return CardStatistic[]
     */
    public function findByRegisterAndUser(Register $register, User $user)
    {
        $cardIds = array_map(function($card) {
            /** @var Card $card */
            return $card->getUid();
        }, $register->getCards()->toArray());

        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd([
                $query->equals('user', $user->getUid()),
                $query->in('card', $cardIds)
            ])
        )->execute()->toArray();
    }
}