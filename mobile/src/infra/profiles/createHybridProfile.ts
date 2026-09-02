import type { Repositories } from '@/domain/repositories/types';

import { createHttpClient } from '../api/createHttpClient';
import { createHybridFlagsRepository } from '../repositories/hybridApi/FlagsRepository';
import { createHybridPatientsRepository } from '../repositories/hybridApi/PatientsRepository';
import { createSqliteFlagsStore } from '../repositories/sqliteApi/FlagsStore';
import { createSqlitePatientsStore } from '../repositories/sqliteApi/PatientsStore';
import { createInMemoryAiActionsRepository } from '../repositories/inMemoryApi/AiActionsRepository';
import { createTecsaNestFlagsRepository } from '../repositories/tecsaNestApi/FlagsRepository';
import { createTecsaNestHealthRepository } from '../repositories/tecsaNestApi/HealthRepository';
import { createTecsaNestPatientsRepository } from '../repositories/tecsaNestApi/PatientsRepository';

export function createHybridProfile(): Repositories {
  const http = createHttpClient();
  const remotePatients = createTecsaNestPatientsRepository(http);
  const localPatients = createSqlitePatientsStore();

  return {
    aiActions: createInMemoryAiActionsRepository(),
    flags: createHybridFlagsRepository(
      createTecsaNestFlagsRepository(http),
      createSqliteFlagsStore(),
    ),
    health: createTecsaNestHealthRepository(http),
    patients: createHybridPatientsRepository(remotePatients, localPatients),
  };
}
