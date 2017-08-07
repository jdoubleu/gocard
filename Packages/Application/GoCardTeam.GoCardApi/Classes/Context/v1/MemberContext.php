<?php

namespace GoCardTeam\GoCardApi\Context\v1;

use GoCardTeam\GoCardApi\Domain\Model\v1\Member;
use GoCardTeam\GoCardApi\Domain\Repository\v1\MemberRepository;
use Neos\Flow\Annotations as Flow;

/**
 * A context holding all memberships of the current user
 *
 * TODO: Implement CacheAwareInterface
 *
 * @Flow\Scope("singleton")
 */
class MemberContext
{

    /**
     * @Flow\Inject
     * @var UserContext
     */
    protected $userContext;

    /**
     * @Flow\Inject
     * @var MemberRepository
     */
    protected $memberRepository;

    /**
     * Fetches Members of the current user
     * @return Member[]
     */
    public function getMembers(): array
    {
        $members = $this->memberRepository->findByUser($this->userContext->getUser());
        if ($members === null) {
            $members = [];
        }
        return $members;
    }
}