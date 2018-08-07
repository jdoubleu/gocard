<?php

namespace GoCardTeam\GoCardApi\Domain\Repository\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Security\AccountRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\ObjectManagement\Exception\InvalidClassException;
use Neos\Flow\Persistence\Repository;
use Neos\Flow\Security\Account;

/**
 * @Flow\Scope("singleton")
 */
class UserRepository extends Repository
{

    /**
     * @var AccountRepository
     * @Flow\Inject
     */
    protected $accountRepository;

    /**
     * Emits a user which references the given account
     *
     * @param Account $accessToken
     * @return User Referenced user
     * @throws InvalidClassException Thrown if the provided account is not an access token.
     */
    public function findUserByAccessToken(Account $accessToken)
    {
        if($accessToken->getAuthenticationProviderName() != 'AccessTokenAuthenticationProvider') {
            throw new InvalidClassException('The given account does not use the "AccessTokenAuthenticationProvider", but "' . $accessToken->getAuthenticationProviderName() . '"', 1499449842);
        }

        $account = $this->accountRepository->findLocalAccountByAccessToken($accessToken);

        return $this->findOneByAccount($account);
    }

    /**
     * Returns all users which names matches the given name.
     *
     * @param string $name User's names
     * @return User[]
     */
    public function searchUsersByName(string $name)
    {
       $query = $this->createQuery();
       return $query->matching(
            $query->like('displayName', '%' . $name . '%')
       )->execute()->toArray();
    }
}