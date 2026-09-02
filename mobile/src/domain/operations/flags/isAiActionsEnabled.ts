import type { FeatureFlags } from '../../models/flags';

export function isAiActionsEnabled(flags?: FeatureFlags | null) {
  return flags?.aiActions === true;
}
