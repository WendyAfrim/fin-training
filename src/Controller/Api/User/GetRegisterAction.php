<?php

namespace App\Controller\Api\User;

use App\Dto\RegisterUserDto;
use App\Factory\UserFactory;
use App\Persister\EntityPersister;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class GetRegisterAction extends AbstractController
{
    public function __construct(
        private readonly UserFactory $userFactory,
        private readonly EntityPersister $entityPersister
    )
    {
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function __invoke(
        EntityManagerInterface               $entityManager,
        #[MapRequestPayload] RegisterUserDto $registerInputDto,
    ): JsonResponse {

        $user = $this->userFactory->createFromDto($registerInputDto);
        $this->entityPersister->save($user);

        return $this->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles()
            ]
        ], Response::HTTP_CREATED);
    }
}



