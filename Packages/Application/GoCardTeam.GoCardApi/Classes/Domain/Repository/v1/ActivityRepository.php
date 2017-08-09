<?php

namespace GoCardTeam\GoCardApi\Domain\Repository\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Activity;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Repository;

/**
 * @Flow\Scope("singleton")
 */
class ActivityRepository extends Repository
{

    /**
     * @param string $eventName
     * @return Activity[]
     */
    public function findByEvent(string $eventName)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->equals('eventType', $eventName)
        )->execute()->toArray();
    }

    /**
     * @param Register $register
     * @return Activity[]
     */
    public function findByRegisterRef(Register $register)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->equals('ref', $register->getUid())
        )->execute()->toArray();
    }
}