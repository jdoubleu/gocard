<?php

namespace GoCardTeam\GoCardApi\Security\Authentication\Token\Api\v1;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Security\Authentication\Token\AbstractToken;
use Neos\Flow\Security\Authentication\Token\SessionlessTokenInterface;

/**
 * Class AccessToken
 * Represents and AccessToken needed for any API access.
 *
 * @package GoCardTeam\GoCardApi\Security\Authentication\Token\Api\v1
 */
class AccessToken extends AbstractToken implements SessionlessTokenInterface
{

    /**
     * The access_token
     * @var array
     * @Flow\Transient
     */
    protected $credentials = ['access_token' => ''];

    /**
     * Updates the authentication credentials, the authentication manager needs to authenticate this token.
     * This could be a username/password from a login controller.
     * This method is called while initializing the security context. By returning TRUE you
     * make sure that the authentication manager will (re-)authenticate the tokens with the current credentials.
     * Note: You should not persist the credentials!
     *
     * @param ActionRequest $actionRequest The current request instance
     * @return boolean TRUE if this token needs to be (re-)authenticated
     */
    public function updateCredentials(ActionRequest $actionRequest)
    {
        $accessToken = $actionRequest->getArgument('access_token');

        if (!empty($accessToken)) {
            $this->credentials['access_token'] = $accessToken;
            $this->setAuthenticationStatus(self::AUTHENTICATION_NEEDED);
        }
    }

    /**
     * Returns a string representation of the token for logging purposes.
     *
     * @return string The access_token
     */
    public function __toString()
    {
        return 'Access Token: "' . $this->credentials['access_token'] . '"';
    }


}