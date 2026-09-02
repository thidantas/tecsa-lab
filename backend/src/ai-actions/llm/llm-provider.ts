export type LlmJsonRequest = {
  system: string;
  user: string;
};

export interface LlmProvider {
  completeJson(request: LlmJsonRequest): Promise<unknown>;
}

export const LLM_PROVIDER = 'LLM_PROVIDER';
