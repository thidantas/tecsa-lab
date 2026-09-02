import { ThemeProvider } from '@shopify/restyle';
import { createContext, useMemo, useState, type ReactNode } from 'react';

import { resolveTheme } from '@/core/theme';

import { getDefaultBrandId } from './env';
import { resolveIdentity } from './resolveIdentity';
import type { BrandId, BrandService } from './types';

export const BrandContext = createContext<BrandService | null>(null);

type BrandProviderProps = {
  children: ReactNode;
};

export function BrandProvider({ children }: BrandProviderProps) {
  const [brandId, setBrandId] = useState<BrandId>(getDefaultBrandId);
  const theme = resolveTheme(brandId);
  const identity = resolveIdentity(brandId);

  const brand = useMemo<BrandService>(
    () => ({ brandId, setBrandId, identity }),
    [brandId, identity],
  );

  return (
    <BrandContext.Provider value={brand}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrandContext.Provider>
  );
}
