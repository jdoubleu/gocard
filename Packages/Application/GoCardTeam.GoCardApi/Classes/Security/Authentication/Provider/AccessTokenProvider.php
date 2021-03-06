<?php

namespace GoCardTeam\GoCardApi\Security\Authentication\Provider;

use GoCardTeam\GoCardApi\Security\Authentication\Token\AccessToken;
use GoCardTeam\GoCardApi\Service\LocalAccountService;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Security\Account;
use Neos\Flow\Security\AccountRepository;
use Neos\Flow\Security\Authentication\Provider\AbstractProvider;
use Neos\Flow\Security\Authentication\TokenInterface;
use Neos\Flow\Security\Context;
use Neos\Flow\Security\Cryptography\HashService;
use Neos\Flow\Security\Exception\UnsupportedAuthenticationTokenException;

class AccessTokenProvider extends AbstractProvider
{

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

        $authenticationToken->setAuthenticationStatus(TokenInterface::WRONG_CREDENTIALS);

        $providerName = $this->name;
        $accountRepository = $this->accountRepository;
        $this->securityContext->withoutAuthorizationChecks(function () use ($credentials, $providerName, $accountRepository, &$accessToken) {
            $accessToken = $accountRepository->findActiveByAccountIdentifierAndAuthenticationProviderName($credentials['access_token'], $providerName);
        });

        if ($accessToken === null) {
            return;
        }

        $account = $accountRepository->findActiveByAccountIdentifierAndAuthenticationProviderName($accessToken->getCredentialsSource(), $this->options['localAccountProviderName'] ?? LocalAccountService::LOCAL_AUTHENTICATION_PROVIDER);

        if($account === null) {
            $accessToken->authenticationAttempted(TokenInterface::WRONG_CREDENTIALS);
            return;
        }

        $accessToken->authenticationAttempted(TokenInterface::AUTHENTICATION_SUCCESSFUL);
        $authenticationToken->setAuthenticationStatus(TokenInterface::AUTHENTICATION_SUCCESSFUL);
        $authenticationToken->setAccount($account);
        $this->accountRepository->update($accessToken);
        $this->persistenceManager->whitelistObject($accessToken);
    }
}