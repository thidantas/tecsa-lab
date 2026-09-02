import { resolveIdentity } from '../resolveIdentity';

describe('resolveIdentity()', () => {
  it('should keep vita and nexo as distinct brands', () => {
    const vita = resolveIdentity('vita');
    const nexo = resolveIdentity('nexo');

    expect(vita.id).toBe('vita');
    expect(nexo.id).toBe('nexo');
    expect(vita.copy.appName).not.toBe(nexo.copy.appName);
    expect(vita.copy.homeGreeting).not.toBe(nexo.copy.homeGreeting);
    expect(vita.copy.aiActionsLabel).not.toBe(nexo.copy.aiActionsLabel);
  });

  it('should fall back to vita for an unknown id', () => {
    expect(resolveIdentity('acme' as 'vita').id).toBe('vita');
  });
});
