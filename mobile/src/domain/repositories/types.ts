import type { FlagsRepository } from './FlagsRepository';
import type { HealthRepository } from './HealthRepository';
import type { PatientsRepository } from './PatientsRepository';

export type Repositories = {
  flags: FlagsRepository;
  health: HealthRepository;
  patients: PatientsRepository;
};
