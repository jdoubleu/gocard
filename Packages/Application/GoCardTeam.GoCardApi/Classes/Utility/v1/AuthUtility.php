<?php

namespace GoCardTeam\GoCardApi\Utility\v1;

/**
 * Class AuthUtility
 * Provides methods useful for authentication process (e.g. token generator)
 *
 * @package GoCardTeam\GoCardApi\Utility\v1
 */
class AuthUtility
{

    /**
     * Generates a access token for the api
     *
     * @return string
     */
    final public static function generateAccessToken(): string
    {
        return bin2hex(random_bytes(16));
    }

}