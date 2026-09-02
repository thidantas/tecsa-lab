import axios, { type AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { ApiError } from './ApiError';
import type { HttpClient, HttpRequestConfig } from './HttpClient';

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

export function createHttpClient(): HttpClient {
  const client = axios.create({
    baseURL: apiBaseUrl,
    timeout: 15_000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const path = error.config?.url ?? 'unknown';
        const status = error.response?.status;
        throw new ApiError(
          `API ${path} failed with ${status ?? 'network'}`,
          status,
          path,
        );
      }

      throw error;
    },
  );

  return {
    get<T>(path: string, config?: HttpRequestConfig) {
      return client
        .get<T>(path, config as AxiosRequestConfig)
        .then((response) => response.data);
    },
    post<T>(path: string, body?: unknown) {
      return client.post<T>(path, body).then((response) => response.data);
    },
    put<T>(path: string, body?: unknown) {
      return client.put<T>(path, body).then((response) => response.data);
    },
    patch<T>(path: string, body?: unknown) {
      return client.patch<T>(path, body).then((response) => response.data);
    },
    delete<T>(path: string) {
      return client.delete<T>(path).then((response) => response.data);
    },
  };
}
