<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AboutPageController extends AbstractController
{
    #[Route('/about', name: 'app_about')]
    public function index(): Response
    {
        // Renderizar vista de información
        return $this->render('about/index.html.twig', [
            'title' => 'Sobre Nosotros',
            'description' => 'Descubre más sobre nuestra misión, visión y el equipo detrás de nuestra plataforma.',
            'team' => [
                ['name' => 'Juan Perez', 'role' => 'Persona imaginaria para rellenar', 'email' => 'mibanezp0709@gmail.com'],
                ['name' => 'Marc Ibáñez Puchol', 'role' => 'Estudiante de IES El Caminás', 'email' => 'mibanezp0709@gmail.com'],
                ['name' => 'Maria Martinez', 'role' => 'Persona imaginaria para rellenar', 'email' => 'mibanezp0709@gmail.com'],
            ],

        ]);
    }
}