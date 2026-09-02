export const API_PROFILES = ['hybrid', 'tecsaNest', 'inMemory'] as const;

export type ApiProfile = (typeof API_PROFILES)[number];
