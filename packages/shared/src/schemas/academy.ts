import { z } from 'zod';
import {
  AcademyCategory,
  AlmanacVisualType,
  DevelopmentalTier,
  EditorialIllustrationKey,
  EpisodeRole,
  LessonArchetype,
} from '../constants/index.js';

export const EpisodeRoleSchema = z.enum([
  EpisodeRole.FAST_WIN,
  EpisodeRole.BRAIN_DECODER,
  EpisodeRole.RHYTHM_RESET,
  EpisodeRole.LONG_TERM_BOND,
]);

export type EpisodeRoleSchemaType = z.infer<typeof EpisodeRoleSchema>;

export const AlmanacVisualTypeSchema = z.enum([
  AlmanacVisualType.SENSORY_LADDER,
  AlmanacVisualType.LENS_EXPOSURE_MATRIX,
  AlmanacVisualType.BRAIN_BRIDGE,
  AlmanacVisualType.CIRCADIAN_CURVE,
  AlmanacVisualType.ROUTINE_TIMELINE,
  AlmanacVisualType.SERVE_RETURN_LOOP,
  AlmanacVisualType.HABIT_GUARDRAIL,
]);

export type AlmanacVisualTypeSchemaType = z.infer<typeof AlmanacVisualTypeSchema>;

export const EditorialIllustrationKeySchema = z.enum([
  EditorialIllustrationKey.plate,
  EditorialIllustrationKey.leaf,
  EditorialIllustrationKey.cup,
  EditorialIllustrationKey.moon_bed,
  EditorialIllustrationKey.clock_rhythm,
  EditorialIllustrationKey.blocks_play,
  EditorialIllustrationKey.device_dock,
  EditorialIllustrationKey.heart_bridge,
  EditorialIllustrationKey.compass_teen,
]);

export type EditorialIllustrationKeySchemaType = z.infer<
  typeof EditorialIllustrationKeySchema
>;

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

export const VideoJumpChipSchema = z.object({
  seconds: z.number().int().min(0),
  label: z.string().min(1),
});

export type VideoJumpChipType = z.infer<typeof VideoJumpChipSchema>;

export const MasterVideoLectureSchema = z.object({
  videoUrl: z.string().url(),
  title: z.string(),
  presenter: z.string(),
  channel: z.string(),
  durationMinutes: z.number(),
  parentHook: z.string().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  actionPrompt: z.string().optional(),
  jumpChips: z.array(VideoJumpChipSchema).optional(),
});

export type MasterVideoLectureType = z.infer<typeof MasterVideoLectureSchema>;

export const AnnotatedScriptSegmentSchema = z.object({
  id: z.string().min(1).optional(),
  text: z.string().min(1),
  tag: z.string().min(1).optional(),
  note: z.string().min(1).optional(),
});

export const AlmanacPollOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  response: z.string().min(1),
});

export const AlmanacInstinctOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  whyTitle: z.string().min(1),
  whyText: z.string().min(1),
});

export const AlmanacPushbackOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  setup: z.string().min(1),
  script: z.string().min(1),
});

export const AlmanacMoveOptionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  desc: z.string().min(1),
});

export const AlmanacNextEpisodeHookSchema = z.object({
  kicker: z.string().optional(),
  mystery: z.string().min(1),
  title: z.string().optional(),
  targetSlug: z.string().optional(),
});

export const AlmanacLessonPayloadSchema = z.object({
  episodeRole: EpisodeRoleSchema,
  illustration: EditorialIllustrationKeySchema,
  illustrationCaption: z.string().min(1),
  headline: z.string().min(1),
  deck: z.string().min(1),
  sceneTime: z.string().min(1),
  sceneBody: z.string().min(1),
  pollQuestion: z.string().min(1),
  pollOptions: z.array(AlmanacPollOptionSchema).min(2),
  beat2Kicker: z.string().min(1),
  beat2Title: z.string().min(1),
  beat2Lead: z.string().min(1),
  visualType: AlmanacVisualTypeSchema,
  visualStageTitle: z.string().min(1),
  visualStageHint: z.string().min(1),
  visualConfig: z.record(z.unknown()).optional(),
  almanacTruth: z.string().min(1),
  scienceDeepDive: z.string().min(1),
  beat3Kicker: z.string().min(1),
  beat3Title: z.string().min(1),
  rehearsalTriggerSpeaker: z.string().min(1),
  rehearsalTriggerQuote: z.string().min(1),
  rehearsalPrompt: z.string().min(1),
  instincts: z.array(AlmanacInstinctOptionSchema).min(2),
  calmScriptPlain: z.string().min(1),
  calmScriptSegments: z.array(AnnotatedScriptSegmentSchema).min(1),
  deliveryCues: z.array(z.string().min(1)).min(1),
  pushbacks: z.array(AlmanacPushbackOptionSchema).min(2),
  advisorPrompt: z.string().min(1),
  beat4Kicker: z.string().min(1),
  beat4Title: z.string().min(1),
  beat4Lead: z.string().min(1),
  moves: z.array(AlmanacMoveOptionSchema).min(3),
  closingNote: z.string().min(1),
  pocketInsight: z.string().min(1),
  nextEpisodeHook: AlmanacNextEpisodeHookSchema.nullable().optional(),
  interactiveHighlights: z.array(z.string()).optional(),
});

export type AlmanacLessonPayloadType = z.infer<typeof AlmanacLessonPayloadSchema>;

export const LessonPlaybookStateSchema = z.object({
  isCompleted: z.boolean(),
  chosenMoveId: z.string().nullable(),
  bookmarkedTruth: z.boolean(),
  savedPushbackIds: z.array(z.string()),
  completedAt: z.string().nullable().optional(),
});

export type LessonPlaybookStateType = z.infer<typeof LessonPlaybookStateSchema>;

export const LessonPlaybookInputSchema = z.object({
  chosenMoveId: z.string().trim().min(1).max(120).nullable().optional(),
  bookmarkedTruth: z.boolean().optional(),
  savedPushbackIds: z.array(z.string().trim().min(1).max(120)).max(20).optional(),
});

export type LessonPlaybookInputType = z.infer<typeof LessonPlaybookInputSchema>;

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
  episodeRole: EpisodeRoleSchema.optional(),
  interactiveHighlights: z.array(z.string()).optional(),
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
  episodeRole: EpisodeRoleSchema.optional(),
  almanacPayload: AlmanacLessonPayloadSchema.nullable().optional(),
  playbookState: LessonPlaybookStateSchema.optional(),
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
