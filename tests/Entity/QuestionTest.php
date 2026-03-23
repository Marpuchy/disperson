<?php

declare(strict_types=1);

namespace App\Tests\Entity;

use App\Domain\Personality\PersonalityTrait;
use App\Entity\Question;
use PHPUnit\Framework\TestCase;

final class QuestionTest extends TestCase
{
    public function testItResolvesConfiguredTraitAndReverseState(): void
    {
        $question = (new Question())
            ->setContent('Pregunta')
            ->setTrait(PersonalityTrait::EXTRAVERSION->value);

        self::assertSame(PersonalityTrait::EXTRAVERSION, $question->resolvedTrait());
        self::assertTrue($question->hasSingleTraitMapping());
        self::assertFalse($question->isReverseScored());

        $question->setReverseScored(true);

        self::assertTrue($question->isReverseScored());
        self::assertSame(-1, $question->traitValue(PersonalityTrait::EXTRAVERSION));
    }

    public function testItDetectsInvalidMultipleTraitMappings(): void
    {
        $question = (new Question())
            ->setContent('Pregunta')
            ->setExperiencia(1)
            ->setAmabilidad(1);

        self::assertNull($question->resolvedTrait());
        self::assertFalse($question->hasSingleTraitMapping());
        self::assertCount(2, $question->mappedTraits());
    }
}
