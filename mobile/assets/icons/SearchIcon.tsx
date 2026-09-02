import Svg, { Path } from 'react-native-svg';

import type { IconBase } from './IconBase';

export function SearchIcon({ size = 24, iconColor = '#1A1F16' }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m21 21-4.35-4.35"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
