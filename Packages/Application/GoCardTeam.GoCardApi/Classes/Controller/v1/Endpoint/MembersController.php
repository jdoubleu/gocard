<?php

namespace GoCardTeam\GoCardApi\Controller\v1\Endpoint;

use GoCardTeam\GoCardApi\Controller\v1\AbstractApiEndpointController;
use GoCardTeam\GoCardApi\Domain\Model\v1\Member;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MemberRepository;
use GoCardTeam\GoCardApi\Domain\Repository\v1\RegisterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Neos\Error\Messages\Error;
use Neos\Error\Messages\Result;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Persistence\Exception\KnownObjectException;
use Neos\Flow\Property\TypeConverter\PersistentObjectConverter;

/**
 * Members endpoint
 */
class MembersController extends AbstractApiEndpointController
{

    /**
     * @Flow\Inject
     * @var MemberRepository
     */
    protected $memberRepository;

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

        $this->persistenceManager->persistAll();

        $this->view->assign('value', $members);
    }
    
    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeAddMemberToRegisterAction()
    {
        $memberConfiguration = $this->arguments->getArgument('member')->getPropertyMappingConfiguration();
        $memberConfiguration->allowAllProperties()->skipProperties('uid');
        $memberConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $memberConfiguration->forProperty('user')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
        $memberConfiguration->forProperty('register')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
    }

    /**
     * @param Register $register
     * @param Member $member
     */
    public function addMemberToRegisterAction(Register $register, Member $member)
    {
        try {
            $member->setRegister($register);

            $this->memberRepository->add($member);

            $this->persistenceManager->whitelistObject($member);
            $this->persistenceManager->persistAll(true);
        } catch (KnownObjectException $e) {
            $this->throwStatus(409);
        }

        $this->view->assign('value', $member);
    }

    /**
     * Initialize updateMemberSetOfRegister action
     */
    public function initializeUpdateMemberSetOfRegisterAction()
    {
        $membersConfiguration = $this->arguments->getArgument('members')->getPropertyMappingConfiguration();
        $memberConfiguration = $membersConfiguration->forProperty('*');
        $memberConfiguration->allowAllProperties();
        $memberConfiguration->setMapping('id', 'uid');
        $memberConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_MODIFICATION_ALLOWED, true);
        $memberConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $memberConfiguration->forProperty('user')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
        $memberConfiguration->forProperty('register')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
    }

    /**
     * @param Register $register
     * @param ArrayCollection<Member> $members
     */
    public function updateMemberSetOfRegisterAction(Register $register, $members)
    {
        $currentMembers = $register->getMembers();
        $activeMembers = $newMembers = [];

        foreach ($members as $num => $member) {
            /** @var Member $member */
            if ($this->persistenceManager->isNewObject($member)) {
                $member->setRegister($register);
                $this->memberRepository->add($member);
                $currentMembers->add($member);
            } else {
                if ($member->getRegister()->getUid() != $register->getUid()) {
                    $error = new Result();
                    $error->forProperty('members')
                        ->forProperty($num)
                        ->addError(new Error("Cannot move member from one register to another! Please create a new member therefore."));
                    $this->{$this->errorMethodName}($error);
                    return;
                }

                $this->memberRepository->update($member);
            }
            $activeMembers[] = $member->getUid();
        }

        $currentMembers = $currentMembers->filter(function($m) use ($activeMembers) {
            /** @var Member $m */
            if (!in_array($m->getUid(), $activeMembers)) {
                $this->memberRepository->remove($m);
                return false;
            }

            return true;
        });

        $this->persistenceManager->persistAll();

        $this->view->assign('value', array_values($currentMembers->toArray()));
        return;
    }

    /**
     * Initialize dddMembersToRegister action
     */
    public function initializeAddMembersToRegisterAction()
    {
        $membersConfiguration = $this->arguments->getArgument('members')->getPropertyMappingConfiguration();
        $memberConfiguration = $membersConfiguration->forProperty('*');
        $memberConfiguration->allowAllProperties()->skipProperties('uid');
        $memberConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, true);
        $memberConfiguration->forProperty('user')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
        $memberConfiguration->forProperty('register')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
    }

    /**
     * @param Register $register
     * @param ArrayCollection<Member> $members
     */
    public function addMembersToRegisterAction(Register $register, $members)
    {
        foreach ($members as $member) {
            /** @var Member $member */
            $member->setRegister($register);

            $this->memberRepository->add($member);

            $this->persistenceManager->whitelistObject($member);
        }

        $this->persistenceManager->persistAll(true);

        $this->view->assign('value', $members);
    }

    /**
     * Allows property modification for update action.
     * By default it is not allowed to modify a persisted object.
     */
    public function initializeUpdateMemberByRegisterAction()
    {
        $memberConfiguration = $this->arguments->getArgument('member')->getPropertyMappingConfiguration();
        $memberConfiguration->allowAllProperties()->skipProperties('uid');
        $memberConfiguration->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_MODIFICATION_ALLOWED, true);
        $memberConfiguration->forProperty('user')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
        $memberConfiguration->forProperty('register')->setTypeConverterOption(PersistentObjectConverter::class, PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, false);
    }

    /**
     * @param Register $register
     * @param Member $member
     */
    public function updateMemberByRegisterAction(Register $register, Member $member)
    {
        $member->setRegister($register);

        $this->memberRepository->update($member);

        $this->persistenceManager->persistAll();

        $this->view->assign('value', $member);
    }

    /**
     * @param Member $member
     */
    public function deleteMemberOfRegisterAction(Member $member)
    {
        $this->memberRepository->remove($member);
    }

    /**
     * @param Register $register
     * @param User $user
     */
    public function findMemberByRegisterAndUserAction(Register $register, User $user)
    {
        $member = $this->memberRepository->findByRegisterAndUser($register, $user);

        $this->view->assign('value', $member);
    }
}