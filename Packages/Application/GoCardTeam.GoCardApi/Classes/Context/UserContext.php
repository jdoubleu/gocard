<?php

namespace GoCardTeam\GoCardApi\Context;

use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\PersistenceManagerInterface;
use Neos\Flow\Security\Context as SecurityContext;

/**
 * Context which holds information about the current user, e.g. identified by the access.
 *
 * TODO: Implement CacheAwareInterface
 *
 * @Flow\Scope("singleton")
 */
class UserContext
{

    /**
     * @Flow\Inject
     * @var SecurityContext
     */
    protected $securityContext;

    /**
     * @Flow\Inject
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * @Flow\Inject
     * @var PersistenceManagerInterface
     */
    protected $persistenceManager;

    /**
     * Lazy and singleton getter for the current user
     *
     * @return User
     */
    public function getUser()
    {
        $account = $this->securityContext->getAccount();
        return $this->userRepository->findOneByAccount($account);
    }
}