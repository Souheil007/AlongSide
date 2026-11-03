/**
 * 10-Dimension First-Phone Readiness Assessment Evaluation Engine
 * Evaluates holistic developmental and behavioral readiness for personal smartphone ownership.
 */

export const READINESS_DIMENSIONS = [
  'executive_function',
  'online_safety',
  'bedtime_habits',
  'peer_pressure_resilience',
  'emotional_regulation',
  'family_communication',
  'screen_time_balance',
  'critical_thinking',
  'privacy_awareness',
  'co_regulation_readiness',
] as const;

export type ReadinessDimension = (typeof READINESS_DIMENSIONS)[number];

export const ReadinessPreset = {
  ROAD_2_AUTONOMY_CHARTER: 'ROAD_2_AUTONOMY_CHARTER',
  ROAD_2_SCAFFOLDED_PACT: 'ROAD_2_SCAFFOLDED_PACT',
  ROAD_1_BRIDGE_CHARTER: 'ROAD_1_BRIDGE_CHARTER',
  ROAD_1_PRE_DEVICE_FOUNDATION: 'ROAD_1_PRE_DEVICE_FOUNDATION',
} as const;

export type ReadinessPreset = (typeof ReadinessPreset)[keyof typeof ReadinessPreset];

export interface ReadinessAnswer {
  questionId: string;
  dimensionKey: string;
  score: number;
  maxScore?: number;
  selectedOptionId?: string;
}

export interface DimensionBreakdown {
  score: number; // 0-100
  rating: 'HIGH' | 'MODERATE' | 'DEVELOPING';
  guidance: string;
}

export interface ReadinessAssessmentResult {
  overallScore: number; // 0-100
  dimensionScores: Record<string, number>; // 0-100 per dimension
  dimensionBreakdown?: Record<string, DimensionBreakdown>;
  isReadyForPersonalPhone: boolean;
  recommendation: string;
  recommendedRoadmapPreset: ReadinessPreset;
  strengths: string[];
  growthAreas: string[];
}

const DIMENSION_GUIDANCE: Record<string, { high: string; moderate: string; developing: string }> = {
  executive_function: {
    high: 'Strong impulse control and consistent completion of responsibilities.',
    moderate: 'Good general focus but occasional distraction when transitioning between tasks.',
    developing: 'Impulse centers still maturing; requires structured parent scaffolding.',
  },
  online_safety: {
    high: 'Keen awareness of stranger danger, phishing, and suspicious online links.',
    moderate: 'Recognizes obvious red flags; benefits from ongoing dialogue on subtler manipulation.',
    developing: 'High trust in online spaces; vulnerable to clickbait and unsolicited contacts.',
  },
  bedtime_habits: {
    high: 'Voluntarily powers down devices well before sleep without resistance.',
    moderate: 'Respects curfews generally but needs occasional reminders to dock screens.',
    developing: 'Screens interfere with sleep cycles; physical bedtime docking mandatory.',
  },
  peer_pressure_resilience: {
    high: 'Confident setting boundaries in group chats and resisting digital FOMO.',
    moderate: 'Sensitive to group dynamics but communicates when things feel uncomfortable.',
    developing: 'Susceptible to peer demands and fear of social exclusion.',
  },
  emotional_regulation: {
    high: 'Responds constructively to digital conflict and gaming frustration.',
    moderate: 'Occasional frustration with screen limits, but recovers quickly.',
    developing: 'Intense emotional reactions or tantrums upon device disconnection.',
  },
  family_communication: {
    high: 'Transparent; immediately alerts parents to uncomfortable online encounters.',
    moderate: 'Approachable, though may hesitate if worried about device loss.',
    developing: 'Hides digital activity or fears punishment when mistakes happen.',
  },
  parent_communication: {
    high: 'Transparent; immediately alerts parents to uncomfortable online encounters.',
    moderate: 'Approachable, though may hesitate if worried about device loss.',
    developing: 'Hides digital activity or fears punishment when mistakes happen.',
  },
  screen_time_balance: {
    high: 'Naturally balances outdoor play, homework, and recreational tech.',
    moderate: 'Follows timer limits when prompted by parents.',
    developing: 'Hyperfocuses on screens, losing track of time and offline activities.',
  },
  time_management: {
    high: 'Naturally balances outdoor play, homework, and recreational tech.',
    moderate: 'Follows timer limits when prompted by parents.',
    developing: 'Hyperfocuses on screens, losing track of time and offline activities.',
  },
  critical_thinking: {
    high: 'Distinguishes genuine content from algorithmic ads, filters, and deepfakes.',
    moderate: 'Appreciates that social media is curated, with emerging skepticism.',
    developing: 'Accepts viral videos and algorithmic recommendations at face value.',
  },
  content_critical_thinking: {
    high: 'Distinguishes genuine content from algorithmic ads, filters, and deepfakes.',
    moderate: 'Appreciates that social media is curated, with emerging skepticism.',
    developing: 'Accepts viral videos and algorithmic recommendations at face value.',
  },
  privacy_awareness: {
    high: 'Strict guardian of personal details, location sharing, and passwords.',
    moderate: 'Understands basic privacy but may overlook background camera risks.',
    developing: 'Freely shares real-time location or personal identifiers without thinking.',
  },
  co_regulation_readiness: {
    high: 'Collaborative; willingly discusses device boundaries and accepts parental guidance.',
    moderate: 'Cooperates with guidelines with occasional negotiation or reminders.',
    developing: 'Resists collaborative boundary-setting; struggles with shared rules.',
  },
  digital_etiquette: {
    high: 'Empathetic communicator; refuses to participate in group roasting or spam.',
    moderate: 'Polite online presence with occasional impulsive comments.',
    developing: 'Struggles with digital tone and interpreting text nuance.',
  },
};

/**
 * Evaluates child readiness responses and computes overall score and recommendations.
 */
export function calculateReadinessScore(
  answers: ReadinessAnswer[]
): ReadinessAssessmentResult {
  if (answers.length === 0) {
    return {
      overallScore: 0,
      dimensionScores: {},
      isReadyForPersonalPhone: false,
      recommendation:
        'Digital safety instincts and impulse control require structured parent modeling before independent smartphone ownership.',
      recommendedRoadmapPreset: ReadinessPreset.ROAD_1_PRE_DEVICE_FOUNDATION,
      strengths: [],
      growthAreas: [],
    };
  }

  const dimensionTotals: Record<string, { totalScore: number; maxTotal: number }> = {};
  let totalScoreSum = 0;
  let totalMaxSum = 0;

  for (const answer of answers) {
    const dim = answer.dimensionKey || 'executive_function';
    const maxScore = answer.maxScore && answer.maxScore > 0 ? answer.maxScore : 10;
    const current = dimensionTotals[dim] ?? { totalScore: 0, maxTotal: 0 };

    current.totalScore += Math.max(0, answer.score);
    current.maxTotal += maxScore;
    dimensionTotals[dim] = current;

    totalScoreSum += Math.max(0, answer.score);
    totalMaxSum += maxScore;
  }

  const dimensionScores: Record<string, number> = {};
  const dimensionBreakdown: Record<string, DimensionBreakdown> = {};
  const strengths: string[] = [];
  const growthAreas: string[] = [];

  for (const [key, val] of Object.entries(dimensionTotals)) {
    const dimPct = Math.round((val.totalScore / val.maxTotal) * 100);
    dimensionScores[key] = dimPct;

    const guidanceConfig = DIMENSION_GUIDANCE[key] || {
      high: 'Exhibits strong capability in this dimension.',
      moderate: 'Exhibits balanced, developing capability.',
      developing: 'Requires intentional parent coaching and scaffolding.',
    };

    let rating: 'HIGH' | 'MODERATE' | 'DEVELOPING';
    let guidanceText: string;

    if (dimPct >= 80) {
      rating = 'HIGH';
      guidanceText = guidanceConfig.high;
      strengths.push(key);
    } else if (dimPct >= 60) {
      rating = 'MODERATE';
      guidanceText = guidanceConfig.moderate;
    } else {
      rating = 'DEVELOPING';
      guidanceText = guidanceConfig.developing;
      growthAreas.push(key);
    }

    dimensionBreakdown[key] = {
      score: dimPct,
      rating,
      guidance: guidanceText,
    };
  }

  const overallScore = totalMaxSum > 0 ? Math.round((totalScoreSum / totalMaxSum) * 100) : 0;
  const isReady = overallScore >= 75;

  let recommendation: string;
  let preset: ReadinessPreset;

  if (overallScore >= 85) {
    recommendation =
      'Child demonstrates exceptional self-regulation, online hazard awareness, and boundary respect. Ready for bilateral smartphone onboarding.';
    preset = ReadinessPreset.ROAD_2_AUTONOMY_CHARTER;
  } else if (overallScore >= 75) {
    recommendation =
      'Child exhibits solid foundational readiness with specific areas for co-regulation around nighttime transitions and app management.';
    preset = ReadinessPreset.ROAD_2_SCAFFOLDED_PACT;
  } else if (overallScore >= 50) {
    recommendation =
      'Impulse centers and digital boundaries are still maturing. A pre-device trial period with non-smart or family-shared devices is advised.';
    preset = ReadinessPreset.ROAD_1_BRIDGE_CHARTER;
  } else {
    recommendation =
      'Digital safety instincts and impulse control require structured parent modeling before independent smartphone ownership.';
    preset = ReadinessPreset.ROAD_1_PRE_DEVICE_FOUNDATION;
  }

  return {
    overallScore,
    dimensionScores,
    dimensionBreakdown,
    isReadyForPersonalPhone: isReady,
    recommendation,
    recommendedRoadmapPreset: preset,
    strengths,
    growthAreas,
  };
}
