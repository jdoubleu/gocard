<?php

namespace GoCardTeam\GoCardApi\Context\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use Neos\Cache\CacheAwareInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\PersistenceManagerInterface;
use Neos\Flow\Security\Context as SecurityContext;

/**
 * Context which holds information about the current user, e.g. identified by the access.
 *
 * @Flow\Scope("singleton")
 */
class UserContext implements CacheAwareInterface
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
     * A reference to the current user
     *
     * @var User
     */
    protected $currentUser;

    /**
     * Lazy and singleton getter for the current user
     *
     * @return User
     */
    public function getCurrentUser()
    {
        if ($this->currentUser === null) {
            $this->currentUser = $this->userRepository->findOneByAccount($this->securityContext->getAccount());
        }
        return $this->currentUser;
    }

    /**
     * Returns a string which distinctly identifies this object and thus can be used as an identifier for cache entries
     * related to this object.
     *
     * @return string
     */
    public function getCacheEntryIdentifier()
    {
        return $this->persistenceManager->getIdentifierByObject($this->getCurrentUser());
    }
}