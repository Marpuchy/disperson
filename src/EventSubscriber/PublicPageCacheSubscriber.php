<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class PublicPageCacheSubscriber implements EventSubscriberInterface
{
    private const CACHEABLE_ROUTES = [
        'app_home',
        'app_about',
        'app_contact',
    ];

    public function __construct(
        private readonly TokenStorageInterface $tokenStorage,
    ) {
    }

    public function onResponse(ResponseEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return;
        }

        $request = $event->getRequest();

        if (!in_array($request->attributes->get('_route'), self::CACHEABLE_ROUTES, true)) {
            return;
        }

        if (!in_array($request->getMethod(), ['GET', 'HEAD'], true)) {
            return;
        }

        $token = $this->tokenStorage->getToken();

        if ($token !== null && is_object($token->getUser())) {
            return;
        }

        $response = $event->getResponse();

        if ($response->headers->has('Set-Cookie')) {
            return;
        }

        $response->headers->set('Cache-Control', 'public, max-age=600, stale-while-revalidate=60');
        $response->setPublic();
        $response->setMaxAge(600);
        $response->setSharedMaxAge(600);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::RESPONSE => ['onResponse', -255],
        ];
    }
}
