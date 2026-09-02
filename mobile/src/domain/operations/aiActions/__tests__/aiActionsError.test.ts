import {
  isAiActionsForbidden,
  resolveAiActionsErrorCopy,
} from '../aiActionsError';

describe('aiActionsError()', () => {
  it('should treat HTTP 403 as the kill switch', () => {
    expect(isAiActionsForbidden({ status: 403 })).toBe(true);
    expect(isAiActionsForbidden({ status: 503 })).toBe(false);
    expect(isAiActionsForbidden(new Error('network'))).toBe(false);
  });

  it('should use the disabled copy on 403 and the fallback otherwise', () => {
    expect(
      resolveAiActionsErrorCopy({ status: 403 }, 'desligado', 'falhou'),
    ).toBe('desligado');
    expect(
      resolveAiActionsErrorCopy({ status: 500 }, 'desligado', 'falhou'),
    ).toBe('falhou');
  });
});
