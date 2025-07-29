<?php

namespace App\Dto;

use App\Interface\DtoInterface;
use Symfony\Component\Validator\Constraints as Assert;

class RegisterUserDto implements DtoInterface
{
    #[Assert\NotBlank(message: "L'email est requis")]
    #[Assert\Email(message: "L'email est invalide")]
    public string $email = "";

    #[Assert\NotBlank(message: 'Le mot de passe est requis')]
    #[Assert\Length(min: 5, minMessage: 'Le mot de passe doit faire minimum 5 caractères')]
    public string $password = "";
}