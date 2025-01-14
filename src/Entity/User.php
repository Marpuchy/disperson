<?php
namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    // Atributos de los cuales se almacenan los valores
    #[ORM\Column]
    private ?int $experiencia = 0;

    #[ORM\Column]
    private ?int $responsabilidad = 0;

    #[ORM\Column]
    private ?int $extraversion = 0;

    #[ORM\Column]
    private ?int $amabilidad = 0;

    #[ORM\Column]
    private ?int $emocional = 0;


    public function __construct()
    {
        // Asignar valores predeterminados a los atributos
        $this->experiencia = 0;
        $this->responsabilidad = 0;
        $this->extraversion = 0;
        $this->amabilidad = 0;
        $this->emocional = 0;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER'; // Asegurando que el usuario tenga al menos el rol "ROLE_USER"
        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;
        return $this;
    }

    public function eraseCredentials(): void
    {
        // Borrar cualquier dato sensible que se almacene temporalmente en el usuario
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;
        return $this;
    }

    // Métodos para "experiencia"
    public function getExperiencia(): ?int
    {
        return $this->experiencia;
    }

    public function setExperiencia(int $experiencia): static
    {
        $this->experiencia = $experiencia;
        return $this;
    }

    // Métodos para "responsabilidad"
    public function getResponsabilidad(): ?int
    {
        return $this->responsabilidad;
    }

    public function setResponsabilidad(int $responsabilidad): static
    {
        $this->responsabilidad = $responsabilidad;
        return $this;
    }

    // Métodos para "extraversion"
    public function getExtraversion(): ?int
    {
        return $this->extraversion;
    }

    public function setExtraversion(int $extraversion): static
    {
        $this->extraversion = $extraversion;
        return $this;
    }

    // Métodos para "amabilidad"
    public function getAmabilidad(): ?int
    {
        return $this->amabilidad;
    }

    public function setAmabilidad(int $amabilidad): static
    {
        $this->amabilidad = $amabilidad;
        return $this;
    }

    // Métodos para "emocional"
    public function getEmocional(): ?int
    {
        return $this->emocional;
    }

    public function setEmocional(int $emocional): static
    {
        $this->emocional = $emocional;
        return $this;
    }

}
