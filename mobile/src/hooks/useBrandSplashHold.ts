import { useEffect, useState } from 'react';

const HOLD_MS = 900;

export function useBrandSplashHold(fontsReady: boolean) {
  const [minElapsed, setMinElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinElapsed(true);
    }, HOLD_MS);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return !fontsReady || !minElapsed;
}
