import type { FeatureFlags } from '@/domain/models/flags';
import type { PatientListItem } from '@/domain/models/patients';
import type { Repositories } from '@/domain/repositories/types';

import { aiActions, flagsOn, patientDetail, patientList } from '../fixtures';

type PatientsOptions = {
  items?: PatientListItem[];
};

type FlagsOptions = {
  flags?: FeatureFlags;
};

export function createMockPatientsRepository(
  options: PatientsOptions = {},
): Repositories['patients'] {
  const items = options.items ?? patientList;

  return {
    list: jest.fn(async (query) => {
      const search = query?.search?.trim().toLowerCase();

      if (!search) {
        return items;
      }

      return items.filter((patient) =>
        patient.name.toLowerCase().includes(search),
      );
    }),
    getById: jest.fn(async (id) => {
      const match = items.find((patient) => patient.id === id);

      if (!match) {
        throw new Error(`Patient ${id} not found`);
      }

      return { ...patientDetail, ...match };
    }),
    updateNotes: jest.fn(async (id, notes) => ({
      ...patientDetail,
      id,
      notes: notes.trim() || null,
    })),
  };
}

export function createMockFlagsRepository(
  options: FlagsOptions = {},
): Repositories['flags'] {
  return {
    list: jest.fn(async () => options.flags ?? flagsOn),
  };
}

export function createMockAiActionsRepository(): Repositories['aiActions'] {
  return {
    generate: jest.fn(async () => aiActions),
  };
}

export function createMockHealthRepository(): Repositories['health'] {
  return {
    getHealth: jest.fn(async () => ({
      status: 'ok' as const,
      database: 'up' as const,
    })),
  };
}

export function createTestRepositories(
  overrides: Partial<Repositories> = {},
): Repositories {
  return {
    patients: createMockPatientsRepository(),
    flags: createMockFlagsRepository(),
    aiActions: createMockAiActionsRepository(),
    health: createMockHealthRepository(),
    ...overrides,
  };
}
