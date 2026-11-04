import {
  prisma as defaultPrisma,
  type PrismaClient,
  NUTRITION_GUIDES_SEED,
} from '@alongside/database';
import type { DietaryStage, NutritionGuideDTO, NutritionStage } from '@alongside/shared';

export interface NutritionRepository {
  findGuides(stage?: DietaryStage): Promise<NutritionGuideDTO[]>;
  findGuideByStage(stage: DietaryStage): Promise<NutritionGuideDTO | null>;
}

function mapPrismaGuide(g: any): NutritionGuideDTO {
  return {
    id: g.id,
    stage: g.stage as NutritionStage,
    stageName: g.title,
    ageBracket: g.ageBracket,
    ageRange: g.ageBracket || 'All Ages',
    title: g.title,
    summary: g.guidelinesMarkdown ? g.guidelinesMarkdown.slice(0, 160) : g.title,
    keyNutrients: g.safeFoods || [],
    recommendedFoods: g.safeFoods || [],
    foodsToAvoid: (g.chokingHazards || []).map((h: string) => ({
      food: h,
      hazardType: 'CHOKING_OR_DIGESTIVE',
      mechanism: 'Immature pediatric airway or digestive intolerance',
      strictAgeMonths: 12,
    })),
    blwTips: [
      'Encourage self-feeding and responsive cues.',
      'Ensure proper seated posture and adult supervision.',
    ],
    dorPrinciples: {
      parentDecides: ['What foods are offered', 'When meals occur', 'Where meals are eaten'],
      childDecides: ['Whether to eat', 'How much to eat'],
      goldenRule: 'Parents provide; children decide.',
    },
    guidelinesMarkdown: g.guidelinesMarkdown,
    safeFoods: g.safeFoods,
    chokingHazards: g.chokingHazards,
    allergenProtocol: g.allergenProtocol ?? null,
    pickyEatingTips: g.pickyEatingTips ?? null,
  };
}

export class PrismaNutritionRepository implements NutritionRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findGuides(stage?: DietaryStage): Promise<NutritionGuideDTO[]> {
    const where: any = {};
    if (stage) where.stage = stage;

    const guides = await this.prisma.nutritionGuide.findMany({
      where,
    });

    return guides.map(mapPrismaGuide);
  }

  async findGuideByStage(stage: DietaryStage): Promise<NutritionGuideDTO | null> {
    const g = await this.prisma.nutritionGuide.findUnique({
      where: { stage },
    });
    if (!g) return null;

    return mapPrismaGuide(g);
  }
}

export class InMemoryNutritionRepository implements NutritionRepository {
  private guides: NutritionGuideDTO[] = [];

  constructor(initialData = NUTRITION_GUIDES_SEED) {
    this.guides = initialData.map((g, idx) =>
      mapPrismaGuide({
        id: `nutri-${idx + 1}-${g.stage.toLowerCase()}`,
        ...g,
      })
    );
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
