<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[ORM\Column]
    private ?int $experiencia = null;

    #[ORM\Column]
    private ?int $responsabilidad = null;

    #[ORM\Column]
    private ?int $extraversion = null;

    #[ORM\Column]
    private ?int $emocional = null;

    #[ORM\Column]
    private ?int $amabilidad = null;

    // Getters and setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;
        return $this;
    }

    public function getExperiencia(): ?int
    {
        return $this->experiencia;
    }

    public function setExperiencia(int $experiencia): static
    {
        $this->experiencia = $experiencia;
        return $this;
    }

    public function getResponsabilidad(): ?int
    {
        return $this->responsabilidad;
    }

    public function setResponsabilidad(int $responsabilidad): static
    {
        $this->responsabilidad = $responsabilidad;
        return $this;
    }

    public function getExtraversion(): ?int
    {
        return $this->extraversion;
    }

    public function setExtraversion(int $extraversion): static
    {
        $this->extraversion = $extraversion;
        return $this;
    }

    public function getEmocional(): ?int
    {
        return $this->emocional;
    }

    public function setEmocional(int $emocional): static
    {
        $this->emocional = $emocional;
        return $this;
    }

    public function getAmabilidad(): ?int
    {
        return $this->amabilidad;
    }

    public function setAmabilidad(int $amabilidad): static
    {
        $this->amabilidad = $amabilidad;
        return $this;
    }

    // Método que determina si la pregunta es inversa
    public function isInverse(): bool
    {
        // Verificamos si alguna de las columnas tiene el valor -1
        if ($this->experiencia === -1 || $this->responsabilidad === -1 || $this->extraversion === -1 || $this->emocional === -1 || $this->amabilidad === -1) {
            return true; // La pregunta es inversa
        }

        return false; // La pregunta no es inversa
    }
}
