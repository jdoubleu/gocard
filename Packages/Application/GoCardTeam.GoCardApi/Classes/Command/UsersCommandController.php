<?php

namespace GoCardTeam\GoCardApi\Command;

use GoCardTeam\GoCardApi\Service\LocalAccountService;
use Neos\Flow\Annotations as Flow;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use GoCardTeam\GoCardApi\Security\AccountFactory;
use GoCardTeam\GoCardApi\Security\AccountRepository;
use Neos\Flow\Cli\CommandController;

/**
 * Command Controller for managing users
 *
 * @Flow\Scope("singleton")
 */
class UsersCommandController extends CommandController
{

    /**
     * @var AccountRepository
     * @Flow\Inject
     */
    protected $accountRepository;

    /**
     * @var UserRepository
     * @Flow\Inject
     */
    protected $userRepository;

    /**
     * @var AccountFactory
     * @Flow\Inject
     */
    protected $accountFactory;

    /**
     * Creates a new user with a local account
     *
     * @param string $email email address
     * @param string $password account's password
     * @param string $displayname display name of the user
     * @param string $status user's status
     */
    public function createUserWithLocalAccountCommand(string $email, string $password, string $displayname, string $status = 'active')
    {
        $account = $this->accountFactory->createAccountWithPassword($email, $password, [], LocalAccountService::LOCAL_AUTHENTICATION_PROVIDER);
        $this->accountRepository->add($account);

        $user = new User();
        $user->setAccount($account);
        $user->setDisplayName($displayname);
        $user->setStatus($status);
        $user->setEmail($email);

        $this->userRepository->add($user);

        $this->outputLine('Successfully created user %s (%s).', [$user->getDisplayName(), $user->getEmail()]);
    }
}