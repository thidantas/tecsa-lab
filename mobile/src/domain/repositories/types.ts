import type { AiActionsRepository } from './AiActionsRepository';
import type { FlagsRepository } from './FlagsRepository';
import type { HealthRepository } from './HealthRepository';
import type { PatientsRepository } from './PatientsRepository';

export type Repositories = {
  aiActions: AiActionsRepository;
  flags: FlagsRepository;
  health: HealthRepository;
  patients: PatientsRepository;
};
