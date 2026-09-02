import { createBox, createText } from '@shopify/restyle';

import type { Theme } from './placeholder-theme';

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
