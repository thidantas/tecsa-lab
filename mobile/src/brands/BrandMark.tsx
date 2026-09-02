import type { BrandId } from '@/core/brand/types';

import type { BrandMarkProps } from './markProps';
import { NexoMark } from './nexo/Mark';
import { VitaMark } from './vita/Mark';

const marks = {
  vita: VitaMark,
  nexo: NexoMark,
} as const;

type Props = BrandMarkProps & {
  brandId: BrandId;
};

export function BrandMark({ brandId, size, color }: Props) {
  const Mark = marks[brandId];

  return <Mark size={size} color={color} />;
}
