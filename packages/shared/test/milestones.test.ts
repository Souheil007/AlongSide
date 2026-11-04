import { describe, expect, it } from 'vitest';
import { evaluateMilestoneProgress } from '../src/algorithms/milestones.js';
import { MilestoneCategory, MilestoneStatus } from '../src/constants/index.js';

describe('milestones algorithm', () => {
  const mockMilestones = [
    {
      id: 'm1',
      targetTier: 'TIER_0_INFANCY_TODDLER_0_3',
      targetAgeMonths: 12,
      category: MilestoneCategory.GROSS_MOTOR,
      title: 'Pulls up to stand',
      description: 'Stands with support',
    },
    {
      id: 'm2',
      targetTier: 'TIER_0_INFANCY_TODDLER_0_3',
      targetAgeMonths: 14,
      category: MilestoneCategory.GROSS_MOTOR,
      title: 'First independent steps',
      description: 'Takes steps without holding on',
    },
    {
      id: 'm3',
      targetTier: 'TIER_0_INFANCY_TODDLER_0_3',
      targetAgeMonths: 12,
      category: MilestoneCategory.SPEECH_LANGUAGE,
      title: 'Says mama/dada with meaning',
      description: 'Specific vocal labeling',
    },
    {
      id: 'm4',
      targetTier: 'TIER_0_INFANCY_TODDLER_0_3',
      targetAgeMonths: 18,
      category: MilestoneCategory.SPEECH_LANGUAGE,
      title: 'Uses 10+ words',
      description: 'Expansive vocabulary',
    },
  ];

  it('calculates completion percentage and category breakdowns', () => {
    const childRecords = [
      { milestoneId: 'm1', status: MilestoneStatus.ACHIEVED },
      { milestoneId: 'm2', status: MilestoneStatus.IN_PROGRESS },
      { milestoneId: 'm3', status: MilestoneStatus.ACHIEVED },
    ];

    const result = evaluateMilestoneProgress(mockMilestones, childRecords, 15);

    expect(result.totalMilestones).toBe(4);
    expect(result.achievedCount).toBe(2);
    expect(result.inProgressCount).toBe(1);
    expect(result.completionPercentage).toBe(50);

    expect(result.categoryBreakdown[MilestoneCategory.GROSS_MOTOR]?.achieved).toBe(1);
    expect(result.categoryBreakdown[MilestoneCategory.GROSS_MOTOR]?.total).toBe(2);
    expect(result.categoryBreakdown[MilestoneCategory.SPEECH_LANGUAGE]?.achieved).toBe(1);
    expect(result.categoryBreakdown[MilestoneCategory.SPEECH_LANGUAGE]?.total).toBe(2);
  });

  it('identifies upcoming and overdue milestones', () => {
    // Child is 16 months old; m3 was not started (target 12m) -> overdue
    const childRecords = [{ milestoneId: 'm1', status: MilestoneStatus.ACHIEVED }];

    const result = evaluateMilestoneProgress(mockMilestones, childRecords, 16);
    expect(result.overdueMilestones.some((m) => m.id === 'm3')).toBe(true);
    expect(result.upcomingMilestones.some((m) => m.id === 'm4')).toBe(true);
  });

  it('handles empty milestone list gracefully', () => {
    const result = evaluateMilestoneProgress([], [], 12);
    expect(result.totalMilestones).toBe(0);
    expect(result.completionPercentage).toBe(0);
    expect(result.upcomingMilestones).toHaveLength(0);
  });
});
