<?php

namespace GoCardTeam\GoCardApi\Security;

use GoCardTeam\GoCardApi\Service\LocalAccountService;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Security\Account;
use Neos\Flow\Security\AccountRepository as DefaultAccountRepository;

/**
 * Class AccountRepository
 * Extends the default AccountRepository by methods for AccessToken
 *
 * @package GoCardTeam\GoCardApi\Security\v1
 *
 * @Flow\Scope("singleton")
 */
class AccountRepository extends DefaultAccountRepository
{

    /**
     * Returns the AccessToken account which references the given account if it's not expired
     *
     * @param Account $account
     * @param string $authenticationProviderName The authentication provider name
     * @return Account|null AccessToken account or null if it's expired or doesn't exist
     */
    public function findActiveAccessTokenByAccountReferenceAndAuthenticationProviderName($account, $authenticationProviderName)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd(
                $query->equals('credentialsSource', $account->getAccountIdentifier()),
                $query->equals('authenticationProviderName', $authenticationProviderName),
                $query->logicalOr(
                    $query->equals('expirationDate', null),
                    $query->greaterThan('expirationDate', new \DateTime())
                )
            )
        )->execute()->getFirst();
    }

    /**
     * Returns all expired AccessToken accounts for given authentication provider
     *
     * @param string $authenticationProviderName The authentication provider name
     * @return Account[]|null AccessToken account or null if there aren't any expired
     */
    public function findExpiredAccessTokenByAuthenticationProviderName($authenticationProviderName)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd([
                $query->equals('authenticationProviderName', $authenticationProviderName),
                $query->lessThanOrEqual('expirationDate', new \DateTime()),
            ])
        )->execute()->toArray();
    }

    /**
     * Looks up a local account referenced by an access token
     *
     * @param Account $accessToken
     * @return Account|null Local account or null
     */
    public function findLocalAccountByAccessToken(Account $accessToken)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd([
                $query->equals('accountIdentifier', $accessToken),
                $query->equals('authenticationProviderName', LocalAccountService::LOCAL_AUTHENTICATION_PROVIDER)
            ])
        )->setLimit(1)->execute()->getFirst();
    }
}