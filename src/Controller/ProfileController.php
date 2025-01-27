<?php

// ProfileController.php
namespace App\Controller;

use App\Repository\CharacterRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;


class ProfileController extends AbstractController
{
    private $characterRepository;

    public function __construct(CharacterRepository $characterRepository)
    {
        $this->characterRepository = $characterRepository;
    }

    function getLevelByValue($value): ?int
    {
        if ($value >= 0 && $value <= 20) {
            return 1;
        } elseif ($value >= 21 && $value <= 40) {
            return 2;
        } elseif ($value >= 41 && $value <= 60) {
            return 3;
        } elseif ($value >= 61 && $value <= 80) {
            return 4;
        } elseif ($value >= 81 && $value <= 100) {
            return 5;
        }

        return null; // Fuera de rango
    }

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

        // Lista de estadísticas y sus valores
        $stats = [
            'experiencia' => $experiencia,
            'responsabilidad' => $responsabilidad,
            'extraversion' => $extraversion,
            'emocional' => $emocional,
            'amabilidad' => $amabilidad,
        ];

        // Variables para almacenar los personajes
        $characters = [
            'experiencia' => null,
            'responsabilidad' => null,
            'extraversion' => null,
            'emocional' => null,
            'amabilidad' => null,
        ];

        // Procesar cada estadística
        foreach ($stats as $stat => $value) {
            $level = $this->getLevelByValue($value); // Determinar el nivel a partir del valor

            if ($level !== null) {
                $character = $this->characterRepository->findOneBy([
                    'level' => $level,
                    'stat' => $stat,
                ]);

                // Guardar el personaje correspondiente si se encuentra
                if ($character) {
                    $characters[$stat] = $character;
                }
            }
        }

        // Renderizar la plantilla con los resultados
        return $this->render('profile/index.html.twig', [
            'experienciaCharacter' => $characters['experiencia'],
            'responsabilidadCharacter' => $characters['responsabilidad'],
            'extraversionCharacter' => $characters['extraversion'],
            'emocionalCharacter' => $characters['emocional'],
            'amabilidadCharacter' => $characters['amabilidad'],
            'user' => $user,
            'experiencia' => $experiencia,
            'responsabilidad' => $responsabilidad,
            'extraversion' => $extraversion,
            'amabilidad' => $amabilidad,
            'emocional' => $emocional,
        ]);
    }

}

