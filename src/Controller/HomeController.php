<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\Personality\PersonalityModelViewBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function __invoke(PersonalityModelViewBuilder $personalityModelViewBuilder): Response
    {
        return $this->render('home/index.html.twig', [
            'traits' => $personalityModelViewBuilder->buildOverview(),
        ]);
    }
}
