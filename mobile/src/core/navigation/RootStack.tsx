import { useTheme } from '@shopify/restyle';
import { Stack } from 'expo-router';

import { useBrand } from '@/core/brand';
import type { Theme } from '@/core/theme';

export function RootStack() {
  const theme = useTheme<Theme>();
  const { identity } = useBrand();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: identity.copy.homeTitle }} />
      <Stack.Screen
        name="patients/[id]"
        options={{ title: identity.copy.patientDetailTitle }}
      />
    </Stack>
  );
}
