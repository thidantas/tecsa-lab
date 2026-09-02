import type { Biomarker } from '@/domain/models/patients';

import { Box } from '../../components/Box';
import { Card } from '../../components/Card';
import { Text } from '../../components/Text';
import { biomarkerLabel } from './biomarkerLabel';
import { biomarkerRangeLabel, biomarkerValueColor } from './biomarkerRange';
import { formatDate } from '@/utils';

type BiomarkerCardProps = {
  marker: Biomarker;
};

export function BiomarkerCard({ marker }: BiomarkerCardProps) {
  const range = biomarkerRangeLabel(marker);
  const valueColor = biomarkerValueColor(marker);

  return (
    <Card gap="s8">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text variant="text16">{biomarkerLabel(marker.name)}</Text>
        <Text variant="text14" color="textMuted">
          {formatDate(marker.measuredAt)}
        </Text>
      </Box>
      <Text variant="title28" color={valueColor}>
        {marker.value} {marker.unit}
      </Text>
      {range ? (
        <Text variant="text14" color="textMuted">
          Faixa {range}
        </Text>
      ) : null}
    </Card>
  );
}
