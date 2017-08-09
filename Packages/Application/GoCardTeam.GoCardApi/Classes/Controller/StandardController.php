<?php
namespace GoCardTeam\GoCardApi\Controller;

/*
 * This file is part of the GoCardTeam.GoCardApi package.
 */

use Neos\Flow\Mvc\Controller\ActionController;

class StandardController extends ActionController
{

    /**
     * @return void
     */
    public function indexAction()
    {
    }

    /**
     * Alias of index action
     * Necessary for password-reset route and uri builder
     */
    public function passwordResetAction()
    {
        $this->indexAction();
    }
}
