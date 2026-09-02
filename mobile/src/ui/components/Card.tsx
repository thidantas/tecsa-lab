import type { ComponentProps } from 'react';

import { Box } from './Box';

type CardProps = ComponentProps<typeof Box>;

export function Card({ children, ...props }: CardProps) {
  return (
    <Box
      backgroundColor="surface"
      borderRadius="default"
      padding="s16"
      borderColor="border"
      borderWidth={1}
      {...props}
    >
      {children}
    </Box>
  );
}
