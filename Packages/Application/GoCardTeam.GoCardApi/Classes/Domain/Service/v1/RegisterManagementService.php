<?php

namespace GoCardTeam\GoCardApi\Domain\Service\v1;

use GoCardTeam\GoCardApi\Context\v1\MemberContext;
use GoCardTeam\GoCardApi\Context\v1\UserContext;
use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use GoCardTeam\GoCardApi\Domain\Model\v1\Member;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Repository\v1\ActivityRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\CardRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\CardStatisticRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MemberRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\PersistenceManagerInterface;

/**
 * A service for register management
 *
 * @Flow\Scope("singleton")
 */
class RegisterManagementService
{

    /**
     * Member roles with the weight
     * Used for comparison
     */
    const MEMBER_ROLES = [
        'subscriber' => 0,
        'editor' => 1,
        'owner' => 2
    ];

    /**
     * @Flow\Inject
     * @var UserContext
     */
    protected $userContext;

    /**
     * @Flow\Inject
     * @var MemberContext
     */
    protected $memberContext;

    /**
     * @Flow\Inject
     * @var PersistenceManagerInterface
     */
    protected $persistenceManager;

    /**
     * @Flow\Inject
     * @var RegisterRepository
     */
    protected $registerRepository;

    /**
     * @Flow\Inject
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * @Flow\Inject
     * @var MemberRepository
     */
    protected $memberRepository;

    /**
     * @Flow\Inject
     * @var CardRepository
     */
    protected $cardRepository;

    /**
     * @Flow\Inject
     * @var CardStatisticRepository
     */
    protected $statisticsRepository;

    /**
     * @Flow\Inject
     * @var ActivityRepository
     */
    protected $activityRepository;

    /**
     * Deletes a register and resolves all members
     *
     * @param Register $register
     */
    public function deleteRegister(Register $register)
    {

        $members = $register->getMembers();

        if ($members->count() == 1) {
            $this->deleteRegisterCascade($register);
            return;
        }

        $allUserMembers = $this->memberContext->getMembers();
        $regardingMembers = array_diff($allUserMembers, $members->toArray());
        $owners = array_filter($regardingMembers, function($member) {
           /** @var $member Member */
           return $member->getRole() == 'owner';
        });

        if (count($owners) == 0) {
            $newOwner = $this->emitNextOwner($regardingMembers);
            $this->memberRepository->update($newOwner);
            $this->persistenceManager->whitelistObject($newOwner);
        }

        $userMemberInCurrentRegister = $this->memberRepository->findByRegisterAndUser($register, $this->userContext->getUser());
        if ($userMemberInCurrentRegister === null) {
            // TODO: Handle error
            return;
        }

        $this->memberRepository->remove($userMemberInCurrentRegister);
        $this->persistenceManager->whitelistObject($userMemberInCurrentRegister);

        $this->persistenceManager->persistAll(true);
    }

    /**
     * @param Card $card
     */
    public function deleteCard(Card $card)
    {
        $statistics = $this->statisticsRepository->findByCard($card);

        foreach ($statistics as $statistic) {
            $this->statisticsRepository->remove($statistic);
            $this->persistenceManager->whitelistObject($statistic);
        }

        $this->persistenceManager->persistAll(true);

        $this->cardRepository->remove($card);
        $this->persistenceManager->persistAll();
    }

    /**
     * @param Member[] $members
     * @return Member
     */
    protected function emitNextOwner(array $members): Member
    {
        $lastHighestMember = array_shift($members);

        foreach ($members as $member) {
            if (static::compareMemberRoles($lastHighestMember->getRole(), $member->getRole())) {
                $lastHighestMember = $member;
            }
        }

        $lastHighestMember->setRole('owner');

        return $lastHighestMember;
    }

    /**
     * @param Register $register
     */
    protected function deleteRegisterCascade(Register $register)
    {
        // $members = $register->getMembers();
        // $cards = $register->getCards();
        $statistics = $this->statisticsRepository->findByRegister($register);
        $activities = $this->activityRepository->findByRegisterRef($register);

        foreach ($activities as $activity) {
            $this->activityRepository->remove($activity);
            $this->persistenceManager->whitelistObject($activity);
        }

        foreach ($statistics as $statistic) {
            $this->statisticsRepository->remove($statistic);
            $this->persistenceManager->whitelistObject($statistic);
        }

        // Persist here to prevent constraint errors
        $this->persistenceManager->persistAll(true);

        // Actually remove register
        $this->registerRepository->remove($register);
        $this->persistenceManager->persistAll();
    }

    /**
     * Compares the first role with the second.
     *
     * @param $role1
     * @param $role2
     * @return bool TRUE if the second role is higher, than the first, otherwise false
     */
    protected static function compareMemberRoles($role1, $role2): bool
    {
        return (self::MEMBER_ROLES[$role1] - self::MEMBER_ROLES[$role2]) < 0;
    }
}