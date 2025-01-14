<?php

namespace App\Controller;

use App\Entity\Question;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class QuizController extends AbstractController
{
    #[Route('/quiz/start', name: 'app_quiz_start')]
    public function start(EntityManagerInterface $entityManager): Response
    {
        // Obtener las preguntas desde la base de datos
        $questions = $entityManager->getRepository(Question::class)->findAll();

        return $this->render('quiz/start.html.twig', [
            'questions' => $questions
        ]);
    }

    #[Route('/quiz/submit', name: 'app_quiz_submit', methods: ['POST'])]
    public function submit(Request $request, EntityManagerInterface $entityManager): Response
    {
        // Obtener el usuario actual
        $user = $this->getUser();

        // Validar que el usuario está autenticado
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }

        // Inicializar puntuaciones con 50 para cada atributo
        $score = [
            'experiencia' => 50,
            'responsabilidad' => 50,
            'extraversion' => 50,
            'amabilidad' => 50,
            'emocional' => 50
        ];

        // Iterar a través de las preguntas y sumar las puntuaciones
        $questions = $entityManager->getRepository(Question::class)->findAll();
        foreach ($questions as $question) {
            $questionId = $question->getId();

            // Recoger las respuestas según los masks y sumar
            $maskRespuesta = $request->get('question_' . $questionId);

            // Puntuaciones según los atributos:
            if ($questionId == 1 || $questionId == 6 || $questionId == 11 || $questionId == 17 || $questionId == 21 || $questionId == 28 || $questionId == 34 || $questionId == 39 || $questionId == 45 || $questionId == 48 || $questionId == 52) {
                $score['experiencia'] += $this->calculateScore($maskRespuesta); // experiencia
            }

            if ($questionId == 2 || $questionId == 13 || $questionId == 18 || $questionId == 29 || $questionId == 35 || $questionId == 40 || $questionId == 46 || $questionId == 51) {
                $score['responsabilidad'] += $this->calculateScore(6 - $maskRespuesta); // Responsabilidad (restar la puntuación)
            }

            if ($questionId == 3 || $questionId == 8 || $questionId == 19 || $questionId == 30 || $questionId == 41 || $questionId == 58 || $questionId == 36 || $questionId == 80) {
                $score['extraversion'] += $this->calculateScore($maskRespuesta); // Extraversion
            }

            if ($questionId == 9 || $questionId == 15 || $questionId == 20 || $questionId == 37 || $questionId == 42 || $questionId == 48 || $questionId == 75 || $questionId == 81) {
                $score['amabilidad'] += $this->calculateScore(6 - $maskRespuesta); // Amabilidad (restar la puntuación)
            }

            if ($questionId == 10 || $questionId == 27 || $questionId == 32 || $questionId == 38 || $questionId == 49 || $questionId == 60 || $questionId == 65 || $questionId == 82) {
                $score['emocional'] += $this->calculateScore(6 - $maskRespuesta); // Emocional
            }
        }

        // Normalizar las puntuaciones sobre 100
        $maxScore = 6; // Cada pregunta puede sumar o restar hasta 6 puntos

        $score['experiencia'] = ($score['experiencia'] / 100) * 100;
        $score['responsabilidad'] = ($score['responsabilidad'] / 100) * 100;
        $score['extraversion'] = ($score['extraversion'] / 100) * 100;
        $score['amabilidad'] = ($score['amabilidad'] / 100) * 100;
        $score['emocional'] = ($score['emocional'] / 100) * 100;

        // Actualizar los atributos del usuario con las puntuaciones obtenidas
        $user->setExperiencia($score['experiencia']);
        $user->setResponsabilidad($score['responsabilidad']);
        $user->setExtraversion($score['extraversion']);
        $user->setAmabilidad($score['amabilidad']);
        $user->setEmocional($score['emocional']);

        // Guardar los cambios en la base de datos
        $entityManager->flush();

        // Redirigir a una página de resultados
        return $this->redirectToRoute('app_quiz_results');
    }

    // Función para calcular el puntaje en base a la respuesta
    private function calculateScore($response)
    {
        // La respuesta 0 es neutra y no suma ni resta
        if ($response == 0) {
            return 0;
        }

        // Respuestas positivas (1, 2, 3, 4, 5) suman hasta un máximo de 6
        if ($response > 0) {
            return min($response * 1, 6); // Máximo 6 puntos
        }

        // Respuestas negativas (-1, -2, -3, -4, -5) restan hasta un máximo de -6
        if ($response < 0) {
            return max($response * 1, -6); // Máximo -6 puntos
        }

        return 0;
    }

    #[Route('/quiz/results', name: 'app_quiz_results')]
    public function results(): Response
    {
        // Obtener el usuario actual
        $user = $this->getUser();

        // Validar que el usuario está autenticado
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }

        // Mostrar los resultados del usuario
        return $this->render('quiz/results.html.twig', [
            'user' => $user
        ]);
    }
}
