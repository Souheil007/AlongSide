import { MilestoneCategory, MilestoneStatus } from '../constants/index.js';

export interface MilestoneProgressInput {
  id: string;
  targetTier: string;
  targetAgeMonths: number;
  category: MilestoneCategory | string;
  title: string;
  description: string;
  signsToWatch?: string;
  clinicalAuthority?: string;
}

export interface ChildMilestoneRecordInput {
  milestoneId: string;
  status: MilestoneStatus | string;
  achievedAt?: string | Date | null;
  parentNotes?: string | null;
}

export interface CategoryMilestoneProgress {
  category: MilestoneCategory | string;
  total: number;
  achieved: number;
  inProgress: number;
  completionPercentage: number;
}

export interface MilestoneEvaluationResult {
  totalMilestones: number;
  achievedCount: number;
  inProgressCount: number;
  completionPercentage: number;
  categoryBreakdown: Record<string, CategoryMilestoneProgress>;
  upcomingMilestones: MilestoneProgressInput[];
  overdueMilestones: MilestoneProgressInput[];
}

/**
 * Pure algorithmic engine to evaluate child developmental milestone achievement.
 * Assesses completion percentage, category breakdowns, and clinical watch flags.
 */
export function evaluateMilestoneProgress(
  milestones: MilestoneProgressInput[],
  childMilestones: ChildMilestoneRecordInput[],
  childAgeMonths: number
): MilestoneEvaluationResult {
  const statusMap = new Map<string, MilestoneStatus | string>();
  for (const cm of childMilestones) {
    statusMap.set(cm.milestoneId, cm.status);
  }

  let achievedCount = 0;
  let inProgressCount = 0;
  const categoryMap: Record<string, { total: number; achieved: number; inProgress: number }> = {};
  const upcomingMilestones: MilestoneProgressInput[] = [];
  const overdueMilestones: MilestoneProgressInput[] = [];

  for (const m of milestones) {
    const cat = m.category;
    if (!categoryMap[cat]) {
      categoryMap[cat] = { total: 0, achieved: 0, inProgress: 0 };
    }
    categoryMap[cat].total += 1;

    const status = statusMap.get(m.id) ?? MilestoneStatus.NOT_STARTED;
    if (status === MilestoneStatus.ACHIEVED) {
      achievedCount += 1;
      categoryMap[cat].achieved += 1;
    } else if (status === MilestoneStatus.IN_PROGRESS) {
      inProgressCount += 1;
      categoryMap[cat].inProgress += 1;
    } else {
      // NOT_STARTED: check if overdue (target age is less than child's current age + 2 months grace)
      if (childAgeMonths > m.targetAgeMonths + 2) {
        overdueMilestones.push(m);
      } else if (m.targetAgeMonths >= childAgeMonths - 1 && m.targetAgeMonths <= childAgeMonths + 3) {
        upcomingMilestones.push(m);
      }
    }
  }

  const total = milestones.length;
  const completionPercentage = total > 0 ? Math.round((achievedCount / total) * 100) : 0;

  const categoryBreakdown: Record<string, CategoryMilestoneProgress> = {};
  for (const [cat, data] of Object.entries(categoryMap)) {
    categoryBreakdown[cat] = {
      category: cat,
      total: data.total,
      achieved: data.achieved,
      inProgress: data.inProgress,
      completionPercentage: data.total > 0 ? Math.round((data.achieved / data.total) * 100) : 0,
    };
  }

  return {
    totalMilestones: total,
    achievedCount,
    inProgressCount,
    completionPercentage,
    categoryBreakdown,
    upcomingMilestones,
    overdueMilestones,
  };
}
