import type { Repositories } from '@/domain/repositories/types';

import { createInMemoryProfile } from './createInMemoryProfile';
import { createTecsaNestProfile } from './createTecsaNestProfile';
import { API_PROFILES, type ApiProfile } from './types';

function isApiProfile(value: string): value is ApiProfile {
  return API_PROFILES.includes(value as ApiProfile);
}

export function resolveApiProfile(): ApiProfile {
  const fromEnv = process.env.EXPO_PUBLIC_API_PROFILE;

  if (fromEnv && isApiProfile(fromEnv)) {
    return fromEnv;
  }

  return 'tecsaNest';
}

export function createInfra(
  profile: ApiProfile = resolveApiProfile(),
): Repositories {
  switch (profile) {
    case 'tecsaNest':
      return createTecsaNestProfile();
    case 'inMemory':
      return createInMemoryProfile();
  }
}
