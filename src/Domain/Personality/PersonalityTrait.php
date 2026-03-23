<?php

declare(strict_types=1);

namespace App\Domain\Personality;

use App\Entity\User;

enum PersonalityTrait: string
{
    case EXPERIENCIA = 'experiencia';
    case RESPONSABILIDAD = 'responsabilidad';
    case EXTRAVERSION = 'extraversion';
    case AMABILIDAD = 'amabilidad';
    case EMOCIONAL = 'emocional';

    public function label(): string
    {
        return match ($this) {
            self::EXPERIENCIA => 'Apertura a la experiencia',
            self::RESPONSABILIDAD => 'Responsabilidad',
            self::EXTRAVERSION => 'Extraversión',
            self::AMABILIDAD => 'Amabilidad',
            self::EMOCIONAL => 'Estabilidad emocional',
        };
    }

    public function navigationLabel(): string
    {
        return match ($this) {
            self::EXPERIENCIA => 'Experiencia',
            self::RESPONSABILIDAD => 'Responsabilidad',
            self::EXTRAVERSION => 'Extraversión',
            self::AMABILIDAD => 'Amabilidad',
            self::EMOCIONAL => 'Emocional',
        };
    }

    public function oceanLetter(): string
    {
        return match ($this) {
            self::EXPERIENCIA => 'O',
            self::RESPONSABILIDAD => 'C',
            self::EXTRAVERSION => 'E',
            self::AMABILIDAD => 'A',
            self::EMOCIONAL => 'N',
        };
    }

    public function summary(): string
    {
        return match ($this) {
            self::EXPERIENCIA => 'Explora curiosidad, imaginación y apertura ante ideas, estímulos y experiencias nuevas.',
            self::RESPONSABILIDAD => 'Mide orden, constancia, planificación y capacidad para sostener compromisos.',
            self::EXTRAVERSION => 'Describe cuánto disfrutas la interacción social, la iniciativa y los contextos estimulantes.',
            self::AMABILIDAD => 'Resume empatía, cooperación, confianza interpersonal y sensibilidad hacia los demás.',
            self::EMOCIONAL => 'En Disperson se interpreta como estabilidad emocional: calma, regulación y respuesta ante la presión.',
        };
    }

    public function lowAnchor(): string
    {
        return match ($this) {
            self::EXPERIENCIA => 'Preferencia por lo conocido',
            self::RESPONSABILIDAD => 'Más improvisación',
            self::EXTRAVERSION => 'Mayor reserva social',
            self::AMABILIDAD => 'Más franqueza y confrontación',
            self::EMOCIONAL => 'Mayor reactividad emocional',
        };
    }

    public function highAnchor(): string
    {
        return match ($this) {
            self::EXPERIENCIA => 'Curiosidad y exploración',
            self::RESPONSABILIDAD => 'Orden y constancia',
            self::EXTRAVERSION => 'Energía social e iniciativa',
            self::AMABILIDAD => 'Empatía y cooperación',
            self::EMOCIONAL => 'Calma y regulación',
        };
    }

    public function description(int $score): string
    {
        $isHigh = $score >= 50;

        return match ($this) {
            self::EXPERIENCIA => $isHigh
                ? 'Exploras ideas nuevas con facilidad y sueles conectar creatividad, curiosidad y ganas de experimentar.'
                : 'Prefieres lo familiar y estable. Tiendes a apoyarte en rutinas claras y métodos probados para sentir control.',
            self::RESPONSABILIDAD => $isHigh
                ? 'Tiendes a planificar, sostener compromisos y mantener el foco incluso cuando el trabajo exige constancia.'
                : 'Funcionas mejor con flexibilidad y margen para improvisar. La estructura rígida no siempre es tu mejor contexto.',
            self::EXTRAVERSION => $isHigh
                ? 'La interacción social suele recargarte. Tomas iniciativa con naturalidad y te mueves bien en entornos activos.'
                : 'Encuentras energía en espacios tranquilos, conversaciones profundas y ritmos menos expuestos.',
            self::AMABILIDAD => $isHigh
                ? 'Tiendes a cuidar el clima interpersonal, colaborar y mostrar empatía cuando otros necesitan apoyo.'
                : 'Sueles priorizar franqueza, criterio propio y decisiones directas antes que la diplomacia constante.',
            self::EMOCIONAL => $isHigh
                ? 'Mantienes una base emocional estable y acostumbras a responder con calma incluso bajo presión.'
                : 'Vives las emociones con más intensidad, lo que puede exigirte más regulación, pero también aporta sensibilidad.',
        };
    }

    public function scoreFor(User $user): int
    {
        return match ($this) {
            self::EXPERIENCIA => $user->getExperiencia(),
            self::RESPONSABILIDAD => $user->getResponsabilidad(),
            self::EXTRAVERSION => $user->getExtraversion(),
            self::AMABILIDAD => $user->getAmabilidad(),
            self::EMOCIONAL => $user->getEmocional(),
        };
    }

    public function applyTo(User $user, int $score): void
    {
        match ($this) {
            self::EXPERIENCIA => $user->setExperiencia($score),
            self::RESPONSABILIDAD => $user->setResponsabilidad($score),
            self::EXTRAVERSION => $user->setExtraversion($score),
            self::AMABILIDAD => $user->setAmabilidad($score),
            self::EMOCIONAL => $user->setEmocional($score),
        };
    }

    public function levelForScore(int $score): int
    {
        return match (true) {
            $score <= 20 => 1,
            $score <= 40 => 2,
            $score <= 60 => 3,
            $score <= 80 => 4,
            default => 5,
        };
    }

    public static function choices(): array
    {
        $choices = [];

        foreach (self::cases() as $trait) {
            $choices[$trait->label()] = $trait->value;
        }

        return $choices;
    }
}
