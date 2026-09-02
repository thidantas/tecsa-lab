export type HttpRequestConfig = {
  params?: Record<string, string | number | boolean | undefined>;
};

export type HttpClient = {
  get<T>(path: string, config?: HttpRequestConfig): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  patch<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
};
