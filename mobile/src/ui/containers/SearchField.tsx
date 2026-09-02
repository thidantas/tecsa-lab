import { TextInput } from 'react-native';

import { useAppTheme } from '@/core/theme';

import { Box } from '../components/Box';
import { Icon } from '../components/Icon';

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
};

export function SearchField({
  value,
  onChangeText,
  placeholder,
}: SearchFieldProps) {
  const { colors, textVariants } = useAppTheme();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      gap="s8"
      backgroundColor="surface"
      borderColor="border"
      borderWidth={1}
      borderRadius="default"
      paddingHorizontal="s12"
      paddingVertical="s8"
    >
      <Icon name="search" color="textMuted" size={20} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoCorrect={false}
        autoCapitalize="none"
        style={{
          flex: 1,
          color: colors.text,
          fontFamily: textVariants.text16.fontFamily,
          fontSize: textVariants.text16.fontSize,
          padding: 0,
        }}
      />
    </Box>
  );
}
