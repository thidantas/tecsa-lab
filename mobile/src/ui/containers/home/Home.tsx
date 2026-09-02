import { router, type Href } from 'expo-router';
import { ScrollView } from 'react-native';

import { useBrand } from '@/core/brand';
import { useHealthQuery, usePatientsQuery } from '@/domain';
import type { ThemeColors } from '@/core/theme';

import {
  Box,
  Card,
  Icon,
  Text,
  TouchableOpacityBox,
} from '../../components';
import { BrandSwitch } from '../BrandSwitch';
import { Screen } from '../Screen';
import { ScreenHeader } from '../ScreenHeader';

function healthTone(args: {
  isPending: boolean;
  isError: boolean;
  database?: 'up' | 'down';
}): ThemeColors {
  if (args.isPending) {
    return 'textMuted';
  }

  if (args.isError || args.database === 'down') {
    return 'danger';
  }

  return 'success';
}

function healthLabel(
  copy: {
    healthPending: string;
    healthOk: string;
    healthDown: string;
  },
  args: { isPending: boolean; isError: boolean; database?: 'up' | 'down' },
) {
  if (args.isPending) {
    return copy.healthPending;
  }

  if (args.isError || args.database === 'down') {
    return copy.healthDown;
  }

  return copy.healthOk;
}

export function Home() {
  const { identity } = useBrand();
  const health = useHealthQuery();
  const patients = usePatientsQuery();
  const copy = identity.copy;
  const tone = healthTone({
    isPending: health.isPending,
    isError: health.isError,
    database: health.data?.database,
  });
  const statusLabel = healthLabel(copy, {
    isPending: health.isPending,
    isError: health.isError,
    database: health.data?.database,
  });
  const patientCount = patients.data?.length;
  const showRetry = health.isError || health.data?.database === 'down';

  return (
    <Screen safeTop>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader trailing={<BrandSwitch />} />

        <Box gap="s8" paddingTop="s8">
          <Text variant="title28">{copy.homeGreeting}</Text>
          <Text variant="text16" color="textMuted">
            {copy.homeSubtitle}
          </Text>
        </Box>

        <TouchableOpacityBox
          backgroundColor="accent"
          borderRadius="default"
          padding="s24"
          gap="s12"
          onPress={() => {
            router.push('/patients' as Href);
          }}
          accessibilityRole="button"
          accessibilityLabel={copy.patientsTitle}
        >
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Icon name="users" color="surface" size={24} />
            <Icon name="chevronRight" color="surface" size={20} />
          </Box>
          <Text variant="title28" color="surface">
            {copy.patientsTitle}
          </Text>
          <Text variant="text14" color="surface">
            {copy.homeWalletHint}
          </Text>
          {patientCount != null ? (
            <Text variant="text16" color="surface">
              {patientCount} {copy.homePatientCount}
            </Text>
          ) : null}
        </TouchableOpacityBox>

        <Card gap="s12">
          <Box flexDirection="row" alignItems="center" gap="s8">
            <Icon name="lab" color="accent" size={20} />
            <Text variant="text16">{copy.healthCardTitle}</Text>
          </Box>
          <Box flexDirection="row" alignItems="center" gap="s8">
            <Box
              width={8}
              height={8}
              borderRadius="rounded"
              backgroundColor={tone}
            />
            <Text variant="text14" color={tone}>
              {statusLabel}
            </Text>
          </Box>
          {showRetry ? (
            <TouchableOpacityBox
              onPress={() => {
                void health.refetch();
              }}
              accessibilityRole="button"
            >
              <Text variant="text14" color="accent">
                {copy.healthRetry}
              </Text>
            </TouchableOpacityBox>
          ) : null}
        </Card>
      </ScrollView>
    </Screen>
  );
}
