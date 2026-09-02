import { useQuery } from '@tanstack/react-query';

import { usePatientsRepository } from '../../repositories/RepositoriesProvider';
import { queryKeys } from '../queryKeys';

export function usePatientQuery(id: string) {
  const patients = usePatientsRepository();

  return useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () => patients.getById(id),
    enabled: id.length > 0,
  });
}
