<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class GetProfileAction extends AbstractController
{
    #[Route(path:'/api/profile', name: 'app_profile', methods: ['GET'])]
    public function index(
        Security $security,
        SerializerInterface $serializer
    ): JsonResponse
    {
        $user = $security->getUser();
        $data = $serializer->serialize($user, 'json');

        return new JsonResponse($data,
        200,
        [],
        true);

    }

}
