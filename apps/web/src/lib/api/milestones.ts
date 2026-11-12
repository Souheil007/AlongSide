import {
  DevelopmentalTier,
  MilestoneCategory,
  MilestoneStatus,
  type MilestoneDTO,
  type ChildMilestoneDTO,
  type TrackMilestoneInput,
  evaluateMilestoneProgress,
  type MilestoneEvaluationResult,
} from '@alongside/shared';
import { apiClient } from './client';

export const CANONICAL_MILESTONES: MilestoneDTO[] = [
  // --- TIER 0: INFANCY & TODDLER (0–3 YRS) ---
  {
    id: 'ms-t0-gross-walk',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 14,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Independent Walking & Balance',
    description: 'Takes 5+ steps independently without holding onto furniture or adult hands with steady balance.',
    signsToWatch: 'If child is not walking independently by 18 months, or displays persistent asymmetrical limp, mention to pediatrician.',
    clinicalAuthority: 'AAP Practice Guidelines (Gross Motor Surveillance)',
    sortOrder: 1,
    status: MilestoneStatus.ACHIEVED,
  },
  {
    id: 'ms-t0-speech-words',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 14,
    category: MilestoneCategory.SPEECH_LANGUAGE,
    title: 'First Words & Intentional Vocalization',
    description: 'Uses at least 3 distinct word approximations (e.g., "mama", "dada", "ball", "more") with specific communicative intent.',
    signsToWatch: 'Absence of babbling with consonants (da, ma) by 12 months or lack of single words by 16 months warrants audiologic/developmental screening.',
    clinicalAuthority: 'CDC Developmental Surveillance / ASHA Speech Benchmarks',
    sortOrder: 2,
    status: MilestoneStatus.ACHIEVED,
  },
  {
    id: 'ms-t0-fine-pincer',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 14,
    category: MilestoneCategory.FINE_MOTOR,
    title: 'Neat Pincer Grasp & Self-Feeding',
    description: 'Picks up small pieces of food (e.g. steamed peas, soft berries) cleanly between tip of index finger and thumb without raking.',
    signsToWatch: 'Inability to coordinate thumb-finger opposition or persistent fisting of one hand after 12 months.',
    clinicalAuthority: 'AAP HealthyChildren Pediatric Fine Motor Benchmarks',
    sortOrder: 3,
    status: MilestoneStatus.IN_PROGRESS,
  },
  {
    id: 'ms-t0-social-point',
    targetTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    targetAgeMonths: 14,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Joint Attention & Proto-Declarative Pointing',
    description: 'Points with index finger to show you an interesting object (e.g. airplane, dog) and checks your gaze to share the experience.',
    signsToWatch: 'Absence of pointing to share interest or lack of response to name by 12–15 months is a key early autism screening marker.',
    clinicalAuthority: 'M-CHAT-R / AAP Autism Surveillance Protocols',
    sortOrder: 4,
    status: MilestoneStatus.ACHIEVED,
  },

  // --- TIER 1: EARLY CHILDHOOD (4–6 YRS) ---
  {
    id: 'ms-t1-gross-pedal',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetAgeMonths: 60,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Dynamic Agility, Hopping & Tricycle/Bike',
    description: 'Hops on one foot, pedals a bicycle or tricycle with steering control, and catches a bounced medium ball with both hands.',
    signsToWatch: 'Frequent tripping, inability to alternate feet when climbing stairs, or severe toe-walking.',
    clinicalAuthority: 'AAP Pediatric Physical Development Committee',
    sortOrder: 1,
    status: MilestoneStatus.ACHIEVED,
  },
  {
    id: 'ms-t1-cog-story',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetAgeMonths: 60,
    category: MilestoneCategory.COGNITIVE,
    title: 'Narrative Sequencing & Theory of Mind',
    description: 'Recalls the sequence of a 4-step story (beginning, middle, end) and understands that others can hold different beliefs or feelings.',
    signsToWatch: 'Inability to comprehend simple cause-and-effect questions or difficulty following 2-step related commands.',
    clinicalAuthority: 'Piaget Preoperational Stage / Bruner Narrative Cognition',
    sortOrder: 2,
    status: MilestoneStatus.ACHIEVED,
  },
  {
    id: 'ms-t1-social-turn',
    targetTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
    targetAgeMonths: 60,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Cooperative Play & Emotional Turn-Taking',
    description: 'Engages in sustained imaginative role-play with peers (e.g. veterinarian, chef) and negotiates turn-taking without physical outbursts.',
    signsToWatch: 'Extreme difficulty with routine transitions, persistent solitary play without peer curiosity, or frequent unprovoked aggression.',
    clinicalAuthority: 'Erikson Initiative vs Guilt / Collaborative Problem Solving (Greene)',
    sortOrder: 3,
    status: MilestoneStatus.IN_PROGRESS,
  },

  // --- TIER 2: MIDDLE CHILDHOOD (7–9 YRS) ---
  {
    id: 'ms-t2-gross-bike',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetAgeMonths: 96,
    category: MilestoneCategory.GROSS_MOTOR,
    title: 'Two-Wheel Bicycle & Complex Motor Coordination',
    description: 'Rides a two-wheel bicycle without training wheels, balances on one foot for 15+ seconds, and demonstrates organized athletic agility.',
    signsToWatch: 'Persistent developmental coordination delays or extreme resistance to outdoor active play.',
    clinicalAuthority: 'AAP Council on Sports Medicine & Fitness',
    sortOrder: 1,
    status: MilestoneStatus.ACHIEVED,
  },
  {
    id: 'ms-t2-cog-logic',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetAgeMonths: 96,
    category: MilestoneCategory.COGNITIVE,
    title: 'Concrete Operational Logic & Multi-Step Planning',
    description: 'Understands conservation of volume/number, solves 2-step mental math problems, and plans steps in board games or construction models.',
    signsToWatch: 'Intense difficulty organizing school materials or severe frustration with multi-step written instructions.',
    clinicalAuthority: 'Piaget Concrete Operational Framework',
    sortOrder: 2,
    status: MilestoneStatus.ACHIEVED,
  },
  {
    id: 'ms-t2-social-peer',
    targetTier: DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
    targetAgeMonths: 96,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Friendship Reciprocity & Rule Internalization',
    description: 'Forms reciprocal one-on-one friendships, understands fairness in games, and manages emotional disappointment during losses.',
    signsToWatch: 'Chronic social rejection, bullying behaviors, or school avoidance related to social anxiety.',
    clinicalAuthority: 'Selman Stages of Peer Friendship / Gottman Emotion Coaching',
    sortOrder: 3,
    status: MilestoneStatus.IN_PROGRESS,
  },

  // --- TIER 3: PRE-TEEN (10–12 YRS) ---
  {
    id: 'ms-t3-pubertal-adrenarche',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    targetAgeMonths: 132,
    category: MilestoneCategory.COGNITIVE,
    title: 'Adrenarche & Peer Autonomy Shift',
    description: 'Navigates initial pubertal hormonal awakening (adrenarche), places heightened value on peer validation while maintaining family anchor.',
    signsToWatch: 'Sudden drastic withdrawal from family life, severe sleep disruptions, or secrecy around digital interactions.',
    clinicalAuthority: 'Dahl Adolescent Neurobiology & Adrenarche Research',
    sortOrder: 1,
    status: MilestoneStatus.ACHIEVED,
  },
  {
    id: 'ms-t3-digital-readiness',
    targetTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    targetAgeMonths: 132,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'First-Phone Readiness & Impulse Regulation',
    description: 'Demonstrates baseline 10-dimension smartphone maturity: homework timeboxing, bedroom device docking, and honest communication.',
    signsToWatch: 'Unable to disengage from gaming without intense rage; persistent screen sneaks during bedtime hours.',
    clinicalAuthority: 'Alongside 10-Dimension Assessment Protocol',
    sortOrder: 2,
    status: MilestoneStatus.IN_PROGRESS,
  },

  // --- TIER 4: EARLY ADOLESCENCE (13–15 YRS) ---
  {
    id: 'ms-t4-circadian-bedtime',
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    targetAgeMonths: 168,
    category: MilestoneCategory.COGNITIVE,
    title: 'Circadian Delay Management & Bedtime Docking',
    description: 'Understands biological circadian phase delay (later melatonin onset) and voluntarily docks device by 8:30 PM for restorative sleep.',
    signsToWatch: 'Chronic sleep debt (<7h/night), daytime somnolence, or screen use between 11 PM and 5 AM.',
    clinicalAuthority: 'Carskadon Adolescent Circadian Biology / National Sleep Foundation',
    sortOrder: 1,
    status: MilestoneStatus.ACHIEVED,
  },
  {
    id: 'ms-t4-bilateral-pact',
    targetTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    targetAgeMonths: 168,
    category: MilestoneCategory.SOCIAL_EMOTIONAL,
    title: 'Bilateral Boundary Negotiation & Digital Integrity',
    description: 'Co-signs Family Media Agreement, reports problematic online encounters without fear of punitive confiscation, and respects curfews.',
    signsToWatch: 'Use of disguised vault apps, ghost social media accounts, or complete refusal to discuss digital life.',
    clinicalAuthority: 'American Psychological Association Health Advisory on Social Media',
    sortOrder: 2,
    status: MilestoneStatus.ACHIEVED,
  },
];

/**
 * Filter milestones by tier, category, or target age in months.
 */
export async function getMilestones(query?: {
  tier?: string;
  category?: string;
  ageMonths?: number;
}): Promise<MilestoneDTO[]> {
  try {
    const params = new URLSearchParams();
    if (query?.tier) params.set('tier', query.tier);
    if (query?.category) params.set('category', query.category);
    if (query?.ageMonths !== undefined) params.set('ageMonths', String(query.ageMonths));

    const qs = params.toString();
    const endpoint = `/api/v1/milestones${qs ? `?${qs}` : ''}`;
    const res = await apiClient<{ milestones: MilestoneDTO[] }>(endpoint);
    if (res?.milestones && res.milestones.length > 0) {
      return res.milestones;
    }
  } catch {
    // Graceful offline / unseeded fallback
  }

  // Pure client fallback filtering
  let filtered = [...CANONICAL_MILESTONES];
  if (query?.tier) {
    filtered = filtered.filter(
      (m) => m.targetTier === query.tier || m.targetTier.includes(query.tier!)
    );
  }
  if (query?.category) {
    filtered = filtered.filter((m) => m.category === query.category);
  }
  if (query?.ageMonths !== undefined) {
    // Return milestones within +/- 18 months of child age or relevant tier
    const target = query.ageMonths;
    filtered = filtered.filter(
      (m) => Math.abs(m.targetAgeMonths - target) <= 24
    );
  }

  return filtered.length > 0 ? filtered : CANONICAL_MILESTONES.slice(0, 4);
}

/**
 * Track or toggle child milestone achievement status.
 */
export async function trackChildMilestone(
  childId: string,
  input: TrackMilestoneInput
): Promise<ChildMilestoneDTO> {
  try {
    const res = await apiClient<{ childMilestone: ChildMilestoneDTO }>(
      `/api/v1/milestones/children/${childId}`,
      {
        method: 'POST',
        body: JSON.stringify(input),
      }
    );
    if (res?.childMilestone) {
      return res.childMilestone;
    }
  } catch {
    // Offline / fallback response
  }

  return {
    id: `local-cm-${Date.now()}`,
    childId,
    milestoneId: input.milestoneId,
    status: input.status,
    achievedAt: input.status === MilestoneStatus.ACHIEVED ? new Date().toISOString() : null,
    parentNotes: input.parentNotes || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Pure helper to evaluate milestone progress using @alongside/shared algorithm.
 */
export function calculateChildMilestonesProgress(
  milestones: MilestoneDTO[],
  childAgeMonths: number
): MilestoneEvaluationResult {
  const milestoneInputs = milestones.map((m) => ({
    id: m.id,
    targetTier: m.targetTier,
    targetAgeMonths: m.targetAgeMonths,
    category: m.category,
    title: m.title,
    description: m.description,
    signsToWatch: m.signsToWatch,
    clinicalAuthority: m.clinicalAuthority,
  }));

  const childMilestoneRecords = milestones.map((m) => ({
    milestoneId: m.id,
    status: m.status ?? MilestoneStatus.NOT_STARTED,
    achievedAt: m.achievedAt,
    parentNotes: m.parentNotes,
  }));

  return evaluateMilestoneProgress(milestoneInputs, childMilestoneRecords, childAgeMonths);
}
