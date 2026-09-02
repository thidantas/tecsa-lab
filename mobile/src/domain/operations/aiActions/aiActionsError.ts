export function isAiActionsForbidden(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as { status?: number }).status === 403
  );
}

export function resolveAiActionsErrorCopy(
  error: unknown,
  disabledCopy: string,
  fallbackCopy: string,
) {
  if (isAiActionsForbidden(error)) {
    return disabledCopy;
  }

  return fallbackCopy;
}
