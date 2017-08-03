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

        $errorResult = self::hydrateValidationResults($this->arguments->getValidationResults());


        $this->view->assign('value', $errorResult);
        return null;
    }

    /**
     * Generates a special validation result response.
     *
     * @see http://redux-form.com/6.0.2/examples/fieldArrays/ for structure of response.
     *
     * @param Result $validationResults
     * @return array|string|null Null if there were no errors, string if there was only one single error or an array with errors of all properties.
     */
    protected static function hydrateValidationResults(Result $validationResults)
    {
        if (!$validationResults->hasErrors()) {
            return null;
        }

        $propertyResults = $validationResults->getSubResults();

        if (empty($propertyResults)) {
            if ($firstError = $validationResults->getFirstError()) {
                return $firstError->getMessage();
            } else {
                return ['_error' => 'Validation failed.'];
            }
        } else {
            $subResults = [];

            // TODO: Handle collections as array of objects
            foreach ($propertyResults as $prop => $propResult) {
                $propResult = self::hydrateValidationResults($propResult);
                if ($propResult !== null) {
                    $subResults[$prop] = $propResult;
                }
            }

            return $subResults;
        }
    }
}