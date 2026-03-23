<?php

declare(strict_types=1);

namespace App\Service\Personality;

use App\Domain\Personality\PersonalityTrait;

final class PersonalityModelViewBuilder
{
    /**
     * @return list<array{
     *     key: string,
     *     letter: string,
     *     label: string,
     *     navigation_label: string,
     *     summary: string,
     *     low_anchor: string,
     *     high_anchor: string
     * }>
     */
    public function buildOverview(): array
    {
        $overview = [];

        foreach (PersonalityTrait::cases() as $trait) {
            $overview[] = [
                'key' => $trait->value,
                'letter' => $trait->oceanLetter(),
                'label' => $trait->label(),
                'navigation_label' => $trait->navigationLabel(),
                'summary' => $trait->summary(),
                'low_anchor' => $trait->lowAnchor(),
                'high_anchor' => $trait->highAnchor(),
            ];
        }

        return $overview;
    }
}
