import { BrandMark } from '@/brands/BrandMark';
import { useBrand } from '@/core/brand';
import { useAppTheme } from '@/core/theme';

import { Box } from './Box';
import { Text } from './Text';

export function BrandLogo() {
  const { identity } = useBrand();
  const { colors } = useAppTheme();

  return (
    <Box flexDirection="row" alignItems="center" gap="s8">
      <Box
        width={40}
        height={40}
        borderRadius="rounded"
        backgroundColor="accentMuted"
        alignItems="center"
        justifyContent="center"
      >
        <BrandMark brandId={identity.id} size={26} color={colors.accent} />
      </Box>
      <Text variant="title28">{identity.logo.wordmark}</Text>
    </Box>
  );
}
