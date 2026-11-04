import { z } from 'zod';
import { PlayCategory } from '../constants/index.js';

export const BrainGameFilterSchema = z.object({
  tier: z.string().optional(),
  category: z
    .enum([
      PlayCategory.PUPPET,
      PlayCategory.SENSORY,
      PlayCategory.CONSTRUCTION,
      PlayCategory.LOGIC_PUZZLE,
      PlayCategory.MAKER,
      PlayCategory.BOREDOM_BUSTER,
    ])
    .optional(),
});

export type BrainGameFilterInput = z.infer<typeof BrainGameFilterSchema>;

export const DailyPlayRecommendationQuerySchema = z.object({
  childId: z.string().min(1, 'childId is required'),
});

export type DailyPlayRecommendationQuery = z.infer<typeof DailyPlayRecommendationQuerySchema>;
