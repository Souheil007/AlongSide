import { z } from 'zod';
import { DevelopmentalTier } from '../constants/index.js';

export const AcademyTierSchema = z.enum([
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
