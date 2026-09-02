import { useQuery } from '@tanstack/react-query';

import { usePatientsRepository } from '../../repositories/RepositoriesProvider';
import { queryKeys } from '../queryKeys';

export function usePatientsQuery(search?: string) {
  const patients = usePatientsRepository();

  return useQuery({
    queryKey: queryKeys.patients.list(search),
    queryFn: () => patients.list(search ? { search } : undefined),
  });
}
