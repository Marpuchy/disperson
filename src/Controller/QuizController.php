<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class QuizController extends AbstractController
{
    #[Route('/quiz/start', name: 'app_quiz_start')]
    public function start(): Response
    {
        // Renderizar la vista de inicio del cuestionario
        return $this->render('quiz/start.html.twig', [
            'quiz_info' => [
                'title' => 'Cuestionario de Conocimientos Generales',
                'description' => 'Pon a prueba tus conocimientos con este emocionante cuestionario.',
                'total_questions' => 10,
                'time_limit' => '15 minutos'
            ]
        ]);
    }
}