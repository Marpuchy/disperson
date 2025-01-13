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

    #[ORM\Column(length: 2555)]
    private ?string $content = null;

    #[ORM\Column(length: 255)]
    private ?string $attribute = null;

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

    public function getAttribute(): ?string
    {
        return $this->attribute;
    }

    public function setAttribute(string $attribute): static
    {
        $this->attribute = $attribute;

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
}
