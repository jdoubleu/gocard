<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1\Card;

/**
 * General Card content
 */
abstract class AbstractCardContent implements \JsonSerializable
{

    /**
     * @return array Representation of this card content as an array
     */
    public abstract function toArray(): array;

    /**
     * @return array
     */
    public function jsonSerialize()
    {
        return $this->toArray();
    }
}