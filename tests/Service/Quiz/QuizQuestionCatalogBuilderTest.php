<?php

declare(strict_types=1);

namespace App\Tests\Service\Quiz;

use App\Domain\Personality\PersonalityTrait;
use App\Entity\Question;
use App\Service\Quiz\QuizQuestionCatalogBuilder;
use PHPUnit\Framework\TestCase;

final class QuizQuestionCatalogBuilderTest extends TestCase
{
    public function testItSeparatesValidAndInvalidQuestions(): void
    {
        $validQuestion = (new Question())
            ->setContent('Pregunta válida')
            ->setTrait(PersonalityTrait::EXPERIENCIA->value);

        $missingTrait = (new Question())
            ->setContent('Sin rasgo');

        $multipleTraits = (new Question())
            ->setContent('Con varios rasgos')
            ->setExperiencia(1)
            ->setAmabilidad(1);

        $invalidWeight = (new Question())
            ->setContent('Peso inválido')
            ->setExperiencia(2);

        $catalog = (new QuizQuestionCatalogBuilder())->build([
            $validQuestion,
            $missingTrait,
            $multipleTraits,
            $invalidWeight,
        ]);

        self::assertCount(1, $catalog->getQuestions());
        self::assertCount(3, $catalog->getInvalidQuestions());
        self::assertSame('No tiene ningún rasgo asignado.', $catalog->getInvalidQuestions()[0]['reason']);
        self::assertSame('Tiene más de un rasgo asignado.', $catalog->getInvalidQuestions()[1]['reason']);
        self::assertSame('El peso del rasgo debe ser 1 o -1.', $catalog->getInvalidQuestions()[2]['reason']);
    }
}
