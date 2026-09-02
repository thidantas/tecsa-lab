import { useMemo, type ReactNode } from 'react';

import { RepositoriesProvider } from '@/domain/repositories/RepositoriesProvider';

import { createInfra, resolveApiProfile } from './profiles/createInfra';

type InfraProviderProps = {
  children: ReactNode;
};

export function InfraProvider({ children }: InfraProviderProps) {
  const repositories = useMemo(() => createInfra(resolveApiProfile()), []);

  return (
    <RepositoriesProvider value={repositories}>{children}</RepositoriesProvider>
  );
}
