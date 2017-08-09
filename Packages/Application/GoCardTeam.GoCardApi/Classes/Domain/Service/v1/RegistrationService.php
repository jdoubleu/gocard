<?php

namespace GoCardTeam\GoCardApi\Domain\Service\v1;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use GoCardTeam\GoCardApi\Controller\v1\Endpoint\UsersController;
use GoCardTeam\GoCardApi\Domain\Model\v1\AccountToken;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Service\v1\LocalAccountService;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Exception\KnownObjectException;

/**
 * Domain service for registration and confirmation logic.
 *
 * @Flow\Scope("singleton")
 */
class RegistrationService extends AbstractSecurityManagement
{

    /**
     * translation file
     */
    const TRANSLATION_FILE = 'Mail/Registration';

    /**
     * @Flow\InjectConfiguration("security.registrationToken.lifetime")
     * @var string
     */
    protected $tokenLifetime = null;

    /**
     * @Flow\Inject
     * @var LocalAccountService
     */
    protected $localAccountService;

    /**
     * @param string $id
     * @param string $token
     * @return bool
     */
    public function confirmRegistrationAndUpdate(string $id, string $token): bool
    {
        /** @var AccountToken $requestToken */
        $requestToken = $this->accountTokenRepository->findByIdentifier($id);
        
        if ($requestToken === null
            || $requestToken->getToken() != $token
            || $requestToken->getExpireDate() <= new \DateTime()
        ) {
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

        $registrationRequestToken = $this->generateTokenForUser($user, 'registration');
        $this->persistenceManager->persistAll(true);
        $this->sendConfirmationMail($registrationRequestToken);

        return $user;
    }

    /**
     * @param AccountToken $token
     * @return string
     */
    protected function generateReferLink(AccountToken $token): string
    {
        $uriBuilder = $this->prepareReferLink($token);
        return $uriBuilder
            ->setFormat('json')
            ->uriFor('confirm', $uriBuilder->getArguments(), 'v1\Endpoint\Users', 'GoCardTeam.GoCardApi');
    }
}