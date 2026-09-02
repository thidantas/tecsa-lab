import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react-native';
import { ReactElement, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BrandProvider } from '@/core/brand';

import { queryClientOptions } from './queryClientOptions';

const safeAreaMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

export const AllTheProviders = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(() => new QueryClient(queryClientOptions));

  return (
    <SafeAreaProvider initialMetrics={safeAreaMetrics}>
      <QueryClientProvider client={client}>
        <BrandProvider>{children}</BrandProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export const renderComponent = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(component, { wrapper: AllTheProviders, ...options });
