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

        // Obtener las estadísticas del usuario
        $experiencia = $user->getExperiencia();
        $responsabilidad = $user->getResponsabilidad();
        $extraversion = $user->getExtraversion();
        $amabilidad = $user->getAmabilidad();
        $emocional = $user->getEmocional();

        // Pasar las estadísticas del usuario junto con el objeto 'user'
        return $this->render('profile/index.html.twig', [
            'user' => $user,
            'experiencia' => $experiencia,
            'responsabilidad' => $responsabilidad,
            'extraversion' => $extraversion,
            'amabilidad' => $amabilidad,
            'emocional' => $emocional,
        ]);
    }
}
