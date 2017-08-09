<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MemberRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use GoCardTeam\GoCardApi\Domain\Service\v1\PasswordManagementService;
use GoCardTeam\GoCardApi\Domain\Service\v1\RegistrationService;
use GoCardTeam\GoCardApi\Security\v1\AccountRepository;
use GoCardTeam\GoCardApi\Service\v1\LocalAccountService;
use Neos\Error\Messages\Error;
use Neos\Error\Messages\Result;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Exception\KnownObjectException;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;
use Neos\Flow\Validation\Validator\EmailAddressValidator;

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
     * @Flow\Inject
     * @var RegistrationService
     */
    protected $registrationService;

    /**
     * @Flow\Inject
     * @var PasswordManagementService
     */
    protected $passwordManagementService;

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeAddUserAction()
    {
        $userConfiguration = $this->arguments->getArgument('user')->getPropertyMappingConfiguration();
        $userConfiguration->allowAllProperties()->skipProperties('uid', 'accountType');
        $userConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $this->registrationService->setRequest($this->request);
    }

    /**
     * Creates a new user with a local account
     *
     * @param User $user
     * @param string $password
     */
    public function addUserAction(User $user, string $password)
    {
        try {
            $user = $this->registrationService->createNewAccount($user, $password);
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
        $users = $this->userRepository->searchUsersByName(trim($name, '%'));

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

        $this->persistenceManager->persistAll();

        $this->view->assign('value', $user);
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

    /**
     * Prepare registration service for confirm action
     */
    public function initializeConfirmAction()
    {
        $this->registrationService->setRequest($this->request);
    }

    /**
     * @param string $identifier
     * @param string $token
     */
    public function confirmAction(string $identifier, string $token)
    {
        if ($this->registrationService->confirmRegistrationAndUpdate($identifier, $token)) {
            $status = 'success';
        } else {
            $status = 'error';
        }

        $this->forward('index', 'Standard', null, ['confirmation' => $status]);
    }

    /**
     * Prepare password reset request
     */
    public function initializeRequestPasswordResetAction()
    {
        $this->passwordManagementService->setRequest($this->request);
    }

    /**
     * @param string $email
     * @return string
     */
    public function requestPasswordResetAction(string $email)
    {
        $emailValidator = new EmailAddressValidator();
        if (($result = $emailValidator->validate($email)) && $result->hasErrors()) {
            return $this->{$this->errorMethodName}($result);
        }

        if (!$this->passwordManagementService->processPasswordResetRequest($email)) {
            $this->throwStatus(500);
        }

        return null;
    }

    /**
     * Prepare password change action
     */
    public function initializeUpdatePasswordAction()
    {
        $this->passwordManagementService->setRequest($this->request);
    }

    /**
     * @Flow\Validate(argumentName="oldPassword", type="NotEmpty")
     * @Flow\Validate(argumentName="newPassword", type="NotEmpty")
     * @Flow\Validate(argumentName="newPasswordRepeated", type="NotEmpty")
     *
     * @param string $identifier
     * @param string $token
     * @param string $oldPassword
     * @param string $newPassword
     * @param string $newPasswordRepeated
     * @return null
     */
    public function updatePasswordAction(string $identifier, string $token, string $oldPassword, string $newPassword, string $newPasswordRepeated)
    {
        $result = new Result();

        if ($newPasswordRepeated !== $newPassword) {
            $result->forProperty('newPassword')->addError(new Error('The passwords do not match. Please make sure \'newPassword\' and \'newPasswordRepeated\' are equal.'));
            return $this->{$this->errorMethodName}($result);
        }

        $result->merge($this->passwordManagementService->processPasswordReset($identifier, $token, $oldPassword, $newPassword, $newPasswordRepeated));
        if ($result->hasErrors()) {
            return $this->{$this->errorMethodName}($result);
        }

        return null;
    }
}