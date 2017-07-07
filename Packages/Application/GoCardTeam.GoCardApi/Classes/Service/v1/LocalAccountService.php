<?php

namespace GoCardTeam\GoCardApi\Service\v1;

use GoCardTeam\GoCardApi\Security\v1\AccountFactory;
use GoCardTeam\GoCardApi\Security\v1\AccountRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Security\Account;

/**
 * Special service for managing local accounts
 *
 * @Flow\Scope("singleton")
 */
class LocalAccountService
{

    /**
     * Provider name of local authentication
     */
    const LOCAL_AUTHENTICATION_PROVIDER = 'LocalAuthenticationProvider';

    /**
     * @Flow\Inject
     * @var AccountFactory
     */
    protected $accountFactory;

    /**
     * @Flow\Inject
     * @var AccountRepository
     */
    protected $accountRepository;

    /**
     * Create a new local account.
     * Delegates function call to AccountFactory with some default values.
     *
     * @param string $email email
     * @param string $password password
     * @param array $roleIdentifiers roles
     * @return Account created account object
     */
    public function createNewLocalAccount(string $email, string $password, array $roleIdentifiers = []) : Account
    {
        return $this->accountFactory->createAccountWithPassword($email, $password, $roleIdentifiers, self::LOCAL_AUTHENTICATION_PROVIDER);
    }
}