import { z } from 'zod';
import {
  DevelopmentalTier,
  DigestContentStatus,
  DigestIssueStatus,
  DigestItemType,
  ExploitSeverity,
} from '../constants/index.js';

const DevelopmentalTierValues = [
  DevelopmentalTier.TIER_0A_INFANCY_0_1,
  DevelopmentalTier.TIER_0B_TODDLER_1_2,
  DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
  DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
  DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
  DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
  DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
  DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
  DevelopmentalTier.TIER_1_AGES_8_9,
  DevelopmentalTier.TIER_2_AGES_10_11,
  DevelopmentalTier.TIER_3_AGES_12_13,
  DevelopmentalTier.TIER_4_AGES_14_PLUS,
] as const;

const DigestDevelopmentalTierSchema = z.enum(DevelopmentalTierValues);

const BooleanQueryParamSchema = z.preprocess((val) => {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') {
    const normalized = val.trim().toLowerCase();
    if (normalized === 'true' || normalized === '1') return true;
    if (normalized === 'false' || normalized === '0') return false;
  }
  return val;
}, z.boolean());

export const DigestIssueStatusSchema = z.enum([
  DigestIssueStatus.DRAFT,
  DigestIssueStatus.PUBLISHED,
  DigestIssueStatus.ARCHIVED,
]);

export const DigestContentStatusSchema = z.enum([
  DigestContentStatus.PENDING_REVIEW,
  DigestContentStatus.APPROVED,
  DigestContentStatus.REJECTED,
]);

export const DigestItemTypeSchema = z.enum([
  DigestItemType.ARTICLE,
  DigestItemType.VIDEO,
  DigestItemType.DINNER_PROMPT,
]);

// ----------------------------------------------------
// LEGACY DIGEST QUERY SCHEMAS (PLAN-08 - PRESERVED)
// ----------------------------------------------------

export const SlangSearchQuerySchema = z.object({
  term: z.string().trim().optional(),
  q: z.string().trim().optional(),
});

export type SlangSearchQuery = z.infer<typeof SlangSearchQuerySchema>;

export const ExploitAlertsQuerySchema = z.object({
  severity: z
    .enum([
      ExploitSeverity.LOW,
      ExploitSeverity.MEDIUM,
      ExploitSeverity.HIGH,
      ExploitSeverity.CRITICAL,
    ])
    .optional(),
});

export type ExploitAlertsQuery = z.infer<typeof ExploitAlertsQuerySchema>;

// ----------------------------------------------------
// WEEKLY CULTURE & TRENDS HUB SCHEMAS (PLAN-49)
// ----------------------------------------------------

export const DigestIssuesQuerySchema = z.object({
  tier: DigestDevelopmentalTierSchema.optional(),
});

export type DigestIssuesQuery = z.infer<typeof DigestIssuesQuerySchema>;

export const DigestEditionQuerySchema = z.object({
  tier: DigestDevelopmentalTierSchema.optional(),
  childId: z.string().trim().min(1).optional(),
});

export type DigestEditionQuery = z.infer<typeof DigestEditionQuerySchema>;

export const DigestArticlesQuerySchema = z.object({
  issueNumber: z.coerce.number().int().positive().optional(),
  scope: z.enum(['issue', 'all']).default('issue'),
  tier: DigestDevelopmentalTierSchema.optional(),
  childId: z.string().trim().min(1).optional(),
  unreadOnly: BooleanQueryParamSchema.optional(),
  q: z.string().trim().max(120).optional(),
});

export type DigestArticlesQuery = z.infer<typeof DigestArticlesQuerySchema>;

export const DigestVideosQuerySchema = z.object({
  issueNumber: z.coerce.number().int().positive().optional(),
  scope: z.enum(['issue', 'all']).default('issue'),
  tier: DigestDevelopmentalTierSchema.optional(),
  childId: z.string().trim().min(1).optional(),
  durationBucket: z.enum(['all', 'short', 'medium', 'deep']).default('all'),
  q: z.string().trim().max(120).optional(),
});

export type DigestVideosQuery = z.infer<typeof DigestVideosQuerySchema>;

export const DigestSavedQuerySchema = z.object({
  tier: DigestDevelopmentalTierSchema.optional(),
  childId: z.string().trim().min(1).optional(),
});

export type DigestSavedQuery = z.infer<typeof DigestSavedQuerySchema>;

export const DigestInteractionMutationSchema = z
  .object({
    itemType: DigestItemTypeSchema,
    itemId: z.string().trim().min(1),
    childId: z.string().trim().min(1).optional(),
    isRead: z.boolean().optional(),
    isSaved: z.boolean().optional(),
  })
  .refine((data) => data.isRead !== undefined || data.isSaved !== undefined, {
    message: 'At least one of isRead or isSaved must be provided.',
  });

export type DigestInteractionMutation = z.infer<
  typeof DigestInteractionMutationSchema
>;
