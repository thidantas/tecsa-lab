import { BRAND_IDS, type BrandId } from './types';

export function isBrandId(value: string): value is BrandId {
  return (BRAND_IDS as readonly string[]).includes(value);
}

export function getDefaultBrandId(): BrandId {
  const fromEnv = process.env.EXPO_PUBLIC_BRAND;

  if (fromEnv && isBrandId(fromEnv)) {
    return fromEnv;
  }

  return 'vita';
}
