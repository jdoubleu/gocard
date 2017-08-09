<?php

namespace GoCardTeam\GoCardApi\Controller\v1;

use Neos\Flow\Mvc\View\JsonView;
use Neos\Flow\Security\Authentication\Controller\AbstractAuthenticationController;

/**
 * Class AbstractApiController
 * Abstract API controller which does some preparation work, sets up
 * everything the api needs.
 * This differs from AbstractApiController in that it is meant for authentication controllers.
 *
 * @package GoCardTeam\GoCard\Controller\Api\v1
 */
abstract class AbstractApiAuthenticationController extends AbstractAuthenticationController
{

    /**
     * @var string
     */
    protected $defaultViewObjectName = JsonView::class;

    /**
     * Override default supported types
     * This API consumes 'application/json'
     *
     * @var array
     */
    protected $supportedMediaTypes = ["application/json"];

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