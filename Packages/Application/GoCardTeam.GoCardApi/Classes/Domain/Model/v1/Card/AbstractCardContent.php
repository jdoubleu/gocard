<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1\Card;

/**
 * General Card content
 */
abstract class AbstractCardContent implements CardContent
{

    public function toJSONString(): string
    {
        return json_encode($this->toArray());
    }
}