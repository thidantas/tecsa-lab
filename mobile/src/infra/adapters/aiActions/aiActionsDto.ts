export type AiActionDto = {
  title: string;
  reason: string;
  recommendation: string;
};

export type AiActionsDto = {
  actions: AiActionDto[];
};
