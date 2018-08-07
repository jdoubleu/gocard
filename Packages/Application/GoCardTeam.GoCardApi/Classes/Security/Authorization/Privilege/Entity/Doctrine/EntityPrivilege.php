<?php

namespace GoCardTeam\GoCardApi\Security\Authorization\Privilege\Entity\Doctrine;

use GoCardTeam\GoCardApi\Security\Authorization\Privilege\Entity\Doctrine\ConditionGenerator;
use \Neos\Flow\Security\Authorization\Privilege\Entity\Doctrine\EntityPrivilege as DoctrineEntityPrivilege;
use Neos\Flow\Annotations as Flow;

/**
 * @Flow\Proxy(false)
 */
class EntityPrivilege extends DoctrineEntityPrivilege
{

    protected function getConditionGenerator()
    {
        return new ConditionGenerator();
    }
}