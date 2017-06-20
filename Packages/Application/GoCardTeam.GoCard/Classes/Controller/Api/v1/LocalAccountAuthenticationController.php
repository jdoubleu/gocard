<?php

namespace GoCardTeam\GoCard\Controller\Api\v1;

use GoCardTeam\GoCard\Security\Api\v1\AccountFactory;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Http\Response;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Mvc\View\JsonView;
use Neos\Flow\Security\Account;
use Neos\Flow\Security\Authentication\Controller\AbstractAuthenticationController;
use Neos\Flow\Security\Exception\AuthenticationRequiredException;

class LocalAccountAuthenticationController extends AbstractAuthenticationController
{

    /**
     * @var string
     */
    protected $defaultViewObjectName = JsonView::class;

    /**
     * @var AccountFactory
     * @Flow\Inject
     */
    protected $accountFactory;

    /**
     * Override default supported types
     * This API consumes application/json
     *
     * @var array
     */
    protected $supportedMediaTypes = ["application/json"];

    /**
     * Returns an access_token for api request with a 200 status
     *
     * @param ActionRequest $originalRequest
     * @return string
     */
    protected function onAuthenticationSuccess(ActionRequest $originalRequest = null)
    {
        /** @var Account $account Logged in account */
        $account = $this->authenticationManager->getSecurityContext()->getAccount();
        $accessToken = $this->accountFactory->createAccessTokenForAccount($account);

        /** @var Response $response */
        $response = $this->controllerContext->getResponse();
        $response->setStatus(200, 'Successfully logged in');
        $response->setHeader('X-Rate-Limit', '-1', true);
        $response->setHeader('X-Expires-After', $accessToken->getExpirationDate(), true);
        return $accessToken->getAccountIdentifier();
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
        $response->setStatus(400, 'Invalid email/password supplied');
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