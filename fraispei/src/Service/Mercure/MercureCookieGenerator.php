<?php

namespace App\Service\Mercure;

use App\Entity\User;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Symfony\Component\HttpFoundation\Cookie;

class MercureCookieGenerator
{
    private $secret;
    
    public function __construct(string $secret)
    {
        $this->secret = $secret;
    }

    public function generate() : Cookie 
    {
        $token = (new Builder())
            ->withClaim('mercure', ['subscribe' => ['*']])
            ->getToken(new Sha256(), new Key($this->secret));

        return Cookie::fromString("
            mercureAuthorization = {$token}; 
            path = /.well-known/mercure; 
            domain = fraispei.re;
            secure; 
            httponly;
        ");
    }
}