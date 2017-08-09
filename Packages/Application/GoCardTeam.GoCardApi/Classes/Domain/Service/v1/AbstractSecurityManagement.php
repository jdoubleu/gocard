<?php

namespace GoCardTeam\GoCardApi\Domain\Service\v1;

use Neos\Flow\Annotations as Flow;
use GoCardTeam\GoCardApi\Domain\Model\v1\AccountToken;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\AccountTokenRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use GoCardTeam\GoCardApi\Security\v1\AccountRepository;
use GoCardTeam\GoCardApi\Utility\v1\AuthUtility;
use Neos\Flow\I18n\Translator;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Mvc\Routing\UriBuilder;
use Neos\Flow\Persistence\PersistenceManagerInterface;
use Neos\SwiftMailer\Message;

/**
 * Domain service for registration and confirmation logic.
 *
 * @Flow\Scope("singleton")
 */
abstract class AbstractSecurityManagement
{

    /**
     * Needs to be overwritten by subclasses.
     * This property is used by the getTranslation function
     *
     * @var string Path of the translation file
     */
    const TRANSLATION_FILE = NULL;

    /**
     * @var ActionRequest
     */
    protected $request;

    /**
     * @Flow\Inject
     * @var PersistenceManagerInterface
     */
    protected $persistenceManager;

    /**
     * @Flow\Inject
     * @var Translator
     */
    protected $translator;

    /**
     * @Flow\Inject
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * Needs to be overwritten in subclasses
     *
     * @var string
     */
    protected $tokenLifetime = null;

    /**
     * @Flow\Inject
     * @var AccountRepository
     */
    protected $accountRepository;

    /**
     * @Flow\InjectConfiguration("mail")
     * @var array
     */
    protected $mailSettings;

    /**
     * @Flow\Inject
     * @var AccountTokenRepository
     */
    protected $accountTokenRepository;

    /**
     * @Flow\Inject
     * @var UriBuilder
     */
    protected $uriBuilder;

    /**
     * @param User $user
     * @param string $type
     * @return AccountToken
     */
    protected function generateTokenForUser(User $user, string $type)
    {
        $token = new AccountToken();
        $token->setUser($user);
        $token->setType($type);
        $token->setExpireDate((new \DateTime())->add(new \DateInterval('PT' . $this->tokenLifetime . 'S')));
        $token->setToken(AuthUtility::generateAccessToken());

        $this->accountTokenRepository->add($token);

        $this->persistenceManager->whitelistObject($token);

        return $token;
    }

    /**
     * @param AccountToken $token
     */
    protected function sendConfirmationMail(AccountToken $token)
    {
        $user = $token->getUser();

        $mail = new Message($this->getTranslation('mail.subject'));

        $mail
            ->setFrom([$this->mailSettings['from']['address'] => $this->mailSettings['from']['name']])
            ->setTo([$user->getEmail() => $user->getDisplayName()]);

        $mail->setBody($this->getTranslation('mail.body', [$this->generateReferLink($token)]), 'text/plain');

        $mail->send();
    }

    /**
     * @param AccountToken $token
     * @return UriBuilder
     */
    protected function prepareReferLink(AccountToken $token)
    {
        $referArguments = [
            'identifier' => $this->persistenceManager->getIdentifierByObject($token),
            'token' => $token->getToken()
        ];

        $this->uriBuilder->setRequest($this->request);
        $this->uriBuilder->setArguments($referArguments);
        $this->uriBuilder->setCreateAbsoluteUri(true);

        return $this->uriBuilder;
    }

    /**
     * Generates a link to the confirmation action
     *
     * @param AccountToken $token
     * @return string the URI of the confirmation page
     */
    protected abstract function generateReferLink(AccountToken $token): string;

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
        return $this->translator->translateById($label, $arguments, $quantity, null, static::TRANSLATION_FILE, 'GoCardTeam.GoCardApi');
    }

    /**
     * @param ActionRequest $request
     */
    public function setRequest(ActionRequest $request)
    {
        $this->request = $request;
    }
}