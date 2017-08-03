<?php

namespace GoCardTeam\GoCardApi\Validation\Validator\v1;

use Neos\Flow\Validation\Validator\RegularExpressionValidator;

/**
 * Validator for event type/name of an activity.
 */
class ActivityEventTypeValidator extends RegularExpressionValidator
{

    /**
     * Override constructor so that this validator has fixed options and they can't be overwritten.
     */
    public function __construct()
    {
        parent::__construct(['regularExpression' => '(create_register|update_register|delete_register|create_card|update_card|delete_card)']);
    }
}