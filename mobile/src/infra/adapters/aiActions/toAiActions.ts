import type { AiAction } from '@/domain/models/aiActions';

import type { AiActionsDto } from './aiActionsDto';

export function toAiActions(dto: AiActionsDto): AiAction[] {
  return dto.actions.map((action) => ({
    title: action.title,
    reason: action.reason,
    recommendation: action.recommendation,
  }));
}
