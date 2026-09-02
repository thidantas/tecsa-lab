import type { ReactNode } from "react";

import { Box } from "../components/Box";

type ScreenProps = {
  children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
  return (
    <Box flex={1} backgroundColor="background" padding="s24" gap="s16">
      {children}
    </Box>
  );
}
