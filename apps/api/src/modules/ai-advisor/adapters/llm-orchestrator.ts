import type { FastifyBaseLogger } from 'fastify';
import type {
  LlmClientAdapter,
  LlmStreamOptions,
} from './llm.adapter.js';
import { OpenAiAdapter } from './openai.adapter.js';
import { GeminiAdapter } from './gemini.adapter.js';
import { MistralAdapter } from './mistral.adapter.js';

export class AllLlmProvidersFailedError extends Error {
  readonly statusCode = 503;
  readonly code = 'ALL_LLM_PROVIDERS_UNAVAILABLE';

  constructor(message = 'All AI Advisor language models are currently unavailable.') {
    super(message);
    this.name = 'AllLlmProvidersFailedError';
  }
}

export type LoggerLike = {
  warn: (objOrMsg: any, msg?: string) => void;
};

export interface MultiProviderOrchestratorOptions {
  adapters?: LlmClientAdapter[];
  logger?: LoggerLike;
}

export class MultiProviderLlmOrchestrator {
  private readonly adapters: LlmClientAdapter[];
  private readonly logger: LoggerLike;

  constructor(opts: MultiProviderOrchestratorOptions = {}) {
    this.adapters = opts.adapters ?? [
      new OpenAiAdapter(),
      new GeminiAdapter(),
      new MistralAdapter(),
    ];
    this.logger = opts.logger ?? console;
  }

  get configuredProviders(): string[] {
    return this.adapters.map((a) => a.providerName);
  }

  async *stream(options: LlmStreamOptions): AsyncIterable<string> {
    if (this.adapters.length === 0) {
      throw new AllLlmProvidersFailedError('No LLM client adapters configured.');
    }

    let lastError: unknown = null;

    for (let i = 0; i < this.adapters.length; i++) {
      const adapter = this.adapters[i]!;
      const nextAdapter = this.adapters[i + 1];

      try {
        const streamIterable = adapter.stream(options);
        const iterator = streamIterable[Symbol.asyncIterator]();

        // Peek at first token to confirm provider connects and streams successfully
        const first = await iterator.next();

        if (first.done) {
          // Empty stream from provider, try next
          throw new Error(`Provider '${adapter.providerName}' yielded empty stream.`);
        }

        // Successfully received first token from this adapter
        yield first.value;

        // Yield remaining tokens
        while (true) {
          const { done, value } = await iterator.next();
          if (done) break;
          yield value;
        }

        // Successfully streamed full response
        return;
      } catch (err) {
        lastError = err;
        const reason = err instanceof Error ? err.message : String(err);

        this.logger.warn?.({
          event: 'llm_fallback',
          fromProvider: adapter.providerName,
          toProvider: nextAdapter ? nextAdapter.providerName : null,
          reason,
        }, `LLM provider '${adapter.providerName}' failed. Falling back to '${nextAdapter?.providerName ?? 'none'}'.`);
      }
    }

    // All providers exhausted
    throw new AllLlmProvidersFailedError(
      `All configured AI providers failed. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`
    );
  }
}
