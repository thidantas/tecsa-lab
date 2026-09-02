import { useQuery } from '@tanstack/react-query';

import { useHealthRepository } from '../../repositories/RepositoriesProvider';
import { queryKeys } from '../queryKeys';

export function useHealthQuery() {
  const health = useHealthRepository();

  return useQuery({
    queryKey: queryKeys.health.all,
    queryFn: () => health.getHealth(),
  });
}
