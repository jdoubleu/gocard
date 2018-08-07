<?php

namespace GoCardTeam\GoCardApi\Persistence\Doctrine\DataTypes;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\BigIntType as DoctrineBigIntType;

/**
 * Special ORM data type overriding Doctrine's default BigInteger type to
 * convert BigIntegers into php 64bit integers rather than strings.
 */
class BigIntType extends DoctrineBigIntType
{

    public function getBindingType()
    {
        return \PDO::PARAM_INT;
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return (null === $value) ? 0 : (int) $value;
    }
}