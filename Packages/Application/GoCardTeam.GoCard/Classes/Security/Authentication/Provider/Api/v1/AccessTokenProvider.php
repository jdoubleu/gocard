<?php

namespace GoCardTeam\GoCard\Security\Authentication\Provider\Api\v1;

use GoCardTeam\GoCard\Security\Authentication\Token\Api\v1\AccessToken;
use Neos\Flow\Security\Account;
use Neos\Flow\Security\AccountRepository;
use Neos\Flow\Security\Authentication\Provider\AbstractProvider;
use Neos\Flow\Security\Authentication\TokenInterface;
use Neos\Flow\Security\Context;
use Neos\Flow\Security\Cryptography\HashService;
use Neos\Flow\Security\Exception\UnsupportedAuthenticationTokenException;
use Neos\Flow\Annotations as Flow;

class AccessTokenProvider extends AbstractProvider
{

    /**
     * Default Provider for local account.
     * This will be overwritten by this Provider's `localAccountProviderName` option.
     */
    const LocalAccountProviderName = 'PersistedUsernamePasswordProvider';

    /**
     * @var AccountRepository
     * @Flow\Inject
     */
    protected $accountRepository;

    /**
     * @var HashService
     * @Flow\Inject
     */
    protected $hashService;

    /**
     * @var Context
     * @Flow\Inject
     */
    protected $securityContext;

    /**
     * @var \Neos\Flow\Persistence\PersistenceManagerInterface
     * @Flow\Inject
     */
    protected $persistenceManager;

    /**
     * Returns the classnames of the tokens this provider is responsible for.
     *
     * @return array The classname of the token this provider is responsible for
     */
    public function getTokenClassNames()
    {
        return [AccessToken::class];
    }

    /**
     * Tries to authenticate the given token. Sets isAuthenticated to TRUE if authentication succeeded.
     *
     * @param TokenInterface $authenticationToken The token to be authenticated
     * @return void
     * @throws UnsupportedAuthenticationTokenException
     */
    public function authenticate(TokenInterface $authenticationToken)
    {
        if (!($authenticationToken instanceof AccessToken)) {
            throw new UnsupportedAuthenticationTokenException('This provider cannot authenticate the given token.', 1217339840);
        }

        /** @var Account $accessToken Account representation of this access_token */
        $accessToken = null;
        $credentials = $authenticationToken->getCredentials();
        /** @var Account $account Account representation of the original EmailPassword account */
        $account = null;

        if ($authenticationToken->getAuthenticationStatus() !== TokenInterface::AUTHENTICATION_SUCCESSFUL) {
            $authenticationToken->setAuthenticationStatus(TokenInterface::NO_CREDENTIALS_GIVEN);
        }

        if (!is_array($credentials) || !isset($credentials['access_token'])) {
            return;
        }

        $providerName = $this->name;
        $accountRepository = $this->accountRepository;
        $this->securityContext->withoutAuthorizationChecks(function () use ($credentials, $providerName, $accountRepository, &$accessToken) {
            $accessToken = $accountRepository->findActiveByAccountIdentifierAndAuthenticationProviderName($credentials['access_token'], $providerName);
        });

        $authenticationToken->setAuthenticationStatus(TokenInterface::WRONG_CREDENTIALS);

        if ($accessToken === null) {
            return;
        }

        $account = $accountRepository->findActiveByAccountIdentifierAndAuthenticationProviderName($accessToken->getCredentialsSource(), $this->options['localAccountProviderName'] ?? self::LocalAccountProviderName);

        if($account === null) {
            $accessToken->authenticationAttempted(TokenInterface::WRONG_CREDENTIALS);
            return;
        }

        if ($accessToken->getExpirationDate() > new \DateTime()) {
            $accessToken->authenticationAttempted(TokenInterface::AUTHENTICATION_SUCCESSFUL);
            $authenticationToken->setAuthenticationStatus(TokenInterface::AUTHENTICATION_SUCCESSFUL);
            $authenticationToken->setAccount($account);
        } else {
            $accessToken->authenticationAttempted(TokenInterface::WRONG_CREDENTIALS);
        }
        $this->accountRepository->update($accessToken);
        $this->persistenceManager->whitelistObject($accessToken);
    }
}