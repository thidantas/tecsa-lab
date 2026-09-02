import { useBrand } from '@/core/brand';

import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Text } from '../../components/Text';

type PatientLockProps = {
  onUnlock: () => void;
  failed: boolean;
};

export function PatientLock({ onUnlock, failed }: PatientLockProps) {
  const { identity } = useBrand();

  return (
    <Box flex={1} justifyContent="center" gap="s16">
      <Icon name="user" color="accent" size={32} />
      <Text variant="text16">{identity.copy.patientUnlockTitle}</Text>
      <Text variant="text14" color="textMuted">
        {identity.copy.patientUnlockSubtitle}
      </Text>
      <Button title={identity.copy.patientUnlockAction} onPress={onUnlock} />
      {failed ? (
        <Text variant="text14" color="danger">
          {identity.copy.patientUnlockError}
        </Text>
      ) : null}
    </Box>
  );
}
