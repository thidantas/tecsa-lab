import { useQuery } from '@tanstack/react-query';

import { useFlagsRepository } from '../../repositories/RepositoriesProvider';
import { queryKeys } from '../queryKeys';

export function useFlagsQuery() {
  const flags = useFlagsRepository();

  return useQuery({
    queryKey: queryKeys.flags.all,
    queryFn: () => flags.list(),
    staleTime: 60_000,
  });
}

export function useAiActionsEnabled() {
  const flags = useFlagsQuery();

  return flags.data?.aiActions === true;
}
