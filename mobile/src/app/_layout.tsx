import { ThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { placeholderTheme } from '@/core/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={placeholderTheme}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: placeholderTheme.colors.background },
          headerTintColor: placeholderTheme.colors.text,
          contentStyle: { backgroundColor: placeholderTheme.colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Tecsa Lab' }} />
        <Stack.Screen name="patients/[id]" options={{ title: 'Paciente' }} />
      </Stack>
    </ThemeProvider>
  );
}
