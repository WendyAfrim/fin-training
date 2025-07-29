<?php

namespace App\Interface;

interface FactoryInterface
{
  public function createFromDto(DtoInterface $dto);
}