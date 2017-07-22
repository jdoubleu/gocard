<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Repository\v1\ActivityRepository;
use Neos\Flow\Annotations as Flow;

/**
 * Controller for /activities endpoint
 */
class ActivitiesController extends AbstractApiEndpointController
{

    /**
     * @Flow\Inject
     * @var ActivityRepository
     */
    protected $activityRepository;

    /**
     * Get all activities
     */
    public function getActivitiesAction()
    {
       $activities = $this->activityRepository->findAll();

       $this->view->assign('value', $activities->toArray());
    }
}