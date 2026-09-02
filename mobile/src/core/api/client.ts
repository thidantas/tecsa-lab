import Constants from 'expo-constants';
import { Platform } from 'react-native';

function isLoopbackUrl(url: string) {
  return /localhost|127\.0\.0\.1/.test(url);
}

function hostFromMetro() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) {
    return undefined;
  }

  return hostUri.split(':')[0];
}

function resolveBaseUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

  if (fromEnv && !isLoopbackUrl(fromEnv)) {
    return fromEnv;
  }

  const metroHost = hostFromMetro();
  if (metroHost && Platform.OS !== 'web') {
    return `http://${metroHost}:9000`;
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:9000';
  }

  return fromEnv ?? 'http://localhost:9000';
}

export const apiBaseUrl = resolveBaseUrl();

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`API ${path} failed with ${response.status}`);
  }

  return (await response.json()) as T;
}
