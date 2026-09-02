import { BRAND_IDS, resolveIdentity, useBrand } from '@/core/brand';

import { Text, TouchableOpacityBox } from '../components';
import { Box } from '../components/Box';

export function BrandSwitch() {
  const { brandId, setBrandId } = useBrand();

  return (
    <Box
      flexDirection="row"
      backgroundColor="accentMuted"
      borderRadius="default"
      padding="s4"
      gap="s4"
    >
      {BRAND_IDS.map((id) => {
        const selected = brandId === id;
        const label = resolveIdentity(id).logo.wordmark;

        return (
          <TouchableOpacityBox
            key={id}
            onPress={() => setBrandId(id)}
            backgroundColor={selected ? 'accent' : 'transparent'}
            borderRadius="default"
            paddingHorizontal="s12"
            paddingVertical="s8"
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={label}
          >
            <Text variant="text14" color={selected ? 'surface' : 'textMuted'}>
              {label}
            </Text>
          </TouchableOpacityBox>
        );
      })}
    </Box>
  );
}
