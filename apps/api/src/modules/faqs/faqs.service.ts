import type {
  DevelopmentalTier,
  FaqCategoryDTO,
  FaqItemDTO,
  FaqListResponseDTO,
  RoadType,
} from '@alongside/shared';
import type { FaqFilterOptions, FaqRepository } from './faqs.repository.js';

export class FaqsService {
  constructor(private readonly repository: FaqRepository) {}

  async getCategories(): Promise<FaqCategoryDTO[]> {
    return this.repository.findCategories();
  }

  async getCategoryBySlug(slug: string): Promise<FaqCategoryDTO | null> {
    return this.repository.findCategoryBySlug(slug);
  }

  async getFaqs(filter: FaqFilterOptions): Promise<FaqListResponseDTO> {
    const { limit = 20, offset = 0 } = filter;
    const { faqs, total } = await this.repository.findFaqs(filter);

    return {
      faqs,
      total,
      limit,
      offset,
    };
  }

  async getFaqById(id: string): Promise<FaqItemDTO | null> {
    return this.repository.findFaqById(id);
  }

  async searchMatchingFaqs(
    query: string,
    options?: { tier?: DevelopmentalTier; road?: RoadType; limit?: number }
  ): Promise<FaqItemDTO[]> {
    return this.repository.searchSimilarFaqs(query, options);
  }
}
