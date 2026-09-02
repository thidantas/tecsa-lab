import { useAiActionsEnabled, useGenerateAiActions } from '@/domain';
import { useBrand } from '@/core/brand';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Icon } from '../../components/Icon';
import { Text } from '../../components/Text';

type AiActionsCardProps = {
  patientId: string;
};

function isForbidden(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as { status?: number }).status === 403
  );
}

function errorMessage(
  error: unknown,
  disabledCopy: string,
  fallbackCopy: string,
) {
  if (isForbidden(error)) {
    return disabledCopy;
  }

  return fallbackCopy;
}

export function AiActionsCard({ patientId }: AiActionsCardProps) {
  const { identity } = useBrand();
  const enabled = useAiActionsEnabled();
  const generate = useGenerateAiActions();

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
      <Button
        title={identity.copy.aiActionsGenerate}
        disabled={generate.isPending}
        onPress={() => generate.mutate(patientId)}
      />
      {generate.isError ? (
        <Text variant="text14" color="danger">
          {errorMessage(
            generate.error,
            identity.copy.aiActionsDisabled,
            identity.copy.aiActionsError,
          )}
        </Text>
      ) : null}
      {generate.data?.map((action) => (
        <Card key={action.title} gap="s4" backgroundColor="accentMuted">
          <Text variant="text16">{action.title}</Text>
          <Text variant="text14" color="textMuted">
            {action.reason}
          </Text>
          <Text variant="text14">{action.recommendation}</Text>
        </Card>
      ))}
    </Card>
  );
}
