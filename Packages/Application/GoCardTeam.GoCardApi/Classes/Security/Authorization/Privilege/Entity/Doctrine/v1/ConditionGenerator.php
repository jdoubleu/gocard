<?php

namespace GoCardTeam\GoCardApi\Security\Authorization\Privilege\Entity\Doctrine\v1;

use GoCardTeam\GoCardApi\Domain\Security\Authorization\Privilege\Entity\Doctrine\v1\MemberOfRegisterConditionGenerator;
use \Neos\Flow\Security\Authorization\Privilege\Entity\Doctrine\ConditionGenerator as DoctrineConditionGenerator;

class ConditionGenerator extends DoctrineConditionGenerator
{

    /**
     * @param string $user
     * @return MemberOfRegisterConditionGenerator
     */
    public function memberOfRegister($user)
    {
        return new MemberOfRegisterConditionGenerator($user);
    }
}