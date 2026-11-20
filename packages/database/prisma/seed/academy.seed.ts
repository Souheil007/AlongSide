import type { PrismaClient } from '@prisma/client';
import {
  resolveAdaptiveModuleType,
  resolveEpisodeRoleFromSortOrder,
  resolveLessonArchetype,
  resolveReliefTagline,
  parseDialogueCards,
  parseThirtySecondGlance,
} from '@alongside/shared';
import {
  COURSE_FEATURED_VIDEO_BY_MODULE_SLUG,
  MASTER_VIDEO_LECTURES_BY_LESSON_SLUG,
} from './academyVideos.seed.js';
import type { AcademyModuleSeedData } from './academy/types.js';
import { TIER_0A_INFANCY_MODULES } from './academy/tier-0a-infancy.seed.js';
import { TIER_0B_TODDLER_MODULES } from './academy/tier-0b-toddler.seed.js';
import { TIER_0C_OLDER_TODDLER_MODULES } from './academy/tier-0c-older-toddler.seed.js';
import { TIER_1_EARLY_CHILDHOOD_MODULES } from './academy/tier-1-early-childhood.seed.js';
import { TIER_2_MIDDLE_CHILDHOOD_MODULES } from './academy/tier-2-middle-childhood.seed.js';
import { TIER_3_PRE_TEEN_MODULES } from './academy/tier-3-pre-teen.seed.js';
import { TIER_4_EARLY_ADOLESCENCE_MODULES } from './academy/tier-4-early-adolescence.seed.js';
import { TIER_5_LATE_ADOLESCENCE_MODULES } from './academy/tier-5-late-adolescence.seed.js';

export type {
  AcademyChapterSeedData,
  AcademyLessonSeedData,
  AcademyModuleSeedData,
} from './academy/types.js';

export {
  COURSE_FEATURED_VIDEO_BY_MODULE_SLUG,
  MASTER_VIDEO_LECTURES_BY_LESSON_SLUG,
} from './academyVideos.seed.js';

export function enrichAcademySeedModules(
  modules: AcademyModuleSeedData[]
): AcademyModuleSeedData[] {
  for (const mod of modules) {
    if (!mod.featuredVideoLecture && COURSE_FEATURED_VIDEO_BY_MODULE_SLUG[mod.slug]) {
      mod.featuredVideoLecture = COURSE_FEATURED_VIDEO_BY_MODULE_SLUG[mod.slug];
    }

    for (const chapter of mod.chapters) {
      for (const lesson of chapter.lessons) {
        if (!lesson.archetype) {
          lesson.archetype = resolveLessonArchetype(
            lesson.slug,
            lesson.title,
            mod.category
          );
        }
        if (!lesson.episodeRole) {
          lesson.episodeRole =
            lesson.almanacPayload?.episodeRole ??
            resolveEpisodeRoleFromSortOrder(lesson.sortOrder);
        }
        if (!lesson.adaptiveModuleType) {
          lesson.adaptiveModuleType = resolveAdaptiveModuleType(mod.category);
        }
        if (!lesson.reliefTagline) {
          lesson.reliefTagline = resolveReliefTagline(
            lesson.title,
            mod.category
          );
        }
        if (!lesson.dialogueCards || lesson.dialogueCards.length === 0) {
          lesson.dialogueCards = parseDialogueCards(
            lesson.contentMarkdown,
            lesson.deliveryTip
          );
        }
        if (!lesson.thirtySecondGlance) {
          lesson.thirtySecondGlance = parseThirtySecondGlance(
            lesson.contentMarkdown,
            lesson.dialogueCards,
            lesson.title
          );
        }
        if (!lesson.whatNotToSay && lesson.dialogueCards[0]) {
          lesson.whatNotToSay = lesson.dialogueCards[0].instinctiveMistake;
        }
        if (!lesson.deliveryTip && lesson.dialogueCards[0]) {
          lesson.deliveryTip = lesson.dialogueCards[0].deliveryTip;
        }
        if (!lesson.videoLecture && MASTER_VIDEO_LECTURES_BY_LESSON_SLUG[lesson.slug]) {
          lesson.videoLecture = MASTER_VIDEO_LECTURES_BY_LESSON_SLUG[lesson.slug];
        }
      }
    }

    // Keep top-level lessons strictly synchronized with chapters without duplication drift
    mod.lessons = mod.chapters
      .flatMap((ch) => ch.lessons)
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }
  return modules;
}

const RAW_ACADEMY_SEED_MODULES: AcademyModuleSeedData[] = [
  ...TIER_0A_INFANCY_MODULES,
  ...TIER_0B_TODDLER_MODULES,
  ...TIER_0C_OLDER_TODDLER_MODULES,
  ...TIER_1_EARLY_CHILDHOOD_MODULES,
  ...TIER_2_MIDDLE_CHILDHOOD_MODULES,
  ...TIER_3_PRE_TEEN_MODULES,
  ...TIER_4_EARLY_ADOLESCENCE_MODULES,
  ...TIER_5_LATE_ADOLESCENCE_MODULES,
];

export const ACADEMY_SEED_MODULES: AcademyModuleSeedData[] =
  enrichAcademySeedModules(RAW_ACADEMY_SEED_MODULES);

export async function seedAcademy(prisma: PrismaClient): Promise<void> {
  console.log('[Seed] Seeding Parent Intelligence Academy (40 Courses, Interactive Almanac v2)...');

  for (const mod of ACADEMY_SEED_MODULES) {
    const moduleRecord = await prisma.academyModule.upsert({
      where: { slug: mod.slug },
      update: {
        category: mod.category,
        developmentalTier: mod.developmentalTier,
        title: mod.title,
        reliefSubtitle: mod.reliefSubtitle ?? null,
        tonightQuickWinTitle: mod.tonightQuickWinTitle ?? null,
        summary: mod.summary,
        coverImageUrl: mod.coverImageUrl ?? null,
        featuredVideoLecture: mod.featuredVideoLecture
          ? (mod.featuredVideoLecture as any)
          : null,
        sortOrder: mod.sortOrder,
      },
      create: {
        slug: mod.slug,
        category: mod.category,
        developmentalTier: mod.developmentalTier,
        title: mod.title,
        reliefSubtitle: mod.reliefSubtitle ?? null,
        tonightQuickWinTitle: mod.tonightQuickWinTitle ?? null,
        summary: mod.summary,
        coverImageUrl: mod.coverImageUrl ?? null,
        featuredVideoLecture: mod.featuredVideoLecture
          ? (mod.featuredVideoLecture as any)
          : null,
        sortOrder: mod.sortOrder,
      },
    });

    // Clean up any retired, padded, or orphaned lessons and chapters for this module
    const validChapterSlugs = mod.chapters.map((c) => c.slug);
    const validLessonSlugs = mod.chapters.flatMap((c) => c.lessons.map((l) => l.slug));

    await prisma.academyLesson.deleteMany({
      where: {
        moduleId: moduleRecord.id,
        slug: { notIn: validLessonSlugs },
      },
    });

    await prisma.academyChapter.deleteMany({
      where: {
        moduleId: moduleRecord.id,
        slug: { notIn: validChapterSlugs },
      },
    });

    for (const chapter of mod.chapters) {
      const chapterRecord = await prisma.academyChapter.upsert({
        where: {
          moduleId_slug: {
            moduleId: moduleRecord.id,
            slug: chapter.slug,
          },
        },
        update: {
          title: chapter.title,
          summary: chapter.summary,
          priority: chapter.priority,
          sortOrder: chapter.sortOrder,
        },
        create: {
          moduleId: moduleRecord.id,
          slug: chapter.slug,
          title: chapter.title,
          summary: chapter.summary,
          priority: chapter.priority,
          sortOrder: chapter.sortOrder,
        },
      });

      for (const lesson of chapter.lessons) {
        const lessonFields = {
          chapterId: chapterRecord.id,
          title: lesson.title,
          archetype: (lesson.archetype as string) ?? 'EVERYDAY_BEHAVIOR',
          episodeRole: (lesson.episodeRole as string) ?? 'FAST_WIN',
          contentMarkdown: lesson.contentMarkdown,
          readingMinutes: lesson.readingMinutes,
          sortOrder: lesson.sortOrder,
          audioUrl: lesson.audioUrl ?? null,
          audioDurationSeconds: lesson.audioDurationSeconds ?? null,
          reliefTagline: lesson.reliefTagline ?? null,
          thirtySecondGlance: lesson.thirtySecondGlance
            ? (lesson.thirtySecondGlance as any)
            : null,
          adaptiveModuleType: lesson.adaptiveModuleType ?? null,
          dialogueCards: lesson.dialogueCards
            ? (lesson.dialogueCards as any)
            : null,
          whatNotToSay: lesson.whatNotToSay ?? null,
          deliveryTip: lesson.deliveryTip ?? null,
          videoLecture: lesson.videoLecture
            ? (lesson.videoLecture as any)
            : null,
          almanacPayload: lesson.almanacPayload
            ? (lesson.almanacPayload as any)
            : null,
        };

        await prisma.academyLesson.upsert({
          where: {
            moduleId_slug: {
              moduleId: moduleRecord.id,
              slug: lesson.slug,
            },
          },
          update: lessonFields,
          create: {
            moduleId: moduleRecord.id,
            slug: lesson.slug,
            ...lessonFields,
          },
        });
      }
    }
  }

  console.log(
    `[Seed] Successfully seeded ${ACADEMY_SEED_MODULES.length} Academy modules across all 5 categories & 8 lifespan tiers.`
  );
}
