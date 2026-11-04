import type {
  DietaryStage,
  NutritionGuideDTO,
} from '@alongside/shared';
import { generateAllergenSchedule } from '@alongside/shared';
import type { NutritionRepository } from './nutrition.repository.js';

export class NutritionService {
  constructor(private readonly nutritionRepo: NutritionRepository) {}

  async getGuides(stage?: DietaryStage): Promise<NutritionGuideDTO[]> {
    return this.nutritionRepo.findGuides(stage);
  }

  async getGuideByStage(stage: DietaryStage): Promise<NutritionGuideDTO | null> {
    return this.nutritionRepo.findGuideByStage(stage);
  }

  getAllergenSchedule(childAgeMonths: number) {
    return generateAllergenSchedule(childAgeMonths);
  }
}
