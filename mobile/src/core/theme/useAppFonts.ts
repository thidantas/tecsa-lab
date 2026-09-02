import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { getFontSources } from './fonts';

void SplashScreen.preventAutoHideAsync();

export function useAppFonts() {
  const sources = getFontSources();
  const [loaded, error] = useFonts(sources);
  const ready = Object.keys(sources).length === 0 || loaded || Boolean(error);

  useEffect(() => {
    if (ready) {
      void SplashScreen.hideAsync();
    }
  }, [ready]);

  return ready;
}
