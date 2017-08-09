<?php

namespace GoCardTeam\GoCardApi\Domain\Service\v1;

use Neos\Error\Messages\Error;
use Neos\Error\Messages\Result;
use Neos\Flow\Annotations as Flow;
use GoCardTeam\GoCardApi\Domain\Model\v1\AccountToken;
use Neos\Flow\Security\Cryptography\HashService;

/**
 * Domain service for password management (e.g. password reset)
 *
 * @Flow\Scope("singleton")
 */
class PasswordManagementService extends AbstractSecurityManagement
{

    /**
     * translation file
     */
    const TRANSLATION_FILE = 'Mail/PasswordReset';

    /**
     * @Flow\InjectConfiguration("security.passwordResetToken.lifetime")
     * @var string
     */
    protected $tokenLifetime = null;

    /**
     * @Flow\Inject
     * @var HashService
     */
    protected $hashService;

    /**
     * @param string $id
     * @param string $token
     * @param string $oldPassword
     * @param string $newPassword
     * @param string $newPasswordRepeated
     * @return Result
     */
    public function processPasswordReset(string $id, string $token, string $oldPassword, string $newPassword, string $newPasswordRepeated)
    {
        $result = new Result();

        /** @var AccountToken $requestToken */
        $requestToken = $this->accountTokenRepository->findByIdentifier($id);

        if ($requestToken === null
            || $requestToken->getToken() != $token
            || $requestToken->getExpireDate() <= new \DateTime()
        ) {
            $result->forProperty('token')->addError(new Error('The token does not exist or might be expired.'));
            return $result;
        }

        $account = $requestToken->getUser()->getAccount();

        if ($account === null) {
            $this->hashService->validatePassword($oldPassword, 'bcrypt=>$2a$14$DummySaltToPreventTim,.ingAttacksOnThisProvider');
            $result->forProperty('token')->getErrors(new Error('Wrong token supplied'));
            return $result;
        }

        if (!$this->hashService->validatePassword($oldPassword, $account->getCredentialsSource())) {
            $result->forProperty('oldPassword')->addError(new Error('The password does not match!'));
            return $result;
        }

        if ($newPassword != $newPasswordRepeated) {
            $result->forProperty('newPassword')->addError(new Error('The passwords do not match. Please make sure \'newPassword\' and \'newPasswordRepeated\' are equal.'));
            return $result;
        }

        $account->setCredentialsSource($this->hashService->hashPassword($newPasswordRepeated));

        $this->accountRepository->update($account);
        $this->accountTokenRepository->remove($requestToken);

        $this->persistenceManager->whitelistObject($account);
        $this->persistenceManager->whitelistObject($requestToken);
        $this->persistenceManager->persistAll(true);

        return $result;
    }

    /**
     * @param string $email
     * @return bool
     */
    public function processPasswordResetRequest(string $email)
    {
        $user = $this->userRepository->findOneByEmail($email, false, false);

        if ($user === null) {
            return false;
        }

        $token = $this->generateTokenForUser($user, 'password_reset');

        $this->persistenceManager->persistAll(true);

        $this->sendConfirmationMail($token);

        return true;
    }

    /**
     * Generates a link to the confirmation action
     *
     * @param AccountToken $token
     * @return string the URI of the confirmation page
     */
    protected function generateReferLink(AccountToken $token): string
    {
        $uriBuilder = $this->prepareReferLink($token);
        return $uriBuilder
            ->setFormat('html')
            ->uriFor('index', $uriBuilder->getArguments(), 'Standard', 'GoCardTeam.GoCardApi');
    }
}