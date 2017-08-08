<?php

namespace GoCardTeam\GoCardApi\Domain\Service\v1;
use GoCardTeam\GoCardApi\Domain\Model\v1\AccountToken;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\AccountTokenRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\UserRepository;
use GoCardTeam\GoCardApi\Security\v1\AccountRepository;
use GoCardTeam\GoCardApi\Service\v1\LocalAccountService;
use GoCardTeam\GoCardApi\Utility\v1\AuthUtility;
use Neos\Flow\I18n\Translator;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Mvc\Routing\UriBuilder;
use Neos\Flow\Persistence\PersistenceManagerInterface;
use Neos\SwiftMailer\Message;

/**
 * Domain service for password management (e.g. password reset)
 *
 * @Flow\Scope("singleton")
 */
class PasswordManagementService
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
     * @Flow\InjectConfiguration("security.passwordResetToken.lifetime")
     * @var string
     */
    protected $tokenLifetime = 'P1D';

    /**
     * @param string $email
     */
    public function processPasswordResetRequest(string $email)
    {
        $user = $this->userRepository->findOneByEmail($email, false, false);

        $token = $this->addPasswordResetToken($user);

        $this->persistenceManager->persistAll(true);

        $this->sendConfirmationMail($token);
    }

    /**
     * @param User $user
     * @return AccountToken
     */
    public function addPasswordResetToken(User $user)
    {
        $requestToken = new AccountToken();
        $requestToken->setUser($user);
        $requestToken->setType('password_reset');
        $requestToken->setExpireDate((new \DateTime())->add(new \DateInterval('PT' . $this->tokenLifetime . 'S')));
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
            ->uriFor('updatePassword', $confirmArgs, 'v1\Endpoint\Users', 'GoCardTeam.GoCardApi');
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
        return $this->translator->translateById($label, $arguments, $quantity, null, 'Mail/PasswordReset', 'GoCardTeam.GoCardApi');
    }

    /**
     * @param ActionRequest $request
     */
    public function setRequest(ActionRequest $request)
    {
        $this->request = $request;
    }
}