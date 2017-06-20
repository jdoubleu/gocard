<?php

namespace GoCardTeam\GoCard\Http\Api\v1;

use Neos\Flow\Http\Component\ComponentChain;
use Neos\Flow\Http\Component\ComponentContext;
use Neos\Flow\Http\Component\ComponentInterface;

/**
 * Class CORSInterceptionComponent
 * HTTP components which intercepts preflighted CORS requests
 *
 * @package GoCardTeam\GoCard\Http\Api\v1
 */
class CORSInterceptionComponent implements ComponentInterface
{

    /**
     * @param ComponentContext $componentContext
     * @return void
     * @api
     */
    public function handle(ComponentContext $componentContext)
    {
        if($componentContext->getHttpRequest()->getMethod() == 'OPTIONS') {
            // Received CORS OPTIONS request
            // Respond with a 200 to allow the request to pass
            $response = $componentContext->getHttpResponse();
            $response->setStatus(200);

            // Disable all further processing
            $componentContext->setParameter(ComponentChain::class, 'cancel', TRUE);
        }
    }
}