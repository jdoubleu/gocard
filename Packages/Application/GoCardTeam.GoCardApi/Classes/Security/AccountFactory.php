<?php

namespace GoCardTeam\GoCardApi\Security;

use GoCardTeam\GoCardApi\Security\AccountRepository;
use GoCardTeam\GoCardApi\Utility\AuthUtility;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Security\Account;
use Neos\Flow\Security\AccountFactory as DefaultAccountFactory;

/**
 * Class AccountFactory
 * Extends default account factory to create an AccessToken account
 *
 * @package GoCardTeam\GoCardApi\Security\v1
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
     * @Flow\InjectConfiguration(path="security.accessToken.lifetime")
     * @var string
     */
    protected $accessTokenLifetime;

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
            $accessToken->setExpirationDate((new \DateTime())->add(new \DateInterval('PT' . $this->accessTokenLifetime . 'S')));

            // Persist access token
            $this->accountRepository->add($accessToken);
        }

        return $accessToken;
    }
}