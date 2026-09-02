import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { getHealth } from '@/core/api/health';
import type { HealthResponse } from '@/core/api/types';
import { Box, Text } from '@/core/theme';

type HealthState =
  | { status: 'loading' }
  | { status: 'success'; data: HealthResponse }
  | { status: 'error'; message: string };

export default function HomeScreen() {
  const [health, setHealth] = useState<HealthState>({ status: 'loading' });

  const loadHealth = useCallback(async () => {
    setHealth({ status: 'loading' });
    try {
      const data = await getHealth();
      setHealth({ status: 'success', data });
    } catch (error) {
      setHealth({
        status: 'error',
        message: error instanceof Error ? error.message : 'Falha ao consultar a API',
      });
    }
  }, []);

  useEffect(() => {
    void loadHealth();
  }, [loadHealth]);

  return (
    <Box flex={1} backgroundColor="background" padding="l" gap="m">
      <Text variant="header">Tecsa Lab</Text>
      <Text variant="muted">
        Core compartilhado. Marcas vita/nexo entram na próxima fatia.
      </Text>

      <Box
        backgroundColor="surface"
        borderRadius="l"
        padding="m"
        borderColor="border"
        borderWidth={1}
        gap="s"
      >
        <Text variant="body">API /health</Text>
        {health.status === 'loading' ? (
          <ActivityIndicator />
        ) : null}
        {health.status === 'success' ? (
          <Text variant="muted">
            status: {health.data.status} · database: {health.data.database}
          </Text>
        ) : null}
        {health.status === 'error' ? (
          <Text color="danger">{health.message}</Text>
        ) : null}
      </Box>
    </Box>
  );
}
