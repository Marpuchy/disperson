<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\QuestionRepository;
use App\Service\Profile\ProfileViewBuilder;
use App\Service\Quiz\QuizQuestionCatalogBuilder;
use App\Service\Quiz\QuizScoringService;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/quiz', name: 'app_quiz_')]
#[IsGranted('ROLE_USER')]
final class QuizController extends AbstractController
{
    #[Route('/start', name: 'start', methods: ['GET'])]
    public function start(
        QuestionRepository $questionRepository,
        QuizQuestionCatalogBuilder $quizQuestionCatalogBuilder,
    ): Response {
        $catalog = $quizQuestionCatalogBuilder->build($questionRepository->findForQuiz());

        return $this->render('quiz/start.html.twig', [
            'questions' => $catalog->getQuestions(),
            'invalid_questions' => $catalog->getInvalidQuestions(),
            'question_count' => $catalog->getValidCount(),
            'invalid_question_count' => $catalog->getInvalidCount(),
        ]);
    }

    #[Route('/submit', name: 'submit', methods: ['POST'])]
    public function submit(
        Request $request,
        QuestionRepository $questionRepository,
        QuizQuestionCatalogBuilder $quizQuestionCatalogBuilder,
        QuizScoringService $quizScoringService,
        EntityManagerInterface $entityManager,
    ): Response {
        if (!$this->isCsrfTokenValid('quiz_submit', (string) $request->request->get('_token'))) {
            $this->addFlash('danger', 'La sesión del formulario ha caducado. Vuelve a intentarlo.');

            return $this->redirectToRoute('app_quiz_start');
        }

        $catalog = $quizQuestionCatalogBuilder->build($questionRepository->findForQuiz());

        if (!$catalog->hasQuestions()) {
            $this->addFlash('danger', 'El cuestionario no está disponible porque el banco de preguntas no tiene elementos válidos.');

            return $this->redirectToRoute('app_quiz_start');
        }

        $user = $this->getUser();
        $scores = $quizScoringService->calculateScores(
            $catalog->getQuestions(),
            $request->request->all(),
        );

        $quizScoringService->applyScores($user, $scores);
        $entityManager->flush();

        $this->addFlash('success', 'Tus respuestas se han guardado correctamente.');

        return $this->redirectToRoute('app_quiz_results');
    }

    #[Route('/results', name: 'results', methods: ['GET'])]
    public function results(ProfileViewBuilder $profileViewBuilder): Response
    {
        return $this->render('quiz/results.html.twig', [
            'traits' => $profileViewBuilder->build($this->getUser()),
        ]);
    }
}
