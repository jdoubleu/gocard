<?php

namespace GoCardTeam\GoCardApi\Security\Authorization\Privilege\Functional\v1;

use Neos\Flow\Aop\JoinPointInterface;

/**
 * Interface for the evaluator
 */
interface FunctionalEvaluatorInterface
{
    /**
     * Evaluate the current Pointcut. The result will be propagated back to the privilege target.
     *
     * @param JoinPointInterface $joinPoint
     * @return bool
     */
    public function evaluate(JoinPointInterface $joinPoint): bool;
}