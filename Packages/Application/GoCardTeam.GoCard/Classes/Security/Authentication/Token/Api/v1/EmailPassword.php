<?php

namespace GoCardTeam\GoCard\Security\Authentication\Token\Api\v1;

use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Security\Authentication\Token\UsernamePassword;

/**
 * Class EmailPassword
 * Overwrites the default UsernamePassword token to work correctly with the following aspects:
 * 1. A local GoCard account has an email instead of a username.
 * 2. The API also defines that the email and password needs to be provided directly through the query params.
 *
 * @package GoCardTeam\GoCard\Security\Authentication\Token\Api\v1
 */
class EmailPassword extends UsernamePassword
{

    public function updateCredentials(ActionRequest $actionRequest)
    {
        $httpRequest = $actionRequest->getHttpRequest();
        if ($httpRequest->getMethod() !== 'POST') {
            return;
        }

        $email = $actionRequest->getArgument('email');
        $password = $actionRequest->getArgument('password');

        if (!empty($username) && !empty($password)) {
            $this->credentials['username'] = $email;
            $this->credentials['password'] = $password;
            $this->setAuthenticationStatus(self::AUTHENTICATION_NEEDED);
        }
    }
}