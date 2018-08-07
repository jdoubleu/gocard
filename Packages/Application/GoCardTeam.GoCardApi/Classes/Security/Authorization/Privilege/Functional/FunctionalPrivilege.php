<?php

namespace GoCardTeam\GoCardApi\Security\Authorization\Privilege\Functional;

use GoCardTeam\GoCardApi\Security\Authorization\Privilege\Functional\FunctionalEvaluatorInterface;
use Neos\Flow\Security\Authorization\Privilege\Method\MethodPrivilege;
use Neos\Flow\Security\Authorization\Privilege\Method\MethodPrivilegeSubject;
use Neos\Flow\Security\Authorization\Privilege\PrivilegeSubjectInterface;
use Neos\Flow\Security\Authorization\Privilege\PrivilegeTarget;
use Neos\Flow\Security\Exception\InvalidPrivilegeTypeException;

class FunctionalPrivilege extends MethodPrivilege
{

    /**
     * @var string
     */
    protected $evaluator;

    /**
     * @param PrivilegeTarget $privilegeTarget
     * @param string $matcher
     * @param string $permission
     * @param array|\Neos\Flow\Security\Authorization\Privilege\Parameter\PrivilegeParameterInterface[] $parameters
     * @throws InvalidPrivilegeTypeException
     */
    public function __construct(PrivilegeTarget $privilegeTarget, $matcher, $permission, $parameters)
    {
        $matchers = explode(' with ', $matcher);
        if ($matchers === false || count($matchers) != 2) {
            throw new InvalidPrivilegeTypeException('Functional privilege target expects one \'evaluator\' and one pointcut given, separated by \' with \' keyword.', 1502026597);
        }
        $this->evaluator = $matchers[0];

        parent::__construct($privilegeTarget, $matchers[1], $permission, $parameters);
    }

    /**
     * Returns TRUE, if this privilege covers the given subject
     *
     * @param PrivilegeSubjectInterface $subject
     * @return boolean
     * @throws InvalidPrivilegeTypeException if the given $subject is not supported by the privilege
     */
    public function matchesSubject(PrivilegeSubjectInterface $subject)
    {
        $methodMatched = parent::matchesSubject($subject);

        if ($methodMatched) {
            $evaluator = $this->objectManager->get($this->evaluator);
            if (!$evaluator instanceof FunctionalEvaluatorInterface) {
                throw new InvalidPrivilegeTypeException('Evaluator must implement the FunctionalEvaluatorInterface interface.', 1502026733);
            }

            /** @var MethodPrivilegeSubject $subject */
            $methodMatched = $evaluator->evaluate($subject->getJoinPoint());
        }

        return $methodMatched;
    }
}