import Svg, { Path } from 'react-native-svg';

import type { IconBase } from './IconBase';

export function CheckIcon({ size = 24, iconColor = '#1A1F16' }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m5 13 4 4L19 7"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
