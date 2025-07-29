<?php

namespace App\Persister;

use Doctrine\ORM\EntityManagerInterface;

class EntityPersister
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    ){}
    public function save($object): void
    {
        $this->entityManager->persist($object);
        $this->entityManager->flush();
    }
}