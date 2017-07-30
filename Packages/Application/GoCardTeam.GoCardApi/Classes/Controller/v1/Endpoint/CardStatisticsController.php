<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Repository\v1\CardStatisticRepository;
use Neos\Flow\Annotations as Flow;

/**
 * Controller for card statistics endpoint
 */
class CardStatisticsController extends AbstractApiEndpointController
{

    /**
     * @Flow\Inject
     * @var CardStatisticRepository
     */
    protected $cardStatisticRepository;
}