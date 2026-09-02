import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { PatientDetail } from '../../models/patients';
import { usePatientsRepository } from '../../repositories/RepositoriesProvider';
import { queryKeys } from '../queryKeys';

type UpdatePatientNotesInput = {
  id: string;
  notes: string;
};

export function useUpdatePatientNotes() {
  const patients = usePatientsRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: UpdatePatientNotesInput) =>
      patients.updateNotes(id, notes),
    onMutate: async ({ id, notes }) => {
      const detailKey = queryKeys.patients.detail(id);
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previous = queryClient.getQueryData<PatientDetail>(detailKey);

      if (previous) {
        queryClient.setQueryData<PatientDetail>(detailKey, {
          ...previous,
          notes: notes.trim() || null,
        });
      }

      return { previous, id };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          queryKeys.patients.detail(context.id),
          context.previous,
        );
      }
    },
    onSuccess: (patient) => {
      queryClient.setQueryData(queryKeys.patients.detail(patient.id), patient);
    },
  });
}
