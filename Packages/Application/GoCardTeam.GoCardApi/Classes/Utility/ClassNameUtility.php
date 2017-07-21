<?php

namespace GoCardTeam\GoCardApi\Utility;

/**
 * Utility for dealing with class names and references.
 */
class ClassNameUtility
{

    /**
     * Converts a snake-cased-name into a PascalCasedName
     *
     * @param string $className
     * @return string className in pascal case
     */
    public static function convertSnakeCaseToPascalCase(string $className)
    {
        return implode('', array_map(function($value) {
            return ucfirst($value);
        }, explode('-', $className)));
    }
}