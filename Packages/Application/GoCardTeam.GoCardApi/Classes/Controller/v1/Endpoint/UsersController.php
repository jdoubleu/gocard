<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use Neos\Flow\Annotations as Flow;

/**
 * Class UsersController
 * Controller for serving /users endpoint
 *
 * @package GoCardTeam\GoCardApi\Controller\v1\Endpoint
 */
class UsersController extends AbstractApiEndpointController
{

    /**
     * @Flow\Inject
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * @param int $userId
     */
    public function getUserByIdAction(int $userId)
    {
        /** @var User $user */
        $user = $this->userRepository->findOneByUid($userId);
        if ($user === null) {
            $this->throwStatus('User not found');
        }

        $this->view->assign('value', $user);
    }

    /**
     * @param string $email email address
     */
    public function getUserByEmailAction(string $email)
    {
        /** @var User $user */
        $user = $this->userRepository->findOneByEmail($email, false, false);
        if ($user === null) {
            $this->throwStatus('User not found');
        }

        $this->view->assign('value', $user);
    }
}