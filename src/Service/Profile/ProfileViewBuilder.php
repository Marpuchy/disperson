<?php

declare(strict_types=1);

namespace App\Service\Profile;

use App\Domain\Personality\PersonalityTrait;
use App\Entity\Character;
use App\Entity\User;
use App\Repository\CharacterRepository;

final class ProfileViewBuilder
{
    public function __construct(
        private readonly CharacterRepository $characterRepository,
    ) {
    }

    /**
     * @return array<int, array{
     *     key: string,
     *     ocean_letter: string,
     *     label: string,
     *     navigation_label: string,
     *     summary: string,
     *     low_anchor: string,
     *     high_anchor: string,
     *     score: int,
     *     level: int,
     *     description: string,
     *     character: array{id: int|null, name: string, description: string}|null
     * }>
     */
    public function build(User $user): array
    {
        $levels = [];

        foreach (PersonalityTrait::cases() as $trait) {
            $levels[$trait->value] = $trait->levelForScore($trait->scoreFor($user));
        }

        $characters = $this->characterRepository->findForTraitLevels($levels);
        $traits = [];

        foreach (PersonalityTrait::cases() as $trait) {
            $score = $trait->scoreFor($user);

            $traits[] = [
                'key' => $trait->value,
                'ocean_letter' => $trait->oceanLetter(),
                'label' => $trait->label(),
                'navigation_label' => $trait->navigationLabel(),
                'summary' => $trait->summary(),
                'low_anchor' => $trait->lowAnchor(),
                'high_anchor' => $trait->highAnchor(),
                'score' => $score,
                'level' => $trait->levelForScore($score),
                'description' => $trait->description($score),
                'character' => $this->normalizeCharacter($characters[$trait->value] ?? null),
            ];
        }

        return $traits;
    }

    /**
     * @param array<int, array{
     *     key: string,
     *     ocean_letter: string,
     *     label: string,
     *     navigation_label: string,
     *     summary: string,
     *     low_anchor: string,
     *     high_anchor: string,
     *     score: int,
     *     level: int,
     *     description: string,
     *     character: array{id: int|null, name: string, description: string}|null
     * }> $traits
     *
     * @return array{
     *     key: string,
     *     ocean_letter: string,
     *     label: string,
     *     navigation_label: string,
     *     summary: string,
     *     low_anchor: string,
     *     high_anchor: string,
     *     score: int,
     *     level: int,
     *     description: string,
     *     character: array{id: int|null, name: string, description: string}|null
     * }|null
     */
    public function featuredTrait(array $traits): ?array
    {
        $featured = null;

        foreach ($traits as $trait) {
            if ($featured === null) {
                $featured = $trait;
                continue;
            }

            $candidateHasCharacter = $trait['character'] !== null;
            $featuredHasCharacter = $featured['character'] !== null;

            if ($candidateHasCharacter !== $featuredHasCharacter) {
                if ($candidateHasCharacter) {
                    $featured = $trait;
                }

                continue;
            }

            if ($trait['score'] > $featured['score']) {
                $featured = $trait;
                continue;
            }

            if ($trait['score'] === $featured['score'] && $trait['level'] > $featured['level']) {
                $featured = $trait;
            }
        }

        return $featured;
    }

    private function normalizeCharacter(?Character $character): ?array
    {
        if ($character === null) {
            return null;
        }

        return [
            'id' => $character->getId(),
            'name' => $character->getName(),
            'description' => $character->getDescription(),
        ];
    }
}
