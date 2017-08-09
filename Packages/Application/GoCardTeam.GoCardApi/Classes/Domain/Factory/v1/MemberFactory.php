<?php

namespace GoCardTeam\GoCardApi\Domain\Factory\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Member;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use Neos\Flow\Annotations as Flow;

/**
 * A factory for register members
 *
 * @Flow\Scope("singleton")
 */
class MemberFactory
{

    /**
     * Creates a new Member with the given attributes
     *
     * @param User $user
     * @param Register $register
     * @param string $role
     * @return Member
     */
    public function createMember(User $user, Register $register, string $role) : Member
    {
       $member = new Member();
       $member->setUser($user);
       $member->setRegister($register);
       $member->setRole($role);
       return $member;
    }
}