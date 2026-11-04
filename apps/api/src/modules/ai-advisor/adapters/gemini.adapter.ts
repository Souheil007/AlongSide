import type {
  LlmClientAdapter,
  LlmStreamOptions,
} from './llm.adapter.js';

export interface GeminiAdapterOptions {
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

export class GeminiAdapter implements LlmClientAdapter {
  readonly providerName = 'gemini';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor(opts: GeminiAdapterOptions = {}) {
    this.apiKey = opts.apiKey || process.env.GEMINI_API_KEY || '';
    this.model = opts.model || process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    this.baseUrl =
      opts.baseUrl || 'https://generativelanguage.googleapis.com/v1beta/models';
  }

  async *stream(options: LlmStreamOptions): AsyncIterable<string> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured.');
    }

    const systemMessages = options.messages.filter((m) => m.role === 'system');
    const nonSystemMessages = options.messages.filter((m) => m.role !== 'system');

    const contents = nonSystemMessages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const bodyPayload: any = {
      contents,
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 1024,
      },
    };

    if (systemMessages.length > 0) {
      bodyPayload.systemInstruction = {
        parts: [{ text: systemMessages.map((m) => m.content).join('\n\n') }],
      };
    }

    const url = `${this.baseUrl}/${this.model}:streamGenerateContent?alt=sse&key=${this.apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(
        `Gemini streaming failed (${response.status} ${response.statusText}): ${errText}`
      );
    }

    if (!response.body) {
      throw new Error('Gemini response returned no readable stream body.');
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
            const textPart =
              parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (typeof textPart === 'string' && textPart.length > 0) {
              yield textPart;
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
