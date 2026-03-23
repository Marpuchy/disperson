<?php

declare(strict_types=1);

namespace App\Service\Quiz;

use App\Domain\Personality\PersonalityTrait;
use App\Entity\Question;
use App\Entity\User;

final class QuizScoringService
{
    private const BASELINE_SCORE = 50;
    private const MIN_SCORE = 0;
    private const MAX_SCORE = 100;

    /**
     * @param iterable<Question> $questions
     * @param array<string, mixed> $submittedAnswers
     *
     * @return array<string, int>
     */
    public function calculateScores(iterable $questions, array $submittedAnswers): array
    {
        $scores = [];

        foreach (PersonalityTrait::cases() as $trait) {
            $scores[$trait->value] = self::BASELINE_SCORE;
        }

        foreach ($questions as $question) {
            $fieldName = sprintf('question_%d', $question->getId());
            $rawAnswer = $submittedAnswers[$fieldName] ?? null;

            if ($rawAnswer === null || $rawAnswer === '') {
                continue;
            }

            $scores[$question->trait()->value] += $this->scoreDelta((int) $rawAnswer, $question->isReverseScored());
        }

        foreach ($scores as $trait => $score) {
            $scores[$trait] = max(self::MIN_SCORE, min(self::MAX_SCORE, $score));
        }

        return $scores;
    }

    /**
     * @param array<string, int> $scores
     */
    public function applyScores(User $user, array $scores): void
    {
        foreach (PersonalityTrait::cases() as $trait) {
            $trait->applyTo($user, $scores[$trait->value] ?? self::BASELINE_SCORE);
        }
    }

    private function scoreDelta(int $answer, bool $reverseScored): int
    {
        $weight = match ($answer) {
            2 => 6,
            1 => 3,
            -1 => -3,
            -2 => -6,
            default => 0,
        };

        return $reverseScored ? -$weight : $weight;
    }
}
