<?php

namespace GoCardTeam\GoCardApi\Security\Authentication\Provider;

use GoCardTeam\GoCardApi\Security\Authentication\Token\EmailPassword;
use Neos\Flow\Security\Authentication\Provider\PersistedUsernamePasswordProvider;

/**
 * Class PersistedEmailPasswordProvider
 * Overwrites the default PersistedUsernamePasswordProvider by just allowing the custom EmailPassword token.
 *
 * @package GoCardTeam\GoCardApi\Security\Authentication\Provider\v1
 */
class PersistedEmailPasswordProvider extends PersistedUsernamePasswordProvider
{

    public function getTokenClassNames()
    {
        return [EmailPassword::class];
    }
}