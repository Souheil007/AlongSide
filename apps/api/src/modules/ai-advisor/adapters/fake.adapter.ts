import type {
  LlmClientAdapter,
  LlmStreamOptions,
} from './llm.adapter.js';

export interface FakeLlmOptions {
  providerName?: string;
  tokens?: string[];
  shouldFail?: boolean;
  failCount?: number;
  failureError?: Error;
}

export class DeterministicAiAdvisorFake implements LlmClientAdapter {
  readonly providerName: string;
  private tokens: string[];
  private shouldFail: boolean;
  private failCount: number;
  private failureError: Error;
  public callCount = 0;
  public receivedOptions: LlmStreamOptions[] = [];

  constructor(opts: FakeLlmOptions = {}) {
    this.providerName = opts.providerName ?? 'fake-llm';
    this.tokens = opts.tokens ?? [
      'First, take a deep breath. ',
      'What you just witnessed was not a character failure—it was a neurochemical dopamine crash. ',
      'When your child stops a high-reward game abruptly, their brain registers an acute deficit. ',
      'Wait 10 minutes for their nervous system to settle, then use this script: ',
      '"I know shutting down in the middle of a match felt awful. In our Family Pact, the screen docks at 8:30 PM."',
    ];
    this.shouldFail = opts.shouldFail ?? false;
    this.failCount = opts.failCount ?? (this.shouldFail ? Infinity : 0);
    this.failureError =
      opts.failureError ??
      new Error(`${this.providerName} simulated failure: upstream connection timeout`);
  }

  setFailure(fail: boolean, count = Infinity, error?: Error): void {
    this.shouldFail = fail;
    this.failCount = fail ? count : 0;
    if (error) this.failureError = error;
  }

  setTokens(tokens: string[]): void {
    this.tokens = tokens;
  }

  async *stream(options: LlmStreamOptions): AsyncIterable<string> {
    this.callCount++;
    this.receivedOptions.push(options);

    if (this.shouldFail && this.failCount > 0) {
      this.failCount--;
      if (this.failCount === 0) {
        this.shouldFail = false;
      }
      throw this.failureError;
    }

    for (const token of this.tokens) {
      yield token;
    }
  }
}

export { DeterministicAiAdvisorFake as InMemoryLlmFake };
