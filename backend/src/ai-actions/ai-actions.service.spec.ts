import { BadGatewayException, ForbiddenException } from '@nestjs/common';
import { AiActionsService } from './ai-actions.service';
import { FlagsService } from '../flags/flags.service';
import { PatientsService } from '../patients/patients.service';
import type { LlmProvider } from './llm/llm-provider';

const patient = {
  id: '11111111-1111-4111-8111-111111111111',
  name: 'Ana Almeida',
  birthDate: new Date('1990-01-15'),
  sex: 'F',
  notes: null,
  biomarkers: [],
};

const threeActions = {
  actions: [
    {
      title: 'Rever glicemia',
      reason: 'Valor acima da faixa',
      recommendation: 'Pedir jejum na próxima consulta',
    },
    {
      title: 'Vitamina D',
      reason: 'Baixa no último exame',
      recommendation: 'Conversar sobre exposição solar',
    },
    {
      title: 'Peso',
      reason: 'Oscilação recente',
      recommendation: 'Registrar tendência em 4 semanas',
    },
  ],
};

describe('AiActionsService', () => {
  const flagsService = {
    isEnabled: jest.fn(),
  };
  const patientsService = {
    getById: jest.fn(),
  };
  const llm: LlmProvider = {
    completeJson: jest.fn(),
  };
  const service = new AiActionsService(
    flagsService as unknown as FlagsService,
    patientsService as unknown as PatientsService,
    llm,
  );

  beforeEach(() => {
    flagsService.isEnabled.mockReset();
    patientsService.getById.mockReset();
    (llm.completeJson as jest.Mock).mockReset();
  });

  it('returns 403 and does not call the LLM when the kill switch is off', async () => {
    flagsService.isEnabled.mockResolvedValue(false);

    await expect(service.generate(patient.id)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(patientsService.getById).not.toHaveBeenCalled();
    expect(llm.completeJson).not.toHaveBeenCalled();
  });

  it('returns structured actions when the flag is on', async () => {
    flagsService.isEnabled.mockResolvedValue(true);
    patientsService.getById.mockResolvedValue(patient);
    (llm.completeJson as jest.Mock).mockResolvedValue(threeActions);

    await expect(service.generate(patient.id)).resolves.toEqual(threeActions);
    expect(llm.completeJson).toHaveBeenCalledTimes(1);
  });

  it('rejects a payload with fewer than 3 actions', async () => {
    flagsService.isEnabled.mockResolvedValue(true);
    patientsService.getById.mockResolvedValue(patient);
    (llm.completeJson as jest.Mock).mockResolvedValue({
      actions: threeActions.actions.slice(0, 2),
    });

    await expect(service.generate(patient.id)).rejects.toBeInstanceOf(
      BadGatewayException,
    );
  });
});
