<?php

namespace GoCardTeam\GoCardApi\Domain\Repository\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Member;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Repository;

/**
 * @Flow\Scope("singleton")
 */
class MemberRepository extends Repository
{

    /**
     * @param Register $register
     * @param User $user
     * @return Member|null
     */
    public function findByRegisterAndUser(Register $register, User $user)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd([
                $query->equals('register', $register->getUid()),
                $query->equals('user', $user->getUid())
            ])
        )->execute()->getFirst();
    }
}