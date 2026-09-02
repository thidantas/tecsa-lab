import { fireEvent, screen, waitFor } from '@testing-library/react-native';

import { AiActionsCard } from '@/ui/containers/patients/AiActionsCard';

import { advanceMs } from '../test-utils/advanceMs';
import { aiActions } from '../test-utils/fixtures';
import {
  createMockAiActionsRepository,
  createMockFlagsRepository,
} from '../test-utils/mocks/repositories';
import { renderApp } from '../test-utils/renderApp';

const patientId = 'patient-ana';

describe('integration: AI actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should hide the card when the kill switch is off', async () => {
    const flags = createMockFlagsRepository({ flags: { aiActions: false } });

    renderApp(<AiActionsCard patientId={patientId} />, {
      repositories: { flags },
    });

    await waitFor(() => {
      expect(flags.list).toHaveBeenCalled();
    });
    await advanceMs(10);

    expect(screen.queryByText('Gerar sugestões')).toBeNull();
    expect(screen.queryByText('Sugestões de hábito')).toBeNull();
  });

  it('should list structured actions after generate', async () => {
    const aiActionsRepo = createMockAiActionsRepository();

    renderApp(<AiActionsCard patientId={patientId} />, {
      repositories: { aiActions: aiActionsRepo },
    });

    expect(await screen.findByText('Gerar sugestões')).toBeOnTheScreen();

    fireEvent.press(screen.getByText('Gerar sugestões'));

    await waitFor(() => {
      expect(aiActionsRepo.generate).toHaveBeenCalledWith(patientId);
      expect(screen.getByText(aiActions[0].title)).toBeOnTheScreen();
      expect(screen.getByText(aiActions[2].recommendation)).toBeOnTheScreen();
    });
  });

  it('should use the disabled copy when the API returns 403', async () => {
    const aiActionsRepo = createMockAiActionsRepository();
    aiActionsRepo.generate = jest.fn(async () => {
      throw { status: 403 };
    });

    renderApp(<AiActionsCard patientId={patientId} />, {
      repositories: { aiActions: aiActionsRepo },
    });

    expect(await screen.findByText('Gerar sugestões')).toBeOnTheScreen();

    fireEvent.press(screen.getByText('Gerar sugestões'));

    expect(
      await screen.findByText('Sugestões de hábito estão desligadas agora.'),
    ).toBeOnTheScreen();
  });
});
