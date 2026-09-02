import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import type { LlmJsonRequest, LlmProvider } from './llm-provider';

type OpenAiChatResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

@Injectable()
export class OpenAiLlmProvider implements LlmProvider {
  async completeJson(request: LlmJsonRequest): Promise<unknown> {
    const apiKey = process.env.OPENAI_API_KEY?.trim();

    if (!apiKey) {
      throw new ServiceUnavailableException('LLM is not configured');
    }

    const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: request.system },
          { role: 'user', content: request.user },
        ],
      }),
    });

    if (!response.ok) {
      throw new ServiceUnavailableException('LLM request failed');
    }

    const payload = (await response.json()) as OpenAiChatResponse;
    const content = payload.choices?.[0]?.message?.content;

    if (!content) {
      throw new ServiceUnavailableException('LLM returned an empty response');
    }

    try {
      return JSON.parse(content) as unknown;
    } catch {
      throw new ServiceUnavailableException('LLM returned invalid JSON');
    }
  }
}
