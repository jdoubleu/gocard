<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use GoCardTeam\GoCardApi\Domain\Repository\v1\CardRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use Neos\Flow\Annotations as Flow;
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
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_IDENTITY_CREATION_ALLOWED, true);
        $contentConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_OVERRIDE_TARGET_TYPE_ALLOWED, true);
    }

    /**
     * @param Card $card
     */
    public function updateCardAction(Card $card)
    {
        $this->cardRepository->update($card);
    }
}