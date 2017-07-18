<?php

namespace GoCardTeam\GoCardApi\Domain\Model\v1\Card;

/**
 * CardContent which will be used by a card.
 * Subtypes might be ValueObjects
 */
interface CardContent extends \JsonSerializable
{

    /**
     * Represent the card content as an array
     * @return array
     */
    public function toArray() : array;

    /**
     * Serialize this card content
     * @return string
     */
    public function toJSONString() : string;
}