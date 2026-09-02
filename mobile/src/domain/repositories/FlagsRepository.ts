import type { FeatureFlags } from '../models/flags';

export type FlagsRepository = {
  list(): Promise<FeatureFlags>;
};
