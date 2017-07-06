<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1\Card;

use Neos\Flow\Annotations as Flow;

/**
 * @Flow\ValueObject(embedded=true)
 */
class SelfValidate extends TextInput
{

    /**
     * Construct SelfValidate
     */
    public function __construct()
    {
        parent::__construct();
    }
}