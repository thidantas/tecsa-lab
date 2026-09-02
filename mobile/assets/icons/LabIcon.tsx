import Svg, { Path } from 'react-native-svg';

import type { IconBase } from './IconBase';

export function LabIcon({ size = 24, iconColor = '#1A1F16' }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 3h6M10 3v5.2L5.2 18a1.6 1.6 0 0 0 1.4 2.3h10.8a1.6 1.6 0 0 0 1.4-2.3L14 8.2V3"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 14h8"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </Svg>
  );
}
