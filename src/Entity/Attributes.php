<?php

namespace App\Entity;

use App\Repository\AttributesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AttributesRepository::class)]
class Attributes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $O = null;

    #[ORM\Column]
    private ?int $C = null;

    #[ORM\Column]
    private ?int $E = null;

    #[ORM\Column]
    private ?int $A = null;

    #[ORM\Column]
    private ?int $N = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getO(): ?int
    {
        return $this->O;
    }

    public function setO(int $O): static
    {
        $this->O = $O;

        return $this;
    }

    public function getC(): ?int
    {
        return $this->C;
    }

    public function setC(int $C): static
    {
        $this->C = $C;

        return $this;
    }

    public function getE(): ?int
    {
        return $this->E;
    }

    public function setE(int $E): static
    {
        $this->E = $E;

        return $this;
    }

    public function getA(): ?int
    {
        return $this->A;
    }

    public function setA(int $A): static
    {
        $this->A = $A;

        return $this;
    }

    public function getN(): ?int
    {
        return $this->N;
    }

    public function setN(int $N): static
    {
        $this->N = $N;

        return $this;
    }
}
