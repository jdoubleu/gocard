<?php

namespace GoCardTeam\GoCardApi\Domain\Security\Authorization\Privilege\Entity\Doctrine\v1;

use Doctrine\Common\Persistence\Mapping\ClassMetadata;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\QuoteStrategy;
use Doctrine\ORM\Query\Filter\SQLFilter as DoctrineSqlFilter;
use GoCardTeam\GoCardApi\Domain\Model\v1\Member;
use GoCardTeam\GoCardApi\Domain\Model\v1\Register;
use GoCardTeam\GoCardApi\Domain\Model\v1\User;
use Neos\Flow\ObjectManagement\ObjectManagerInterface;
use Neos\Flow\Security\Authorization\Privilege\Entity\Doctrine\SqlGeneratorInterface;
use Neos\Flow\Security\Context;
use Neos\Flow\Security\Exception\InvalidPolicyException;
use Neos\Flow\Annotations as Flow;
use Neos\Utility\ObjectAccess;

/**
 * A sql generator specific for members of registers constraints
 */
class MemberOfRegisterConditionGenerator implements SqlGeneratorInterface
{

    /**
     * @var string Targeting user
     */
    protected $user;

    /**
     * Array of registered global objects that can be accessed as operands
     *
     * @Flow\InjectConfiguration(package="Neos.Flow", path="aop.globalObjects")
     * @var array
     */
    protected $globalObjects = [];

    /**
     * @Flow\Inject
     * @var ObjectManager
     */
    protected $entityManager;

    /**
     * @Flow\Inject
     * @var ObjectManagerInterface
     */
    protected $objectManager;

    /**
     * @Flow\Inject
     * @var Context
     */
    protected $securityContext;

    /**
     * @param string $user
     * @throws InvalidPolicyException
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * @param DoctrineSqlFilter $sqlFilter
     * @param ClassMetadata $targetEntity Metadata object for the target entity to create the constraint for
     * @param string $targetTableAlias The target table alias used in the current query
     * @return string
     * @throws InvalidPolicyException
     */
    public function getSql(DoctrineSqlFilter $sqlFilter, ClassMetadata $targetEntity, $targetTableAlias)
    {
        if ($targetEntity->getName() != Register::class) {
            throw new InvalidPolicyException(sprintf('The "memberOfRegister" command can only be applied to Register entities! Got %s"', $targetEntity->getName()), 1501939164);
        }

        $target = $this->user;
        if (strpos($target, 'current.') === 0) {
            $objectAccess = explode('.', $target, 3);
            $globalObjectsRegisteredClassName = $this->globalObjects[$objectAccess[1]];
            $globalObject = $this->objectManager->get($globalObjectsRegisteredClassName);
            $this->securityContext->withoutAuthorizationChecks(function () use ($globalObject, $objectAccess, &$target) {
                $target = ObjectAccess::getPropertyPath($globalObject, $objectAccess[2]);
            });
        }

        if (!$target instanceof User) {
            throw new InvalidPolicyException(sprintf('The "memberOfRegister" command only accepts User objects! Got %s."', gettype($user)), 1501941186);
        }

        /** @var QuoteStrategy $quoteStrategy */
        $quoteStrategy = $this->entityManager->getConfiguration()->getQuoteStrategy();
        $platform = $this->entityManager->getConnection()->getDatabasePlatform();

        $member = $this->entityManager->getClassMetadata(Member::class);
        $membersUserColumn = /* $quoteStrategy->getColumnName("user", $member, $platform) */ "user";
        $membersRegisterColumn = /* $quoteStrategy->getColumnName("register", $member, $platform) */ "register";
        $registersUidColumn = $quoteStrategy->getColumnName("uid", $targetEntity, $platform);

        $memberTable = $quoteStrategy->getTableName($member, $platform);

        return '( SELECT id FROM ' . $memberTable . ' WHERE ' . $memberTable . '.' . $membersUserColumn . ' = ' . $target->getUid() . ' AND ' . $memberTable . '.' . $membersRegisterColumn . ' = ' . $targetTableAlias . '.' . $registersUidColumn . ')';
    }
}