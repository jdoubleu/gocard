<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use GoCardTeam\GoCardApi\Domain\Repository\v1\CardRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use GoCardTeam\GoCardApi\Property\TypeConverter\v1\CardContentConverter;
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
     * @var ObjectManager
     */
    protected $objectManager;

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeUpdateCardsAction()
    {
        $cardsConfiguration = $this->arguments->getArgument('cards')->getPropertyMappingConfiguration();
        $cardsConfiguration->allowAllProperties();
        $singleCardConfiguration = $cardsConfiguration->forProperty('*');
        $singleCardConfiguration->allowAllProperties()->skipProperties('uid');
        $singleCardConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_MODIFICATION_ALLOWED, true);
        $singleCardConfiguration->forProperty('content')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $contentConfiguration = $singleCardConfiguration->forProperty('content');
        $contentConfiguration->allowAllProperties();
        $contentConfiguration->setTypeConverter($this->objectManager->get(CardContentConverter::class));
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_IDENTITY_CREATION_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_OVERRIDE_TARGET_TYPE_ALLOWED, true);
    }

    /**
     * @param ArrayCollection<Card> $cards
     */
    public function updateCardsAction($cards)
    {
        foreach ($cards as $card) {
            $this->cardRepository->update($card);
        }
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
        $contentConfiguration->setTypeConverter($this->objectManager->get(CardContentConverter::class));
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_IDENTITY_CREATION_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_OVERRIDE_TARGET_TYPE_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(CardContentConverter::class, CardContentConverter::CONFIGURATION_SOURCE_TARGET_PROPERTY_NAME_MAPPING, [
            Card\SingleChoice::class => [
                'correctAnswer' => 'correct'
            ],
            Card\MultipleChoice::class => [
                'correctAnswers' => 'correct'
            ],
            Card\TextInput::class => [
                'correctAnswer' => 'correct'
            ]
        ]);
    }

    /**
     * @param Card $card
     */
    public function updateCardAction(Card $card)
    {
        $this->cardRepository->update($card);
    }

    /**
     * @param Card $card
     */
    public function deleteCardAction(Card $card)
    {
        $this->cardRepository->remove($card);
    }
}