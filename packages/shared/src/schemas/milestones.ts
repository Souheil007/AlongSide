import { z } from 'zod';
import { MilestoneCategory, MilestoneStatus } from '../constants/index.js';

export const MilestoneFilterSchema = z.object({
  tier: z.string().optional(),
  category: z
    .enum([
      MilestoneCategory.GROSS_MOTOR,
      MilestoneCategory.FINE_MOTOR,
      MilestoneCategory.SPEECH_LANGUAGE,
      MilestoneCategory.COGNITIVE,
      MilestoneCategory.SOCIAL_EMOTIONAL,
    ])
    .optional(),
  ageMonths: z.coerce.number().int().min(0).max(240).optional(),
});

export type MilestoneFilterInput = z.infer<typeof MilestoneFilterSchema>;

export const TrackMilestoneSchema = z.object({
  milestoneId: z.string().min(1, 'milestoneId is required'),
  status: z.enum([
    MilestoneStatus.NOT_STARTED,
    MilestoneStatus.IN_PROGRESS,
    MilestoneStatus.ACHIEVED,
  ]),
  parentNotes: z.string().trim().max(1000).optional(),
  achievedAt: z.string().datetime().optional(),
});

export type TrackMilestoneInput = z.infer<typeof TrackMilestoneSchema>;
