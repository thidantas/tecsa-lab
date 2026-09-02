import { Pressable } from 'react-native';

import { AlertIcon } from '../../../assets/icons/AlertIcon';
import { CheckIcon } from '../../../assets/icons/CheckIcon';
import { ChevronLeftIcon } from '../../../assets/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../../../assets/icons/ChevronRightIcon';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { LabIcon } from '../../../assets/icons/LabIcon';
import { NoteIcon } from '../../../assets/icons/NoteIcon';
import { PlusIcon } from '../../../assets/icons/PlusIcon';
import { SearchIcon } from '../../../assets/icons/SearchIcon';
import { SparkleIcon } from '../../../assets/icons/SparkleIcon';
import { UserIcon } from '../../../assets/icons/UserIcon';
import { UsersIcon } from '../../../assets/icons/UsersIcon';
import { useAppTheme, type ThemeColors } from '@/core/theme';

const iconRegistry = {
  alert: AlertIcon,
  check: CheckIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  close: CloseIcon,
  lab: LabIcon,
  note: NoteIcon,
  plus: PlusIcon,
  search: SearchIcon,
  sparkle: SparkleIcon,
  user: UserIcon,
  users: UsersIcon,
};

export type IconName = keyof typeof iconRegistry;

export type IconProps = {
  name: IconName;
  color?: ThemeColors;
  size?: number;
  onPress?: () => void;
};

export function Icon({
  name,
  color = 'text',
  size,
  onPress,
}: IconProps) {
  const { colors } = useAppTheme();
  const SVGIcon = iconRegistry[name];

  if (onPress) {
    return (
      <Pressable hitSlop={10} onPress={onPress} testID={name}>
        <SVGIcon iconColor={colors[color]} size={size} />
      </Pressable>
    );
  }

  return <SVGIcon iconColor={colors[color]} size={size} />;
}
