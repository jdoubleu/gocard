<?php

namespace GoCardTeam\GoCard\Security\Api\v1;

use Neos\Flow\Security\Account;
use \Neos\Flow\Security\AccountFactory as DefaultAccountFactory;
use Neos\Flow\Annotations as Flow;

/**
 * Class AccountFactory
 * Extends default account factory to create an AccessToken account
 *
 * @package GoCardTeam\GoCard\Security\Api\v1
 *
 * @Flow\Scope("singleton")
 */
class AccountFactory extends DefaultAccountFactory
{

    /**
     * Provider used for AccessTokens
     */
    const AccessTokenProviderName = 'AccessTokenProvider';

    /**
     * Default timeout TimeInterval for AccessTokens
     */
    const AccessTokenExpiration = "P1H";

    /**
     * @var AccountRepository
     * @Flow\Inject
     */
    protected $accountRepository;

    /**
     * Creates an access_token for the given account
     * @param Account $account
     * @return Account
     */
    public function createAccessTokenForAccount(Account $account) : Account
    {
        $accessToken = $this->accountRepository->findActiveAccessTokenByAccountReferenceAndAuthenticationProviderName($account, self::AccessTokenProviderName);

        if($accessToken === null) {
            // Create new access token
            $accessToken = new Account();
            $accessToken->setAccountIdentifier(uniqid('', true));
            $accessToken->setCredentialsSource($account->getAccountIdentifier());
            $accessToken->setAuthenticationProviderName(self::AccessTokenProviderName);
            $accessToken->setExpirationDate((new \DateTime())->add(new \DateInterval(self::AccessTokenExpiration)));
        }

        return $accessToken;
    }
}