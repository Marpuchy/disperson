<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Domain\Personality\PersonalityTrait;
use App\Entity\Question;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;

final class AdminQuestionCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Question::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Pregunta')
            ->setEntityLabelInPlural('Preguntas')
            ->overrideTemplates([
                'crud/index' => 'admin/easyadmin_index.html.twig',
                'crud/new' => 'admin/easyadmin_new.html.twig',
                'crud/edit' => 'admin/easyadmin_edit.html.twig',
            ])
            ->setDefaultSort(['id' => 'ASC']);
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextareaField::new('content', 'Pregunta')
            ->setNumOfRows(3);
        yield ChoiceField::new('trait', 'Rasgo')
            ->setChoices(PersonalityTrait::choices());
        yield BooleanField::new('reverseScored', 'Puntuación inversa');
    }
}
