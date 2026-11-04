import { z } from 'zod';
import { DietaryStage } from '../constants/index.js';

export const NutritionFilterSchema = z.object({
  stage: z
    .enum([
      DietaryStage.MILK_ONLY,
      DietaryStage.SOLIDS_INTRODUCED,
      DietaryStage.TODDLER_TABLE,
      DietaryStage.BALANCED_SCHOOL,
      DietaryStage.PUBERTAL_GROWTH,
    ])
    .optional(),
  childAgeMonths: z.coerce.number().int().min(0).max(240).optional(),
});

export type NutritionFilterInput = z.infer<typeof NutritionFilterSchema>;
