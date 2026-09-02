import type { HealthRepository } from '@/domain/repositories/HealthRepository';

export function createInMemoryHealthRepository(): HealthRepository {
  return {
    getHealth() {
      return Promise.resolve({
        status: 'ok',
        database: 'up',
      });
    },
  };
}
