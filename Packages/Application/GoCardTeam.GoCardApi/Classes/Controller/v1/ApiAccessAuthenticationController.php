<?php

namespace GoCardTeam\GoCardApi\Controller\v1;

use Neos\Flow\Http\Response;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Security\Exception\AuthenticationRequiredException;

/**
 * Class ApiAccessAuthenticationController
 * Controller for authenticating API calls.
 *
 * @package GoCardTeam\GoCardApi\Controller\Api\v1
 */
class ApiAccessAuthenticationController extends AbstractApiAuthenticationController
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
}