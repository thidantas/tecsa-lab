import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

import { getDefaultBrandId, resolveIdentity } from '@/core/brand';
import { resolveTheme } from '@/core/theme';

import { BrandMark } from './BrandMark';

export function BrandSplash() {
  const brandId = getDefaultBrandId();
  const theme = resolveTheme(brandId);
  const identity = resolveIdentity(brandId);

  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <BrandMark brandId={brandId} size={96} color={theme.colors.accent} />
      <Text
        style={{
          marginTop: 16,
          color: theme.colors.text,
          fontSize: 28,
          fontWeight: '700',
        }}
      >
        {identity.logo.wordmark}
      </Text>
    </View>
  );
}
