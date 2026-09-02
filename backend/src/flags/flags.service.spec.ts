import { FlagsService } from './flags.service';
import { FlagsRepository } from './flags.repository';

describe('FlagsService', () => {
  const flagsRepository = {
    findAll: jest.fn(),
  };
  const service = new FlagsService(
    flagsRepository as unknown as FlagsRepository,
  );

  beforeEach(() => {
    flagsRepository.findAll.mockReset();
  });

  it('defaults ai_actions to off when the table is empty', async () => {
    flagsRepository.findAll.mockResolvedValue([]);

    await expect(service.list()).resolves.toEqual({
      flags: { ai_actions: false },
    });
    await expect(service.isEnabled('ai_actions')).resolves.toBe(false);
  });

  it('isEnabled is true only when the stored flag is exactly true', async () => {
    flagsRepository.findAll.mockResolvedValue([
      { key: 'ai_actions', enabled: true },
    ]);

    await expect(service.isEnabled('ai_actions')).resolves.toBe(true);
  });

  it('treats an unknown key as off', async () => {
    flagsRepository.findAll.mockResolvedValue([
      { key: 'ai_actions', enabled: true },
    ]);

    await expect(service.isEnabled('missing')).resolves.toBe(false);
  });
});
