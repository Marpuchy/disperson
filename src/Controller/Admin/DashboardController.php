<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\Character;
use App\Entity\Question;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[IsGranted(User::ROLE_ADMIN)]
final class DashboardController extends AbstractDashboardController
{
    public function __construct(
        private readonly AdminUrlGenerator $adminUrlGenerator,
    ) {
    }

    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $url = $this->adminUrlGenerator
            ->setController(AdminQuestionCrudController::class)
            ->generateUrl();

        return $this->redirect($url);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Disperson Admin | Banco de preguntas y personajes');
    }

    public function configureCrud(): Crud
    {
        return Crud::new()
            ->overrideTemplates([
                'crud/index' => 'admin/easyadmin_index.html.twig',
                'crud/new' => 'admin/easyadmin_new.html.twig',
                'crud/edit' => 'admin/easyadmin_edit.html.twig',
            ]);
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToRoute('Sitio público', 'fa fa-home', 'app_home');
        yield MenuItem::section('Contenido');
        yield MenuItem::linkToCrud('Banco de preguntas', 'fa fa-list-check', Question::class);
        yield MenuItem::linkToCrud('Personajes y niveles', 'fa fa-user-astronaut', Character::class);
    }
}
