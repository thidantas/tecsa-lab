import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react-native';
import { ReactElement, useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BrandContext } from '@/core/brand/BrandProvider';
import { resolveIdentity } from '@/core/brand/resolveIdentity';
import type { BrandId, BrandService } from '@/core/brand/types';
import { resolveTheme } from '@/core/theme';
import { RepositoriesProvider } from '@/domain/repositories/RepositoriesProvider';
import type { Repositories } from '@/domain/repositories/types';

import { createTestRepositories } from './mocks/repositories';
import { queryClientOptions } from './queryClientOptions';

const safeAreaMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

export function renderApp(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    brandId?: BrandId;
    repositories?: Partial<Repositories>;
  },
) {
  const { brandId = 'vita', repositories, ...renderOptions } = options ?? {};
  const client = new QueryClient(queryClientOptions);
  const repos = createTestRepositories(repositories);
  const theme = resolveTheme(brandId);
  const identity = resolveIdentity(brandId);
  const brand: BrandService = {
    brandId,
    setBrandId: jest.fn(),
    identity,
  };

  function Wrapper({ children }: React.PropsWithChildren) {
    const value = useMemo(() => repos, []);

    return (
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <BrandContext.Provider value={brand}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={client}>
              <RepositoriesProvider value={value}>{children}</RepositoriesProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </BrandContext.Provider>
      </SafeAreaProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
