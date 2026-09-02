import type { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';

import { Box } from '../components/Box';
import { Text } from '../components/Text';

type QueryStateProps = {
  isPending: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string;
  emptyMessage: string;
  children: ReactNode;
};

export function QueryState({
  isPending,
  isError,
  isEmpty,
  errorMessage,
  emptyMessage,
  children,
}: QueryStateProps) {
  if (isPending) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box flex={1} justifyContent="center">
        <Text color="danger">{errorMessage}</Text>
      </Box>
    );
  }

  if (isEmpty) {
    return (
      <Box flex={1} justifyContent="center">
        <Text variant="text14" color="textMuted">
          {emptyMessage}
        </Text>
      </Box>
    );
  }

  return <Box flex={1}>{children}</Box>;
}
