<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\Card;
use GoCardTeam\GoCardApi\Domain\Model\v1\CardStatistic;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\CardStatisticRepository;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;

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

    /**
     * @param Card $card
     * @param User $user
     */
    public function getCardStatisticByCardAndUserAction(Card $card, User $user)
    {
        $this->view->assign('value', $this->cardStatisticRepository->findByCardAndUser($card, $user));
    }

    /**
     * Prepare create card statistic action
     */
    public function initializeCreateCardStatisticAction()
    {
        $statConfiguration = $this->arguments->getArgument('cardStatistic')->getPropertyMappingConfiguration();
        $statConfiguration->allowAllProperties()->skipProperties('id', 'uid');
        $statConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
    }

    /**
     * @param Card $card
     * @param CardStatistic $cardStatistic
     */
    public function createCardStatisticAction(Card $card, CardStatistic $cardStatistic)
    {
        $cardStatistic->setCard($card);

        $this->cardStatisticRepository->add($cardStatistic);

        $this->persistenceManager->whitelistObject($cardStatistic);
        $this->persistenceManager->persistAll(true);

        $this->view->assign('value', $cardStatistic);
    }

    /**
     * @param Register $register
     * @param User $user
     */
    public function getCardStatisticByRegisterAndUserAction(Register $register, User $user)
    {
        $this->view->assign('value', $this->cardStatisticRepository->findByRegisterAndUser($register, $user));
    }
}