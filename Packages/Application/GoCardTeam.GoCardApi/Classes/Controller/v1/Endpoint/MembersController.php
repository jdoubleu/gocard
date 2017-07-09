<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\Member;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MembersRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use Neos\Flow\Annotations as Flow;

/**
 * Members endpoint
 */
class MembersController extends AbstractApiEndpointController
{

    /**
     * @Flow\Inject
     * @var MembersRepository
     */
    protected $membersRepository;

    /**
     * @Flow\Inject
     * @var RegisterRepository
     */
    protected $registerRepository;

    /**
     * @param Register $register
     */
    public function findMembersByRegisterAction(Register $register)
    {
        $members = $register->getMembers();

        $this->view->assign('value', $members->toArray());
    }
}