import type {
  AcademyCategory,
  DevelopmentalTier,
  AcademyCategoryStatsDTO,
  AcademyModuleDTO,
  AcademyModuleDetailDTO,
  AcademyLessonDTO,
  AcademyLessonCompletionResponseDTO,
} from '@alongside/shared';
import type { AcademyRepository } from './academy.repository.js';

class AcademyModuleNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'NOT_FOUND';

  constructor(message = 'Academy module not found.') {
    super(message);
    this.name = 'AcademyModuleNotFoundError';
  }
}

class AcademyLessonNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'NOT_FOUND';

  constructor(message = 'Academy lesson not found.') {
    super(message);
    this.name = 'AcademyLessonNotFoundError';
  }
}

export class AcademyService {
  constructor(private readonly repository: AcademyRepository) {}

  async getCategoriesWithStats(
    tier?: DevelopmentalTier
  ): Promise<AcademyCategoryStatsDTO[]> {
    return this.repository.findCategoriesWithStats(tier);
  }

  async getModules(
    options: {
      category?: AcademyCategory;
      tier?: DevelopmentalTier;
    } = {},
    userId?: string
  ): Promise<AcademyModuleDTO[]> {
    return this.repository.findModules({
      category: options.category,
      tier: options.tier,
      userId,
    });
  }

  async getModulesByTier(
    tier?: DevelopmentalTier,
    userId?: string
  ): Promise<AcademyModuleDTO[]> {
    return this.getModules({ tier }, userId);
  }

  async getModuleBySlug(
    slug: string,
    userId?: string
  ): Promise<AcademyModuleDetailDTO> {
    const moduleDetail = await this.repository.findModuleBySlug(slug, userId);
    if (!moduleDetail) {
      throw new AcademyModuleNotFoundError(
        `Academy module not found with slug: ${slug}`
      );
    }
    return moduleDetail;
  }

  async getLessonById(
    lessonId: string,
    userId?: string
  ): Promise<AcademyLessonDTO> {
    const lesson = await this.repository.findLessonById(lessonId, userId);
    if (!lesson) {
      throw new AcademyLessonNotFoundError(
        `Academy lesson not found with id: ${lessonId}`
      );
    }
    return lesson;
  }

  async markLessonComplete(
    userId: string,
    lessonId: string
  ): Promise<AcademyLessonCompletionResponseDTO> {
    // Validate lesson existence before completing
    const existing = await this.repository.findLessonById(lessonId, userId);
    if (!existing) {
      throw new AcademyLessonNotFoundError(
        `Academy lesson not found with id: ${lessonId}`
      );
    }

    return this.repository.markLessonComplete(userId, lessonId);
  }
}
