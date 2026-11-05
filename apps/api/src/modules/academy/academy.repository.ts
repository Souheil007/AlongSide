import { randomUUID } from 'node:crypto';
import {
  prisma as defaultPrisma,
  type PrismaClient,
  ACADEMY_SEED_MODULES,
  type AcademyModuleSeedData,
  type AcademyChapterSeedData,
  type AcademyLessonSeedData,
} from '@alongside/database';
import {
  AcademyCategory,
  ChapterPriority,
  type DevelopmentalTier,
  type AcademyCategoryStatsDTO,
  type AcademyChapterDTO,
  type AcademyModuleDTO,
  type AcademyLessonSummaryDTO,
  type AcademyLessonDTO,
  type AcademyModuleDetailDTO,
  type AcademyLessonCompletionResponseDTO,
} from '@alongside/shared';

export interface AcademyRepository {
  findCategoriesWithStats(
    tier?: DevelopmentalTier
  ): Promise<AcademyCategoryStatsDTO[]>;
  findModules(options?: {
    category?: AcademyCategory;
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

export const ACADEMY_CATEGORY_METADATA: Record<
  AcademyCategory,
  { title: string; description: string; sortOrder: number }
> = {
  [AcademyCategory.BEHAVIOR_AND_EMOTIONS]: {
    title: 'Behavior & Emotional Co-Regulation',
    description:
      'Neurobiology-backed emotional co-regulation, tantrum de-escalation, and boundary frameworks.',
    sortOrder: 1,
  },
  [AcademyCategory.HEALTH_AND_WELLNESS]: {
    title: 'Pediatric Health, Sleep & Biological Rhythms',
    description:
      'Authoritative pediatric advisory on sleep architecture, circadian shifts, immunity, and athletic wellness.',
    sortOrder: 2,
  },
  [AcademyCategory.NUTRITION_AND_FEEDING]: {
    title: 'Nutrition & Healthy Feeding Habits',
    description:
      'Allergen introduction, division of responsibility, picky eating de-escalation, and adolescent metabolic health.',
    sortOrder: 3,
  },
  [AcademyCategory.DEVELOPMENT_AND_PLAY]: {
    title: 'Cognitive Development & Purposeful Play',
    description:
      'Executive function, language bursts, spatial reasoning, and real-world maker play across every developmental leap.',
    sortOrder: 4,
  },
  [AcademyCategory.DIGITAL_AND_DEVICES]: {
    title: 'Modern Digital World, Screens & Device Sovereignty',
    description:
      'Bilateral screen agreements, smartphone readiness, dopamine loop navigation, and neutral sleep curfews.',
    sortOrder: 5,
  },
};

export const SLUG_ALIASES: Record<string, string> = {
  'infant-sensory-milestones-and-coregulation': 'behavior-infant-coregulation',
  'early-childhood-executive-function-and-play': 'behavior-preschool-feelings',
  'early-impulse-centers-and-shared-media': 'behavior-elementary-impulses',
  'tween-neurobiology-and-adrenarche': 'behavior-tween-adrenarche',
  'pubertal-circadian-delay-and-sleep': 'health-adolescent-sleep-protection',
  'teen-autonomy-and-graduated-privileges': 'behavior-teen-autonomy',
  'how-algorithms-shape-teen-brains': 'digital-adolescent-algorithmic-feeds',
};

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

  async findCategoriesWithStats(
    tier?: DevelopmentalTier
  ): Promise<AcademyCategoryStatsDTO[]> {
    const where: any = {};
    if (tier) {
      const equivalents = getEquivalentTiers(tier);
      where.developmentalTier =
        equivalents.length === 1 ? equivalents[0] : { in: equivalents };
    }

    const modules = await this.prisma.academyModule.findMany({
      where,
      select: {
        category: true,
        _count: {
          select: { lessons: true },
        },
      },
    });

    const categoryStatsMap = new Map<
      AcademyCategory,
      { moduleCount: number; lessonCount: number }
    >();

    for (const cat of Object.values(AcademyCategory)) {
      categoryStatsMap.set(cat, { moduleCount: 0, lessonCount: 0 });
    }

    for (const mod of modules) {
      const stats = categoryStatsMap.get(mod.category as AcademyCategory);
      if (stats) {
        stats.moduleCount += 1;
        stats.lessonCount += mod._count.lessons;
      }
    }

    const categories = Object.values(AcademyCategory).map((cat) => {
      const meta = ACADEMY_CATEGORY_METADATA[cat];
      const stats = categoryStatsMap.get(cat) ?? { moduleCount: 0, lessonCount: 0 };
      return {
        category: cat,
        title: meta.title,
        description: meta.description,
        moduleCount: stats.moduleCount,
        lessonCount: stats.lessonCount,
        sortOrder: meta.sortOrder,
      };
    });

    return categories
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(({ sortOrder: _, ...rest }) => rest);
  }

  async findModules(options?: {
    category?: AcademyCategory;
    tier?: DevelopmentalTier;
    userId?: string;
  }): Promise<AcademyModuleDTO[]> {
    const where: any = {};
    if (options?.category) {
      where.category = options.category;
    }
    if (options?.tier) {
      const equivalents = getEquivalentTiers(options.tier);
      where.developmentalTier =
        equivalents.length === 1 ? equivalents[0] : { in: equivalents };
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
        category: m.category as AcademyCategory,
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
    const targetSlug = SLUG_ALIASES[slug] || slug;

    const moduleRecord = await this.prisma.academyModule.findUnique({
      where: { slug: targetSlug },
      include: {
        chapters: {
          orderBy: [{ priority: 'asc' }, { sortOrder: 'asc' }],
          include: {
            lessons: {
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
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

    const flatLessons: AcademyLessonSummaryDTO[] = moduleRecord.lessons.map((l) => ({
      id: l.id,
      moduleId: l.moduleId,
      chapterId: l.chapterId,
      slug: l.slug,
      title: l.title,
      readingMinutes: l.readingMinutes,
      sortOrder: l.sortOrder,
      isCompleted: completedLessonIds.has(l.id),
    }));

    const chapters: AcademyChapterDTO[] = moduleRecord.chapters.map((ch) => {
      const chLessons: AcademyLessonSummaryDTO[] = ch.lessons.map((l) => ({
        id: l.id,
        moduleId: l.moduleId,
        chapterId: l.chapterId,
        slug: l.slug,
        title: l.title,
        readingMinutes: l.readingMinutes,
        sortOrder: l.sortOrder,
        isCompleted: completedLessonIds.has(l.id),
      }));

      const chLessonCount = chLessons.length;
      const chCompletedCount = chLessons.filter((l) => l.isCompleted).length;
      const isCompleted = chLessonCount > 0 && chCompletedCount === chLessonCount;

      return {
        id: ch.id,
        moduleId: ch.moduleId,
        slug: ch.slug,
        title: ch.title,
        summary: ch.summary,
        priority: ch.priority,
        sortOrder: ch.sortOrder,
        lessonCount: chLessonCount,
        completedLessonCount: chCompletedCount,
        isCompleted,
        lessons: chLessons,
      };
    });

    const lessonCount = flatLessons.length;
    const completedLessonCount = flatLessons.filter((l) => l.isCompleted).length;
    const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

    return {
      id: moduleRecord.id,
      category: moduleRecord.category as AcademyCategory,
      slug: slug === targetSlug ? moduleRecord.slug : slug,
      title: moduleRecord.title,
      summary: moduleRecord.summary,
      coverImageUrl: moduleRecord.coverImageUrl,
      developmentalTier: moduleRecord.developmentalTier as DevelopmentalTier,
      sortOrder: moduleRecord.sortOrder,
      lessonCount,
      completedLessonCount,
      isCompleted,
      chapters,
      lessons: flatLessons,
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
            category: true,
          },
        },
        chapter: {
          select: {
            id: true,
            slug: true,
            title: true,
            priority: true,
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
      chapterId: lesson.chapterId,
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
        category: lesson.module.category as AcademyCategory,
      },
      chapter: lesson.chapter
        ? {
            id: lesson.chapter.id,
            slug: lesson.chapter.slug,
            title: lesson.chapter.title,
            priority: lesson.chapter.priority,
          }
        : null,
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

interface InMemoryModule {
  id: string;
  category: AcademyCategory;
  slug: string;
  title: string;
  summary: string;
  coverImageUrl: string | null;
  developmentalTier: DevelopmentalTier;
  sortOrder: number;
}

interface InMemoryChapter {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  summary: string;
  priority: number;
  sortOrder: number;
}

interface InMemoryLesson {
  id: string;
  moduleId: string;
  chapterId: string | null;
  slug: string;
  title: string;
  contentMarkdown: string;
  readingMinutes: number;
  sortOrder: number;
}

export class InMemoryAcademyRepository implements AcademyRepository {
  private modules: Map<string, InMemoryModule> = new Map();
  private chapters: Map<string, InMemoryChapter> = new Map();
  private lessons: Map<string, InMemoryLesson> = new Map();
  private progressRecords: Map<string, InMemoryProgress> = new Map();

  constructor(autoSeed = true) {
    if (autoSeed) {
      this.seedDefaultData();
    }
  }

  private seedDefaultData(): void {
    for (const mod of ACADEMY_SEED_MODULES) {
      const moduleId = `mod-${mod.slug}`;
      const moduleRecord: InMemoryModule = {
        id: moduleId,
        category: mod.category,
        slug: mod.slug,
        title: mod.title,
        summary: mod.summary,
        coverImageUrl: mod.coverImageUrl ?? null,
        developmentalTier: mod.developmentalTier,
        sortOrder: mod.sortOrder,
      };
      this.modules.set(moduleId, moduleRecord);

      for (const chapter of mod.chapters) {
        const chapterId = `ch-${mod.slug}-${chapter.slug}`;
        this.chapters.set(chapterId, {
          id: chapterId,
          moduleId,
          slug: chapter.slug,
          title: chapter.title,
          summary: chapter.summary,
          priority: chapter.priority,
          sortOrder: chapter.sortOrder,
        });

        for (const lesson of chapter.lessons) {
          const lessonId = `les-${mod.slug}-${lesson.slug}`;
          const lessonRecord: InMemoryLesson = {
            id: lessonId,
            moduleId,
            chapterId,
            slug: lesson.slug,
            title: lesson.title,
            contentMarkdown: lesson.contentMarkdown,
            readingMinutes: lesson.readingMinutes,
            sortOrder: lesson.sortOrder,
          };
          this.lessons.set(lessonId, lessonRecord);
        }
      }
    }
  }

  async findCategoriesWithStats(
    tier?: DevelopmentalTier
  ): Promise<AcademyCategoryStatsDTO[]> {
    let allModules = Array.from(this.modules.values()).filter(
      (m) => !Object.keys(SLUG_ALIASES).includes(m.slug)
    );
    if (tier) {
      const equivalents = getEquivalentTiers(tier);
      allModules = allModules.filter((m) =>
        equivalents.includes(m.developmentalTier)
      );
    }
    const allModuleIds = new Set(allModules.map((m) => m.id));
    const allLessons = Array.from(this.lessons.values()).filter((l) =>
      allModuleIds.has(l.moduleId)
    );

    return Object.values(AcademyCategory)
      .map((cat) => {
        const meta = ACADEMY_CATEGORY_METADATA[cat];
        const catModules = allModules.filter((m) => m.category === cat);
        const moduleIds = new Set(catModules.map((m) => m.id));
        const catLessons = allLessons.filter((l) => moduleIds.has(l.moduleId));

        return {
          category: cat,
          title: meta.title,
          description: meta.description,
          moduleCount: catModules.length,
          lessonCount: catLessons.length,
          sortOrder: meta.sortOrder,
        };
      })
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(({ sortOrder: _, ...rest }) => rest);
  }

  async findModules(options?: {
    category?: AcademyCategory;
    tier?: DevelopmentalTier;
    userId?: string;
  }): Promise<AcademyModuleDTO[]> {
    let moduleList = Array.from(this.modules.values()).filter(
      (m) => !Object.keys(SLUG_ALIASES).includes(m.slug)
    );

    if (options?.category) {
      moduleList = moduleList.filter((m) => m.category === options.category);
    }

    if (options?.tier) {
      const equivalents = new Set(getEquivalentTiers(options.tier));
      moduleList = moduleList.filter((m) => equivalents.has(m.developmentalTier));
    }

    moduleList.sort((a, b) => a.sortOrder - b.sortOrder);

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
        category: m.category,
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
    const targetSlug = SLUG_ALIASES[slug] || slug;

    const mod =
      Array.from(this.modules.values()).find((m) => m.slug === targetSlug) ??
      Array.from(this.modules.values()).find((m) => m.slug === slug);

    if (!mod) {
      return null;
    }

    const modChapters = Array.from(this.chapters.values())
      .filter((ch) => ch.moduleId === mod.id)
      .sort((a, b) => a.priority - b.priority || a.sortOrder - b.sortOrder);

    const allModLessons = Array.from(this.lessons.values())
      .filter((l) => l.moduleId === mod.id)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const chapters: AcademyChapterDTO[] = modChapters.map((ch) => {
      const chLessons = allModLessons.filter((l) => l.chapterId === ch.id);
      const chLessonSummaries: AcademyLessonSummaryDTO[] = chLessons.map((l) => {
        let isCompleted = false;
        if (userId) {
          const key = `${userId}:${l.id}`;
          isCompleted = this.progressRecords.get(key)?.isCompleted ?? false;
        }
        return {
          id: l.id,
          moduleId: l.moduleId,
          chapterId: l.chapterId,
          slug: l.slug,
          title: l.title,
          readingMinutes: l.readingMinutes,
          sortOrder: l.sortOrder,
          isCompleted,
        };
      });

      const lessonCount = chLessonSummaries.length;
      const completedLessonCount = chLessonSummaries.filter((l) => l.isCompleted).length;
      const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

      return {
        id: ch.id,
        moduleId: ch.moduleId,
        slug: ch.slug,
        title: ch.title,
        summary: ch.summary,
        priority: ch.priority,
        sortOrder: ch.sortOrder,
        lessonCount,
        completedLessonCount,
        isCompleted,
        lessons: chLessonSummaries,
      };
    });

    const flatLessons: AcademyLessonSummaryDTO[] = allModLessons.map((l) => {
      let isCompleted = false;
      if (userId) {
        const key = `${userId}:${l.id}`;
        isCompleted = this.progressRecords.get(key)?.isCompleted ?? false;
      }
      return {
        id: l.id,
        moduleId: l.moduleId,
        chapterId: l.chapterId,
        slug: l.slug,
        title: l.title,
        readingMinutes: l.readingMinutes,
        sortOrder: l.sortOrder,
        isCompleted,
      };
    });

    const lessonCount = flatLessons.length;
    const completedLessonCount = flatLessons.filter((l) => l.isCompleted).length;
    const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;

    return {
      id: mod.id,
      category: mod.category,
      slug,
      title: mod.title,
      summary: mod.summary,
      coverImageUrl: mod.coverImageUrl,
      developmentalTier: mod.developmentalTier,
      sortOrder: mod.sortOrder,
      lessonCount,
      completedLessonCount,
      isCompleted,
      chapters,
      lessons: flatLessons,
    };
  }

  async findLessonById(
    lessonId: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null> {
    let lesson = this.lessons.get(lessonId);
    if (!lesson) {
      for (const [alias, target] of Object.entries(SLUG_ALIASES)) {
        if (lessonId.includes(alias)) {
          const targetLessonId = lessonId.replace(alias, target);
          lesson = this.lessons.get(targetLessonId);
          if (lesson) break;
        }
      }
    }

    if (!lesson) {
      return null;
    }

    const mod = this.modules.get(lesson.moduleId);
    if (!mod) {
      return null;
    }

    const ch = lesson.chapterId ? this.chapters.get(lesson.chapterId) : null;

    let isCompleted = false;
    if (userId) {
      const key = `${userId}:${lesson.id}`;
      isCompleted =
        this.progressRecords.get(key)?.isCompleted ??
        this.progressRecords.get(`${userId}:${lessonId}`)?.isCompleted ??
        false;
    }

    let moduleSlug = mod.slug;
    for (const [alias, target] of Object.entries(SLUG_ALIASES)) {
      if (lessonId.includes(alias) && mod.slug === target) {
        moduleSlug = alias;
        break;
      }
    }

    return {
      id: lessonId,
      moduleId: lesson.moduleId,
      chapterId: lesson.chapterId,
      slug: lesson.slug,
      title: lesson.title,
      contentMarkdown: lesson.contentMarkdown,
      readingMinutes: lesson.readingMinutes,
      sortOrder: lesson.sortOrder,
      isCompleted,
      module: {
        id: mod.id,
        slug: moduleSlug,
        title: mod.title,
        developmentalTier: mod.developmentalTier,
        category: mod.category,
      },
      chapter: ch
        ? {
            id: ch.id,
            slug: ch.slug,
            title: ch.title,
            priority: ch.priority,
          }
        : null,
    };
  }

  async markLessonComplete(
    userId: string,
    lessonId: string
  ): Promise<AcademyLessonCompletionResponseDTO> {
    let resolvedLessonId = lessonId;
    let lesson = this.lessons.get(lessonId);
    if (!lesson) {
      for (const [alias, target] of Object.entries(SLUG_ALIASES)) {
        if (lessonId.includes(alias)) {
          const targetLessonId = lessonId.replace(alias, target);
          lesson = this.lessons.get(targetLessonId);
          if (lesson) {
            resolvedLessonId = targetLessonId;
            break;
          }
        }
      }
    }

    if (!lesson) {
      throw new Error(`Lesson not found with id: ${lessonId}`);
    }

    const mod = this.modules.get(lesson.moduleId);
    if (!mod) {
      throw new Error(`Module not found for lesson: ${lessonId}`);
    }

    const progress: InMemoryProgress = {
      id: randomUUID(),
      userId,
      lessonId: resolvedLessonId,
      isCompleted: true,
      completedAt: new Date(),
    };
    this.progressRecords.set(`${userId}:${resolvedLessonId}`, progress);
    this.progressRecords.set(`${userId}:${lessonId}`, progress);

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
        lessonId,
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
