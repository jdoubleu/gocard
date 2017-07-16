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

    /**
     * generates a string representation of this object
     * @return string
     */
    function __toString()
    {
        return serialize($this->toArray());
    }
}