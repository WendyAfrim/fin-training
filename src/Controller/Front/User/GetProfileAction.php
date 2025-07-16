<?php

namespace App\Controller\Front\User;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class GetProfileAction extends AbstractController
{
    #[Route(path:'profile', name:'profile', methods: 'GET')]
    public function __invoke(): Response
    {
        return $this->render('user/profile.html.twig');
    }
}