<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Question;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Question>
 */
class QuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Question::class);
    }

    /**
     * @return list<Question>
     */
    public function findForQuiz(): array
    {
        return $this->createQueryBuilder('question')
            ->orderBy('question.id', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
