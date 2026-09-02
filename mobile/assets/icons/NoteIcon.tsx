import Svg, { Path } from 'react-native-svg';

import type { IconBase } from './IconBase';

export function NoteIcon({ size = 24, iconColor = '#1A1F16' }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 8h8M8 12h8M8 16h5"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </Svg>
  );
}
