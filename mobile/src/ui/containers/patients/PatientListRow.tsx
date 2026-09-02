import { router } from 'expo-router';

import type { PatientListItem } from '@/domain/models/patients';

import { Box, TouchableOpacityBox } from '../../components/Box';
import { Icon } from '../../components/Icon';
import { Text } from '../../components/Text';
import { formatDate } from '@/utils';

type PatientListRowProps = {
  patient: PatientListItem;
};

export function PatientListRow({ patient }: PatientListRowProps) {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
      gap="s12"
      backgroundColor="surface"
      borderColor="border"
      borderWidth={1}
      borderRadius="default"
      padding="s16"
      marginBottom="s8"
      onPress={() => {
        router.push(`/patients/${patient.id}`);
      }}
    >
      <Box
        width={40}
        height={40}
        borderRadius="rounded"
        backgroundColor="accentMuted"
        alignItems="center"
        justifyContent="center"
      >
        <Icon name="user" color="accent" size={20} />
      </Box>
      <Box flex={1} gap="s4">
        <Text variant="text16">{patient.name}</Text>
        <Text variant="text14" color="textMuted">
          {formatDate(patient.birthDate)}
        </Text>
      </Box>
      <Icon name="chevronRight" color="textMuted" size={20} />
    </TouchableOpacityBox>
  );
}
