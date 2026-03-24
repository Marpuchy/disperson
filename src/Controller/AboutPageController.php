<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\Personality\PersonalityModelViewBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class AboutPageController extends AbstractController
{
    #[Route('/about', name: 'app_about')]
    public function __invoke(PersonalityModelViewBuilder $personalityModelViewBuilder): Response
    {
        return $this->render('about/index.html.twig', [
            'traits' => $personalityModelViewBuilder->buildOverview(),
            'team' => [
                [
                    'name' => 'Marc Ibanez Puchol',
                    'role' => 'Diseno, desarrollo del producto y experiencia web',
                    'email' => 'mibanezp0709@gmail.com',
                ],
                [
                    'name' => 'Colaboracion academica',
                    'role' => 'Apoyo en la formulacion del cuestionario y revision psicometrica desde UJI',
                    'email' => 'mibanezp0709@gmail.com',
                ],
            ],
        ]);
    }
}
