import {
  backgroundColor,
  border,
  createBox,
  createRestyleComponent,
  layout,
  spacing,
  spacingShorthand,
  type BackgroundColorProps,
  type BorderProps,
  type LayoutProps,
  type SpacingProps,
  type SpacingShorthandProps,
} from '@shopify/restyle';
import {
  TouchableOpacity as RNTouchableOpacity,
  type TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native';

import type { Theme } from '@/core/theme';

export const Box = createBox<Theme>();

type RestyleTypes = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

export type TouchableOpacityBoxProps = RNTouchableOpacityProps & RestyleTypes;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  RNTouchableOpacity,
);
