import {
  prisma as defaultPrisma,
  type PrismaClient,
  BEHAVIOR_GUIDES_SEED,
} from '@alongside/database';
import {
  type DevelopmentalTier,
  type BehaviorGuideDTO,
  getEquivalentTiers,
} from '@alongside/shared';

export interface BehaviorRepository {
  findGuides(tier?: DevelopmentalTier): Promise<BehaviorGuideDTO[]>;
  findGuideBySlug(slug: string): Promise<BehaviorGuideDTO | null>;
}

export class PrismaBehaviorRepository implements BehaviorRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findGuides(tier?: DevelopmentalTier): Promise<BehaviorGuideDTO[]> {
    const where: any = {};
    if (tier) {
      const equivalents = getEquivalentTiers(tier);
      where.targetTier = equivalents.length === 1 ? equivalents[0] : { in: equivalents };
    }

    const list = await this.prisma.behaviorGuide.findMany({
      where,
      orderBy: { targetTier: 'asc' },
    });

    return list.map((g) => ({
      id: g.id,
      targetTier: g.targetTier as DevelopmentalTier,
      slug: g.slug,
      triggerSituation: g.triggerSituation,
      underlyingNeed: g.underlyingNeed,
      coRegulationScript: g.coRegulationScript,
      authoritativeLimit: g.authoritativeLimit,
    }));
  }

  async findGuideBySlug(slug: string): Promise<BehaviorGuideDTO | null> {
    const g = await this.prisma.behaviorGuide.findUnique({
      where: { slug },
    });
    if (!g) return null;

    return {
      id: g.id,
      targetTier: g.targetTier as DevelopmentalTier,
      slug: g.slug,
      triggerSituation: g.triggerSituation,
      underlyingNeed: g.underlyingNeed,
      coRegulationScript: g.coRegulationScript,
      authoritativeLimit: g.authoritativeLimit,
    };
  }
}

export class InMemoryBehaviorRepository implements BehaviorRepository {
  private guides: BehaviorGuideDTO[] = [];

  constructor(initialData = BEHAVIOR_GUIDES_SEED) {
    this.guides = initialData.map((g, idx) => ({
      id: `beh-${idx + 1}-${g.slug}`,
      targetTier: g.targetTier,
      slug: g.slug,
      triggerSituation: g.triggerSituation,
      underlyingNeed: g.underlyingNeed,
      coRegulationScript: g.coRegulationScript,
      authoritativeLimit: g.authoritativeLimit,
    }));
  }

  async findGuides(tier?: DevelopmentalTier): Promise<BehaviorGuideDTO[]> {
    if (tier) {
      const equivalents = new Set(getEquivalentTiers(tier));
      return this.guides.filter((g) => equivalents.has(g.targetTier));
    }
    return [...this.guides];
  }

  async findGuideBySlug(slug: string): Promise<BehaviorGuideDTO | null> {
    return this.guides.find((g) => g.slug === slug) ?? null;
  }
}
