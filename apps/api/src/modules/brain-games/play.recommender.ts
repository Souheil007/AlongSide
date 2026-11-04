import type {
  DevelopmentalTier,
  PlayCategory,
  BrainGameActivityDTO,
} from '@alongside/shared';
import type { BrainGamesRepository } from './brain-games.repository.js';

export interface PlayActivityRecommender {
  recommendDailyPlay(
    childTier: DevelopmentalTier,
    currentInterests?: string[]
  ): Promise<BrainGameActivityDTO>;
  getPlayCatalog(
    childTier?: DevelopmentalTier,
    category?: PlayCategory
  ): Promise<BrainGameActivityDTO[]>;
}

/**
 * Production Adapter at Seam 9: Selects developmental play activities grounded in
 * Harvard Center on the Developing Child ("Serve and Return") research and Montessori principles.
 */
export class DevelopmentalPlayAdapter implements PlayActivityRecommender {
  constructor(private readonly repository: BrainGamesRepository) {}

  async recommendDailyPlay(
    childTier: DevelopmentalTier,
    currentInterests?: string[]
  ): Promise<BrainGameActivityDTO> {
    const activities = await this.repository.findActivities({ tier: childTier });
    if (activities.length === 0) {
      // Fallback to all activities if tier has none
      const fallback = await this.repository.findActivities();
      if (fallback.length === 0) {
        throw new Error('No play activities available in catalog');
      }
      return fallback[0]!;
    }

    // Deterministic daily rotation based on day of the year
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const index = dayOfYear % activities.length;
    return activities[index]!;
  }

  async getPlayCatalog(
    childTier?: DevelopmentalTier,
    category?: PlayCategory
  ): Promise<BrainGameActivityDTO[]> {
    return this.repository.findActivities({ tier: childTier, category });
  }
}

/**
 * In-Memory Test Fake Adapter at Seam 9 for Fastify integration and unit tests.
 */
export class FakePlayRecommender implements PlayActivityRecommender {
  private cannedActivity: BrainGameActivityDTO | null = null;
  private cannedCatalog: BrainGameActivityDTO[] = [];

  setRecommendation(activity: BrainGameActivityDTO): void {
    this.cannedActivity = activity;
  }

  setCatalog(activities: BrainGameActivityDTO[]): void {
    this.cannedCatalog = activities;
  }

  async recommendDailyPlay(
    childTier: DevelopmentalTier,
    _currentInterests?: string[]
  ): Promise<BrainGameActivityDTO> {
    if (this.cannedActivity) {
      return this.cannedActivity;
    }

    return {
      id: 'fake-play-01',
      targetTier: childTier,
      category: 'PUPPET' as PlayCategory,
      title: 'Barnyard Animal Puppet Sparring & Echoing',
      summary: 'Face-to-face vocal turn-taking and imitation using animal puppets.',
      instructions: 'Put on a puppet and make animal noises, waiting for response.',
      materialsNeeded: ['1 puppet'],
      targetSkills: ['Serve and return', 'Vocal imitation'],
      estimatedMinutes: 10,
      isScreenFree: true,
    };
  }

  async getPlayCatalog(
    childTier?: DevelopmentalTier,
    category?: PlayCategory
  ): Promise<BrainGameActivityDTO[]> {
    if (this.cannedCatalog.length > 0) {
      return this.cannedCatalog;
    }

    return [
      {
        id: 'fake-play-01',
        targetTier: childTier ?? ('TIER_0_INFANCY_TODDLER_0_3' as DevelopmentalTier),
        category: category ?? ('PUPPET' as PlayCategory),
        title: 'Barnyard Animal Puppet Sparring & Echoing',
        summary: 'Face-to-face vocal turn-taking and imitation using animal puppets.',
        instructions: 'Put on a puppet and make animal noises, waiting for response.',
        materialsNeeded: ['1 puppet'],
        targetSkills: ['Serve and return', 'Vocal imitation'],
        estimatedMinutes: 10,
        isScreenFree: true,
      },
    ];
  }
}
