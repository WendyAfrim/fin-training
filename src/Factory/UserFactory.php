<?php

namespace App\Factory;

use App\Entity\User;
use App\Interface\DtoInterface;
use App\Interface\FactoryInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFactory implements FactoryInterface
{
    public function __construct(
        private readonly UserPasswordHasherInterface $passwordHasher,
    )
    {
    }

    public function createFromDto(DtoInterface $registerUserDto): User
    {
        $user = new User();
        $user->setEmail($registerUserDto->email);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $registerUserDto->password
        );
        $user->setPassword($hashedPassword);

        // Set default roles
        $user->setRoles(['ROLE_USER']);

        return $user;
    }
}