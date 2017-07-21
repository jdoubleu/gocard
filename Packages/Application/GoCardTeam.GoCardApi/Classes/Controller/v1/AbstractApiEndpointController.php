<?php

namespace GoCardTeam\GoCardApi\Controller\v1;

use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Flow\Mvc\View\JsonView;

/**
 * Class AbstractApiController
 * Abstract API controller which does some preparation work, sets up
 * everything the api needs.
 *
 * @package GoCardTeam\GoCard\Controller\Api\v1
 */
abstract class AbstractApiEndpointController extends ActionController
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
     * Override type for better IDE support
     * 
     * @var JsonView
     */
    protected $view;

    /**
     * @return string
     */
    protected function errorAction()
    {
        if ($this->arguments->getValidationResults()->hasErrors()) {
            $this->response->setStatus(400);
        }

        return parent::errorAction();
    }
}