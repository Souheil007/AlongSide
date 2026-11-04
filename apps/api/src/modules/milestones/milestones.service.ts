import type {
  DevelopmentalTier,
  MilestoneCategory,
  MilestoneDTO,
  ChildMilestoneDTO,
  MilestoneStatus,
} from '@alongside/shared';
import { evaluateMilestoneProgress } from '@alongside/shared';
import type {
  MilestonesRepository,
  MilestoneFilterOptions,
} from './milestones.repository.js';

export class MilestonesService {
  constructor(private readonly milestonesRepo: MilestonesRepository) {}

  async listMilestones(filter?: MilestoneFilterOptions): Promise<MilestoneDTO[]> {
    return this.milestonesRepo.findMilestones(filter);
  }

  async recordChildMilestone(
    childId: string,
    milestoneId: string,
    status: MilestoneStatus,
    parentNotes?: string
  ): Promise<ChildMilestoneDTO> {
    const milestone = await this.milestonesRepo.findMilestoneById(milestoneId);
    if (!milestone) {
      throw new Error(`Milestone with id ${milestoneId} not found`);
    }

    return this.milestonesRepo.upsertChildMilestone({
      childId,
      milestoneId,
      status,
      parentNotes,
      achievedAt: status === 'ACHIEVED' ? new Date() : undefined,
    });
  }

  async getChildMilestones(childId: string): Promise<ChildMilestoneDTO[]> {
    return this.milestonesRepo.findChildMilestones(childId);
  }

  async getChildProgress(childId: string, childAgeMonths: number) {
    const [allMilestones, childRecords] = await Promise.all([
      this.milestonesRepo.findMilestones(),
      this.milestonesRepo.findChildMilestones(childId),
    ]);

    return evaluateMilestoneProgress(allMilestones, childRecords, childAgeMonths);
  }
}
