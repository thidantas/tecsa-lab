import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';

import { useBrand } from '@/core/brand';
import { usePatientsQuery } from '@/domain';
import type { PatientListItem } from '@/domain/models/patients';

import { QueryState } from '../QueryState';
import { Screen } from '../Screen';
import { ScreenHeader } from '../ScreenHeader';
import { SearchField } from '../SearchField';
import { PatientListRow } from './PatientListRow';

function queryErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Falha ao carregar a carteira';
}

export function PatientsWallet() {
  const { identity } = useBrand();
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');
  const patients = usePatientsQuery(search || undefined);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(draft.trim());
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [draft]);

  const items = patients.data ?? [];

  return (
    <Screen>
      <ScreenHeader title={identity.copy.patientsTitle} />
      <SearchField
        value={draft}
        onChangeText={setDraft}
        placeholder="Buscar"
      />
      <QueryState
        isPending={patients.isPending}
        isError={patients.isError}
        isEmpty={patients.isSuccess && items.length === 0}
        errorMessage={queryErrorMessage(patients.error)}
        emptyMessage={identity.copy.patientsEmpty}
      >
        <FlashList
          data={items}
          keyExtractor={(item: PatientListItem) => item.id}
          renderItem={({ item }: { item: PatientListItem }) => (
            <PatientListRow patient={item} />
          )}
        />
      </QueryState>
    </Screen>
  );
}
