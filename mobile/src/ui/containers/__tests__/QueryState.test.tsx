import { screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { renderComponent } from '@/test-utils/renderComponent';

import { QueryState } from '../QueryState';

describe('<QueryState />', () => {
  const props = {
    errorMessage: 'Falha ao carregar a carteira',
    emptyMessage: 'Nenhum paciente por aqui ainda.',
  };

  it('should display a spinner while the query is pending', () => {
    renderComponent(
      <QueryState {...props} isPending isError={false} isEmpty={false}>
        <Text>lista</Text>
      </QueryState>,
    );

    expect(screen.getByTestId('query-state-pending')).toBeOnTheScreen();
    expect(screen.queryByText('lista')).toBeNull();
  });

  it('should display the error copy', () => {
    renderComponent(
      <QueryState {...props} isPending={false} isError isEmpty={false}>
        <Text>lista</Text>
      </QueryState>,
    );

    expect(screen.getByText('Falha ao carregar a carteira')).toBeOnTheScreen();
  });

  it('should display the empty copy', () => {
    renderComponent(
      <QueryState {...props} isPending={false} isError={false} isEmpty>
        <Text>lista</Text>
      </QueryState>,
    );

    expect(
      screen.getByText('Nenhum paciente por aqui ainda.'),
    ).toBeOnTheScreen();
  });

  it('should render children on success', () => {
    renderComponent(
      <QueryState {...props} isPending={false} isError={false} isEmpty={false}>
        <Text>lista</Text>
      </QueryState>,
    );

    expect(screen.getByText('lista')).toBeOnTheScreen();
  });
});
