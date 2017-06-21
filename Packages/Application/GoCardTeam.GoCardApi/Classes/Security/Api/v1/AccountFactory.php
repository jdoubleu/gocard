<?php

namespace GoCardTeam\GoCardApi\Security\Api\v1;

use GoCardTeam\GoCardApi\Utility\Api\v1\AuthUtility;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Security\Account;
use Neos\Flow\Security\AccountFactory as DefaultAccountFactory;

/**
 * Class AccountFactory
 * Extends default account factory to create an AccessToken account
 *
 * @package GoCardTeam\GoCardApi\Security\Api\v1
 *
 * @Flow\Scope("singleton")
 */
class AccountFactory extends DefaultAccountFactory
{

    /**
     * Provider used for AccessTokens
     */
    const AccessTokenProviderName = 'AccessTokenAuthenticationProvider';

    /**
     * Default timeout TimeInterval for AccessTokens
     */
    const AccessTokenExpiration = "PT1H";

    /**
     * @var AccountRepository
     * @Flow\Inject
     */
    protected $accountRepository;

    /**
     * Creates an access_token for the given account if there isn't any existing access token linked to the account, yet.
     * The newly created access_token will be persisted.
     *
     * @param Account $account
     * @return Account
     */
    public function obtainAccessTokenForAccount(Account $account) : Account
    {
        $accessToken = $this->accountRepository->findActiveAccessTokenByAccountReferenceAndAuthenticationProviderName($account, self::AccessTokenProviderName);

        if($accessToken === null) {
            // Create new access token
            $accessToken = new Account();

            // Generate an access token which does not already exist
            do {
                $token = AuthUtility::generateAccessToken();
            } while ($this->accountRepository->findByAccountIdentifierAndAuthenticationProviderName($token, self::AccessTokenProviderName) != null);

            $accessToken->setAccountIdentifier($token);
            $accessToken->setCredentialsSource($account->getAccountIdentifier());
            $accessToken->setAuthenticationProviderName(self::AccessTokenProviderName);
            $accessToken->setExpirationDate((new \DateTime())->add(new \DateInterval(self::AccessTokenExpiration)));

            // Persist access token
            $this->accountRepository->add($accessToken);
        }

        return $accessToken;
    }
}