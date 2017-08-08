<?php

namespace GoCardTeam\GoCardApi\Domain\Service\v1;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use GoCardTeam\GoCardApi\Controller\v1\Endpoint\UsersController;
use GoCardTeam\GoCardApi\Domain\Model\v1\AccountToken;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\AccountTokenRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use GoCardTeam\GoCardApi\Security\v1\AccountRepository;
use GoCardTeam\GoCardApi\Service\v1\LocalAccountService;
use GoCardTeam\GoCardApi\Utility\v1\AuthUtility;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\I18n\Translator;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Mvc\Routing\UriBuilder;
use Neos\Flow\Persistence\Exception\KnownObjectException;
use Neos\Flow\Persistence\PersistenceManagerInterface;
use Neos\SwiftMailer\Message;

/**
 * Domain service for registration and confirmation logic.
 *
 * @Flow\Scope("singleton")
 */
class RegistrationService
{

    /**
     * @Flow\Inject
     * @var PersistenceManagerInterface
     */
    protected $persistenceManager;

    /**
     * @Flow\Inject
     * @var LocalAccountService
     */
    protected $localAccountService;

    /**
     * @Flow\Inject
     * @var AccountRepository
     */
    protected $accountRepository;

    /**
     * @Flow\Inject
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * @Flow\Inject
     * @var AccountTokenRepository
     */
    protected $accountTokenRepository;

    /**
     * @Flow\Inject
     * @var Translator
     */
    protected $translator;

    /**
     * @var ActionRequest
     */
    protected $request;

    /**
     * @Flow\Inject
     * @var UriBuilder
     */
    protected $uriBuilder;

    /**
     * @Flow\InjectConfiguration("mail")
     * @var array
     */
    protected $mailSettings;

    /**
     * @var string
     */
    protected $tokenLifetime = 'PT1H';

    /**
     * @param string $id
     * @param string $token
     * @return bool
     */
    public function confirmRegistrationAndUpdate(string $id, string $token): bool
    {
        /** @var AccountToken $requestToken */
        $requestToken = $this->accountTokenRepository->findByIdentifier($id);
        
        if ($requestToken === null || $requestToken->getToken() != $token) {
            return false;
        }
        
        $user = $requestToken->getUser();
        $user->setStatus('verified');
        
        $this->accountTokenRepository->remove($requestToken);
        $this->userRepository->update($user);
        
        $this->persistenceManager->whitelistObject($requestToken);
        $this->persistenceManager->whitelistObject($user);
        $this->persistenceManager->persistAll(true);
        
        return true;
    }

    /**
     * @param User $user
     * @param string $password
     * @return User
     * @throws KnownObjectException
     * @throws UniqueConstraintViolationException
     */
    public function createNewAccount(User $user, string $password)
    {
        $account = $this->localAccountService->createNewLocalAccount($user->getEmail(), $password);

        $this->accountRepository->add($account);

        $user->setAccount($account);
        $user->setStatus('new');

        $this->userRepository->add($user);

        $this->persistenceManager->whitelistObject($account);
        $this->persistenceManager->whitelistObject($user);

        $registrationRequestToken = $this->addAccountRegistrationRequest($user);
        $this->persistenceManager->persistAll(true);
        $this->sendConfirmationMail($registrationRequestToken);

        return $user;
    }

    /**
     * @param User $user
     * @return AccountToken
     */
    protected function addAccountRegistrationRequest(User $user)
    {
        $requestToken = new AccountToken();
        $requestToken->setUser($user);
        $requestToken->setType('registration');
        $requestToken->setExpireDate((new \DateTime())->add(new \DateInterval($this->tokenLifetime)));
        $requestToken->setToken(AuthUtility::generateAccessToken());

        $this->accountTokenRepository->add($requestToken);

        $this->persistenceManager->whitelistObject($requestToken);

        return $requestToken;
    }

    /**
     * @param AccountToken $requestToken
     */
    protected function sendConfirmationMail(AccountToken $requestToken)
    {
        $user = $requestToken->getUser();

        $mail = new Message($this->getTranslation('mail.subject'));

        $mail
            ->setFrom([$this->mailSettings['from']['address'] => $this->mailSettings['from']['name']])
            ->setTo([$user->getEmail() => $user->getDisplayName()]);

        $mail->setBody($this->getTranslation('mail.body', [$this->generateConfirmationLink($requestToken)]), 'text/plain');

        $mail->send();
    }

    /**
     * Generates a link to the confirmation action
     *
     * @param AccountToken $requestToken
     * @return string the URI of the confirmation page
     */
    protected function generateConfirmationLink(AccountToken $requestToken): string
    {
        $confirmArgs = [
            'identifier' => $this->persistenceManager->getIdentifierByObject($requestToken),
            'token' => $requestToken->getToken()
        ];

        $this->uriBuilder->setRequest($this->request);

        return $this->uriBuilder
            ->setCreateAbsoluteUri(true)
            ->setFormat('json')
            ->uriFor('confirm', $confirmArgs, 'v1\Endpoint\Users', 'GoCardTeam.GoCardApi');
    }

    /**
     * Gets the actual translation of the label.
     * Automatically emits the locale and sets the correct source.
     *
     * @param string $label
     * @param array $arguments
     * @param mixed|null $quantity
     * @return string
     */
    protected function getTranslation(string $label, array $arguments = [], $quantity = null)
    {
        return $this->translator->translateById($label, $arguments, $quantity, null, 'Mail/Registration', 'GoCardTeam.GoCardApi');
    }

    /**
     * @param ActionRequest $request
     */
    public function setRequest(ActionRequest $request)
    {
        $this->request = $request;
    }
}