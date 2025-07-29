<?php

namespace App\Controller\Front\Security;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class RegisterController extends AbstractController
{
    #[Route(path: '/register', name: 'app_register')]
    public function register(): Response
    {
        return $this->render('security/register.html.twig');
    }
}