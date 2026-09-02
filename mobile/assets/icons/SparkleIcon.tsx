import Svg, { Path } from 'react-native-svg';

import type { IconBase } from './IconBase';

export function SparkleIcon({ size = 24, iconColor = '#1A1F16' }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m12 3 1.6 6.6L20 11l-6.4 1.4L12 19l-1.6-6.6L4 11l6.4-1.4L12 3Z"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
