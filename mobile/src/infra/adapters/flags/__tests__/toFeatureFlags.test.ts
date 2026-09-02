import { toFeatureFlags } from '../toFeatureFlags';

describe('toFeatureFlags()', () => {
  it('should map ai_actions true to the domain flag', () => {
    expect(toFeatureFlags({ flags: { ai_actions: true } })).toEqual({
      aiActions: true,
    });
  });

  it('should be fail-closed when the key is missing or false', () => {
    expect(toFeatureFlags({ flags: {} })).toEqual({ aiActions: false });
    expect(toFeatureFlags({ flags: { ai_actions: false } })).toEqual({
      aiActions: false,
    });
  });
});
