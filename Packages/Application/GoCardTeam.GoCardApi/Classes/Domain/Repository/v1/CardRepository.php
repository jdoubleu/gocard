<?php

namespace GoCardTeam\GoCardApi\Domain\Repository\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Repository;

/**
 * @Flow\Scope("singleton")
 */
class CardRepository extends Repository
{

    /**
     * @param int $registerId register's uid
     * @return Card[]
     */
    public function findByRegister(int $registerId)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->equals('register', $registerId)
        )->execute()->toArray();
    }
}