import type { HealthRepository } from './HealthRepository';
import type { PatientsRepository } from './PatientsRepository';

export type Repositories = {
  health: HealthRepository;
  patients: PatientsRepository;
};
