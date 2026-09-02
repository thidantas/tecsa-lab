import type { AiAction } from '../models/aiActions';

export type AiActionsRepository = {
  generate(patientId: string): Promise<AiAction[]>;
};
