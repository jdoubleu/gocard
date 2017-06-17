<?php
namespace GoCardTeam\GoCard\Command;

/*
 * This file is part of the GoCardTeam.GoCard package.
 */

use GoCardTeam\GoCard\Security\Api\v1\AccountFactory;
use GoCardTeam\GoCard\Security\Api\v1\AccountRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Cli\CommandController;
use Neos\Flow\Security\Account;

/**
 * @Flow\Scope("singleton")
 */
class Apiv1AccountManageCommandController extends CommandController
{

    /**
     * Name of the local account authentication provider
     */
    const LocalAccountAuthenticationProvider = 'LocalAuthenticationProvider';

    /**
     * Name of the access token authentication provider
     */
    const AccessTokenAuthenticationprovider = 'AccessTokenAuthenticationProvider';

    /**
     * @var AccountRepository
     * @Flow\Inject
     */
    protected $accountRepository;

    /**
     * @var AccountFactory
     * @Flow\Inject
     */
    protected $accountFactory;

    /**
     * Create a local user account
     *
     * @param string $email Email address
     * @param string $password Password
     * @param array $roles Roles the user should have
     */
    public function createAccountCommand(string $email, string $password, array $roles = [])
    {
        $account = $this->accountFactory->createAccountWithPassword($email, $password, $roles, self::LocalAccountAuthenticationProvider);
        $this->accountRepository->add($account);
        $this->outputLine('Successfully created user (%s)', [$account->getAccountIdentifier()]);
    }

    /**
     * Creates an access token for api calls and references this to the given user (identified by email)
     *
     * @param string $email Email address of an existing user
     */
    public function createAccessTokenForEmailCommand(string $email)
    {
        $account = $this->accountRepository->findByIdentifier($email);
        $accessToken = $this->accountFactory->createAccessTokenForAccount($account);

        $this->accountRepository->add($accessToken);
        $this->outputLine('Successfully created access token for user %s: ', [$account->getAccountIdentifier(), $accessToken->getAccountIdentifier()]);
    }

    /**
     * Lists all local user accounts
     */
    public function listAccountsCommand()
    {
        $accounts = $this->accountRepository->findByAuthenticationProviderName(self::LocalAccountAuthenticationProvider);
        $this->generateAccountListOutput($accounts);
    }

    /**
     * Lists all local user accounts
     */
    public function listAccessTokensCommand()
    {
        $accounts = $this->accountRepository->findByAuthenticationProviderName(self::AccessTokenAuthenticationprovider);
        $this->generateAccountListOutput($accounts);
    }

    /**
     * Renders a list of accounts
     *
     * @param Account[] $accounts list of accounts
     */
    private function generateAccountListOutput(array $accounts)
    {
        $this->outputLine('Found %d accounts:', [count($accounts)]);
        $i = 0;
        foreach ($accounts as $account) {
            /** @var Account $account */
            $this->outputLine('%d. %s :: %s :: %s', [++$i, $account->getAccountIdentifier(), $account->getCredentialsSource(), $account->getCreationDate()->format('c')]);
        }
    }

}
