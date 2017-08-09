<?php

namespace GoCardTeam\GoCardApi\Http\v1;

use Neos\Flow\Aop\JoinPointInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Routing\Router;
use Neos\Flow\Reflection\ClassSchema;
use Neos\Flow\Reflection\ReflectionService;
use Neos\Utility\TypeHandling;

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

        $type = TypeHandling::parseType($partsConfiguration['objectType']);

        $plainArguments = array_filter($result, function ($argumentKey) {
            return $argumentKey[0] != '@';
        }, ARRAY_FILTER_USE_KEY);

        if (!array_key_exists($targetName, $result)) {
            $result[$targetName] = [];
        } elseif (!is_array($result[$targetName])) {
            return $result;
        }

        /*
         * When type is collection: enumerate over children and map them to the childElement
         * Yet only handle subtypes for collections. But maybe there exist other objects which also have subelements
         */
        if (!empty($type['elementType']) && TypeHandling::isCollectionType($type['type'])) {
            $classSchema = $this->reflectionService->getClassSchema($type['elementType']);

            $plainArguments = array_filter($plainArguments, 'is_numeric', ARRAY_FILTER_USE_KEY);
            foreach ($plainArguments as $key => $argument) {
                if (isset($result[$targetName][$key])) {
                    continue;
                }

                $result[$targetName][$key] = [];
                $this->keepDataByClass($argument, $result[$targetName][$key], $classSchema);
                unset($result[$key]);
            }
        } else {
            $classSchema = $this->reflectionService->getClassSchema($type['type']);

            $hydratedData = [];
            $this->keepDataByClass($plainArguments, $hydratedData, $classSchema);
            foreach (array_keys($hydratedData) as $mappedKey) {
                unset($result[$mappedKey]);
            }
            $result[$targetName] = $hydratedData;
        }

        return $result;
    }

    /**
     * @param array $source
     * @param array $target
     * @param ClassSchema $classSchema
     */
    protected static function keepDataByClass(array $source, array &$target, ClassSchema $classSchema)
    {
        foreach ($classSchema->getProperties() as $prop => $value) {
            if(!array_key_exists($prop, $source) || array_key_exists($prop, $target)) {
                continue;
            }

            $target[$prop] = $source[$prop];
        }
    }
}