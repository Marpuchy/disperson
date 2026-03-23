<?php

declare(strict_types=1);

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'label' => 'Email',
                'attr' => [
                    'placeholder' => 'tu@email.com',
                ],
            ])
            ->add('username', TextType::class, [
                'label' => 'Nombre de usuario',
                'attr' => [
                    'placeholder' => 'Tu nombre visible',
                ],
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Las contraseñas deben coincidir.',
                'required' => true,
                'first_options' => [
                    'label' => 'Contraseña',
                    'attr' => [
                        'placeholder' => 'Mínimo 8 caracteres',
                    ],
                ],
                'second_options' => [
                    'label' => 'Repite la contraseña',
                    'attr' => [
                        'placeholder' => 'Repite tu contraseña',
                    ],
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
