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
  EpisodeRole,
  LessonArchetype,
  type DevelopmentalTier,
  type AcademyCategoryStatsDTO,
  type AcademyChapterDTO,
  type AcademyModuleDTO,
  type AcademyLessonSummaryDTO,
  type AcademyLessonDTO,
  type AcademyModuleDetailDTO,
  type AcademyLessonCompletionResponseDTO,
  type AdaptiveModuleType,
  type AlmanacLessonPayload,
  type DialogueCardDTO,
  type ThirtySecondGlanceDTO,
  type MasterVideoLectureDTO,
  type ActionProtocolItem,
  type LessonPlaybookInputDTO,
  type LessonPlaybookStateDTO,
  getEquivalentTiers,
  formatCourseTitle,
  resolveAdaptiveModuleType,
  resolveEpisodeRoleFromSortOrder,
  resolveLessonArchetype,
  resolveReliefTagline,
  parseDialogueCards,
  parseThirtySecondGlance,
  parseActionProtocolItems,
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
  findLessonBySlug(
    slug: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null>;
  markLessonComplete(
    userId: string,
    lessonId: string,
    playbookInput?: LessonPlaybookInputDTO
  ): Promise<AcademyLessonCompletionResponseDTO>;
  saveLessonPlaybook(
    userId: string,
    lessonId: string,
    playbookInput: LessonPlaybookInputDTO
  ): Promise<LessonPlaybookStateDTO>;
}

const ACADEMY_CATEGORY_METADATA: Record<
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

const SLUG_ALIASES: Record<string, string> = {
  'infant-sensory-milestones-and-coregulation': 'behavior-infant-coregulation',
  'early-childhood-executive-function-and-play': 'behavior-preschool-feelings',
  'early-impulse-centers-and-shared-media': 'behavior-elementary-impulses',
  'tween-neurobiology-and-adrenarche': 'behavior-tween-adrenarche',
  'pubertal-circadian-delay-and-sleep': 'health-adolescent-sleep-protection',
  'teen-autonomy-and-graduated-privileges': 'behavior-teen-autonomy',
  'how-algorithms-shape-teen-brains': 'digital-adolescent-algorithmic-feeds',
};

const LESSON_SLUG_ALIASES: Record<string, string> = {
  // Wave 1 (Ages 0–3) SOU-86 renames & merged/retired padding slugs
  'infant-temperature-and-fever-triage': 'infant-sick-night-comfort-prep',
  'infant-nocturnal-settling-routines': 'infant-safe-sleep-and-circadian-reset',
  'gagging-vs-choking-triage': 'gagging-reflex-and-safe-first-bites',
  'video-chatting-exception-and-relatives': 'sensory-hyperstimulation-and-dopamine',
  'toddler-illness-recovery-and-hydration': 'toddler-cot-containment-and-winddown',
  'toddler-physiological-anorexia-neurobiology': 'toddler-appetite-slowdown-biology',
  'older-toddler-symbolic-representation-brain': 'older-toddler-open-ended-blocks',
  'older-toddler-orienting-reflex-overload': 'older-toddler-slow-paced-media-audit',
  // Wave 2 (Ages 4–9) merged/retired padding slugs
  'preschool-preventive-wellness-foundations': 'preschool-daycare-viral-comfort',
  'preschool-drawing-and-fine-motor-mastery': 'preschool-nature-loose-parts-play',
  'elementary-daily-movement-routines': 'elementary-growth-plates-and-growing-pains',
  'elementary-glycemic-index-attention': 'elementary-morning-protein-focus',
  'elementary-parietal-cortex-spatial-logic': 'elementary-family-board-game-night',
  // Wave 3 (Ages 10–18) SOU-86 renames & merged/retired padding slugs
  'adolescent-concussion-and-overuse-triage': 'adolescent-stress-and-somatic-resilience',
  'adolescent-bone-density-iron-needs': 'adolescent-post-workout-recovery',
  'adolescent-eating-disorder-red-flags': 'adolescent-body-confidence-and-support',
  'adolescent-metacognition-and-logic': 'adolescent-devils-advocate-debate',
  'teen-frontal-lobe-maturation-25': 'teen-consultant-shift-protocol',
  'teen-lifelong-health-maintenance': 'teen-no-questions-ride-home-pact',
  'teen-intuitive-eating-adult-covenant': 'teen-independent-meal-prepping',
  'teen-creative-expression-schedules': 'teen-life-strategy-and-goal-mapping',
  'teen-continuous-partial-attention-brain': 'teen-self-directed-app-curation',
};

function buildDefaultPlaybookState(
  progress?: {
    isCompleted: boolean;
    chosenMoveId?: string | null;
    bookmarkedTruth?: boolean;
    savedPushbackIds?: string[];
    completedAt?: Date | null;
  } | null
): LessonPlaybookStateDTO {
  return {
    isCompleted: progress?.isCompleted ?? false,
    chosenMoveId: progress?.chosenMoveId ?? null,
    bookmarkedTruth: progress?.bookmarkedTruth ?? false,
    savedPushbackIds: progress?.savedPushbackIds ?? [],
    completedAt: progress?.isCompleted && progress.completedAt
      ? progress.completedAt.toISOString()
      : null,
  };
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
        chapters: {
          select: { id: true },
        },
        lessons: {
          select: {
            id: true,
            moduleId: true,
            chapterId: true,
            slug: true,
            title: true,
            archetype: true,
            episodeRole: true,
            readingMinutes: true,
            sortOrder: true,
            audioUrl: true,
            audioDurationSeconds: true,
            whatNotToSay: true,
            deliveryTip: true,
            videoLecture: true,
            almanacPayload: true,
          },
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

      const lessonsSummary = m.lessons
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((l) => {
          const almanac = l.almanacPayload as unknown as AlmanacLessonPayload | null;
          return {
            id: l.id,
            moduleId: l.moduleId,
            chapterId: l.chapterId,
            slug: l.slug,
            title: l.title,
            readingMinutes: l.readingMinutes,
            sortOrder: l.sortOrder,
            isCompleted: completedLessonIds.has(l.id),
            audioUrl: l.audioUrl ?? undefined,
            audioDurationSeconds: l.audioDurationSeconds ?? undefined,
            whatNotToSay: l.whatNotToSay ?? undefined,
            deliveryTip: l.deliveryTip ?? undefined,
            videoLecture: (l.videoLecture as unknown as MasterVideoLectureDTO) ?? undefined,
            archetype: (l.archetype as LessonArchetype) || resolveLessonArchetype(l.slug, l.title, m.category as AcademyCategory),
            episodeRole:
              (l.episodeRole as EpisodeRole) ||
              almanac?.episodeRole ||
              resolveEpisodeRoleFromSortOrder(l.sortOrder),
            interactiveHighlights: almanac?.interactiveHighlights ?? undefined,
          };
        });

      const featuredVideoLecture =
        (m.featuredVideoLecture as unknown as MasterVideoLectureDTO) ??
        lessonsSummary.find((l) => l.videoLecture)?.videoLecture ??
        undefined;

      return {
        id: m.id,
        category: m.category as AcademyCategory,
        slug: m.slug,
        title: formatCourseTitle(m.title),
        summary: m.summary,
        reliefSubtitle: m.reliefSubtitle ?? undefined,
        tonightQuickWinTitle: m.tonightQuickWinTitle ?? undefined,
        coverImageUrl: m.coverImageUrl,
        developmentalTier: m.developmentalTier as DevelopmentalTier,
        sortOrder: m.sortOrder,
        chapterCount: m.chapters.length,
        lessonCount,
        completedLessonCount,
        isCompleted,
        hasMasterLecture: Boolean(featuredVideoLecture),
        featuredVideoLecture,
        lessons: lessonsSummary,
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

    const flatLessons: AcademyLessonSummaryDTO[] = moduleRecord.lessons.map((l) => {
      const almanac = l.almanacPayload as unknown as AlmanacLessonPayload | null;
      return {
        id: l.id,
        moduleId: l.moduleId,
        chapterId: l.chapterId,
        slug: l.slug,
        title: l.title,
        readingMinutes: l.readingMinutes,
        sortOrder: l.sortOrder,
        isCompleted: completedLessonIds.has(l.id),
        audioUrl: l.audioUrl ?? undefined,
        audioDurationSeconds: l.audioDurationSeconds ?? undefined,
        reliefTagline:
          l.reliefTagline ??
          resolveReliefTagline(l.title, moduleRecord.category as AcademyCategory),
        whatNotToSay: l.whatNotToSay ?? undefined,
        empatheticScript: (l.dialogueCards as unknown as DialogueCardDTO[])?.[0]?.empatheticScript ?? undefined,
        deliveryTip: l.deliveryTip ?? undefined,
        videoLecture: (l.videoLecture as unknown as MasterVideoLectureDTO) ?? undefined,
        archetype: (l.archetype as LessonArchetype) || resolveLessonArchetype(l.slug, l.title, moduleRecord.category as AcademyCategory),
        episodeRole:
          (l.episodeRole as EpisodeRole) ||
          almanac?.episodeRole ||
          resolveEpisodeRoleFromSortOrder(l.sortOrder),
        interactiveHighlights: almanac?.interactiveHighlights ?? undefined,
      };
    });

    const chapters: AcademyChapterDTO[] = moduleRecord.chapters.map((ch) => {
      const chLessons: AcademyLessonSummaryDTO[] = ch.lessons.map((l) => {
        const almanac = l.almanacPayload as unknown as AlmanacLessonPayload | null;
        return {
          id: l.id,
          moduleId: l.moduleId,
          chapterId: l.chapterId,
          slug: l.slug,
          title: l.title,
          readingMinutes: l.readingMinutes,
          sortOrder: l.sortOrder,
          isCompleted: completedLessonIds.has(l.id),
          audioUrl: l.audioUrl ?? undefined,
          audioDurationSeconds: l.audioDurationSeconds ?? undefined,
          reliefTagline:
            l.reliefTagline ??
            resolveReliefTagline(l.title, moduleRecord.category as AcademyCategory),
          whatNotToSay: l.whatNotToSay ?? undefined,
          empatheticScript: (l.dialogueCards as unknown as DialogueCardDTO[])?.[0]?.empatheticScript ?? undefined,
          deliveryTip: l.deliveryTip ?? undefined,
          videoLecture: (l.videoLecture as unknown as MasterVideoLectureDTO) ?? undefined,
          archetype: (l.archetype as LessonArchetype) || resolveLessonArchetype(l.slug, l.title, moduleRecord.category as AcademyCategory),
          episodeRole:
            (l.episodeRole as EpisodeRole) ||
            almanac?.episodeRole ||
            resolveEpisodeRoleFromSortOrder(l.sortOrder),
          interactiveHighlights: almanac?.interactiveHighlights ?? undefined,
        };
      });

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
    const featuredVideoLecture =
      (moduleRecord.featuredVideoLecture as unknown as MasterVideoLectureDTO) ??
      flatLessons.find((l) => l.videoLecture)?.videoLecture ??
      undefined;

    return {
      id: moduleRecord.id,
      category: moduleRecord.category as AcademyCategory,
      slug: slug === targetSlug ? moduleRecord.slug : slug,
      title: formatCourseTitle(moduleRecord.title),
      summary: moduleRecord.summary,
      reliefSubtitle: moduleRecord.reliefSubtitle ?? undefined,
      tonightQuickWinTitle: moduleRecord.tonightQuickWinTitle ?? undefined,
      coverImageUrl: moduleRecord.coverImageUrl,
      developmentalTier: moduleRecord.developmentalTier as DevelopmentalTier,
      sortOrder: moduleRecord.sortOrder,
      lessonCount,
      completedLessonCount,
      isCompleted,
      hasMasterLecture: Boolean(featuredVideoLecture),
      featuredVideoLecture,
      chapters,
      lessons: flatLessons,
    };
  }

  async findLessonById(
    lessonId: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null> {
    const resolvedSlug = LESSON_SLUG_ALIASES[lessonId] ?? lessonId;
    const lesson = await this.prisma.academyLesson.findFirst({
      where: {
        OR: [{ id: lessonId }, { slug: lessonId }, { slug: resolvedSlug }],
      },
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

    let progressRecord: any = null;
    if (userId) {
      progressRecord = await this.prisma.academyProgress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId: lesson.id,
          },
        },
      });
    }

    return this.mapPrismaLessonToDTO(lesson, progressRecord);
  }

  async findLessonBySlug(
    slug: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null> {
    const targetSlug = LESSON_SLUG_ALIASES[slug] ?? slug;
    const lesson = await this.prisma.academyLesson.findFirst({
      where: { slug: targetSlug },
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

    let progressRecord: any = null;
    if (userId) {
      progressRecord = await this.prisma.academyProgress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId: lesson.id,
          },
        },
      });
    }

    return this.mapPrismaLessonToDTO(lesson, progressRecord);
  }

  private mapPrismaLessonToDTO(
    lesson: any,
    progressRecord: any | null
  ): AcademyLessonDTO {
    const isCompleted = progressRecord?.isCompleted ?? false;
    const category = lesson.module.category as AcademyCategory;
    const adaptiveModuleType =
      (lesson.adaptiveModuleType as AdaptiveModuleType) ||
      resolveAdaptiveModuleType(category);
    const reliefTagline =
      lesson.reliefTagline || resolveReliefTagline(lesson.title, category);
    const dialogueCards =
      (lesson.dialogueCards as DialogueCardDTO[]) ||
      parseDialogueCards(lesson.contentMarkdown, lesson.deliveryTip);
    const thirtySecondGlance =
      (lesson.thirtySecondGlance as ThirtySecondGlanceDTO) ||
      parseThirtySecondGlance(
        lesson.contentMarkdown,
        dialogueCards,
        lesson.title
      );
    const almanacPayload =
      (lesson.almanacPayload as unknown as AlmanacLessonPayload | null) ?? null;
    const episodeRole =
      (lesson.episodeRole as EpisodeRole) ||
      almanacPayload?.episodeRole ||
      resolveEpisodeRoleFromSortOrder(lesson.sortOrder);

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
      audioUrl: lesson.audioUrl ?? undefined,
      audioDurationSeconds: lesson.audioDurationSeconds ?? undefined,
      reliefTagline,
      thirtySecondGlance,
      adaptiveModuleType,
      dialogueCards,
      archetype: (lesson.archetype as LessonArchetype) || resolveLessonArchetype(lesson.slug, lesson.title, category),
      episodeRole,
      almanacPayload,
      playbookState: buildDefaultPlaybookState(progressRecord),
      actionProtocolItems: parseActionProtocolItems(lesson.contentMarkdown),
      whatNotToSay:
        lesson.whatNotToSay ??
        (dialogueCards[0]?.instinctiveMistake || undefined),
      deliveryTip:
        lesson.deliveryTip ?? (dialogueCards[0]?.deliveryTip || undefined),
      videoLecture: (lesson.videoLecture as unknown as MasterVideoLectureDTO) ?? undefined,
      module: {
        id: lesson.module.id,
        slug: lesson.module.slug,
        title: lesson.module.title,
        developmentalTier: lesson.module.developmentalTier as DevelopmentalTier,
        category,
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
    lessonId: string,
    playbookInput?: LessonPlaybookInputDTO
  ): Promise<AcademyLessonCompletionResponseDTO> {
    const resolvedSlug = LESSON_SLUG_ALIASES[lessonId] ?? lessonId;
    const lesson = await this.prisma.academyLesson.findFirst({
      where: {
        OR: [{ id: lessonId }, { slug: lessonId }, { slug: resolvedSlug }],
      },
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

    const updateData: Record<string, unknown> = {
      isCompleted: true,
      completedAt: new Date(),
    };
    if (playbookInput?.chosenMoveId !== undefined) {
      updateData.chosenMoveId = playbookInput.chosenMoveId;
    }
    if (playbookInput?.bookmarkedTruth !== undefined) {
      updateData.bookmarkedTruth = playbookInput.bookmarkedTruth;
    }
    if (playbookInput?.savedPushbackIds !== undefined) {
      updateData.savedPushbackIds = playbookInput.savedPushbackIds;
    }

    const progressRecord = await this.prisma.academyProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId: lesson.id,
        },
      },
      update: updateData,
      create: {
        userId,
        lessonId: lesson.id,
        isCompleted: true,
        completedAt: new Date(),
        chosenMoveId: playbookInput?.chosenMoveId ?? null,
        bookmarkedTruth: playbookInput?.bookmarkedTruth ?? false,
        savedPushbackIds: playbookInput?.savedPushbackIds ?? [],
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
        chosenMoveId: progressRecord.chosenMoveId,
        bookmarkedTruth: progressRecord.bookmarkedTruth,
        savedPushbackIds: progressRecord.savedPushbackIds,
      },
      playbookState: buildDefaultPlaybookState(progressRecord),
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

  async saveLessonPlaybook(
    userId: string,
    lessonId: string,
    playbookInput: LessonPlaybookInputDTO
  ): Promise<LessonPlaybookStateDTO> {
    const resolvedSlug = LESSON_SLUG_ALIASES[lessonId] ?? lessonId;
    const lesson = await this.prisma.academyLesson.findFirst({
      where: {
        OR: [{ id: lessonId }, { slug: lessonId }, { slug: resolvedSlug }],
      },
      select: { id: true },
    });

    if (!lesson) {
      throw new Error(`Lesson not found with id: ${lessonId}`);
    }

    const updateData: Record<string, unknown> = {};
    if (playbookInput.chosenMoveId !== undefined) {
      updateData.chosenMoveId = playbookInput.chosenMoveId;
    }
    if (playbookInput.bookmarkedTruth !== undefined) {
      updateData.bookmarkedTruth = playbookInput.bookmarkedTruth;
    }
    if (playbookInput.savedPushbackIds !== undefined) {
      updateData.savedPushbackIds = playbookInput.savedPushbackIds;
    }

    const progressRecord = await this.prisma.academyProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId: lesson.id,
        },
      },
      update: updateData,
      create: {
        userId,
        lessonId: lesson.id,
        isCompleted: false,
        chosenMoveId: playbookInput.chosenMoveId ?? null,
        bookmarkedTruth: playbookInput.bookmarkedTruth ?? false,
        savedPushbackIds: playbookInput.savedPushbackIds ?? [],
      },
    });

    return buildDefaultPlaybookState(progressRecord);
  }
}

interface InMemoryProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt: Date;
  chosenMoveId: string | null;
  bookmarkedTruth: boolean;
  savedPushbackIds: string[];
}

interface InMemoryModule {
  id: string;
  category: AcademyCategory;
  slug: string;
  title: string;
  summary: string;
  reliefSubtitle?: string | null;
  tonightQuickWinTitle?: string | null;
  coverImageUrl: string | null;
  featuredVideoLecture?: MasterVideoLectureDTO | null;
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
  audioUrl?: string | null;
  audioDurationSeconds?: number | null;
  reliefTagline?: string | null;
  thirtySecondGlance?: ThirtySecondGlanceDTO | null;
  adaptiveModuleType?: AdaptiveModuleType | null;
  dialogueCards?: DialogueCardDTO[] | null;
  whatNotToSay?: string | null;
  deliveryTip?: string | null;
  videoLecture?: MasterVideoLectureDTO | null;
  archetype?: LessonArchetype;
  episodeRole?: EpisodeRole;
  almanacPayload?: AlmanacLessonPayload | null;
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
        title: formatCourseTitle(mod.title),
        summary: mod.summary,
        reliefSubtitle: mod.reliefSubtitle ?? null,
        tonightQuickWinTitle: mod.tonightQuickWinTitle ?? null,
        coverImageUrl: mod.coverImageUrl ?? null,
        featuredVideoLecture:
          (mod.featuredVideoLecture as MasterVideoLectureDTO) ?? null,
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
          const category = mod.category;
          const adaptiveModuleType =
            lesson.adaptiveModuleType ?? resolveAdaptiveModuleType(category);
          const reliefTagline =
            lesson.reliefTagline ?? resolveReliefTagline(lesson.title, category);
          const dialogueCards =
            lesson.dialogueCards ??
            parseDialogueCards(lesson.contentMarkdown, lesson.deliveryTip);
          const thirtySecondGlance =
            lesson.thirtySecondGlance ??
            parseThirtySecondGlance(
              lesson.contentMarkdown,
              dialogueCards,
              lesson.title
            );

          const archetype =
            ((lesson as any).archetype as LessonArchetype) ??
            resolveLessonArchetype(lesson.slug, lesson.title, category);

          const almanacPayload =
            (lesson.almanacPayload as AlmanacLessonPayload | null | undefined) ??
            null;
          const episodeRole =
            lesson.episodeRole ??
            almanacPayload?.episodeRole ??
            resolveEpisodeRoleFromSortOrder(lesson.sortOrder);

          const lessonRecord: InMemoryLesson = {
            id: lessonId,
            moduleId,
            chapterId,
            slug: lesson.slug,
            title: lesson.title,
            archetype,
            episodeRole,
            almanacPayload,
            contentMarkdown: lesson.contentMarkdown,
            readingMinutes: lesson.readingMinutes,
            sortOrder: lesson.sortOrder,
            audioUrl: lesson.audioUrl ?? null,
            audioDurationSeconds: lesson.audioDurationSeconds ?? null,
            reliefTagline,
            thirtySecondGlance,
            adaptiveModuleType,
            dialogueCards,
            whatNotToSay:
              lesson.whatNotToSay ??
              (dialogueCards[0]?.instinctiveMistake || null),
            deliveryTip:
              lesson.deliveryTip ?? (dialogueCards[0]?.deliveryTip || null),
            videoLecture: (lesson.videoLecture as MasterVideoLectureDTO) ?? null,
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

    const allChapters = Array.from(this.chapters.values());
    const allLessons = Array.from(this.lessons.values());

    return moduleList.map((m) => {
      const modChapters = allChapters.filter((c) => c.moduleId === m.id);
      const modLessons = allLessons
        .filter((l) => l.moduleId === m.id)
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder);
      const lessonCount = modLessons.length;

      let completedLessonCount = 0;
      const lessonsSummary = modLessons.map((l) => {
        let isDone = false;
        if (options?.userId) {
          const key = `${options.userId}:${l.id}`;
          const p = this.progressRecords.get(key);
          isDone = p?.isCompleted === true;
        }
        if (isDone) completedLessonCount++;
        return {
          id: l.id,
          moduleId: l.moduleId,
          chapterId: l.chapterId,
          slug: l.slug,
          title: l.title,
          readingMinutes: l.readingMinutes,
          sortOrder: l.sortOrder,
          isCompleted: isDone,
          audioUrl: l.audioUrl ?? undefined,
          audioDurationSeconds: l.audioDurationSeconds ?? undefined,
          whatNotToSay: l.whatNotToSay ?? undefined,
          deliveryTip: l.deliveryTip ?? undefined,
          videoLecture: l.videoLecture ?? undefined,
          archetype: l.archetype ?? resolveLessonArchetype(l.slug, l.title, m.category),
          episodeRole:
            l.episodeRole ??
            l.almanacPayload?.episodeRole ??
            resolveEpisodeRoleFromSortOrder(l.sortOrder),
          interactiveHighlights:
            l.almanacPayload?.interactiveHighlights ?? undefined,
        };
      });

      const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;
      const featuredVideoLecture =
        m.featuredVideoLecture ??
        lessonsSummary.find((l) => l.videoLecture)?.videoLecture ??
        undefined;

      return {
        id: m.id,
        category: m.category,
        slug: m.slug,
        title: formatCourseTitle(m.title),
        summary: m.summary,
        reliefSubtitle: m.reliefSubtitle ?? undefined,
        tonightQuickWinTitle: m.tonightQuickWinTitle ?? undefined,
        coverImageUrl: m.coverImageUrl,
        developmentalTier: m.developmentalTier,
        sortOrder: m.sortOrder,
        chapterCount: modChapters.length,
        lessonCount,
        completedLessonCount,
        isCompleted,
        hasMasterLecture: Boolean(featuredVideoLecture),
        featuredVideoLecture,
        lessons: lessonsSummary,
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
          audioUrl: l.audioUrl ?? undefined,
          audioDurationSeconds: l.audioDurationSeconds ?? undefined,
          reliefTagline:
            l.reliefTagline ?? resolveReliefTagline(l.title, mod.category),
          whatNotToSay: l.whatNotToSay ?? undefined,
          empatheticScript: l.dialogueCards?.[0]?.empatheticScript ?? undefined,
          deliveryTip: l.deliveryTip ?? undefined,
          videoLecture: l.videoLecture ?? undefined,
          archetype: l.archetype ?? resolveLessonArchetype(l.slug, l.title, mod.category),
          episodeRole:
            l.episodeRole ??
            l.almanacPayload?.episodeRole ??
            resolveEpisodeRoleFromSortOrder(l.sortOrder),
          interactiveHighlights:
            l.almanacPayload?.interactiveHighlights ?? undefined,
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
        audioUrl: l.audioUrl ?? undefined,
        audioDurationSeconds: l.audioDurationSeconds ?? undefined,
        reliefTagline:
          l.reliefTagline ?? resolveReliefTagline(l.title, mod.category),
        whatNotToSay: l.whatNotToSay ?? undefined,
        empatheticScript: l.dialogueCards?.[0]?.empatheticScript ?? undefined,
        deliveryTip: l.deliveryTip ?? undefined,
        videoLecture: l.videoLecture ?? undefined,
        archetype: l.archetype ?? resolveLessonArchetype(l.slug, l.title, mod.category),
        episodeRole:
          l.episodeRole ??
          l.almanacPayload?.episodeRole ??
          resolveEpisodeRoleFromSortOrder(l.sortOrder),
        interactiveHighlights:
          l.almanacPayload?.interactiveHighlights ?? undefined,
      };
    });

    const lessonCount = flatLessons.length;
    const completedLessonCount = flatLessons.filter((l) => l.isCompleted).length;
    const isCompleted = lessonCount > 0 && completedLessonCount === lessonCount;
    const featuredVideoLecture =
      mod.featuredVideoLecture ??
      flatLessons.find((l) => l.videoLecture)?.videoLecture ??
      undefined;

    return {
      id: mod.id,
      category: mod.category,
      slug,
      title: formatCourseTitle(mod.title),
      summary: mod.summary,
      reliefSubtitle: mod.reliefSubtitle ?? undefined,
      tonightQuickWinTitle: mod.tonightQuickWinTitle ?? undefined,
      coverImageUrl: mod.coverImageUrl,
      developmentalTier: mod.developmentalTier,
      sortOrder: mod.sortOrder,
      lessonCount,
      completedLessonCount,
      isCompleted,
      hasMasterLecture: Boolean(featuredVideoLecture),
      featuredVideoLecture,
      chapters,
      lessons: flatLessons,
    };
  }

  private resolveInMemoryLesson(lessonIdOrSlug: string): InMemoryLesson | undefined {
    let lesson = this.lessons.get(lessonIdOrSlug);
    if (!lesson) {
      for (const [alias, target] of Object.entries(SLUG_ALIASES)) {
        if (lessonIdOrSlug.includes(alias)) {
          const targetLessonId = lessonIdOrSlug.replace(alias, target);
          lesson = this.lessons.get(targetLessonId);
          if (lesson) break;
        }
      }
    }

    if (!lesson) {
      const targetSlug = LESSON_SLUG_ALIASES[lessonIdOrSlug] ?? lessonIdOrSlug;
      for (const l of this.lessons.values()) {
        if (l.slug === lessonIdOrSlug || l.slug === targetSlug) {
          lesson = l;
          break;
        }
      }
    }

    return lesson;
  }

  async findLessonById(
    lessonId: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null> {
    const lesson = this.resolveInMemoryLesson(lessonId);

    if (!lesson) {
      return null;
    }

    const mod = this.modules.get(lesson.moduleId);
    if (!mod) {
      return null;
    }

    const ch = lesson.chapterId ? this.chapters.get(lesson.chapterId) : null;

    let progressRecord: InMemoryProgress | undefined;
    if (userId) {
      progressRecord =
        this.progressRecords.get(`${userId}:${lesson.id}`) ??
        this.progressRecords.get(`${userId}:${lessonId}`);
    }
    const isCompleted = progressRecord?.isCompleted ?? false;

    let moduleSlug = mod.slug;
    for (const [alias, target] of Object.entries(SLUG_ALIASES)) {
      if (lessonId.includes(alias) && mod.slug === target) {
        moduleSlug = alias;
        break;
      }
    }

    const category = mod.category;
    const adaptiveModuleType =
      lesson.adaptiveModuleType ?? resolveAdaptiveModuleType(category);
    const reliefTagline =
      lesson.reliefTagline ?? resolveReliefTagline(lesson.title, category);
    const dialogueCards =
      lesson.dialogueCards ??
      parseDialogueCards(lesson.contentMarkdown, lesson.deliveryTip);
    const thirtySecondGlance =
      lesson.thirtySecondGlance ??
      parseThirtySecondGlance(
        lesson.contentMarkdown,
        dialogueCards,
        lesson.title
      );
    const episodeRole =
      lesson.episodeRole ??
      lesson.almanacPayload?.episodeRole ??
      resolveEpisodeRoleFromSortOrder(lesson.sortOrder);

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
      audioUrl: lesson.audioUrl ?? undefined,
      audioDurationSeconds: lesson.audioDurationSeconds ?? undefined,
      reliefTagline,
      thirtySecondGlance,
      adaptiveModuleType,
      dialogueCards,
      archetype: (lesson.archetype as LessonArchetype) || resolveLessonArchetype(lesson.slug, lesson.title, category),
      episodeRole,
      almanacPayload: lesson.almanacPayload ?? null,
      playbookState: buildDefaultPlaybookState(progressRecord),
      actionProtocolItems: parseActionProtocolItems(lesson.contentMarkdown),
      whatNotToSay:
        lesson.whatNotToSay ??
        (dialogueCards[0]?.instinctiveMistake || undefined),
      deliveryTip:
        lesson.deliveryTip ?? (dialogueCards[0]?.deliveryTip || undefined),
      videoLecture: (lesson.videoLecture as unknown as MasterVideoLectureDTO) ?? undefined,
      module: {
        id: mod.id,
        slug: moduleSlug,
        title: formatCourseTitle(mod.title),
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

  async findLessonBySlug(
    slug: string,
    userId?: string
  ): Promise<AcademyLessonDTO | null> {
    const targetSlug = LESSON_SLUG_ALIASES[slug] ?? slug;
    for (const l of this.lessons.values()) {
      if (l.slug === slug || l.slug === targetSlug) {
        return this.findLessonById(l.id, userId);
      }
    }
    return null;
  }

  async markLessonComplete(
    userId: string,
    lessonId: string,
    playbookInput?: LessonPlaybookInputDTO
  ): Promise<AcademyLessonCompletionResponseDTO> {
    const lesson = this.resolveInMemoryLesson(lessonId);

    if (!lesson) {
      throw new Error(`Lesson not found with id: ${lessonId}`);
    }

    const mod = this.modules.get(lesson.moduleId);
    if (!mod) {
      throw new Error(`Module not found for lesson: ${lessonId}`);
    }

    const existing = this.progressRecords.get(`${userId}:${lesson.id}`);
    const progress: InMemoryProgress = {
      id: existing?.id ?? randomUUID(),
      userId,
      lessonId: lesson.id,
      isCompleted: true,
      completedAt: new Date(),
      chosenMoveId:
        playbookInput?.chosenMoveId !== undefined
          ? playbookInput.chosenMoveId
          : (existing?.chosenMoveId ?? null),
      bookmarkedTruth:
        playbookInput?.bookmarkedTruth !== undefined
          ? playbookInput.bookmarkedTruth
          : (existing?.bookmarkedTruth ?? false),
      savedPushbackIds:
        playbookInput?.savedPushbackIds !== undefined
          ? playbookInput.savedPushbackIds
          : (existing?.savedPushbackIds ?? []),
    };
    this.progressRecords.set(`${userId}:${lesson.id}`, progress);
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
        chosenMoveId: progress.chosenMoveId,
        bookmarkedTruth: progress.bookmarkedTruth,
        savedPushbackIds: progress.savedPushbackIds,
      },
      playbookState: buildDefaultPlaybookState(progress),
      module: {
        id: mod.id,
        slug: mod.slug,
        title: formatCourseTitle(mod.title),
        lessonCount,
        completedLessonCount,
        percentComplete,
        isCompleted,
      },
    };
  }

  async saveLessonPlaybook(
    userId: string,
    lessonId: string,
    playbookInput: LessonPlaybookInputDTO
  ): Promise<LessonPlaybookStateDTO> {
    const lesson = this.resolveInMemoryLesson(lessonId);
    if (!lesson) {
      throw new Error(`Lesson not found with id: ${lessonId}`);
    }

    const existing = this.progressRecords.get(`${userId}:${lesson.id}`);
    const progress: InMemoryProgress = {
      id: existing?.id ?? randomUUID(),
      userId,
      lessonId: lesson.id,
      isCompleted: existing?.isCompleted ?? false,
      completedAt: existing?.completedAt ?? new Date(),
      chosenMoveId:
        playbookInput.chosenMoveId !== undefined
          ? playbookInput.chosenMoveId
          : (existing?.chosenMoveId ?? null),
      bookmarkedTruth:
        playbookInput.bookmarkedTruth !== undefined
          ? playbookInput.bookmarkedTruth
          : (existing?.bookmarkedTruth ?? false),
      savedPushbackIds:
        playbookInput.savedPushbackIds !== undefined
          ? playbookInput.savedPushbackIds
          : (existing?.savedPushbackIds ?? []),
    };
    this.progressRecords.set(`${userId}:${lesson.id}`, progress);
    this.progressRecords.set(`${userId}:${lessonId}`, progress);

    return buildDefaultPlaybookState(progress);
  }
}
