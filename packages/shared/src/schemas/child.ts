import { z } from 'zod';
import { RoadType } from '../constants/index.js';

export const CreateChildSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Child name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  birthYear: z
    .number()
    .int('Birth year must be an integer')
    .min(2000, 'Birth year must be 2000 or later')
    .max(new Date().getFullYear(), 'Birth year cannot be in the future'),
  birthMonth: z
    .number()
    .int('Birth month must be an integer')
    .min(1, 'Birth month must be between 1 and 12')
    .max(12, 'Birth month must be between 1 and 12'),
  roadType: z.enum([RoadType.PRE_DEVICE, RoadType.ACTIVE_DEVICE], {
    errorMap: () => ({ message: 'roadType must be either PRE_DEVICE or ACTIVE_DEVICE' }),
  }),
  schoolGrade: z.string().trim().max(50).optional(),
});

export type CreateChildInput = z.infer<typeof CreateChildSchema>;

export const UpdateChildSchema = CreateChildSchema.partial();

export type UpdateChildInput = z.infer<typeof UpdateChildSchema>;
