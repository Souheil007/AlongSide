import type {
  LlmClientAdapter,
  LlmStreamOptions,
} from './llm.adapter.js';

export interface MistralAdapterOptions {
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

export class MistralAdapter implements LlmClientAdapter {
  readonly providerName = 'mistral';
  readonly hasApiKey: boolean;
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor(opts: MistralAdapterOptions = {}) {
    const rawApiKey =
      opts.apiKey ||
      process.env.MISTRAL_API_KEY ||
      process.env.MISTRAL_KEY ||
      process.env.MISTRAL_API_TOKEN ||
      '';
    this.apiKey = rawApiKey.trim().replace(/^["']|["']$/g, '');
    this.hasApiKey = Boolean(this.apiKey);

    const rawModel =
      opts.model ||
      process.env.MISTRAL_MODEL ||
      process.env.MISTRAL_AI_MODEL ||
      'mistral-small-latest';
    this.model = rawModel.trim().replace(/^["']|["']$/g, '');
    this.baseUrl = opts.baseUrl || 'https://api.mistral.ai/v1';
  }

  async *stream(options: LlmStreamOptions): AsyncIterable<string> {
    if (!this.apiKey) {
      throw new Error('MISTRAL_API_KEY is not configured.');
    }

    let response = await fetch(`${this.baseUrl}/chat/completions`, {
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

    // If configured model fails with 400/404 (e.g. deprecated model name), retry with mistral-small-latest
    if (!response.ok && (response.status === 400 || response.status === 404) && this.model !== 'mistral-small-latest') {
      const initialError = await response.text().catch(() => '');
      console.warn(`[MistralAdapter] Model '${this.model}' failed (${response.status}): ${initialError}. Retrying with 'mistral-small-latest'...`);
      response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistral-small-latest',
          messages: options.messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 1024,
          stream: true,
        }),
      });
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error(`[MistralAdapter] Streaming request failed: status=${response.status} ${response.statusText}, body=${errText}`);
      throw new Error(
        `Mistral streaming failed (${response.status} ${response.statusText}): ${errText}`
      );
    }

    if (!response.body) {
      throw new Error('Mistral response returned no readable stream body.');
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
