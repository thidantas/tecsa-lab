import type { ReactNode } from 'react';

import { Box } from '../components/Box';
import { BrandLogo } from '../components/BrandLogo';
import { Text } from '../components/Text';

type ScreenHeaderProps = {
  subtitle?: string;
  title?: string;
  trailing?: ReactNode;
};

export function ScreenHeader({ subtitle, title, trailing }: ScreenHeaderProps) {
  return (
    <Box gap="s8">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {title ? <Text variant="title28">{title}</Text> : <BrandLogo />}
        {trailing}
      </Box>
      {subtitle ? (
        <Text variant="text14" color="textMuted">
          {subtitle}
        </Text>
      ) : null}
    </Box>
  );
}
