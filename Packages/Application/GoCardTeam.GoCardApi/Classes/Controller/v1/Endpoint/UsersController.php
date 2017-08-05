<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MemberRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use GoCardTeam\GoCardApi\Security\v1\AccountRepository;
use GoCardTeam\GoCardApi\Service\v1\LocalAccountService;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Exception\KnownObjectException;
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
     * @Flow\Inject
     * @var LocalAccountService
     */
    protected $accountService;

    /**
     * @Flow\Inject
     * @var AccountRepository
     */
    protected $accountRepository;

    /**
     * @Flow\Inject
     * @var MemberRepository
     */
    protected $memberRepository;

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeAddUserAction()
    {
        $userConfiguration = $this->arguments->getArgument('user')->getPropertyMappingConfiguration();
        $userConfiguration->allowAllProperties()->skipProperties('uid', 'accountType');
        $userConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
    }

    /**
     * Creates a new user with a local account
     *
     * @param User $user
     * @param string $password
     */
    public function addUserAction(User $user, string $password)
    {
        $account = $this->accountService->createNewLocalAccount($user->getEmail(), $password);

        try {
            $this->accountRepository->add($account);

            $user->setAccount($account);

            $this->userRepository->add($user);

            $this->persistenceManager->whitelistObject($account);
            $this->persistenceManager->whitelistObject($user);
            $this->persistenceManager->persistAll(true);
        } catch (KnownObjectException | UniqueConstraintViolationException $e) {
            $this->throwStatus(409);
        }

        $this->view->assign('value', $user);
    }

    /**
     * @param int $userId
     */
    public function getUserByIdAction(int $userId)
    {
        /** @var User $user */
        $user = $this->userRepository->findByIdentifier($userId);
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
     * @param string $name User's name
     */
    public function searchUsersByNameAction(string $name)
    {
        $users = $this->userRepository->searchUsersByName(trim('%', $name));

        $this->view->setConfiguration([
            'value' => [
                '_descendAll' => [
                    '_only' => [
                        'id',
                        'displayName'
                    ]
                ]
            ]
        ]);
        $this->view->assign('value', $users);
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

    /**
     * @param User $user
     */
    public function getMembersByUserAction(User $user)
    {
        $members = $this->memberRepository->findByUser($user);
        
        $this->view->assign('value', $members);
    }
}