<?php

namespace GoCardTeam\GoCardApi\Http\v1;

use Neos\Flow\Aop\JoinPointInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Routing\Router;
use Neos\Flow\Reflection\ReflectionService;

/**
 * Aspect for mapping flat properties given in request body to a routed object.
 * 
 * @Flow\Aspect
 */
class FlatPropertyMappingAspect
{

    /**
     * Flag name which enables additional property mapping.
     *
     * Use this in the routing configuration:
     * ```
     *   ...
     *   routeParts:
     *     user:
     *       objectType: ...
     *       mapAdditionalPropertiesFromBody: true
     *   ...
     * ```
     */
    const ADDITIONAL_MAPPING_FLAG = 'mapAdditionalPropertiesFromBody';

    /**
     * @Flow\Inject
     * @var Router
     */
    protected $router;

    /**
     * @Flow\Inject
     * @var ReflectionService
     */
    protected $reflectionService;

    /**
     * @param JoinPointInterface $joinPoint
     * @Flow\Around("method(protected Neos\Flow\Mvc\DispatchComponent->parseRequestBody())")
     * @return mixed
     */
    public function mapFlatProperties(JoinPointInterface $joinPoint)
    {
        $result = $joinPoint->getAdviceChain()->proceed($joinPoint);

        $route = $this->router->getLastMatchedRoute();

        if ($route === null) {
            return $result;
        }

        $routePartsConfiguration = $route->getRoutePartsConfiguration();

        [$partsConfiguration, $targetName] = [end($routePartsConfiguration), key($routePartsConfiguration)];

        if(!is_array($partsConfiguration)
            || !($partsConfiguration[self::ADDITIONAL_MAPPING_FLAG] ?? false)
            || !array_key_exists('objectType', $partsConfiguration)
        ) {
            return $result;
        }

        $classSchema = $this->reflectionService->getClassSchema($partsConfiguration['objectType']);

        $plainArguments = array_filter($result, function ($argumentKey) {
            return $argumentKey[0] != '@';
        }, ARRAY_FILTER_USE_KEY);

        if (!array_key_exists($targetName, $result)) {
            $result[$targetName] = [];
        } elseif (!is_array($result[$targetName])) {
            return $result;
        }

        foreach ($classSchema->getProperties() as $prop => $value) {
            if(!array_key_exists($prop, $plainArguments) || array_key_exists($prop, $result[$targetName])) {
                continue;
            }

            unset($result[$prop]);
            $result[$targetName][$prop] = $plainArguments[$prop];
        }

        return $result;
    }
}