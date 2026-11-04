import {
  prisma as defaultPrisma,
  type PrismaClient,
  BRAIN_GAMES_SEED,
} from '@alongside/database';
import type {
  DevelopmentalTier,
  PlayCategory,
  BrainGameActivityDTO,
} from '@alongside/shared';

export interface BrainGameFilterOptions {
  tier?: DevelopmentalTier;
  category?: PlayCategory;
}

export interface BrainGamesRepository {
  findActivities(filter?: BrainGameFilterOptions): Promise<BrainGameActivityDTO[]>;
  findActivityById(id: string): Promise<BrainGameActivityDTO | null>;
}

export class PrismaBrainGamesRepository implements BrainGamesRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findActivities(filter?: BrainGameFilterOptions): Promise<BrainGameActivityDTO[]> {
    const where: any = {};
    if (filter?.tier) where.targetTier = filter.tier;
    if (filter?.category) where.category = filter.category;

    const list = await this.prisma.brainGameActivity.findMany({
      where,
      orderBy: { targetTier: 'asc' },
    });

    return list.map((a) => ({
      id: a.id,
      targetTier: a.targetTier as DevelopmentalTier,
      category: a.category as PlayCategory,
      title: a.title,
      summary: a.summary,
      instructions: a.instructions,
      materialsNeeded: a.materialsNeeded,
      targetSkills: a.targetSkills,
      estimatedMinutes: a.estimatedMinutes,
      isScreenFree: a.isScreenFree,
    }));
  }

  async findActivityById(id: string): Promise<BrainGameActivityDTO | null> {
    const a = await this.prisma.brainGameActivity.findUnique({
      where: { id },
    });
    if (!a) return null;

    return {
      id: a.id,
      targetTier: a.targetTier as DevelopmentalTier,
      category: a.category as PlayCategory,
      title: a.title,
      summary: a.summary,
      instructions: a.instructions,
      materialsNeeded: a.materialsNeeded,
      targetSkills: a.targetSkills,
      estimatedMinutes: a.estimatedMinutes,
      isScreenFree: a.isScreenFree,
    };
  }
}

export class InMemoryBrainGamesRepository implements BrainGamesRepository {
  private activities: BrainGameActivityDTO[] = [];

  constructor(initialData = BRAIN_GAMES_SEED) {
    this.activities = initialData.map((a, idx) => ({
      id: `play-${idx + 1}-${a.category.toLowerCase()}`,
      targetTier: a.targetTier,
      category: a.category,
      title: a.title,
      summary: a.summary,
      instructions: a.instructions,
      materialsNeeded: a.materialsNeeded,
      targetSkills: a.targetSkills,
      estimatedMinutes: a.estimatedMinutes,
      isScreenFree: a.isScreenFree,
    }));
  }

  async findActivities(filter?: BrainGameFilterOptions): Promise<BrainGameActivityDTO[]> {
    let result = [...this.activities];

    if (filter?.tier) {
      result = result.filter((a) => a.targetTier === filter.tier);
    }
    if (filter?.category) {
      result = result.filter((a) => a.category === filter.category);
    }

    return result;
  }

  async findActivityById(id: string): Promise<BrainGameActivityDTO | null> {
    return this.activities.find((a) => a.id === id) ?? null;
  }
}
