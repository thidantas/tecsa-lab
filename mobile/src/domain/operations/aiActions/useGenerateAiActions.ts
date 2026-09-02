import { useMutation } from '@tanstack/react-query';

import { useAiActionsRepository } from '../../repositories/RepositoriesProvider';

export function useGenerateAiActions() {
  const aiActions = useAiActionsRepository();

  return useMutation({
    mutationFn: (patientId: string) => aiActions.generate(patientId),
  });
}
