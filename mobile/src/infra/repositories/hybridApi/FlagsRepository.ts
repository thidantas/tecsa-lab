import type { FlagsRepository } from '@/domain/repositories/FlagsRepository';

import type { FlagsLocalStore } from '../sqliteApi/FlagsStore';
import { isRecoverableError } from './isRecoverableError';

export function createHybridFlagsRepository(
  remote: FlagsRepository,
  local: FlagsLocalStore,
): FlagsRepository {
  return {
    async list() {
      try {
        const flags = await remote.list();
        await local.save(flags);
        return flags;
      } catch (error) {
        if (!isRecoverableError(error)) {
          throw error;
        }

        const cached = await local.get();
        if (cached) {
          return cached;
        }

        throw error;
      }
    },
  };
}
