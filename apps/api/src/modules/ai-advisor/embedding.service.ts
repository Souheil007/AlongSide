import type {
  DevelopmentalTier,
  FaqItemDTO,
  RoadType,
} from '@alongside/shared';
import type { FaqRepository } from '../faqs/faqs.repository.js';

export interface EmbeddingAdapter {
  embed(text: string): Promise<number[]>;
}

export interface OpenAiEmbeddingAdapterOptions {
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

export class OpenAiEmbeddingAdapter implements EmbeddingAdapter {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor(opts: OpenAiEmbeddingAdapterOptions = {}) {
    this.apiKey = opts.apiKey || process.env.OPENAI_API_KEY || '';
    this.model = opts.model || 'text-embedding-3-small';
    this.baseUrl = opts.baseUrl || 'https://api.openai.com/v1';
  }

  async embed(text: string): Promise<number[]> {
    if (!this.apiKey) {
      // Fallback to deterministic pseudo-vector if no API key is configured
      return new InMemoryEmbeddingFake().embed(text);
    }

    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI embedding failed (${response.status} ${response.statusText})`);
    }

    const data: any = await response.json();
    return data.data?.[0]?.embedding ?? [];
  }
}

export class InMemoryEmbeddingFake implements EmbeddingAdapter {
  async embed(text: string): Promise<number[]> {
    const dim = 64;
    const vec = new Array(dim).fill(0);
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      vec[i % dim] += code / 100;
    }
    // Normalize vector
    const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0)) || 1;
    return vec.map((v) => v / norm);
  }
}

export class FaqRetrievalService {
  constructor(
    private readonly faqRepository: FaqRepository,
    private readonly embeddingAdapter: EmbeddingAdapter = new InMemoryEmbeddingFake()
  ) {}

  async retrieveRelevantFaqs(
    query: string,
    options: {
      tier?: DevelopmentalTier;
      road?: RoadType;
      limit?: number;
    } = {}
  ): Promise<FaqItemDTO[]> {
    const { limit = 3, tier, road } = options;
    return this.faqRepository.searchSimilarFaqs(query, {
      tier,
      road,
      limit,
    });
  }
}
