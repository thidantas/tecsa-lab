import type { Repositories } from '@/domain/repositories/types';

import { createInMemoryHealthRepository } from '../repositories/inMemoryApi/HealthRepository';
import { createInMemoryPatientsRepository } from '../repositories/inMemoryApi/PatientsRepository';

export function createInMemoryProfile(): Repositories {
  return {
    health: createInMemoryHealthRepository(),
    patients: createInMemoryPatientsRepository(),
  };
}
