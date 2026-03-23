<?php

declare(strict_types=1);

namespace App\Tests\Service\Quiz;

use App\Domain\Personality\PersonalityTrait;
use App\Entity\Question;
use App\Entity\User;
use App\Service\Quiz\QuizScoringService;
use PHPUnit\Framework\TestCase;

final class QuizScoringServiceTest extends TestCase
{
    public function testItCalculatesScoresWithReverseItemsAndClamping(): void
    {
        $service = new QuizScoringService();

        $experienceQuestion = $this->questionWithId(1, PersonalityTrait::EXPERIENCIA, false);
        $responsibilityQuestion = $this->questionWithId(2, PersonalityTrait::RESPONSABILIDAD, true);

        $highOpennessQuestions = [];

        for ($index = 3; $index <= 12; ++$index) {
            $highOpennessQuestions[] = $this->questionWithId($index, PersonalityTrait::EXPERIENCIA, false);
        }

        $scores = $service->calculateScores(
            [$experienceQuestion, $responsibilityQuestion, ...$highOpennessQuestions],
            [
                'question_1' => 2,
                'question_2' => 2,
                'question_3' => 2,
                'question_4' => 2,
                'question_5' => 2,
                'question_6' => 2,
                'question_7' => 2,
                'question_8' => 2,
                'question_9' => 2,
                'question_10' => 2,
                'question_11' => 2,
                'question_12' => 2,
            ],
        );

        self::assertSame(100, $scores[PersonalityTrait::EXPERIENCIA->value]);
        self::assertSame(44, $scores[PersonalityTrait::RESPONSABILIDAD->value]);
        self::assertSame(50, $scores[PersonalityTrait::EXTRAVERSION->value]);
        self::assertSame(50, $scores[PersonalityTrait::AMABILIDAD->value]);
        self::assertSame(50, $scores[PersonalityTrait::EMOCIONAL->value]);
    }

    public function testItAppliesScoresToUserEntity(): void
    {
        $user = new User();

        (new QuizScoringService())->applyScores($user, [
            PersonalityTrait::EXPERIENCIA->value => 61,
            PersonalityTrait::RESPONSABILIDAD->value => 48,
            PersonalityTrait::EXTRAVERSION->value => 55,
            PersonalityTrait::AMABILIDAD->value => 72,
            PersonalityTrait::EMOCIONAL->value => 39,
        ]);

        self::assertSame(61, $user->getExperiencia());
        self::assertSame(48, $user->getResponsabilidad());
        self::assertSame(55, $user->getExtraversion());
        self::assertSame(72, $user->getAmabilidad());
        self::assertSame(39, $user->getEmocional());
    }

    private function questionWithId(int $id, PersonalityTrait $trait, bool $reverse): Question
    {
        $question = (new Question())
            ->setContent(sprintf('Pregunta %d', $id))
            ->setTrait($trait->value)
            ->setReverseScored($reverse);

        $reflection = new \ReflectionProperty($question, 'id');
        $reflection->setAccessible(true);
        $reflection->setValue($question, $id);

        return $question;
    }
}
