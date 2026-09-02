import type { Repositories } from '@/domain/repositories/types';

import { createInMemoryAiActionsRepository } from '../repositories/inMemoryApi/AiActionsRepository';
import { createInMemoryFlagsRepository } from '../repositories/inMemoryApi/FlagsRepository';
import { createInMemoryHealthRepository } from '../repositories/inMemoryApi/HealthRepository';
import { createInMemoryPatientsRepository } from '../repositories/inMemoryApi/PatientsRepository';

export function createInMemoryProfile(): Repositories {
  return {
    aiActions: createInMemoryAiActionsRepository(),
    flags: createInMemoryFlagsRepository(),
    health: createInMemoryHealthRepository(),
    patients: createInMemoryPatientsRepository(),
  };
}
