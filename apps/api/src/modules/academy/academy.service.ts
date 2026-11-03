import type {
  DevelopmentalTier,
  AcademyModuleDTO,
  AcademyModuleDetailDTO,
  AcademyLessonDTO,
  AcademyLessonCompletionResponseDTO,
} from '@alongside/shared';
import type { AcademyRepository } from './academy.repository.js';

export class AcademyModuleNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'NOT_FOUND';

  constructor(message = 'Academy module not found.') {
    super(message);
    this.name = 'AcademyModuleNotFoundError';
  }
}

export class AcademyLessonNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'NOT_FOUND';

  constructor(message = 'Academy lesson not found.') {
    super(message);
    this.name = 'AcademyLessonNotFoundError';
  }
}

export class AcademyService {
  constructor(private readonly repository: AcademyRepository) {}

  async getModulesByTier(
    tier?: DevelopmentalTier,
    userId?: string
  ): Promise<AcademyModuleDTO[]> {
    return this.repository.findModules({ tier, userId });
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
