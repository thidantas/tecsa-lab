import { useTheme } from '@shopify/restyle';

import type { Theme } from './createThemeFromPalette';

export function useAppTheme() {
  return useTheme<Theme>();
}
