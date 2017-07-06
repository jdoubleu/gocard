<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;

use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use Neos\Flow\Annotations as Flow;

/**
 * Controller for serving the /registers endpoint.
 */
class RegistersController extends AbstractApiEndpointController
{

    /**
     * @Flow\Inject
     * @var RegisterRepository
     */
    protected $registerRepository;
}