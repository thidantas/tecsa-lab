import type { HealthStatus } from '@/domain/models/health';

import type { HealthDto } from './healthDto';

export function toHealthStatus(dto: HealthDto): HealthStatus {
  return {
    status: dto.status === 'ok' ? 'ok' : 'error',
    database: dto.database === 'up' ? 'up' : 'down',
  };
}
