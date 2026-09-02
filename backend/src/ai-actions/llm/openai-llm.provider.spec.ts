import { ServiceUnavailableException } from '@nestjs/common';

import { OpenAiLlmProvider } from './openai-llm.provider';

describe('OpenAiLlmProvider', () => {
  const provider = new OpenAiLlmProvider();
  const originalKey = process.env.OPENAI_API_KEY;
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterAll(() => {
    if (originalKey === undefined) {
      delete process.env.OPENAI_API_KEY;
      return;
    }

    process.env.OPENAI_API_KEY = originalKey;
  });

  it('returns 503 and does not call the network when the key is missing', async () => {
    delete process.env.OPENAI_API_KEY;

    await expect(
      provider.completeJson({ system: 's', user: 'u' }),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 503 when the provider rejects the request', async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    await expect(
      provider.completeJson({ system: 's', user: 'u' }),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
