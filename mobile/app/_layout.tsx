import { StatusBar } from 'expo-status-bar';

import { BrandProvider } from '@/core/brand';
import { RootStack } from '@/core/navigation';
import { useAppFonts } from '@/core/theme';
import { QueryProvider } from '@/domain';
import { InfraProvider } from '@/infra';

export default function RootLayout() {
  const fontsReady = useAppFonts();

  if (!fontsReady) {
    return null;
  }

  return (
    <InfraProvider>
      <QueryProvider>
        <BrandProvider>
          <StatusBar style="dark" />
          <RootStack />
        </BrandProvider>
      </QueryProvider>
    </InfraProvider>
  );
}
