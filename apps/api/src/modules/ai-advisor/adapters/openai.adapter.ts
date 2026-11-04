import type {
  LlmClientAdapter,
  LlmStreamOptions,
} from './llm.adapter.js';

export interface OpenAiAdapterOptions {
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

export class OpenAiAdapter implements LlmClientAdapter {
  readonly providerName = 'openai';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor(opts: OpenAiAdapterOptions = {}) {
    this.apiKey = opts.apiKey || process.env.OPENAI_API_KEY || '';
    this.model = opts.model || process.env.OPENAI_MODEL || 'gpt-4o-mini';
    this.baseUrl = opts.baseUrl || 'https://api.openai.com/v1';
  }

  async *stream(options: LlmStreamOptions): AsyncIterable<string> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not configured.');
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1024,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(
        `OpenAI streaming failed (${response.status} ${response.statusText}): ${errText}`
      );
    }

    if (!response.body) {
      throw new Error('OpenAI response returned no readable stream body.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') {
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (typeof content === 'string' && content.length > 0) {
              yield content;
            }
          } catch {
            // Ignore malformed intermediate JSON chunk
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
