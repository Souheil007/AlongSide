export interface LlmStreamChunk {
  content: string;
  done: boolean;
}

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LlmStreamOptions {
  messages: LlmMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface LlmClientAdapter {
  readonly providerName: string;
  stream(options: LlmStreamOptions): AsyncIterable<string>;
}
