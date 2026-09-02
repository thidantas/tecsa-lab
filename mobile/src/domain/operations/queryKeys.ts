export const queryKeys = {
  health: {
    all: ['health'] as const,
  },
  patients: {
    all: ['patients'] as const,
    list: (search?: string) => ['patients', 'list', search ?? ''] as const,
    detail: (id: string) => ['patients', 'detail', id] as const,
  },
};
