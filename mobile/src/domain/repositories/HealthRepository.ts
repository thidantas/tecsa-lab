import type { HealthStatus } from '../models/health';

export type HealthRepository = {
  getHealth(): Promise<HealthStatus>;
};
