<?php

namespace GoCardTeam\GoCardApi\Domain\Repository\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use GoCardTeam\GoCardApi\Domain\Model\v1\CardStatistic;
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
}