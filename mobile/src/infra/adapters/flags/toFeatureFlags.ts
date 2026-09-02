import type { FeatureFlags } from '@/domain/models/flags';

import type { FlagsDto } from './flagsDto';

export function toFeatureFlags(dto: FlagsDto): FeatureFlags {
  return {
    aiActions: dto.flags.ai_actions === true,
  };
}
