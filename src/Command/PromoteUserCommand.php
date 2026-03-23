<?php

declare(strict_types=1);

namespace App\Command;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:user:promote-admin',
    description: 'Concede ROLE_ADMIN a un usuario existente.',
)]
final class PromoteUserCommand extends Command
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->addArgument('email', InputArgument::REQUIRED, 'Email del usuario a promover.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $email = mb_strtolower(trim((string) $input->getArgument('email')));
        $user = $this->userRepository->findOneBy(['email' => $email]);

        if (!$user instanceof User) {
            $io->error(sprintf('No se ha encontrado ningún usuario con email "%s".', $email));

            return Command::FAILURE;
        }

        $roles = $user->getRoles();
        $roles[] = User::ROLE_ADMIN;
        $user->setRoles($roles);

        $this->entityManager->flush();

        $io->success(sprintf('El usuario %s ahora tiene ROLE_ADMIN.', $email));

        return Command::SUCCESS;
    }
}
