<?php

namespace GoCardTeam\GoCardApi\Security\Authentication\Token;

use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Mvc\Exception\NoSuchArgumentException;
use Neos\Flow\Security\Authentication\Token\SessionlessTokenInterface;
use Neos\Flow\Security\Authentication\Token\UsernamePassword;

/**
 * Class EmailPassword
 * Overwrites the default UsernamePassword token to work correctly with the following aspects:
 * 1. A local GoCard account has an email instead of a username.
 * 2. The API also defines that the email and password needs to be provided directly through the query params.
 *
 * @package GoCardTeam\GoCardApi\Security\Authentication\Token\v1
 */
class EmailPassword extends UsernamePassword implements SessionlessTokenInterface
{

    public function updateCredentials(ActionRequest $actionRequest)
    {
        $httpRequest = $actionRequest->getHttpRequest();
        if ($httpRequest->getMethod() !== 'POST') {
            return;
        }

        try {
            $email = $actionRequest->getArgument('email');
            $password = $actionRequest->getArgument('password');
        } catch (NoSuchArgumentException $e) {
            $this->setAuthenticationStatus(self::NO_CREDENTIALS_GIVEN);
            return;
        }

        if (!empty($email) && !empty($password)) {
            $this->credentials['username'] = $email;
            $this->credentials['password'] = $password;
            $this->setAuthenticationStatus(self::AUTHENTICATION_NEEDED);
        }
    }
}