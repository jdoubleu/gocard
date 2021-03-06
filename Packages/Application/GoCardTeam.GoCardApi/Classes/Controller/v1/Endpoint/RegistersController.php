<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Context\UserContext;
use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;

use GoCardTeam\GoCardApi\Domain\Factory\v1\MemberFactory;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MemberRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use GoCardTeam\GoCardApi\Domain\Service\v1\RegisterManagementService;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Exception\KnownObjectException;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;

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

    /**
     * @Flow\Inject
     * @var MemberRepository
     */
    protected $memberRepository;

    /**
     * @Flow\Inject
     * @var MemberFactory
     */
    protected $memberFactory;

    /**
     * @Flow\Inject
     * @var UserContext
     */
    protected $userContext;

    /**
     * @Flow\Inject
     * @var RegisterManagementService
     */
    protected $registerManagement;

    /**
     * Retrieves all registers
     */
    public function findAllRegistersAction()
    {
        $registers = $this->registerRepository->findAll();

        $this->view->assign('value', $registers);
        $this->view->setConfiguration([
            'value' => [
                '_descendAll' => [
                    '_descend' => ['crdate' => []]
                ]
            ]
        ]);
    }

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeAddRegisterAction()
    {
        $registerConfiguration = $this->arguments->getArgument('register')->getPropertyMappingConfiguration();
        $registerConfiguration->allowAllProperties()->skipProperties('uid');
        $registerConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $registerConfiguration->forProperty('owner')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
    }

    /**
     * @param Register $register
     */
    public function addRegisterAction(Register $register)
    {
        try {
            $this->registerRepository->add($register);

            $member = $this->memberFactory->createMember($this->userContext->getUser(), $register, 'owner');
            $this->memberRepository->add($member);

            $this->persistenceManager->whitelistObject($member);
            $this->persistenceManager->whitelistObject($register);
            $this->persistenceManager->persistAll(true);
        } catch (KnownObjectException $e) {
            $this->throwStatus(409);
        }

        $this->view->assign('value', $register);
        $this->view->setConfiguration([
            'value' => [
                '_descend' => ['crdate' => []]
            ]
        ]);
    }

    /**
     * @param int $registerId
     */
    public function findRegisterByIdAction(int $registerId)
    {
        /** @var Register $register */
        $register = $this->registerRepository->findByIdentifier($registerId);
        if ($register === null) {
            $this->throwStatus(404, 'Register not found');
        }

        $this->view->assign('value', $register);
        $this->view->setConfiguration([
            'value' => [
                '_descend' => ['crdate' => []]
            ]
        ]);
    }

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeUpdateRegisterAction()
    {
        $userConfiguration = $this->arguments->getArgument('register')->getPropertyMappingConfiguration();
        $userConfiguration->allowAllProperties()->skipProperties('uid', 'crdate');
        $userConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_MODIFICATION_ALLOWED, true);
    }

    /**
     * Updates the given register
     *
     * @param Register $register
     */
    public function updateRegisterAction(Register $register)
    {
        $this->registerRepository->update($register);

        $this->persistenceManager->persistAll();

        $this->view->assign('value', $register);
    }

    /**
     * Deletes a register
     *
     * @param Register $register
     */
    public function deleteRegisterAction(Register $register)
    {
        $this->registerManagement->deleteRegister($register);
    }
}