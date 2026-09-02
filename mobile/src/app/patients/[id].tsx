import { useLocalSearchParams } from 'expo-router';

import { Box, Text } from '@/core/theme';

export default function PatientPlaceholderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Box flex={1} backgroundColor="background" padding="l" gap="s">
      <Text variant="header">Paciente</Text>
      <Text variant="muted">Rota reservada para /patients/{id}. Carteira entra depois do contrato da API.</Text>
    </Box>
  );
}
