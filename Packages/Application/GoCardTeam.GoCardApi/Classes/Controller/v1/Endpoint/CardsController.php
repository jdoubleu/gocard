<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use Doctrine\Common\Collections\ArrayCollection;
use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Repository\v1\CardRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use GoCardTeam\GoCardApi\Domain\Service\v1\RegisterManagementService;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\ObjectManagement\ObjectManager;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;

/**
 * Cards endpoint
 */
class CardsController extends AbstractApiEndpointController
{

    /**
     * @Flow\Inject
     * @var CardRepository
     */
    protected $cardRepository;

    /**
     * @Flow\Inject
     * @var RegisterRepository
     */
    protected $registerRepository;

    /**
     * @Flow\Inject
     * @var RegisterManagementService
     */
    protected $registerManagement;

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeUpdateCardsAction()
    {
        $cardsConfiguration = $this->arguments->getArgument('cards')->getPropertyMappingConfiguration();
        $cardsConfiguration->allowAllProperties();
        $singleCardConfiguration = $cardsConfiguration->forProperty('*');
        $singleCardConfiguration->allowAllProperties();
        $singleCardConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_MODIFICATION_ALLOWED, true);
        $singleCardConfiguration->forProperty('content')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $contentConfiguration = $singleCardConfiguration->forProperty('content');
        $contentConfiguration->allowAllProperties();
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_IDENTITY_CREATION_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_OVERRIDE_TARGET_TYPE_ALLOWED, true);
        $contentConfiguration->setMapping('correct', 'correctAnswer')->setMapping('answer', 'correctAnswer')->setMapping('corrects', 'correctAnswers');
    }

    /**
     * @param ArrayCollection<Card> $cards
     */
    public function updateCardsAction($cards)
    {
        foreach ($cards as $card) {
            $this->cardRepository->update($card);
        }

        $this->persistenceManager->persistAll();

        $this->view->assign('value', $cards);
    }

    /**
     * @param Card $card
     */
    public function getCardAction(Card $card)
    {
        $this->view->assign('value', $card);
    }

    /**
     * Initialize action
     */
    public function initializeUpdateCardAction()
    {
        $cardConfiguration = $this->arguments->getArgument('card')->getPropertyMappingConfiguration();
        $cardConfiguration->allowAllProperties()->skipProperties('uid');
        $cardConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_MODIFICATION_ALLOWED, true);
        $contentConfiguration = $cardConfiguration->forProperty('content');
        $contentConfiguration->allowAllProperties();
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_IDENTITY_CREATION_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_OVERRIDE_TARGET_TYPE_ALLOWED, true);
        $contentConfiguration->setMapping('correct', 'correctAnswer')->setMapping('answer', 'correctAnswer')->setMapping('corrects', 'correctAnswers');
    }

    /**
     * @param Card $card
     */
    public function updateCardAction(Card $card)
    {
        $this->cardRepository->update($card);

        $this->persistenceManager->persistAll();

        $this->view->assign('value', $card);
    }

    /**
     * @param Card $card
     */
    public function deleteCardAction(Card $card)
    {
        $this->registerManagement->deleteCard($card);
    }

    /**
     * @param Register $register
     */
    public function findCardsByRegisterAction(Register $register)
    {
        $cards = $this->cardRepository->findByRegister($register->getUid());

        $this->view->assign('value', $cards);
    }

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeAddCardsToRegisterAction()
    {
        $cardsConfiguration = $this->arguments->getArgument('cards')->getPropertyMappingConfiguration();
        $cardsConfiguration->allowAllProperties();
        $singleCardConfiguration = $cardsConfiguration->forProperty('*');
        $singleCardConfiguration->allowAllProperties()->skipProperties('uid', 'id', 'register');
        $singleCardConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $singleCardConfiguration->forProperty('content')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $contentConfiguration = $singleCardConfiguration->forProperty('content');
        $contentConfiguration->allowAllProperties();
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_IDENTITY_CREATION_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_OVERRIDE_TARGET_TYPE_ALLOWED, true);
        $contentConfiguration->setMapping('correct', 'correctAnswer')->setMapping('answer', 'correctAnswer')->setMapping('corrects', 'correctAnswers');
    }

    /**
     * @param Register $register
     * @param ArrayCollection<Card> $cards
     */
    public function addCardsToRegisterAction(Register $register, $cards)
    {
        foreach ($cards as $card) {
            /** @var Card $card */
            $card->setRegister($register);

            $this->cardRepository->add($card);

            $this->persistenceManager->whitelistObject($card);
        }

        $this->persistenceManager->persistAll(true);

        $this->view->assign('value', $cards);
    }

    /**
     * Initialize addCardToRegister action
     */
    public function initializeAddCardToRegisterAction()
    {
        $cardConfiguration = $this->arguments->getArgument('card')->getPropertyMappingConfiguration();
        $cardConfiguration->allowAllProperties()->skipProperties('uid', 'id', 'register');
        $cardConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $cardConfiguration->forProperty('content')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $contentConfiguration = $cardConfiguration->forProperty('content');
        $contentConfiguration->allowAllProperties();
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_IDENTITY_CREATION_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_OVERRIDE_TARGET_TYPE_ALLOWED, true);
        $contentConfiguration->setMapping('correct', 'correctAnswer')->setMapping('answer', 'correctAnswer')->setMapping('corrects', 'correctAnswers');
    }

    /**
     * @param Register $register
     * @param Card $card
     */
    public function addCardToRegisterAction(Register $register, Card $card)
    {
        $card->setRegister($register);

        $this->cardRepository->add($card);

        $this->persistenceManager->whitelistObject($card);
        $this->persistenceManager->persistAll(true);

        $this->view->assign('value', $card);
    }

    /**
     * Configure addCard request
     */
    public function initializeAddCardAction()
    {
        $cardConfiguration = $this->arguments->getArgument('card')->getPropertyMappingConfiguration();
        $cardConfiguration->allowAllProperties()->skipProperties('uid');
        $cardConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $contentConfiguration = $cardConfiguration->forProperty('content');
        $contentConfiguration->allowAllProperties();
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_IDENTITY_CREATION_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_OVERRIDE_TARGET_TYPE_ALLOWED, true);
        $contentConfiguration->setMapping('correct', 'correctAnswer')->setMapping('answer', 'correctAnswer')->setMapping('corrects', 'correctAnswers');
    }

    /**
     * @param Card $card
     */
    public function addCardAction(Card $card)
    {
        $this->cardRepository->add($card);

        $this->persistenceManager->whitelistObject($card);
        $this->persistenceManager->persistAll(true);

        $this->view->assign('value', $card);
    }
}