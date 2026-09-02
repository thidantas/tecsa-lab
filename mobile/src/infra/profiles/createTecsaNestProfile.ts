import type { Repositories } from '@/domain/repositories/types';

import { createHttpClient } from '../api/createHttpClient';
import { createTecsaNestAiActionsRepository } from '../repositories/tecsaNestApi/AiActionsRepository';
import { createTecsaNestFlagsRepository } from '../repositories/tecsaNestApi/FlagsRepository';
import { createTecsaNestHealthRepository } from '../repositories/tecsaNestApi/HealthRepository';
import { createTecsaNestPatientsRepository } from '../repositories/tecsaNestApi/PatientsRepository';

export function createTecsaNestProfile(): Repositories {
  const http = createHttpClient();

  return {
    aiActions: createTecsaNestAiActionsRepository(http),
    flags: createTecsaNestFlagsRepository(http),
    health: createTecsaNestHealthRepository(http),
    patients: createTecsaNestPatientsRepository(http),
  };
}
