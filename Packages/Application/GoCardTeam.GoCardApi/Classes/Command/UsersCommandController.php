<?php

namespace GoCardTeam\GoCardApi\Command;

use Neos\Flow\Annotations as Flow;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use GoCardTeam\GoCardApi\Security\v1\AccountFactory;
use GoCardTeam\GoCardApi\Security\v1\AccountRepository;
use Neos\Flow\Cli\CommandController;

/**
 * Command Controller for managing users
 *
 * @Flow\Scope("singleton")
 */
class UsersCommandController extends CommandController
{

    /**
     * Name of the local account authentication provider
     */
    const LocalAccountAuthenticationProvider = 'LocalAuthenticationProvider';

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
        $account = $this->accountFactory->createAccountWithPassword($email, $password, [], self::LocalAccountAuthenticationProvider);
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