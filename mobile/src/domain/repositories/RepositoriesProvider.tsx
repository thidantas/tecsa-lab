import { createContext, useContext, type ReactNode } from 'react';

import type { Repositories } from './types';

const RepositoriesContext = createContext<Repositories | null>(null);

type RepositoriesProviderProps = {
  value: Repositories;
  children: ReactNode;
};

export function RepositoriesProvider({
  value,
  children,
}: RepositoriesProviderProps) {
  return (
    <RepositoriesContext.Provider value={value}>
      {children}
    </RepositoriesContext.Provider>
  );
}

export function useRepositories(): Repositories {
  const repositories = useContext(RepositoriesContext);

  if (!repositories) {
    throw new Error('useRepositories must be used within RepositoriesProvider');
  }

  return repositories;
}

export function useHealthRepository() {
  return useRepositories().health;
}

export function usePatientsRepository() {
  return useRepositories().patients;
}
