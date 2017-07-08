<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Context\v1\UserContext;
use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;

use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
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
     * @var UserContext
     */
    protected $userContext;

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
        $registerConfiguration->forProperty('register.owner')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
    }

    /**
     * @param Register $register
     */
    public function addRegisterAction(Register $register)
    {
        try {
            $this->registerRepository->add($register);

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
}