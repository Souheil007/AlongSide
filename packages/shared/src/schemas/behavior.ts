import { z } from 'zod';

export const BehaviorFilterSchema = z.object({
  tier: z.string().optional(),
});

export type BehaviorFilterInput = z.infer<typeof BehaviorFilterSchema>;
