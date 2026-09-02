import type { FlagsRepository } from '@/domain/repositories/FlagsRepository';

import type { FlagsDto } from '../../adapters/flags/flagsDto';
import { toFeatureFlags } from '../../adapters/flags/toFeatureFlags';
import type { HttpClient } from '../../api/HttpClient';

export function createTecsaNestFlagsRepository(
  http: HttpClient,
): FlagsRepository {
  return {
    async list() {
      const dto = await http.get<FlagsDto>('/v1/flags');
      return toFeatureFlags(dto);
    },
  };
}
