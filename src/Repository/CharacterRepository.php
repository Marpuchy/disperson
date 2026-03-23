<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Character;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Character>
 */
class CharacterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Character::class);
    }

    /**
     * @param array<string, int> $traitLevels
     *
     * @return array<string, Character>
     */
    public function findForTraitLevels(array $traitLevels): array
    {
        if ($traitLevels === []) {
            return [];
        }

        $queryBuilder = $this->createQueryBuilder('character');
        $orX = $queryBuilder->expr()->orX();

        foreach ($traitLevels as $trait => $level) {
            $orX->add(sprintf('(character.stat = :trait_%1$s AND character.level = :level_%1$s)', $trait));
            $queryBuilder
                ->setParameter(sprintf('trait_%s', $trait), $trait)
                ->setParameter(sprintf('level_%s', $trait), $level);
        }

        $matches = $queryBuilder
            ->where($orX)
            ->getQuery()
            ->getResult();

        $indexed = [];

        foreach ($matches as $character) {
            $indexed[$character->getStat()] = $character;
        }

        return $indexed;
    }
}
