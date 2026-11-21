import {
  DevelopmentalTier,
  type CanonicalDigestTier,
} from '@alongside/shared';

const T0 = DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;
const T1 = DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;
const T2 = DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;
const T3 = DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
const T4 = DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;
const T5 = DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;

export interface DigestTierMeta {
  tier: CanonicalDigestTier;
  tierLabel: string;
  shortAges: string;
  defaultChildName: string;
  defaultAgeLabel: string;
  relatedCourseTitle: string;
}

export type DigestTierDisplayMeta = DigestTierMeta;

export const DIGEST_TIER_METADATA: Record<CanonicalDigestTier, DigestTierMeta> = {
  [T0]: {
    tier: T0,
    tierLabel: 'Infancy & Toddler',
    shortAges: 'Ages 0–3',
    defaultChildName: 'your toddler',
    defaultAgeLabel: 'Ages 0–3',
    relatedCourseTitle: 'Toddler Language & Screen-Free Sanctuary',
  },
  [T1]: {
    tier: T1,
    tierLabel: 'Early Childhood',
    shortAges: 'Ages 4–6',
    defaultChildName: 'your preschooler',
    defaultAgeLabel: 'Ages 4–6',
    relatedCourseTitle: 'Preschool Emotional Literacy & Calm Transitions',
  },
  [T2]: {
    tier: T2,
    tierLabel: 'Middle Childhood',
    shortAges: 'Ages 7–9',
    defaultChildName: 'your child',
    defaultAgeLabel: 'Ages 7–9',
    relatedCourseTitle: 'Elementary Gaming, Friendships & Early Tech Agreements',
  },
  [T3]: {
    tier: T3,
    tierLabel: 'Pre-Teen',
    shortAges: 'Ages 10–12',
    defaultChildName: 'your tween',
    defaultAgeLabel: 'Ages 10–12',
    relatedCourseTitle: 'Tween Adrenarche, First Phones & Bilateral Family Pacts',
  },
  [T4]: {
    tier: T4,
    tierLabel: 'Early Adolescence',
    shortAges: 'Ages 13–15',
    defaultChildName: 'your teen',
    defaultAgeLabel: 'Ages 13–15',
    relatedCourseTitle: 'Adolescent Autonomy, Sleep Architecture & Digital Pacts',
  },
  [T5]: {
    tier: T5,
    tierLabel: 'Late Adolescence',
    shortAges: 'Ages 16–18',
    defaultChildName: 'your teen',
    defaultAgeLabel: 'Ages 16–18',
    relatedCourseTitle: 'Launching Well: Consultant Parenting & Digital Self-Regulation',
  },
};
