<?php

namespace GoCardTeam\GoCard\Security\Api\v1;

use Neos\Flow\Security\Account;
use \Neos\Flow\Security\AccountRepository as DefaultAccountRepository;
use Neos\Flow\Annotations as Flow;

/**
 * Class AccountRepository
 * Extends the default AccountRepository by methods for AccessToken
 *
 * @package GoCardTeam\GoCard\Security\Api\v1
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
}