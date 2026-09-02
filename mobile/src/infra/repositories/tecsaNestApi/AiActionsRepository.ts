import type { AiActionsRepository } from '@/domain/repositories/AiActionsRepository';

import type { AiActionsDto } from '../../adapters/aiActions/aiActionsDto';
import { toAiActions } from '../../adapters/aiActions/toAiActions';
import type { HttpClient } from '../../api/HttpClient';

export function createTecsaNestAiActionsRepository(
  http: HttpClient,
): AiActionsRepository {
  return {
    async generate(patientId) {
      const dto = await http.post<AiActionsDto>(
        `/v1/patients/${patientId}/ai-actions`,
        undefined,
        { timeout: 45_000 },
      );
      return toAiActions(dto);
    },
  };
}
