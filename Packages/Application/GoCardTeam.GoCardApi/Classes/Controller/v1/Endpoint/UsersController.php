<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;

/**
 * Class UsersController
 * Controller for serving /users endpoint
 *
 * @package GoCardTeam\GoCardApi\Controller\v1\Endpoint
 */
class UsersController extends ActionController
{

    /**
     * @Flow\Inject
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * @param int $userId
     * @return User
     */
    public function getUserByIdAction(int $userId)
    {
        /** @var User $user */
        $user = $this->userRepository->findOneByUid($userId);
        if($user === null) {
            $this->throwStatus('User not found');
        }

        return $user;
    }
}