import { randomUUID } from 'node:crypto';
import {
  prisma as defaultPrisma,
  type PrismaClient,
  ACADEMY_SEED_MODULES,
} from '@alongside/database';
import type {
  DevelopmentalTier,
  AcademyModuleDTO,
  AcademyLessonSummaryDTO,
  AcademyLessonDTO,
  AcademyModuleDetailDTO,
  AcademyLessonCompletionResponseDTO,
} from '@alongside/shared';

export interface AcademyRepository {
  findModules(options?: {
    tier?: DevelopmentalTier;
    userId?: string;
  }): Promise<AcademyModuleDTO[]>;
  findModuleBySlug(
    slug: string,
    userId?: string
  ): Promise<AcademyModuleDetailDTO | null>;
  findLessonById(
    lessonId: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null>;
  markLessonComplete(
    userId: string,
    lessonId: string
  ): Promise<AcademyLessonCompletionResponseDTO>;
}

export function getEquivalentTiers(tier: string): string[] {
  switch (tier) {
    case 'TIER_1_AGES_8_9':
    case 'TIER_2_MIDDLE_CHILDHOOD_7_9':
      return ['TIER_1_AGES_8_9', 'TIER_2_MIDDLE_CHILDHOOD_7_9'];
    case 'TIER_2_AGES_10_11':
    case 'TIER_3_PRE_TEEN_10_12':
      return ['TIER_2_AGES_10_11', 'TIER_3_PRE_TEEN_10_12'];
    case 'TIER_3_AGES_12_13':
    case 'TIER_4_EARLY_ADOLESCENCE_13_15':
      return ['TIER_3_AGES_12_13', 'TIER_4_EARLY_ADOLESCENCE_13_15'];
    case 'TIER_4_AGES_14_PLUS':
    case 'TIER_5_LATE_ADOLESCENCE_16_18':
      return ['TIER_4_AGES_14_PLUS', 'TIER_5_LATE_ADOLESCENCE_16_18'];
    default:
      return [tier];
  }
}

export class PrismaAcademyRepository implements AcademyRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findModules(options?: {
    tier?: DevelopmentalTier;
    userId?: string;
  }): Promise<AcademyModuleDTO[]> {
    const where: any = {};
    if (options?.tier) {
      const equivalents = getEquivalentTiers(options.tier);
      where.developmentalTier = equivalents.length === 1 ? equivalents[0] : { in: equivalents };
    }

    const modules = await this.prisma.academyModule.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      include: {
        lessons: {
          select: { id: true },
        },
      },
    });

    let completedLessonIds = new Set<string>();
    if (options?.userId) {
      const progress = await this.prisma.academyProgress.findMany({
        where: {
          userId: options.userId,
          isCompleted: true,
        },
        select: { lessonId: true },
      });
      completedLessonIds = new Set(progress.map((p) => p.lessonId));
    }

    return modules.map((m) => {
      const lessonCount = m.lessons.length;
      const completedLessonCount = m.lessons.filter((l) =>
        completedLessonIds.has(l.id)
      ).length;
      const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

      return {
        id: m.id,
        slug: m.slug,
        title: m.title,
        summary: m.summary,
        coverImageUrl: m.coverImageUrl,
        developmentalTier: m.developmentalTier as DevelopmentalTier,
        sortOrder: m.sortOrder,
        lessonCount,
        completedLessonCount,
        isCompleted,
      };
    });
  }

  async findModuleBySlug(
    slug: string,
    userId?: string
  ): Promise<AcademyModuleDetailDTO | null> {
    const moduleRecord = await this.prisma.academyModule.findUnique({
      where: { slug },
      include: {
        lessons: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!moduleRecord) {
      return null;
    }

    let completedLessonIds = new Set<string>();
    if (userId) {
      const progress = await this.prisma.academyProgress.findMany({
        where: {
          userId,
          isCompleted: true,
          lessonId: { in: moduleRecord.lessons.map((l) => l.id) },
        },
        select: { lessonId: true },
      });
      completedLessonIds = new Set(progress.map((p) => p.lessonId));
    }

    const lessons: AcademyLessonSummaryDTO[] = moduleRecord.lessons.map((l) => ({
      id: l.id,
      moduleId: l.moduleId,
      slug: l.slug,
      title: l.title,
      readingMinutes: l.readingMinutes,
      sortOrder: l.sortOrder,
      isCompleted: completedLessonIds.has(l.id),
    }));

    const lessonCount = lessons.length;
    const completedLessonCount = lessons.filter((l) => l.isCompleted).length;
    const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

    return {
      id: moduleRecord.id,
      slug: moduleRecord.slug,
      title: moduleRecord.title,
      summary: moduleRecord.summary,
      coverImageUrl: moduleRecord.coverImageUrl,
      developmentalTier: moduleRecord.developmentalTier as DevelopmentalTier,
      sortOrder: moduleRecord.sortOrder,
      lessonCount,
      completedLessonCount,
      isCompleted,
      lessons,
    };
  }

  async findLessonById(
    lessonId: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null> {
    const lesson = await this.prisma.academyLesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          select: {
            id: true,
            slug: true,
            title: true,
            developmentalTier: true,
          },
        },
      },
    });

    if (!lesson) {
      return null;
    }

    let isCompleted = false;
    if (userId) {
      const progress = await this.prisma.academyProgress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId,
          },
        },
      });
      isCompleted = progress?.isCompleted ?? false;
    }

    return {
      id: lesson.id,
      moduleId: lesson.moduleId,
      slug: lesson.slug,
      title: lesson.title,
      contentMarkdown: lesson.contentMarkdown,
      readingMinutes: lesson.readingMinutes,
      sortOrder: lesson.sortOrder,
      isCompleted,
      module: {
        id: lesson.module.id,
        slug: lesson.module.slug,
        title: lesson.module.title,
        developmentalTier: lesson.module.developmentalTier as DevelopmentalTier,
      },
    };
  }

  async markLessonComplete(
    userId: string,
    lessonId: string
  ): Promise<AcademyLessonCompletionResponseDTO> {
    const lesson = await this.prisma.academyLesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            lessons: {
              select: { id: true },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new Error(`Lesson not found with id: ${lessonId}`);
    }

    const progressRecord = await this.prisma.academyProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    const moduleLessonIds = lesson.module.lessons.map((l) => l.id);
    const completedProgress = await this.prisma.academyProgress.findMany({
      where: {
        userId,
        lessonId: { in: moduleLessonIds },
        isCompleted: true,
      },
    });

    const lessonCount = moduleLessonIds.length;
    const completedLessonCount = completedProgress.length;
    const percentComplete =
      lessonCount > 0 ? Math.round((completedLessonCount / lessonCount) * 100) : 0;
    const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

    return {
      progress: {
        id: progressRecord.id,
        userId: progressRecord.userId,
        lessonId: progressRecord.lessonId,
        isCompleted: progressRecord.isCompleted,
        completedAt: progressRecord.completedAt.toISOString(),
      },
      module: {
        id: lesson.module.id,
        slug: lesson.module.slug,
        title: lesson.module.title,
        lessonCount,
        completedLessonCount,
        percentComplete,
        isCompleted,
      },
    };
  }
}

interface InMemoryProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt: Date;
}

export class InMemoryAcademyRepository implements AcademyRepository {
  private modules: Map<
    string,
    {
      id: string;
      slug: string;
      title: string;
      summary: string;
      coverImageUrl: string | null;
      developmentalTier: DevelopmentalTier;
      sortOrder: number;
    }
  > = new Map();

  private lessons: Map<
    string,
    {
      id: string;
      moduleId: string;
      slug: string;
      title: string;
      contentMarkdown: string;
      readingMinutes: number;
      sortOrder: number;
    }
  > = new Map();

  private progressRecords: Map<string, InMemoryProgress> = new Map();

  constructor(autoSeed = true) {
    if (autoSeed) {
      this.seedDefaultData();
    }
  }

  private seedDefaultData(): void {
    for (const mod of ACADEMY_SEED_MODULES) {
      const moduleId = `mod-${mod.slug}`;
      this.modules.set(moduleId, {
        id: moduleId,
        slug: mod.slug,
        title: mod.title,
        summary: mod.summary,
        coverImageUrl: mod.coverImageUrl ?? null,
        developmentalTier: mod.developmentalTier,
        sortOrder: mod.sortOrder,
      });

      for (const lesson of mod.lessons) {
        const lessonId = `les-${mod.slug}-${lesson.slug}`;
        this.lessons.set(lessonId, {
          id: lessonId,
          moduleId,
          slug: lesson.slug,
          title: lesson.title,
          contentMarkdown: lesson.contentMarkdown,
          readingMinutes: lesson.readingMinutes,
          sortOrder: lesson.sortOrder,
        });
      }
    }
  }

  async findModules(options?: {
    tier?: DevelopmentalTier;
    userId?: string;
  }): Promise<AcademyModuleDTO[]> {
    let moduleList = Array.from(this.modules.values()).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );

    if (options?.tier) {
      const equivalents = new Set(getEquivalentTiers(options.tier));
      moduleList = moduleList.filter((m) => equivalents.has(m.developmentalTier));
    }

    const allLessons = Array.from(this.lessons.values());

    return moduleList.map((m) => {
      const modLessons = allLessons.filter((l) => l.moduleId === m.id);
      const lessonCount = modLessons.length;

      let completedLessonCount = 0;
      if (options?.userId) {
        completedLessonCount = modLessons.filter((l) => {
          const key = `${options.userId}:${l.id}`;
          const p = this.progressRecords.get(key);
          return p?.isCompleted === true;
        }).length;
      }

      const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

      return {
        id: m.id,
        slug: m.slug,
        title: m.title,
        summary: m.summary,
        coverImageUrl: m.coverImageUrl,
        developmentalTier: m.developmentalTier,
        sortOrder: m.sortOrder,
        lessonCount,
        completedLessonCount,
        isCompleted,
      };
    });
  }

  async findModuleBySlug(
    slug: string,
    userId?: string
  ): Promise<AcademyModuleDetailDTO | null> {
    const mod = Array.from(this.modules.values()).find((m) => m.slug === slug);
    if (!mod) {
      return null;
    }

    const modLessons = Array.from(this.lessons.values())
      .filter((l) => l.moduleId === mod.id)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const lessonCount = modLessons.length;
    let completedLessonCount = 0;

    const lessonsSummary: AcademyLessonSummaryDTO[] = modLessons.map((l) => {
      let isCompleted = false;
      if (userId) {
        const key = `${userId}:${l.id}`;
        isCompleted = this.progressRecords.get(key)?.isCompleted ?? false;
      }
      if (isCompleted) {
        completedLessonCount++;
      }
      return {
        id: l.id,
        moduleId: l.moduleId,
        slug: l.slug,
        title: l.title,
        readingMinutes: l.readingMinutes,
        sortOrder: l.sortOrder,
        isCompleted,
      };
    });

    const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

    return {
      id: mod.id,
      slug: mod.slug,
      title: mod.title,
      summary: mod.summary,
      coverImageUrl: mod.coverImageUrl,
      developmentalTier: mod.developmentalTier,
      sortOrder: mod.sortOrder,
      lessonCount,
      completedLessonCount,
      isCompleted,
      lessons: lessonsSummary,
    };
  }

  async findLessonById(
    lessonId: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null> {
    const lesson = this.lessons.get(lessonId);
    if (!lesson) {
      return null;
    }

    const mod = this.modules.get(lesson.moduleId);
    if (!mod) {
      return null;
    }

    let isCompleted = false;
    if (userId) {
      const key = `${userId}:${lesson.id}`;
      isCompleted = this.progressRecords.get(key)?.isCompleted ?? false;
    }

    return {
      id: lesson.id,
      moduleId: lesson.moduleId,
      slug: lesson.slug,
      title: lesson.title,
      contentMarkdown: lesson.contentMarkdown,
      readingMinutes: lesson.readingMinutes,
      sortOrder: lesson.sortOrder,
      isCompleted,
      module: {
        id: mod.id,
        slug: mod.slug,
        title: mod.title,
        developmentalTier: mod.developmentalTier,
      },
    };
  }

  async markLessonComplete(
    userId: string,
    lessonId: string
  ): Promise<AcademyLessonCompletionResponseDTO> {
    const lesson = this.lessons.get(lessonId);
    if (!lesson) {
      throw new Error(`Lesson not found with id: ${lessonId}`);
    }

    const mod = this.modules.get(lesson.moduleId);
    if (!mod) {
      throw new Error(`Module not found for lesson: ${lessonId}`);
    }

    const key = `${userId}:${lessonId}`;
    const progress: InMemoryProgress = {
      id: randomUUID(),
      userId,
      lessonId,
      isCompleted: true,
      completedAt: new Date(),
    };
    this.progressRecords.set(key, progress);

    const modLessons = Array.from(this.lessons.values()).filter(
      (l) => l.moduleId === mod.id
    );
    const lessonCount = modLessons.length;
    const completedLessonCount = modLessons.filter((l) => {
      const k = `${userId}:${l.id}`;
      return this.progressRecords.get(k)?.isCompleted === true;
    }).length;

    const percentComplete =
      lessonCount > 0 ? Math.round((completedLessonCount / lessonCount) * 100) : 0;
    const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

    return {
      progress: {
        id: progress.id,
        userId: progress.userId,
        lessonId: progress.lessonId,
        isCompleted: progress.isCompleted,
        completedAt: progress.completedAt.toISOString(),
      },
      module: {
        id: mod.id,
        slug: mod.slug,
        title: mod.title,
        lessonCount,
        completedLessonCount,
        percentComplete,
        isCompleted,
      },
    };
  }
}
