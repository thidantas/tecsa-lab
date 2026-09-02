import type { ThemeColors } from '@/core/theme';

import { TouchableOpacityBox, type TouchableOpacityBoxProps } from './Box';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary';

const buttonColors: Record<
  ButtonVariant,
  { backgroundColor: ThemeColors; textColor: ThemeColors }
> = {
  primary: {
    backgroundColor: 'accent',
    textColor: 'surface',
  },
  secondary: {
    backgroundColor: 'accentMuted',
    textColor: 'text',
  },
};

type ButtonProps = TouchableOpacityBoxProps & {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  ...otherProps
}: ButtonProps) {
  const buttonProps = buttonColors[variant];

  return (
    <TouchableOpacityBox
      {...otherProps}
      onPress={onPress}
      backgroundColor={buttonProps.backgroundColor}
      borderRadius="default"
      padding="default"
      justifyContent="center"
      alignItems="center"
    >
      <Text color={buttonProps.textColor}>{title}</Text>
    </TouchableOpacityBox>
  );
}
