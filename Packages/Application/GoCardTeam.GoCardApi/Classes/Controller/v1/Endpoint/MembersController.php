<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\Member;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MembersRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;

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

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeUpdateMembersOfRegisterAction()
    {
        $membersConfiguration = $this->arguments->getArgument('members')->getPropertyMappingConfiguration();
        $membersConfiguration->allowAllProperties();
        $singleMemberConfiguration = $membersConfiguration->forProperty('*');
        $singleMemberConfiguration->allowAllProperties()->skipProperties('usersUid');
        $singleMemberConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_MODIFICATION_ALLOWED, true);
    }

    /**
     * @param Register $register
     * @param ArrayCollection<Member> $members
     */
    public function updateMembersOfRegisterAction(Register $register, $members)
    {
        $register->setMembers($members);

        $this->registerRepository->update($register);
    }
}