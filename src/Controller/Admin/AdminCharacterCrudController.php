<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Domain\Personality\PersonalityTrait;
use App\Entity\Character;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

final class AdminCharacterCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Character::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Personaje')
            ->setEntityLabelInPlural('Personajes')
            ->overrideTemplates([
                'crud/index' => 'admin/easyadmin_index.html.twig',
                'crud/new' => 'admin/easyadmin_new.html.twig',
                'crud/edit' => 'admin/easyadmin_edit.html.twig',
            ])
            ->setDefaultSort(['stat' => 'ASC', 'level' => 'ASC']);
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('name', 'Nombre');
        yield ChoiceField::new('stat', 'Rasgo')
            ->setChoices(PersonalityTrait::choices());
        yield IntegerField::new('level', 'Nivel');
        yield TextareaField::new('description', 'Descripción')
            ->setNumOfRows(6);
    }
}
