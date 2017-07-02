<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;

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
            $this->throwStatus(404, 'User not found');
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
            $this->throwStatus(404, 'User not found');
        }

        $this->view->assign('value', $user);
    }

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeUpdateUserAction()
    {
        $userConfiguration = $this->arguments->getArgument('user')->getPropertyMappingConfiguration();
        $userConfiguration->allowAllProperties()->skipProperties('uid', 'accountType');
        $userConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_MODIFICATION_ALLOWED, true);

    }

    /**
     * Updates the given user
     *
     * @param User $user updated user data from body
     */
    public function updateUserAction(User $user)
    {
        $this->userRepository->update($user);
    }

    /**
     * Deletes a user
     *
     * @param User $user user to be deleted
     */
    public function deleteUserAction(User $user)
    {
        $this->userRepository->remove($user);
    }
}