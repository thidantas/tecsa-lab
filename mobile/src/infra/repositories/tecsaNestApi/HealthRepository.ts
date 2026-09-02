import type { HealthRepository } from '@/domain/repositories/HealthRepository';

import { toHealthStatus } from '../../adapters/health/toHealthStatus';
import type { HealthDto } from '../../adapters/health/healthDto';
import type { HttpClient } from '../../api/HttpClient';

export function createTecsaNestHealthRepository(
  http: HttpClient,
): HealthRepository {
  return {
    async getHealth() {
      const dto = await http.get<HealthDto>('/health');
      return toHealthStatus(dto);
    },
  };
}
