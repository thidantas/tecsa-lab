import Svg, { Path } from 'react-native-svg';

import type { IconBase } from './IconBase';

export function UsersIcon({ size = 24, iconColor = '#1A1F16' }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.5 19a5.5 5.5 0 0 1 11 0"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 10.5a3 3 0 1 0 0-5"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 19a5 5 0 0 1 5.5-4.7"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
