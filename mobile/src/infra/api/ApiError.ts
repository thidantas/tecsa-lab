export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly path?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
