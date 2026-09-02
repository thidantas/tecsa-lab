import Svg, { Path } from 'react-native-svg';

import type { IconBase } from './IconBase';

export function CloseIcon({ size = 24, iconColor = '#1A1F16' }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 6 18 18M18 6 6 18"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </Svg>
  );
}
