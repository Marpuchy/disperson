<?php

// ProfileController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'app_profile')]
    public function index(Security $security): Response
    {
        $user = $security->getUser(); // Obtener el usuario autenticado

        if (!$user) {
            // Si no hay usuario autenticado, redirigir al login
            return $this->redirectToRoute('login');
        }

        return $this->render('profile/index.html.twig', [
            'user' => $user, // Pasamos el usuario autenticado a la plantilla
        ]);
    }
}