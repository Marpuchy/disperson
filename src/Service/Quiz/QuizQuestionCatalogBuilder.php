<?php

declare(strict_types=1);

namespace App\Service\Quiz;

use App\Entity\Question;

final class QuizQuestionCatalogBuilder
{
    /**
     * @param iterable<Question> $questions
     */
    public function build(iterable $questions): QuizQuestionCatalog
    {
        $validQuestions = [];
        $invalidQuestions = [];

        foreach ($questions as $question) {
            $reason = $this->validationErrorFor($question);

            if ($reason !== null) {
                $invalidQuestions[] = [
                    'id' => $question->getId(),
                    'content' => $question->getContent() ?? 'Pregunta sin contenido',
                    'reason' => $reason,
                ];

                continue;
            }

            $validQuestions[] = $question;
        }

        return new QuizQuestionCatalog($validQuestions, $invalidQuestions);
    }

    private function validationErrorFor(Question $question): ?string
    {
        $mappedTraits = $question->mappedTraits();

        if ($mappedTraits === []) {
            return 'No tiene ningún rasgo asignado.';
        }

        if (count($mappedTraits) > 1) {
            return 'Tiene más de un rasgo asignado.';
        }

        $value = $question->traitValue($mappedTraits[0]);

        if (!in_array($value, [-1, 1], true)) {
            return 'El peso del rasgo debe ser 1 o -1.';
        }

        return null;
    }
}
