import { getDefaultBrandId, isBrandId } from '../env';

describe('getDefaultBrandId()', () => {
  const original = process.env.EXPO_PUBLIC_BRAND;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.EXPO_PUBLIC_BRAND;
      return;
    }

    process.env.EXPO_PUBLIC_BRAND = original;
  });

  it('should fall back to vita when the env is empty', () => {
    delete process.env.EXPO_PUBLIC_BRAND;
    expect(getDefaultBrandId()).toBe('vita');
  });

  it('should fall back to vita when the env is not a brand', () => {
    process.env.EXPO_PUBLIC_BRAND = 'acme';
    expect(getDefaultBrandId()).toBe('vita');
  });

  it('should accept nexo from the env', () => {
    process.env.EXPO_PUBLIC_BRAND = 'nexo';
    expect(getDefaultBrandId()).toBe('nexo');
  });

  it('should reject unknown ids', () => {
    expect(isBrandId('vita')).toBe(true);
    expect(isBrandId('nexo')).toBe(true);
    expect(isBrandId('acme')).toBe(false);
  });
});
