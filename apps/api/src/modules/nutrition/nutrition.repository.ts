import {
  prisma as defaultPrisma,
  type PrismaClient,
  NUTRITION_GUIDES_SEED,
} from '@alongside/database';
import type { DietaryStage, NutritionGuideDTO } from '@alongside/shared';

export interface NutritionRepository {
  findGuides(stage?: DietaryStage): Promise<NutritionGuideDTO[]>;
  findGuideByStage(stage: DietaryStage): Promise<NutritionGuideDTO | null>;
}

export class PrismaNutritionRepository implements NutritionRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findGuides(stage?: DietaryStage): Promise<NutritionGuideDTO[]> {
    const where: any = {};
    if (stage) where.stage = stage;

    const guides = await this.prisma.nutritionGuide.findMany({
      where,
    });

    return guides.map((g) => ({
      id: g.id,
      stage: g.stage as DietaryStage,
      title: g.title,
      ageBracket: g.ageBracket,
      guidelinesMarkdown: g.guidelinesMarkdown,
      safeFoods: g.safeFoods,
      chokingHazards: g.chokingHazards,
      allergenProtocol: g.allergenProtocol,
      pickyEatingTips: g.pickyEatingTips,
    }));
  }

  async findGuideByStage(stage: DietaryStage): Promise<NutritionGuideDTO | null> {
    const g = await this.prisma.nutritionGuide.findUnique({
      where: { stage },
    });
    if (!g) return null;

    return {
      id: g.id,
      stage: g.stage as DietaryStage,
      title: g.title,
      ageBracket: g.ageBracket,
      guidelinesMarkdown: g.guidelinesMarkdown,
      safeFoods: g.safeFoods,
      chokingHazards: g.chokingHazards,
      allergenProtocol: g.allergenProtocol,
      pickyEatingTips: g.pickyEatingTips,
    };
  }
}

export class InMemoryNutritionRepository implements NutritionRepository {
  private guides: NutritionGuideDTO[] = [];

  constructor(initialData = NUTRITION_GUIDES_SEED) {
    this.guides = initialData.map((g, idx) => ({
      id: `nutri-${idx + 1}-${g.stage.toLowerCase()}`,
      stage: g.stage,
      title: g.title,
      ageBracket: g.ageBracket,
      guidelinesMarkdown: g.guidelinesMarkdown,
      safeFoods: g.safeFoods,
      chokingHazards: g.chokingHazards,
      allergenProtocol: g.allergenProtocol ?? null,
      pickyEatingTips: g.pickyEatingTips ?? null,
    }));
  }

  async findGuides(stage?: DietaryStage): Promise<NutritionGuideDTO[]> {
    if (stage) {
      return this.guides.filter((g) => g.stage === stage);
    }
    return [...this.guides];
  }

  async findGuideByStage(stage: DietaryStage): Promise<NutritionGuideDTO | null> {
    return this.guides.find((g) => g.stage === stage) ?? null;
  }
}
