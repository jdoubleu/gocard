<?php

namespace GoCardTeam\GoCardApi\Security\RequestPattern;

use Neos\Flow\Mvc\RequestInterface;
use Neos\Flow\Security\RequestPatternInterface;
use Neos\Flow\Annotations as Flow;

/**
 * This request pattern will either always fail or always succeed.
 * Thereby it can be used to override some internal application flow or configuration.
 *
 * By default it will always succeed, but this behaviour can be change by pattern option `result`.
 *
 * E.g.:
 * <code>
 *   'SomePackage:SomeRequestPattern':
 *     pattern: 'GoCardTeam\GoCardApi\Security\RequestPattern\DeadLockedRequestPattern'
 *     patternOptions:
 *       'result': false
 * </code>
 */
class DeadLockedRequestPattern implements RequestPatternInterface
{

    /**
     * `patternOptions` config
     * @var array
     */
    protected $options;

    /**
     * Constructor injection
     *
     * @param array $options injected `patternOptions
     */
    public function __construct(array $options)
    {
        $this->options = $options;
    }

    /**
     * Matches a \Neos\Flow\Mvc\RequestInterface against its set pattern rules
     *
     * @param RequestInterface $request The request that should be matched
     * @return boolean TRUE if the pattern matched, FALSE otherwise
     */
    public function matchRequest(RequestInterface $request)
    {
        $result = $this->options['result'] ?? true;
        return $result;
    }
}