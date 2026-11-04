import type {
  DevelopmentalTier,
  PlayCategory,
  BrainGameActivityDTO,
} from '@alongside/shared';
import type { PlayActivityRecommender } from './play.recommender.js';
import type { ChildrenRepository } from '../children/children.repository.js';

export class BrainGamesService {
  constructor(
    private readonly recommender: PlayActivityRecommender,
    private readonly childrenRepo?: ChildrenRepository
  ) {}

  async getDailyRecommendation(
    childId?: string,
    tierFallback?: DevelopmentalTier
  ): Promise<BrainGameActivityDTO> {
    let tier: DevelopmentalTier =
      tierFallback ?? ('TIER_0_INFANCY_TODDLER_0_3' as DevelopmentalTier);

    if (childId && this.childrenRepo) {
      try {
        const child = await this.childrenRepo.findById(childId);
        if (child && child.developmentalTier) {
          tier = child.developmentalTier as DevelopmentalTier;
        }
      } catch {
        // Child resolution fallback
      }
    }

    return this.recommender.recommendDailyPlay(tier);
  }

  async getPlayCatalog(
    tier?: DevelopmentalTier,
    category?: PlayCategory
  ): Promise<BrainGameActivityDTO[]> {
    return this.recommender.getPlayCatalog(tier, category);
  }
}
