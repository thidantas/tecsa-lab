import { nexoIdentity } from '@/brands/nexo/identity';
import { vitaIdentity } from '@/brands/vita/identity';

import type { BrandId, BrandIdentity } from './types';

const identities: Record<BrandId, BrandIdentity> = {
  vita: vitaIdentity,
  nexo: nexoIdentity,
};

export function resolveIdentity(brandId: BrandId): BrandIdentity {
  return identities[brandId] ?? vitaIdentity;
}
