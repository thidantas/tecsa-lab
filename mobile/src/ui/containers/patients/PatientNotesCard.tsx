import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

import { useBrand } from '@/core/brand';
import { useAppTheme } from '@/core/theme';
import { useUpdatePatientNotes } from '@/domain';
import type { PatientDetail } from '@/domain/models/patients';

import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Icon } from '../../components/Icon';
import { Text } from '../../components/Text';

type PatientNotesCardProps = {
  patient: PatientDetail;
};

export function PatientNotesCard({ patient }: PatientNotesCardProps) {
  const { identity } = useBrand();
  const { colors, textVariants } = useAppTheme();
  const mutation = useUpdatePatientNotes();
  const [draft, setDraft] = useState(patient.notes ?? '');

  useEffect(() => {
    setDraft(patient.notes ?? '');
  }, [patient.id, patient.notes]);

  const dirty = draft.trim() !== (patient.notes ?? '').trim();

  return (
    <Card gap="s8">
      <Icon name="note" color="accent" size={20} />
      <Text variant="text16">{identity.copy.patientNotesLabel}</Text>
      <Box
        borderWidth={1}
        borderColor="border"
        borderRadius="default"
        padding="s12"
        minHeight={96}
      >
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder={identity.copy.patientNotesPlaceholder}
          placeholderTextColor={colors.textMuted}
          multiline
          textAlignVertical="top"
          underlineColorAndroid="transparent"
          selectionColor={colors.accent}
          style={{
            color: colors.text,
            fontFamily: textVariants.text16.fontFamily,
            fontSize: textVariants.text16.fontSize,
            lineHeight: textVariants.text16.lineHeight,
            padding: 0,
            margin: 0,
            borderWidth: 0,
            backgroundColor: 'transparent',
            includeFontPadding: false,
          }}
        />
      </Box>
      <Button
        title={identity.copy.patientNotesSave}
        disabled={!dirty || mutation.isPending}
        onPress={() => mutation.mutate({ id: patient.id, notes: draft })}
      />
      {mutation.isError ? (
        <Text variant="text14" color="danger">
          {identity.copy.patientNotesError}
        </Text>
      ) : null}
    </Card>
  );
}
