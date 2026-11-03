import {
  ClauseCategory,
  CommitmentParty,
  DevelopmentalTier,
  RoadType,
} from '../constants/index.js';

export interface AssessmentAnswer {
  questionId: string;
  dimensionKey: string;
  score: number;
  maxScore: number;
}

export interface ReadinessAssessmentResult {
  overallScore: number; // 0-100
  dimensionScores: Record<string, number>; // 0-100 per dimension
  isReadyForPersonalPhone: boolean;
  recommendation: string;
  recommendedRoadmapPreset: string;
}

/**
 * 10-Dimension First-Phone Readiness Index Evaluator
 * Evaluates holistic developmental readiness from responses.
 */
export function calculateReadinessScore(
  answers: AssessmentAnswer[]
): ReadinessAssessmentResult {
  if (answers.length === 0) {
    return {
      overallScore: 0,
      dimensionScores: {},
      isReadyForPersonalPhone: false,
      recommendation: 'No assessment responses provided.',
      recommendedRoadmapPreset: 'ROAD_1_PRE_DEVICE_FOUNDATION',
    };
  }

  const dimensionTotals: Record<string, { totalScore: number; maxTotal: number }> = {};
  let totalScoreSum = 0;
  let totalMaxSum = 0;

  for (const answer of answers) {
    const dim = answer.dimensionKey || 'general';
    const current = dimensionTotals[dim] ?? { totalScore: 0, maxTotal: 0 };
    current.totalScore += Math.max(0, answer.score);
    current.maxTotal += Math.max(1, answer.maxScore);
    dimensionTotals[dim] = current;

    totalScoreSum += Math.max(0, answer.score);
    totalMaxSum += Math.max(1, answer.maxScore);
  }

  const dimensionScores: Record<string, number> = {};
  for (const [key, val] of Object.entries(dimensionTotals)) {
    dimensionScores[key] = Math.round((val.totalScore / val.maxTotal) * 100);
  }

  const overallScore = totalMaxSum > 0 ? Math.round((totalScoreSum / totalMaxSum) * 100) : 0;
  const isReady = overallScore >= 75;

  let recommendation: string;
  let preset: string;

  if (overallScore >= 85) {
    recommendation =
      'Child demonstrates exceptional self-regulation, online hazard awareness, and boundary respect. Ready for bilateral smartphone onboarding.';
    preset = 'ROAD_2_AUTONOMY_CHARTER';
  } else if (overallScore >= 75) {
    recommendation =
      'Child exhibits solid foundational readiness with specific areas for co-regulation around nighttime transitions and app management.';
    preset = 'ROAD_2_SCAFFOLDED_PACT';
  } else if (overallScore >= 50) {
    recommendation =
      'Impulse centers and digital boundaries are still maturing. A pre-device trial period with non-smart or family-shared devices is advised.';
    preset = 'ROAD_1_BRIDGE_CHARTER';
  } else {
    recommendation =
      'Digital safety instincts and impulse control require structured parent modeling before independent smartphone ownership.';
    preset = 'ROAD_1_PRE_DEVICE_FOUNDATION';
  }

  return {
    overallScore,
    dimensionScores,
    isReadyForPersonalPhone: isReady,
    recommendation,
    recommendedRoadmapPreset: preset,
  };
}

export interface PresetClause {
  category: ClauseCategory;
  party: CommitmentParty;
  title: string;
  description: string;
  isStandard: boolean;
  isCustom: boolean;
  sortOrder: number;
}

export interface PresetClauseGroup {
  developmentalTier: DevelopmentalTier;
  recommendedBedtime: string;
  clauses: PresetClause[];
}

/**
 * Resolves default developmental tier and bedtime from child age.
 */
export function resolveDevelopmentalTier(age: number): {
  tier: DevelopmentalTier;
  recommendedBedtime: string;
} {
  if (age <= 9) {
    return { tier: DevelopmentalTier.TIER_1_AGES_8_9, recommendedBedtime: '20:00' };
  }
  if (age <= 11) {
    return { tier: DevelopmentalTier.TIER_2_AGES_10_11, recommendedBedtime: '20:30' };
  }
  if (age <= 13) {
    return { tier: DevelopmentalTier.TIER_3_AGES_12_13, recommendedBedtime: '21:00' };
  }
  return { tier: DevelopmentalTier.TIER_4_AGES_14_PLUS, recommendedBedtime: '21:30' };
}

/**
 * Bilateral Pact Clause Rule Resolver
 * Produces age-appropriate bilateral treaty clauses.
 */
export function resolvePactPresetClauses(
  childAge: number,
  roadType: RoadType
): PresetClauseGroup {
  const { tier, recommendedBedtime } = resolveDevelopmentalTier(childAge);

  const clauses: PresetClause[] = [
    {
      category: ClauseCategory.DEVICE_CURFEW,
      party: CommitmentParty.CHILD,
      title: `${recommendedBedtime} Nightly Docking`,
      description: `Device docks in the designated family charging station by ${recommendedBedtime} each school night.`,
      isStandard: true,
      isCustom: false,
      sortOrder: 1,
    },
    {
      category: ClauseCategory.SCREEN_TIME,
      party: CommitmentParty.CHILD,
      title: 'Homework & Family Dinner First',
      description:
        'Recreational screen time begins only after homework, chores, and evening family dinner are complete.',
      isStandard: true,
      isCustom: false,
      sortOrder: 2,
    },
    {
      category: ClauseCategory.PRIVACY_SAFETY,
      party: CommitmentParty.CHILD,
      title: 'Open Door for Uncomfortable Content',
      description:
        'If I encounter anything online that feels frightening, weird, or exploitative, I will bring it to my parents without fear of losing my device.',
      isStandard: true,
      isCustom: false,
      sortOrder: 3,
    },
    {
      category: ClauseCategory.PURCHASES_CHATS,
      party: CommitmentParty.CHILD,
      title: 'Zero Unknown Chat Contacts',
      description:
        'Online multiplayer chats and direct messages remain restricted to friends we know in real life.',
      isStandard: true,
      isCustom: false,
      sortOrder: 4,
    },
    {
      category: ClauseCategory.PARENT_COMMITMENT,
      party: CommitmentParty.PARENT,
      title: 'Calm Response & No Impulsive Confiscation',
      description:
        'Parents promise to respond with calm curiosity, never seizing the phone in anger when a mistake or awkward situation is reported.',
      isStandard: true,
      isCustom: false,
      sortOrder: 5,
    },
    {
      category: ClauseCategory.PARENT_COMMITMENT,
      party: CommitmentParty.PARENT,
      title: 'Device-Free Family Zones',
      description:
        'Parents model healthy tech boundaries by keeping our own phones away from the family dinner table and during bedtime routines.',
      isStandard: true,
      isCustom: false,
      sortOrder: 6,
    },
  ];

  if (roadType === RoadType.PRE_DEVICE) {
    clauses.push({
      category: ClauseCategory.CONTENT_BOUNDARIES,
      party: CommitmentParty.CHILD,
      title: 'Shared Living Room Device Use',
      description:
        'All tablet and computer use happens in open family areas rather than behind closed bedroom doors.',
      isStandard: true,
      isCustom: false,
      sortOrder: 7,
    });
  }

  return {
    developmentalTier: tier,
    recommendedBedtime,
    clauses,
  };
}

export interface SlangQuizAnswer {
  questionId: string;
  isCorrect: boolean;
}

export interface SlangFluencyScoreResult {
  correctCount: number;
  totalCount: number;
  percentage: number;
  badge: 'Tween Whisperer' | 'Culturally Fluent' | 'Apprentice Parent' | 'Needs Translation';
  feedback: string;
}

/**
 * Evaluates Tween Slang Cultural Fluency Quiz.
 */
export function evaluateSlangQuizScore(
  answers: SlangQuizAnswer[]
): SlangFluencyScoreResult {
  if (answers.length === 0) {
    return {
      correctCount: 0,
      totalCount: 0,
      percentage: 0,
      badge: 'Needs Translation',
      feedback: 'No answers submitted.',
    };
  }

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalCount = answers.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  let badge: 'Tween Whisperer' | 'Culturally Fluent' | 'Apprentice Parent' | 'Needs Translation';
  let feedback: string;

  if (percentage >= 90) {
    badge = 'Tween Whisperer';
    feedback = 'You understand modern tween lingo fluently. No covert apps or slang slip past you!';
  } else if (percentage >= 70) {
    badge = 'Culturally Fluent';
    feedback = 'Great job! You know the critical slang and can connect with your tween naturally.';
  } else if (percentage >= 50) {
    badge = 'Apprentice Parent';
    feedback = 'You recognize some core phrases, but reviewing our weekly Culture Digest will keep you sharp.';
  } else {
    badge = 'Needs Translation';
    feedback = "Tween culture moves fast! Check this week's Culture Digest to decode your child's world.";
  }

  return {
    correctCount,
    totalCount,
    percentage,
    badge,
    feedback,
  };
}
