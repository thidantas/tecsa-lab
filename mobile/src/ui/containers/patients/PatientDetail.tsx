import { ActivityIndicator, ScrollView } from 'react-native';

import { useBrand } from '@/core/brand';
import { useBiometricGate } from '@/core/biometrics';
import { useAppTheme } from '@/core/theme';
import { usePatientQuery } from '@/domain';
import type { PatientDetail as PatientDetailModel } from '@/domain/models/patients';
import { formatDate } from '@/utils';

import { Box } from '../../components/Box';
import { Text } from '../../components/Text';
import { QueryState } from '../QueryState';
import { Screen } from '../Screen';
import { ScreenHeader } from '../ScreenHeader';
import { AiActionsCard } from './AiActionsCard';
import { BiomarkerCard } from './BiomarkerCard';
import { PatientLock } from './PatientLock';
import { PatientNotesCard } from './PatientNotesCard';
import { sexLabel } from './sexLabel';

type PatientDetailProps = {
  id: string;
};

function queryErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Falha ao carregar o paciente';
}

function PatientDetailBody({ patient }: { patient: PatientDetailModel }) {
  const { identity } = useBrand();
  const { spacing } = useAppTheme();
  const sex = sexLabel(patient.sex);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ gap: spacing.s16, paddingBottom: spacing.s24 }}
      showsVerticalScrollIndicator={false}
    >
      <Box gap="s4">
        <Text variant="text14" color="textMuted">
          {identity.copy.patientBirthDateLabel}: {formatDate(patient.birthDate)}
        </Text>
        {sex ? (
          <Text variant="text14" color="textMuted">
            {identity.copy.patientSexLabel}: {sex}
          </Text>
        ) : null}
      </Box>

      <PatientNotesCard patient={patient} />

      {patient.biomarkers.length === 0 ? (
        <Text variant="text14" color="textMuted">
          Nenhum biomarcador neste registro.
        </Text>
      ) : (
        patient.biomarkers.map((marker) => (
          <BiomarkerCard key={marker.id} marker={marker} />
        ))
      )}

      <AiActionsCard patientId={patient.id} />
    </ScrollView>
  );
}

function UnlockedPatientDetail({ id }: PatientDetailProps) {
  const { identity } = useBrand();
  const patient = usePatientQuery(id);
  const data = patient.data;

  return (
    <Screen>
      <ScreenHeader
        title={data?.name ?? identity.copy.patientDetailTitle}
        subtitle={data ? identity.copy.patientDetailTitle : undefined}
      />
      <QueryState
        isPending={patient.isPending}
        isError={patient.isError}
        isEmpty={patient.isSuccess && !data}
        errorMessage={queryErrorMessage(patient.error)}
        emptyMessage={identity.copy.patientsEmpty}
      >
        {data ? <PatientDetailBody patient={data} /> : null}
      </QueryState>
    </Screen>
  );
}

export function PatientDetail({ id }: PatientDetailProps) {
  const { identity } = useBrand();
  const gate = useBiometricGate();

  if (gate.status === 'unlocked') {
    return <UnlockedPatientDetail id={id} />;
  }

  return (
    <Screen>
      <ScreenHeader title={identity.copy.patientDetailTitle} />
      {gate.status === 'checking' ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      ) : (
        <PatientLock
          failed={gate.failed}
          onUnlock={() => {
            void gate.unlock({
              promptMessage: identity.copy.patientUnlockPrompt,
              cancelLabel: identity.copy.patientUnlockCancel,
            });
          }}
        />
      )}
    </Screen>
  );
}
