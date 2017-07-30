<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\CardStatistic;
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

    /**
     * @param CardStatistic $cardStatistic
     */
    public function getCardStatisticByIdAction(CardStatistic $cardStatistic)
    {
        $this->view->assign('value', $cardStatistic);
    }
}