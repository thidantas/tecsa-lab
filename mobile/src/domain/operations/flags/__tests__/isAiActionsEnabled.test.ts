import { isAiActionsEnabled } from '../isAiActionsEnabled';

describe('isAiActionsEnabled()', () => {
  it('should be fail-closed when flags are missing', () => {
    expect(isAiActionsEnabled()).toBe(false);
    expect(isAiActionsEnabled(null)).toBe(false);
  });

  it('should be on only when aiActions is exactly true', () => {
    expect(isAiActionsEnabled({ aiActions: true })).toBe(true);
    expect(isAiActionsEnabled({ aiActions: false })).toBe(false);
  });
});
