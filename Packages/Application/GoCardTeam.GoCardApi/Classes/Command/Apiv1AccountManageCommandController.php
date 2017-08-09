<?php
namespace GoCardTeam\GoCardApi\Command;

/*
 * This file is part of the GoCardTeam.GoCardApi package.
 */

use GoCardTeam\GoCardApi\Security\v1\AccountFactory;
use GoCardTeam\GoCardApi\Security\v1\AccountRepository;
use GoCardTeam\GoCardApi\Service\v1\LocalAccountService;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Cli\CommandController;
use Neos\Flow\Persistence\QueryResultInterface;
use Neos\Flow\Security\Account;

/**
 * @Flow\Scope("singleton")
 */
class Apiv1AccountManageCommandController extends CommandController
{

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
        $account = $this->accountFactory->createAccountWithPassword($email, $password, $roles, LocalAccountService::LOCAL_AUTHENTICATION_PROVIDER);
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
        $accessToken = $this->accountFactory->obtainAccessTokenForAccount($account);

        $this->accountRepository->add($accessToken);
        $this->outputLine('Successfully created access token for user %s: ', [$account->getAccountIdentifier(), $accessToken->getAccountIdentifier()]);
    }

    /**
     * Lists all local user accounts
     */
    public function listAccountsCommand()
    {
        /** @var QueryResultInterface $accounts */
        $accounts = $this->accountRepository->findByAuthenticationProviderName(LocalAccountService::LOCAL_AUTHENTICATION_PROVIDER);
        $this->generateAccountListOutput($accounts->toArray());
    }

    /**
     * Lists all local user accounts
     */
    public function listAccessTokensCommand()
    {
        /** @var QueryResultInterface $accounts */
        $accounts = $this->accountRepository->findByAuthenticationProviderName(self::AccessTokenAuthenticationprovider);
        $this->generateAccountListOutput($accounts->toArray());
    }

    /**
     * Deletes all expired access tokens from the database
     */
    public function clearExpiredAccessTokensCommand()
    {
        /** @var QueryResultInterface $accounts */
        $accounts = $this->accountRepository->findExpiredAccessTokenByAuthenticationProviderName(self::AccessTokenAuthenticationprovider);
        $this->outputLine("Found %d expired access tokens. Removing them...", [count($accounts)]);
        foreach ($accounts as $account) {
            $this->accountRepository->remove($account);
        }
        $this->outputLine("Successfully removed expired access tokens.");
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
