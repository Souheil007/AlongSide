import { z } from 'zod';
import { DevelopmentalTier, RoadType } from '../constants/index.js';

export const FaqCategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  sortOrder: z.number().int().default(0),
  faqCount: z.number().int().optional(),
});

export type FaqCategoryDto = z.infer<typeof FaqCategorySchema>;

export const FaqItemSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  categorySlug: z.string().optional(),
  categoryName: z.string().optional(),
  targetTier: z.nativeEnum(DevelopmentalTier).nullable().optional(),
  targetRoad: z.nativeEnum(RoadType).nullable().optional(),
  question: z.string().min(1),
  answerMarkdown: z.string().min(1),
  deEscalationScript: z.string().nullable().optional(),
  isFeatured: z.boolean().default(false),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type FaqItemDto = z.infer<typeof FaqItemSchema>;

export const FaqQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  category: z.string().trim().optional(),
  tier: z.nativeEnum(DevelopmentalTier).optional(),
  road: z.nativeEnum(RoadType).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type FaqQueryInput = z.infer<typeof FaqQuerySchema>;

export const FaqListResponseSchema = z.object({
  faqs: z.array(FaqItemSchema),
  total: z.number().int(),
  limit: z.number().int(),
  offset: z.number().int(),
});

export type FaqListResponseDto = z.infer<typeof FaqListResponseSchema>;
