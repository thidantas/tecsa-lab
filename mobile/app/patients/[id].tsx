import { useLocalSearchParams } from 'expo-router';

import { useBrand } from '@/core/brand';
import { Box, Text } from '@/ui/components';

export default function PatientPlaceholderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { identity } = useBrand();

  return (
    <Box flex={1} backgroundColor="background" padding="s24" gap="s8">
      <Text variant="title28">{identity.copy.patientDetailTitle}</Text>
      <Text variant="text14" color="textMuted">
        {identity.copy.patientDetailPlaceholder} /patients/{id}
      </Text>
    </Box>
  );
}
