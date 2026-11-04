import { z } from 'zod';
import { DevelopmentalTier } from '../constants/index.js';

export const AcademyTierSchema = z.enum([
  // Canonical v2.4 Lifespan Tiers (Ages 0–18)
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
});

export type AcademyModulesQuery = z.infer<typeof AcademyModulesQuerySchema>;

export const AcademyModuleSlugParamsSchema = z.object({
  slug: z.string().trim().min(1, 'Module slug is required'),
});

export type AcademyModuleSlugParams = z.infer<typeof AcademyModuleSlugParamsSchema>;

export const AcademyLessonIdParamsSchema = z.object({
  id: z.string().trim().min(1, 'Lesson ID is required'),
});

export type AcademyLessonIdParams = z.infer<typeof AcademyLessonIdParamsSchema>;
