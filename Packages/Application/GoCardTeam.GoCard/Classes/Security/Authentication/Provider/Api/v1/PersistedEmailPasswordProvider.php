<?php

namespace GoCardTeam\GoCard\Security\Authentication\Provider\Api\v1;

use GoCardTeam\GoCard\Security\Authentication\Token\Api\v1\EmailPassword;
use \Neos\Flow\Security\Authentication\Provider\PersistedUsernamePasswordProvider;

/**
 * Class PersistedEmailPasswordProvider
 * Overwrites the default PersistedUsernamePasswordProvider by just allowing the custom EmailPassword token.
 *
 * @package GoCardTeam\GoCard\Security\Authentication\Provider\Api\v1
 */
class PersistedEmailPasswordProvider extends PersistedUsernamePasswordProvider
{

    public function getTokenClassNames()
    {
        return [EmailPassword::class];
    }
}