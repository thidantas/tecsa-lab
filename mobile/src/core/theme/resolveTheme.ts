import { nexoColorPalette, nexoRadii } from '@/brands/nexo';
import { vitaColorPalette, vitaRadii } from '@/brands/vita';
import type { BrandId } from '@/core/brand/types';

import { createThemeFromPalette, type Theme } from './createThemeFromPalette';

const themes: Record<BrandId, Theme> = {
  vita: createThemeFromPalette(vitaColorPalette, vitaRadii),
  nexo: createThemeFromPalette(nexoColorPalette, nexoRadii),
};

const fallbackTheme = createThemeFromPalette();

export function resolveTheme(brandId: BrandId): Theme {
  return themes[brandId] ?? fallbackTheme;
}
