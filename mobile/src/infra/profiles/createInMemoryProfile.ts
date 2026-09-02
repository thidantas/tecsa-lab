import type { Repositories } from '@/domain/repositories/types';

import { createInMemoryFlagsRepository } from '../repositories/inMemoryApi/FlagsRepository';
import { createInMemoryHealthRepository } from '../repositories/inMemoryApi/HealthRepository';
import { createInMemoryPatientsRepository } from '../repositories/inMemoryApi/PatientsRepository';

export function createInMemoryProfile(): Repositories {
  return {
    flags: createInMemoryFlagsRepository(),
    health: createInMemoryHealthRepository(),
    patients: createInMemoryPatientsRepository(),
  };
}
