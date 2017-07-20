<?php

namespace GoCardTeam\GoCardApi\Controller\v1;

use Neos\Error\Messages\Error;
use Neos\Error\Messages\Result;
use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Flow\Mvc\Controller\Argument;
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
     * Generates output for when validation has failed according to the api spec.
     * 
     * @return JsonView
     */
    protected function errorAction()
    {
        $this->handleTargetNotFoundError();
        $this->forwardToReferringRequest();

        if ($this->arguments->getValidationResults()->hasErrors()) {
            $this->response->setStatus(400);
        }

        $errorResult = [
            '_error' => sprintf('Validation failed while trying to call action %s', $this->actionMethodName)
        ];

        foreach ($this->arguments as $name => $argument) {
            /** @var $argument Argument */
            /** @var Result $validationResult */
            $validationResult = $argument->getValidationResults();
            if (!$validationResult->hasErrors()) {
                continue;
            }

            $errorResult[$name] = [];

            foreach ($validationResult->getSubResults() as $propName => $prop) {
                /** @var $prop Result */
                if (!$prop->hasErrors()) {
                    continue;
                }

                $errorResult[$name][$propName] = $prop->getFirstError()->getMessage();
            }
        }

        $this->view->assign('value', $errorResult);
        return null;
    }
}