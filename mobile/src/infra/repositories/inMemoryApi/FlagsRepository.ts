import type { FlagsRepository } from '@/domain/repositories/FlagsRepository';

export function createInMemoryFlagsRepository(): FlagsRepository {
  return {
    list() {
      return Promise.resolve({ aiActions: true });
    },
  };
}
