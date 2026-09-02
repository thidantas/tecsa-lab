import { resolveTheme } from '../resolveTheme';

describe('resolveTheme()', () => {
  it('should resolve different palettes for vita and nexo', () => {
    const vita = resolveTheme('vita');
    const nexo = resolveTheme('nexo');

    expect(vita.colors.background).toBe('#FAFAF5');
    expect(nexo.colors.background).toBe('#F4F6F8');
    expect(vita.colors.accent).not.toBe(nexo.colors.accent);
  });

  it('should fall back to the default palette for an unknown id', () => {
    const theme = resolveTheme('acme' as 'vita');

    expect(theme.colors.background).toBe('#F4F1EA');
  });
});
