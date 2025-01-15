<?php
// src/Controller/QuizController.php

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

        // Obtener todas las preguntas
        $questions = $entityManager->getRepository(Question::class)->findAll();

        // Iterar a través de las preguntas
        foreach ($questions as $question) {
            $questionId = $question->getId();

            // Definir la categoría basándonos en la columna que tiene el valor 1 o -1
            $category = $this->getCategoryFromDatabase($question);

            // Recoger la respuesta de cada pregunta
            $response = $request->get('question_' . $questionId);

            // Si se ha respondido, calcular el puntaje
            if ($response !== null) {
                // Comprobamos si la pregunta es inversa
                $scoreValue = $this->calculateScore($response, $question->isInverse()); // Usamos el método isInverse
                $score[$category] += $scoreValue;
            }
        }

        // Normalizar las puntuaciones sobre 100
        $score = array_map(function ($value) {
            return max(0, min(100, $value));
        }, $score);

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
    private function calculateScore($response, $isInverse = false)
    {
        $multiplier = $isInverse ? -1 : 1; // Si la pregunta es inversa, multiplicamos por -1

        switch ($response) {
            case 2: // Muy de acuerdo
                return 6 * $multiplier;
            case 1: // De acuerdo
                return 3 * $multiplier;
            case 0: // Me da igual
                return 0;
            case -1: // En desacuerdo
                return -3 * $multiplier;
            case -2: // Muy en desacuerdo
                return -6 * $multiplier;
            default:
                return 0;
        }
    }

    // Método para determinar la categoría basándonos en las columnas que contienen el valor 1 o -1
    private function getCategoryFromDatabase(Question $question)
    {
        // Obtenemos los valores de las columnas correspondientes
        $categories = ['experiencia', 'responsabilidad', 'extraversion', 'amabilidad', 'emocional'];
        $categoryValues = [
            $question->getExperiencia(),
            $question->getResponsabilidad(),
            $question->getExtraversion(),
            $question->getAmabilidad(),
            $question->getEmocional(),
        ];

        // Verificamos qué columna tiene el valor distinto de 0 (1 o -1)
        foreach ($categories as $index => $category) {
            if ($categoryValues[$index] == 1 || $categoryValues[$index] == -1) {
                return $category;
            }
        }

        // Si no se encuentra ninguna, devolver una categoría predeterminada o lanzar un error
        return 'experiencia';  // Por ejemplo, o puedes lanzar una excepción aquí
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
