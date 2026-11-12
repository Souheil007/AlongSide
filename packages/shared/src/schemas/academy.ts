import { z } from 'zod';
import { AcademyCategory, DevelopmentalTier, LessonArchetype } from '../constants/index.js';

export const LessonArchetypeSchema = z.enum([
  LessonArchetype.EVERYDAY_BEHAVIOR,
  LessonArchetype.CHILD_GROWTH_CONCEPT,
  LessonArchetype.PRACTICAL_FAMILY_GUIDE,
]);

export type LessonArchetypeType = z.infer<typeof LessonArchetypeSchema>;

export const AcademyCategorySchema = z.enum([
  AcademyCategory.BEHAVIOR_AND_EMOTIONS,
  AcademyCategory.HEALTH_AND_WELLNESS,
  AcademyCategory.NUTRITION_AND_FEEDING,
  AcademyCategory.DEVELOPMENT_AND_PLAY,
  AcademyCategory.DIGITAL_AND_DEVICES,
]);

export type AcademyCategoryType = z.infer<typeof AcademyCategorySchema>;

export const AcademyTierSchema = z.enum([
  // Canonical v2.6 Lifespan Tiers (Ages 0–18, decomposed Tier 0)
  DevelopmentalTier.TIER_0A_INFANCY_0_1,
  DevelopmentalTier.TIER_0B_TODDLER_1_2,
  DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
  DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
  DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
  DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
  DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
  DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,

  // Legacy compatibility aliases (v2.3)
  DevelopmentalTier.TIER_1_AGES_8_9,
  DevelopmentalTier.TIER_2_AGES_10_11,
  DevelopmentalTier.TIER_3_AGES_12_13,
  DevelopmentalTier.TIER_4_AGES_14_PLUS,
]);

export const AcademyModulesQuerySchema = z.object({
  tier: AcademyTierSchema.optional(),
  category: AcademyCategorySchema.optional(),
});

export type AcademyModulesQuery = z.infer<typeof AcademyModulesQuerySchema>;

export const AcademyModuleSlugParamsSchema = z.object({
  slug: z.string().trim().min(1, 'Module slug is required'),
});

export type AcademyModuleSlugParams = z.infer<typeof AcademyModuleSlugParamsSchema>;

export const AcademyChapterSlugParamsSchema = z.object({
  slug: z.string().trim().min(1, 'Module slug is required'),
  chapterSlug: z.string().trim().min(1, 'Chapter slug is required'),
});

export type AcademyChapterSlugParams = z.infer<typeof AcademyChapterSlugParamsSchema>;

export const AcademyLessonIdParamsSchema = z.object({
  id: z.string().trim().min(1, 'Lesson ID is required'),
});

export type AcademyLessonIdParams = z.infer<typeof AcademyLessonIdParamsSchema>;

export const AdaptiveModuleTypeSchema = z.enum([
  'SOMATIC_RESET',
  'CIRCADIAN_TIMELINE',
  'FEEDING_LADDER',
  'PLAY_BLUEPRINT',
  'PACT_CLAUSE',
]);

export type AdaptiveModuleTypeSchemaType = z.infer<typeof AdaptiveModuleTypeSchema>;

export const ThirtySecondGlanceSchema = z.object({
  coreProblem: z.string(),
  immediateShift: z.string(),
  exactWords: z.string(),
});

export type ThirtySecondGlanceType = z.infer<typeof ThirtySecondGlanceSchema>;

export const DialogueCardSchema = z.object({
  instinctiveMistake: z.string(),
  whyItBackfires: z.string(),
  empatheticScript: z.string(),
  deliveryTip: z.string(),
});

export type DialogueCardType = z.infer<typeof DialogueCardSchema>;

export const MasterVideoLectureSchema = z.object({
  videoUrl: z.string().url(),
  title: z.string(),
  presenter: z.string(),
  channel: z.string(),
  durationMinutes: z.number(),
  parentHook: z.string().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  actionPrompt: z.string().optional(),
});

export type MasterVideoLectureType = z.infer<typeof MasterVideoLectureSchema>;

export const AcademyLessonSummarySchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  chapterId: z.string().nullable().optional(),
  slug: z.string(),
  title: z.string(),
  readingMinutes: z.number(),
  sortOrder: z.number(),
  isCompleted: z.boolean(),
  audioUrl: z.string().optional(),
  audioDurationSeconds: z.number().optional(),
  reliefTagline: z.string().optional(),
  whatNotToSay: z.string().optional(),
  deliveryTip: z.string().optional(),
  videoLecture: MasterVideoLectureSchema.nullable().optional(),
  archetype: LessonArchetypeSchema.optional(),
});

export type AcademyLessonSummaryType = z.infer<typeof AcademyLessonSummarySchema>;

export const AcademyLessonSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  chapterId: z.string().nullable().optional(),
  slug: z.string(),
  title: z.string(),
  contentMarkdown: z.string(),
  readingMinutes: z.number(),
  sortOrder: z.number(),
  isCompleted: z.boolean(),
  audioUrl: z.string().optional(),
  audioDurationSeconds: z.number().optional(),
  reliefTagline: z.string().optional(),
  thirtySecondGlance: ThirtySecondGlanceSchema.optional(),
  adaptiveModuleType: AdaptiveModuleTypeSchema.optional(),
  dialogueCards: z.array(DialogueCardSchema).optional(),
  whatNotToSay: z.string().optional(),
  deliveryTip: z.string().optional(),
  videoLecture: MasterVideoLectureSchema.nullable().optional(),
  archetype: LessonArchetypeSchema.optional(),
  module: z
    .object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      developmentalTier: AcademyTierSchema,
      category: AcademyCategorySchema.optional(),
    })
    .optional(),
  chapter: z
    .object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      priority: z.number(),
    })
    .nullable()
    .optional(),
});

export type AcademyLessonType = z.infer<typeof AcademyLessonSchema>;
