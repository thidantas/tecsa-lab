export const API_PROFILES = ['tecsaNest', 'inMemory'] as const;

export type ApiProfile = (typeof API_PROFILES)[number];
