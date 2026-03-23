<?php

declare(strict_types=1);

namespace App\Entity;

use App\Domain\Personality\PersonalityTrait;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'Ya existe una cuenta con este email.')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    public const ROLE_USER = 'ROLE_USER';
    public const ROLE_ADMIN = 'ROLE_ADMIN';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank(message: 'Introduce un email.')]
    #[Assert\Email(message: 'Introduce un email válido.')]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    #[Assert\NotBlank(message: 'Introduce una contraseña.')]
    #[Assert\Length(min: 8, minMessage: 'La contraseña debe tener al menos {{ limit }} caracteres.')]
    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(message: 'Introduce un nombre de usuario.')]
    #[Assert\Length(min: 3, max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column]
    private int $experiencia = 0;

    #[ORM\Column]
    private int $responsabilidad = 0;

    #[ORM\Column]
    private int $extraversion = 0;

    #[ORM\Column]
    private int $amabilidad = 0;

    #[ORM\Column]
    private int $emocional = 0;

    public function __toString(): string
    {
        return $this->username ?? $this->email ?? 'Usuario';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = mb_strtolower(trim($email));

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = self::ROLE_USER;

        return array_values(array_unique($roles));
    }

    public function setRoles(array $roles): self
    {
        $this->roles = array_values(array_unique($roles));

        return $this;
    }

    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function eraseCredentials(): void
    {
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = trim($username);

        return $this;
    }

    public function isAdmin(): bool
    {
        return in_array(self::ROLE_ADMIN, $this->getRoles(), true);
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

    public function getAmabilidad(): int
    {
        return $this->amabilidad;
    }

    public function setAmabilidad(int $amabilidad): self
    {
        $this->amabilidad = $amabilidad;

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

    /**
     * @return array<string, int>
     */
    public function getTraitScores(): array
    {
        $scores = [];

        foreach (PersonalityTrait::cases() as $trait) {
            $scores[$trait->value] = $trait->scoreFor($this);
        }

        return $scores;
    }
}
