export type StructuredAiAction = {
  title: string;
  reason: string;
  recommendation: string;
};

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function parseActions(payload: unknown): StructuredAiAction[] {
  const raw =
    payload && typeof payload === 'object' && 'actions' in payload
      ? (payload as { actions: unknown }).actions
      : payload;

  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const row = item as Record<string, unknown>;
      const title = asText(row.title);
      const reason = asText(row.reason);
      const recommendation = asText(row.recommendation);

      if (!title || !reason || !recommendation) {
        return null;
      }

      return { title, reason, recommendation };
    })
    .filter((item): item is StructuredAiAction => item !== null)
    .slice(0, 5);
}
