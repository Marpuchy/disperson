<?php

declare(strict_types=1);

namespace App\Entity;

use App\Domain\Personality\PersonalityTrait;
use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[ORM\Column]
    private int $experiencia = 0;

    #[ORM\Column]
    private int $responsabilidad = 0;

    #[ORM\Column]
    private int $extraversion = 0;

    #[ORM\Column]
    private int $emocional = 0;

    #[ORM\Column]
    private int $amabilidad = 0;

    public function __toString(): string
    {
        return $this->content ?? 'Pregunta';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = trim($content);

        return $this;
    }

    public function getExperiencia(): int
    {
        return $this->experiencia;
    }

    public function setExperiencia(int $experiencia): self
    {
        $this->experiencia = $experiencia;

        return $this;
    }

    public function getResponsabilidad(): int
    {
        return $this->responsabilidad;
    }

    public function setResponsabilidad(int $responsabilidad): self
    {
        $this->responsabilidad = $responsabilidad;

        return $this;
    }

    public function getExtraversion(): int
    {
        return $this->extraversion;
    }

    public function setExtraversion(int $extraversion): self
    {
        $this->extraversion = $extraversion;

        return $this;
    }

    public function getEmocional(): int
    {
        return $this->emocional;
    }

    public function setEmocional(int $emocional): self
    {
        $this->emocional = $emocional;

        return $this;
    }

    public function getAmabilidad(): int
    {
        return $this->amabilidad;
    }

    public function setAmabilidad(int $amabilidad): self
    {
        $this->amabilidad = $amabilidad;

        return $this;
    }

    public function trait(): PersonalityTrait
    {
        return $this->resolvedTrait() ?? PersonalityTrait::EXPERIENCIA;
    }

    public function resolvedTrait(): ?PersonalityTrait
    {
        $mappedTraits = $this->mappedTraits();

        return count($mappedTraits) === 1 ? $mappedTraits[0] : null;
    }

    public function getTrait(): string
    {
        return $this->resolvedTrait()?->value ?? PersonalityTrait::EXPERIENCIA->value;
    }

    public function setTrait(string $trait): self
    {
        $resolvedTrait = PersonalityTrait::from($trait);
        $isReverseScored = $this->isReverseScored();

        $this->resetTraitValues();
        $this->setValueFor($resolvedTrait, $isReverseScored ? -1 : 1);

        return $this;
    }

    public function isReverseScored(): bool
    {
        $trait = $this->resolvedTrait();

        return $trait !== null && $this->traitValue($trait) < 0;
    }

    public function setReverseScored(bool $reverseScored): self
    {
        $trait = $this->resolvedTrait() ?? PersonalityTrait::EXPERIENCIA;

        $this->resetTraitValues();
        $this->setValueFor($trait, $reverseScored ? -1 : 1);

        return $this;
    }

    /**
     * @return list<PersonalityTrait>
     */
    public function mappedTraits(): array
    {
        $mappedTraits = [];

        foreach (PersonalityTrait::cases() as $trait) {
            if ($this->traitValue($trait) !== 0) {
                $mappedTraits[] = $trait;
            }
        }

        return $mappedTraits;
    }

    public function hasSingleTraitMapping(): bool
    {
        return count($this->mappedTraits()) === 1;
    }

    private function resetTraitValues(): void
    {
        $this->experiencia = 0;
        $this->responsabilidad = 0;
        $this->extraversion = 0;
        $this->amabilidad = 0;
        $this->emocional = 0;
    }

    public function traitValue(PersonalityTrait $trait): int
    {
        return match ($trait) {
            PersonalityTrait::EXPERIENCIA => $this->experiencia,
            PersonalityTrait::RESPONSABILIDAD => $this->responsabilidad,
            PersonalityTrait::EXTRAVERSION => $this->extraversion,
            PersonalityTrait::AMABILIDAD => $this->amabilidad,
            PersonalityTrait::EMOCIONAL => $this->emocional,
        };
    }

    private function setValueFor(PersonalityTrait $trait, int $value): void
    {
        match ($trait) {
            PersonalityTrait::EXPERIENCIA => $this->experiencia = $value,
            PersonalityTrait::RESPONSABILIDAD => $this->responsabilidad = $value,
            PersonalityTrait::EXTRAVERSION => $this->extraversion = $value,
            PersonalityTrait::AMABILIDAD => $this->amabilidad = $value,
            PersonalityTrait::EMOCIONAL => $this->emocional = $value,
        };
    }
}
