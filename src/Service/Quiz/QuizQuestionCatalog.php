<?php

declare(strict_types=1);

namespace App\Service\Quiz;

use App\Entity\Question;

final class QuizQuestionCatalog
{
    /**
     * @param list<Question> $questions
     * @param list<array{id: int|null, content: string, reason: string}> $invalidQuestions
     */
    public function __construct(
        private readonly array $questions,
        private readonly array $invalidQuestions,
    ) {
    }

    /**
     * @return list<Question>
     */
    public function getQuestions(): array
    {
        return $this->questions;
    }

    /**
     * @return list<array{id: int|null, content: string, reason: string}>
     */
    public function getInvalidQuestions(): array
    {
        return $this->invalidQuestions;
    }

    public function getValidCount(): int
    {
        return count($this->questions);
    }

    public function getInvalidCount(): int
    {
        return count($this->invalidQuestions);
    }

    public function getTotalCount(): int
    {
        return $this->getValidCount() + $this->getInvalidCount();
    }

    public function hasQuestions(): bool
    {
        return $this->questions !== [];
    }

    public function hasInvalidQuestions(): bool
    {
        return $this->invalidQuestions !== [];
    }
}
