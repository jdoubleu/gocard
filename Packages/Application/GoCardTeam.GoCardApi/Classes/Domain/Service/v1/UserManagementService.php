<?php

namespace GoCardTeam\GoCardApi\Domain\Service\v1;

use GoCardTeam\GoCardApi\Context\UserContext;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\ActivityRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\CardStatisticRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MemberRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use GoCardTeam\GoCardApi\Security\AccountFactory;
use GoCardTeam\GoCardApi\Security\AccountRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\PersistenceManagerInterface;

/**
 * Service for management of users
 *
 * @Flow\Scope("singleton")
 */
class UserManagementService
{

    /**
     * @Flow\Inject
     * @var UserContext
     */
    protected $userContext;

    /**
     * @Flow\Inject
     * @var PersistenceManagerInterface
     */
    protected $persistenceManager;

    /**
     * @Flow\Inject
     * @var AccountRepository
     */
    protected $accountRepository;

    /**
     * @Flow\Inject
     * @var RegisterRepository
     */
    protected $registerRepository;

    /**
     * @Flow\Inject
     * @var MemberRepository
     */
    protected $memberRepository;

    /**
     * @Flow\Inject
     * @var UserRepository
     */
    protected $userRepository;

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
     * @Flow\Inject
     * @var RegisterManagementService
     */
    protected $registerManagement;

    /**
     * @param User $user
     */
    public function deleteUser(User $user)
    {
        $accessToken = $this->accountRepository->findActiveAccessTokenByAccountReferenceAndAuthenticationProviderName($user->getAccount(), AccountFactory::AccessTokenProviderName);
        $statistics = $this->statisticsRepository->findByUser($user);
        $activities = $this->activityRepository->findByUser($user);
        $registers = $this->registerRepository->findAll();  // Should already be filtered by the 'GoCardTeam.GoCardApi:Register.currentUserIsMember' policy

        // Remove entries
        $this->accountRepository->remove($accessToken);
        $this->persistenceManager->whitelistObject($accessToken);

        foreach ($statistics as $statistic) {
            $this->statisticsRepository->remove($statistic);
            $this->persistenceManager->whitelistObject($statistic);
        }

        foreach ($activities as $activity) {
            $this->activityRepository->remove($activity);
            $this->persistenceManager->whitelistObject($activity);
        }

        $this->persistenceManager->persistAll(true);

        foreach ($registers as $register) {
            $this->registerManagement->deleteRegister($register);
        }

        $this->userRepository->remove($user);
        $this->persistenceManager->persistAll();
    }
}