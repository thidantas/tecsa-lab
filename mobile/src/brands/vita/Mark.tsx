import Svg, { Path } from 'react-native-svg';

import type { BrandMarkProps } from '../markProps';

const VIEW_W = 474;
const VIEW_H = 356;

export function VitaMark({ size = 24, color = '#4B7466' }: BrandMarkProps) {
  const scale = size / Math.max(VIEW_W, VIEW_H);

  return (
    <Svg
      width={VIEW_W * scale}
      height={VIEW_H * scale}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      fill="none"
    >
      <Path
        d="M226 355C53.7306 344.294 6 163.333 0 75C166.4 94.2 224 249 238 323C270.8 131 409.333 78.6667 473 75C482 168 403 366 226 355Z"
        fill={color}
      />
      <Path
        d="M318 73.5C318 114.093 282.854 147 239.5 147C196.146 147 161 114.093 161 73.5C161 32.9071 196.146 0 239.5 0C282.854 0 318 32.9071 318 73.5Z"
        fill={color}
      />
    </Svg>
  );
}
