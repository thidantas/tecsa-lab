import { StatusBar } from 'expo-status-bar';

import { BrandSplash } from '@/brands/BrandSplash';
import { BrandProvider } from '@/core/brand';
import { RootStack } from '@/core/navigation';
import { useAppFonts } from '@/core/theme';
import { useBrandSplashHold } from '@/hooks';
import { QueryProvider } from '@/domain';
import { InfraProvider } from '@/infra';

export default function RootLayout() {
  const fontsReady = useAppFonts();
  const showBrandSplash = useBrandSplashHold(fontsReady);

  if (showBrandSplash) {
    return <BrandSplash />;
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
