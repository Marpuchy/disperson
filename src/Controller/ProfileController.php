<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\Profile\ProfileViewBuilder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[IsGranted('ROLE_USER')]
final class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'app_profile', methods: ['GET'])]
    public function __invoke(ProfileViewBuilder $profileViewBuilder): Response
    {
        $traits = $profileViewBuilder->build($this->getUser());

        return $this->render('profile/index.html.twig', [
            'user' => $this->getUser(),
            'traits' => $traits,
            'featured_trait' => $profileViewBuilder->featuredTrait($traits),
        ]);
    }
}
