import { ApiError } from '../../api/ApiError';

export function isRecoverableError(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.status === undefined || error.status >= 500;
  }

  return true;
}
