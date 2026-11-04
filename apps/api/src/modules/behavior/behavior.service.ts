import type {
  DevelopmentalTier,
  BehaviorGuideDTO,
} from '@alongside/shared';
import type { BehaviorRepository } from './behavior.repository.js';

export class BehaviorService {
  constructor(private readonly behaviorRepo: BehaviorRepository) {}

  async getGuides(tier?: DevelopmentalTier): Promise<BehaviorGuideDTO[]> {
    return this.behaviorRepo.findGuides(tier);
  }

  async getGuideBySlug(slug: string): Promise<BehaviorGuideDTO | null> {
    return this.behaviorRepo.findGuideBySlug(slug);
  }
}
