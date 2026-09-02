import { Stack } from 'expo-router';

import { useBrand } from '@/core/brand';
import { useAppTheme } from '@/core/theme';

export function RootStack() {
  const { colors } = useAppTheme();
  const { identity } = useBrand();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: identity.copy.homeTitle }} />
      <Stack.Screen
        name="patients/index"
        options={{ title: identity.copy.patientsTitle }}
      />
      <Stack.Screen
        name="patients/[id]"
        options={{ title: identity.copy.patientDetailTitle }}
      />
    </Stack>
  );
}
