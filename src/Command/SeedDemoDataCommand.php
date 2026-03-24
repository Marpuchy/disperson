<?php

declare(strict_types=1);

namespace App\Command;

use App\Domain\Personality\PersonalityTrait;
use App\Entity\Character;
use App\Entity\Question;
use App\Entity\User;
use App\Repository\CharacterRepository;
use App\Repository\QuestionRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:seed-demo-data',
    description: 'Carga preguntas demo del modelo OCEAN, asociaciones de personajes y un usuario demo para instalaciones limpias.',
)]
final class SeedDemoDataCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly QuestionRepository $questionRepository,
        private readonly CharacterRepository $characterRepository,
        private readonly UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->addOption('refresh', null, InputOption::VALUE_NONE, 'Elimina preguntas y personajes actuales antes de sembrar.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $refresh = (bool) $input->getOption('refresh');

        if ($refresh) {
            $this->resetSeedData();
            $io->note('Se han limpiado preguntas y personajes existentes.');
        }

        if ($this->questionRepository->count([]) === 0) {
            foreach ($this->questionDefinitions() as $definition) {
                $question = new Question();
                $question
                    ->setContent($definition['content'])
                    ->setTrait($definition['trait']->value)
                    ->setReverseScored($definition['reverse']);

                $this->entityManager->persist($question);
            }

            $io->text('Preguntas demo cargadas en la base de datos.');
        } else {
            $io->text('Preguntas existentes detectadas. No se han duplicado.');
        }

        if ($this->characterRepository->count([]) === 0) {
            foreach ($this->characterDefinitions() as $definition) {
                $character = new Character();
                $character
                    ->setName($definition['name'])
                    ->setDescription($definition['description'])
                    ->setStat($definition['trait']->value)
                    ->setLevel($definition['level']);

                $this->entityManager->persist($character);
            }

            $io->text('Asociaciones demo de personajes cargadas.');
        } else {
            $io->text('Personajes existentes detectados. No se han duplicado.');
        }

        $demoUser = $this->userRepository->findOneBy(['email' => 'prueba@prueba.com']) ?? new User();
        $demoUser
            ->setEmail('prueba@prueba.com')
            ->setUsername('Cuenta demo')
            ->setRoles([]);
        $demoUser->setPassword($this->passwordHasher->hashPassword($demoUser, 'prueba'));

        $this->entityManager->persist($demoUser);
        $this->entityManager->flush();

        $io->success('Datos demo listos. Usuario: prueba@prueba.com / contraseña: prueba');
        $io->note('Si quieres restaurar el set oficial de preguntas o ajustar personajes, puedes hacerlo desde el panel admin.');

        return Command::SUCCESS;
    }

    private function resetSeedData(): void
    {
        $connection = $this->entityManager->getConnection();
        $platform = $connection->getDatabasePlatform()->getName();

        if ($platform === 'sqlite') {
            $connection->executeStatement('DELETE FROM question');
            $connection->executeStatement('DELETE FROM "character"');
            $connection->executeStatement("DELETE FROM sqlite_sequence WHERE name IN ('question', 'character')");

            return;
        }

        if ($platform === 'postgresql') {
            $connection->executeStatement('TRUNCATE TABLE question RESTART IDENTITY CASCADE');
            $connection->executeStatement('TRUNCATE TABLE "character" RESTART IDENTITY CASCADE');

            return;
        }

        $this->entityManager->createQuery('DELETE FROM App\Entity\Question question')->execute();
        $this->entityManager->createQuery('DELETE FROM App\Entity\Character character')->execute();
    }

    /**
     * @return list<array{content: string, trait: PersonalityTrait, reverse: bool}>
     */
    private function questionDefinitions(): array
    {
        return [
            ['content' => 'Disfruto explorando ideas nuevas aunque todavía no las domine.', 'trait' => PersonalityTrait::EXPERIENCIA, 'reverse' => false],
            ['content' => 'Prefiero evitar cambios si ya tengo una rutina que funciona.', 'trait' => PersonalityTrait::EXPERIENCIA, 'reverse' => true],
            ['content' => 'Me atraen los enfoques creativos incluso en tareas prácticas.', 'trait' => PersonalityTrait::EXPERIENCIA, 'reverse' => false],
            ['content' => 'Normalmente organizo mis tareas antes de empezar.', 'trait' => PersonalityTrait::RESPONSABILIDAD, 'reverse' => false],
            ['content' => 'Me cuesta mantener el orden cuando la semana se complica.', 'trait' => PersonalityTrait::RESPONSABILIDAD, 'reverse' => true],
            ['content' => 'Cumplo plazos incluso cuando la tarea no me motiva.', 'trait' => PersonalityTrait::RESPONSABILIDAD, 'reverse' => false],
            ['content' => 'Me resulta fácil iniciar conversaciones con personas nuevas.', 'trait' => PersonalityTrait::EXTRAVERSION, 'reverse' => false],
            ['content' => 'Prefiero observar antes que participar cuando hay mucha gente.', 'trait' => PersonalityTrait::EXTRAVERSION, 'reverse' => true],
            ['content' => 'Suelo aportar energía cuando trabajo en grupo.', 'trait' => PersonalityTrait::EXTRAVERSION, 'reverse' => false],
            ['content' => 'Intento entender a los demás antes de responder.', 'trait' => PersonalityTrait::AMABILIDAD, 'reverse' => false],
            ['content' => 'Si hace falta, priorizo la verdad aunque incomode.', 'trait' => PersonalityTrait::AMABILIDAD, 'reverse' => true],
            ['content' => 'Me sale de forma natural ayudar cuando alguien se bloquea.', 'trait' => PersonalityTrait::AMABILIDAD, 'reverse' => false],
            ['content' => 'Mantengo la calma incluso cuando las cosas se tuercen.', 'trait' => PersonalityTrait::EMOCIONAL, 'reverse' => false],
            ['content' => 'El estrés me afecta con facilidad más de lo que me gustaría.', 'trait' => PersonalityTrait::EMOCIONAL, 'reverse' => true],
            ['content' => 'Puedo recuperar el foco después de un momento tenso.', 'trait' => PersonalityTrait::EMOCIONAL, 'reverse' => false],
        ];
    }

    /**
     * @return list<array{name: string, description: string, trait: PersonalityTrait, level: int}>
     */
    private function characterDefinitions(): array
    {
        return [
            ['name' => 'Gastón', 'description' => 'Una referencia visual para aperturas bajas: seguridad en lo conocido, confianza en lo probado y poca necesidad de experimentar.', 'trait' => PersonalityTrait::EXPERIENCIA, 'level' => 1],
            ['name' => 'Bob Esponja', 'description' => 'Asociación visual demo para una apertura algo más flexible y curiosa. Este asset se conserva como legado del repositorio.', 'trait' => PersonalityTrait::EXPERIENCIA, 'level' => 2],
            ['name' => 'Hércules', 'description' => 'Representa una combinación equilibrada entre probar cosas nuevas y mantener cierta dirección clara.', 'trait' => PersonalityTrait::EXPERIENCIA, 'level' => 3],
            ['name' => 'Aladdín', 'description' => 'Refuerza una lectura de exploración, iniciativa y gusto por salir del marco habitual.', 'trait' => PersonalityTrait::EXPERIENCIA, 'level' => 4],
            ['name' => 'Elsa', 'description' => 'Se usa como capa visual para aperturas muy altas: imaginación, exploración y sensibilidad hacia lo novedoso.', 'trait' => PersonalityTrait::EXPERIENCIA, 'level' => 5],
            ['name' => 'Dory', 'description' => 'Ilustra una responsabilidad baja en clave demo: espontaneidad alta y menos estructura sostenida.', 'trait' => PersonalityTrait::RESPONSABILIDAD, 'level' => 1],
            ['name' => 'Peter Pan', 'description' => 'Refleja una tendencia a priorizar libertad y flexibilidad frente a procesos demasiado rígidos.', 'trait' => PersonalityTrait::RESPONSABILIDAD, 'level' => 2],
            ['name' => 'Rapunzel', 'description' => 'Expresa un punto medio donde conviven curiosidad, energía y una base razonable de organización.', 'trait' => PersonalityTrait::RESPONSABILIDAD, 'level' => 3],
            ['name' => 'Mufasa', 'description' => 'Funciona como metáfora de orden, constancia y sentido del deber.', 'trait' => PersonalityTrait::RESPONSABILIDAD, 'level' => 4],
            ['name' => 'Tiana', 'description' => 'Representa responsabilidad alta: disciplina, perseverancia y foco en el objetivo.', 'trait' => PersonalityTrait::RESPONSABILIDAD, 'level' => 5],
            ['name' => 'Winnie the Pooh', 'description' => 'Se asocia a una extraversión baja, con preferencia por ritmos tranquilos y entornos seguros.', 'trait' => PersonalityTrait::EXTRAVERSION, 'level' => 1],
            ['name' => 'Ralph', 'description' => 'Sugiere una sociabilidad moderada, todavía reservada en ciertos contextos.', 'trait' => PersonalityTrait::EXTRAVERSION, 'level' => 2],
            ['name' => 'Simba', 'description' => 'Marca un equilibrio entre escucha, presencia y toma de iniciativa social.', 'trait' => PersonalityTrait::EXTRAVERSION, 'level' => 3],
            ['name' => 'Ariel', 'description' => 'Ilustra una extraversión alta, curiosa y muy orientada a la interacción.', 'trait' => PersonalityTrait::EXTRAVERSION, 'level' => 4],
            ['name' => 'Genio', 'description' => 'Se usa para niveles muy altos de extraversión: energía social, expresividad e iniciativa.', 'trait' => PersonalityTrait::EXTRAVERSION, 'level' => 5],
            ['name' => 'Scar', 'description' => 'Aporta una referencia visual para amabilidad baja: dureza, confrontación y poca orientación al consenso.', 'trait' => PersonalityTrait::AMABILIDAD, 'level' => 1],
            ['name' => 'Maléfica', 'description' => 'Representa una amabilidad todavía baja, más defensiva y distante en lo interpersonal.', 'trait' => PersonalityTrait::AMABILIDAD, 'level' => 2],
            ['name' => 'Buzz Lightyear', 'description' => 'Se interpreta como un punto medio entre criterio propio, cooperación y confianza en el grupo.', 'trait' => PersonalityTrait::AMABILIDAD, 'level' => 3],
            ['name' => 'Bella', 'description' => 'Refuerza una lectura de empatía, interés por los demás y trato considerado.', 'trait' => PersonalityTrait::AMABILIDAD, 'level' => 4],
            ['name' => 'Cenicienta', 'description' => 'Se usa como capa visual para amabilidad alta: paciencia, cooperación y sensibilidad interpersonal.', 'trait' => PersonalityTrait::AMABILIDAD, 'level' => 5],
            ['name' => 'Hades', 'description' => 'Aterriza visualmente una estabilidad emocional baja: reactividad alta y más dificultad para regular la presión.', 'trait' => PersonalityTrait::EMOCIONAL, 'level' => 1],
            ['name' => 'Donald', 'description' => 'Refleja una estabilidad todavía baja, con respuesta emocional rápida y visible.', 'trait' => PersonalityTrait::EMOCIONAL, 'level' => 2],
            ['name' => 'Kristoff', 'description' => 'Representa un punto medio de estabilidad emocional: sensibilidad con capacidad razonable de sostén.', 'trait' => PersonalityTrait::EMOCIONAL, 'level' => 3],
            ['name' => 'Hércules', 'description' => 'Sirve como asociación visual de estabilidad alta: resistencia y buena regulación bajo presión.', 'trait' => PersonalityTrait::EMOCIONAL, 'level' => 4],
            ['name' => 'Mufasa', 'description' => 'Cierra la escala como imagen de estabilidad emocional muy alta: calma, solidez y perspectiva.', 'trait' => PersonalityTrait::EMOCIONAL, 'level' => 5],
        ];
    }
}
