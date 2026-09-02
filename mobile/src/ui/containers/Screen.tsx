import type { ReactNode } from 'react';

import { useAppTheme } from '@/core/theme';
import { useAppSafeArea } from '@/hooks';

import { Box } from '../components/Box';

type ScreenProps = {
  children: ReactNode;
  safeTop?: boolean;
};

export function Screen({ children, safeTop = false }: ScreenProps) {
  const { spacing } = useAppTheme();
  const { top, bottom, left, right } = useAppSafeArea();

  return (
    <Box
      flex={1}
      backgroundColor="background"
      gap="s16"
      style={{
        paddingTop: spacing.s24 + (safeTop ? top : 0),
        paddingRight: spacing.s24 + right,
        paddingBottom: spacing.s24 + bottom,
        paddingLeft: spacing.s24 + left,
      }}
    >
      {children}
    </Box>
  );
}
