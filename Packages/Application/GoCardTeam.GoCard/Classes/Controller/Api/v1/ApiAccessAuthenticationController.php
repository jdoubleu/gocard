<?php

namespace GoCardTeam\GoCard\Controller\Api\v1;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Http\Response;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Security\Authentication\Controller\AbstractAuthenticationController;
use Neos\Flow\Security\Exception\AuthenticationRequiredException;

/**
 * Class ApiAccessAuthenticationController
 * Controller for authenticating API calls.
 *
 * @package GoCardTeam\GoCard\Controller\Api\v1
 */
class ApiAccessAuthenticationController extends AbstractAuthenticationController
{

    /**
     * Continues the request if there is one, otherwise will throw a 400 status code
     *
     * @param ActionRequest $originalRequest The request that was intercepted by the security framework, NULL if there was none
     * @return string
     */
    protected function onAuthenticationSuccess(ActionRequest $originalRequest = null)
    {
        if($originalRequest !== null) {
            $this->redirectToRequest($originalRequest);
        } else {
            /** @var Response $response */
            $response = $this->controllerContext->getResponse();
            $response->setStatus(400, 'Invalid request');
        }
    }

    /**
     * Send 400 error state according to API definition
     *
     * @param AuthenticationRequiredException|null $exception
     */
    protected function onAuthenticationFailure(AuthenticationRequiredException $exception = null)
    {
        /** @var Response $response */
        $response = $this->controllerContext->getResponse();
        $response->setStatus(401, 'Unauthorized');
    }

    /**
     * Overwrite default error method to not return any output.
     * The error is handled via status code in onAuthenticationFailure method
     *
     * @return string
     */
    protected function errorAction()
    {
        return '';
    }
}