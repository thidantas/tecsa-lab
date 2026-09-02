import { fireEvent, screen, waitFor } from '@testing-library/react-native';

import { PatientsWallet } from '@/ui/containers/patients/PatientsWallet';

import { advanceMs } from '../test-utils/advanceMs';
import { renderApp } from '../test-utils/renderApp';

describe('integration: Wallet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await advanceMs(350);
  });

  it('should display the patient list after the query resolves', async () => {
    renderApp(<PatientsWallet />);

    expect(await screen.findByText('Ana Almeida')).toBeOnTheScreen();
    expect(screen.getByText('Bruno Costa')).toBeOnTheScreen();
  });

  it('should filter the wallet from the search field', async () => {
    renderApp(<PatientsWallet />);

    expect(await screen.findByText('Ana Almeida')).toBeOnTheScreen();

    fireEvent.changeText(screen.getByTestId('search-input'), 'bruno');
    await advanceMs(350);

    await waitFor(() => {
      expect(screen.getByText('Bruno Costa')).toBeOnTheScreen();
      expect(screen.queryByText('Ana Almeida')).toBeNull();
    });
  });

  it('should display the empty message when the search matches nobody', async () => {
    renderApp(<PatientsWallet />);

    expect(await screen.findByText('Ana Almeida')).toBeOnTheScreen();

    fireEvent.changeText(screen.getByTestId('search-input'), 'xyz');
    await advanceMs(350);

    expect(
      await screen.findByText('Nenhum paciente por aqui ainda.'),
    ).toBeOnTheScreen();
  });
});
