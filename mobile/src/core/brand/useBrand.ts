import { useContext } from 'react';

import { BrandContext } from './BrandProvider';
import type { BrandService } from './types';

export function useBrand(): BrandService {
  const brand = useContext(BrandContext);

  if (!brand) {
    throw new Error('useBrand must be used within BrandProvider');
  }

  return brand;
}
