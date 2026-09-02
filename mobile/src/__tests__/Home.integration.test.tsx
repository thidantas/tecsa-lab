import { fireEvent, screen } from '@testing-library/react-native';
import { router } from 'expo-router';

import { Home } from '@/ui/containers';

import { renderApp } from '../test-utils/renderApp';

describe('integration: Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should greet the nutritionist and open the wallet', async () => {
    renderApp(<Home />);

    expect(
      await screen.findByText('O consultório está no ritmo.'),
    ).toBeOnTheScreen();
    expect(
      screen.getByText('Vamos ver juntos o ritmo do consultório.'),
    ).toBeOnTheScreen();
    expect(await screen.findByText('2 na carteira')).toBeOnTheScreen();
    expect(await screen.findByText('Lab conectado')).toBeOnTheScreen();

    fireEvent.press(screen.getByLabelText('Carteira'));

    expect(router.push).toHaveBeenCalledWith('/patients');
  });

  it('should use nexo copy when the brand is overridden', async () => {
    renderApp(<Home />, { brandId: 'nexo' });

    expect(await screen.findByText('O que precisa de ação.')).toBeOnTheScreen();
    expect(await screen.findByText('2 no caseload')).toBeOnTheScreen();
    expect(await screen.findByText('API operacional')).toBeOnTheScreen();
  });
});
