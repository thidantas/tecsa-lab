import type { PatientsRepository } from '@/domain/repositories/PatientsRepository';

import type { PatientsLocalStore } from '../sqliteApi/PatientsStore';
import { isRecoverableError } from './isRecoverableError';

export function createHybridPatientsRepository(
  remote: PatientsRepository,
  local: PatientsLocalStore,
): PatientsRepository {
  return {
    async list(query) {
      try {
        const items = await remote.list(query);
        await local.saveList(items);
        return items;
      } catch (error) {
        if (!isRecoverableError(error)) {
          throw error;
        }

        const cached = await local.list(query);
        if (cached.length > 0) {
          return cached;
        }

        if (query?.search) {
          const anyCached = await local.list();
          if (anyCached.length > 0) {
            return [];
          }
        }

        throw error;
      }
    },

    async getById(id) {
      try {
        const patient = await remote.getById(id);
        await local.saveDetail(patient);
        return patient;
      } catch (error) {
        if (!isRecoverableError(error)) {
          throw error;
        }

        const cached = await local.getById(id);
        if (cached) {
          return cached;
        }

        throw error;
      }
    },

    async updateNotes(id, notes) {
      const patient = await remote.updateNotes(id, notes);
      await local.saveDetail(patient);
      return patient;
    },
  };
}
