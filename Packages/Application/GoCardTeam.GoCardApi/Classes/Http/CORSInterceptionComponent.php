<?php

namespace GoCardTeam\GoCardApi\Http;

use Neos\Flow\Http\Component\ComponentChain;
use Neos\Flow\Http\Component\ComponentContext;
use Neos\Flow\Http\Component\ComponentInterface;

/**
 * Class CORSInterceptionComponent
 * HTTP modules which intercepts preflighted CORS requests
 *
 * @package GoCardTeam\GoCardApi\Http\v1
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
        $response = $componentContext->getHttpResponse();

        // Add general CORS headers to all requests
        $response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-type, origin, accept');

        // Handle CORS preflight request
        if($componentContext->getHttpRequest()->getMethod() == 'OPTIONS') {
            // Respond with a 200 to allow the request to pass
            $response->setStatus(200);

            // Disable all further processing
            $componentContext->setParameter(ComponentChain::class, 'cancel', TRUE);
        }
    }
}
