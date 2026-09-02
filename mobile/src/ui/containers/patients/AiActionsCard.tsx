import { useAiActionsEnabled } from '@/domain';
import { useBrand } from '@/core/brand';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Icon } from '../../components/Icon';
import { Text } from '../../components/Text';

export function AiActionsCard() {
  const { identity } = useBrand();
  const enabled = useAiActionsEnabled();

  if (!enabled) {
    return null;
  }

  return (
    <Card gap="s8">
      <Icon name="sparkle" color="accent" size={20} />
      <Text variant="text16">{identity.copy.aiActionsLabel}</Text>
      <Text variant="text14" color="textMuted">
        {identity.copy.aiActionsHint}
      </Text>
      <Button title={identity.copy.aiActionsGenerate} disabled onPress={() => {}} />
    </Card>
  );
}
