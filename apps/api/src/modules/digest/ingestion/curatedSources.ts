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

export interface CuratedBlogFeed {
  id: string;
  sourceName: string;
  sourceDomain: string;
  feedUrl: string;
  defaultTiers: readonly CanonicalDigestTier[];
  authorityWeight: 1 | 2 | 3;
  enabled?: boolean;
}

export interface CuratedYouTubeChannel {
  channelId: string;
  channelName: string;
  defaultPresenter: string;
  defaultTiers: readonly CanonicalDigestTier[];
  topicHint: string;
  enabled?: boolean;
}

/**
 * Curated allowlist of authoritative, non-clickbait parenting, pediatric,
 * developmental neurobiology, and youth digital-culture RSS 2.0 / Atom 1.0 feeds.
 */
export const CURATED_BLOG_FEEDS: readonly CuratedBlogFeed[] = [
  // Core 8 clinical, pediatric & youth-culture institutions
  {
    id: 'healthychildren-aap',
    sourceName: 'HealthyChildren.org (AAP)',
    sourceDomain: 'healthychildren.org',
    feedUrl: 'https://feeds.feedburner.com/healthychildren',
    defaultTiers: [T0, T1, T2, T3, T4, T5],
    authorityWeight: 3,
  },
  {
    id: 'child-mind-institute',
    sourceName: 'Child Mind Institute',
    sourceDomain: 'childmind.org',
    feedUrl: 'https://childmind.org/feed/',
    defaultTiers: [T1, T2, T3, T4, T5],
    authorityWeight: 3,
  },
  {
    id: 'common-sense-media',
    sourceName: 'Common Sense Media',
    sourceDomain: 'commonsensemedia.org',
    feedUrl: 'https://www.commonsensemedia.org/rss',
    defaultTiers: [T1, T2, T3, T4, T5],
    authorityWeight: 3,
  },
  {
    id: 'zero-to-three',
    sourceName: 'ZERO TO THREE',
    sourceDomain: 'zerotothree.org',
    feedUrl: 'https://www.zerotothree.org/feed/',
    defaultTiers: [T0],
    authorityWeight: 3,
  },
  {
    id: 'greater-good-magazine',
    sourceName: 'Greater Good Magazine',
    sourceDomain: 'greatergood.berkeley.edu',
    feedUrl: 'https://greatergood.berkeley.edu/rss',
    defaultTiers: [T1, T2, T3, T4, T5],
    authorityWeight: 3,
  },
  {
    id: 'harvard-developing-child',
    sourceName: 'Harvard Center on the Developing Child',
    sourceDomain: 'developingchild.harvard.edu',
    feedUrl: 'https://developingchild.harvard.edu/resources/feed/',
    defaultTiers: [T0, T1, T2],
    authorityWeight: 3,
  },
  {
    id: 'understood-org',
    sourceName: 'Understood.org',
    sourceDomain: 'understood.org',
    feedUrl: 'https://www.understood.org/en/rss',
    defaultTiers: [T2, T3, T4],
    authorityWeight: 3,
  },
  {
    id: 'screenagers-tech-talk',
    sourceName: 'Screenagers — Tech Talk Tuesdays',
    sourceDomain: 'screenagersmovie.com',
    feedUrl: 'https://www.screenagersmovie.com/blog/rss.xml',
    defaultTiers: [T3, T4, T5],
    authorityWeight: 2,
  },

  // Vetted supplemental developmental science & youth-culture feeds for weekly coverage across 0–18
  {
    id: 'after-babel',
    sourceName: 'After Babel',
    sourceDomain: 'afterbabel.com',
    feedUrl: 'https://www.afterbabel.com/feed',
    defaultTiers: [T3, T4, T5],
    authorityWeight: 3,
  },
  {
    id: 'parenting-science',
    sourceName: 'Parenting Science',
    sourceDomain: 'parentingscience.com',
    feedUrl: 'https://www.parentingscience.com/feed/',
    defaultTiers: [T0, T1, T2, T3],
    authorityWeight: 3,
  },
  {
    id: 'parent-data',
    sourceName: 'ParentData',
    sourceDomain: 'parentdata.org',
    feedUrl: 'https://parentdata.org/feed',
    defaultTiers: [T0, T1, T2],
    authorityWeight: 2,
  },
  {
    id: 'janet-lansbury',
    sourceName: 'Janet Lansbury',
    sourceDomain: 'janetlansbury.com',
    feedUrl: 'https://www.janetlansbury.com/feed/',
    defaultTiers: [T0, T1],
    authorityWeight: 2,
  },
  {
    id: 'hand-in-hand-parenting',
    sourceName: 'Hand in Hand Parenting',
    sourceDomain: 'handinhandparenting.org',
    feedUrl: 'https://www.handinhandparenting.org/feed/',
    defaultTiers: [T0, T1, T2],
    authorityWeight: 2,
  },
  {
    id: 'additude-magazine',
    sourceName: 'ADDitude Magazine',
    sourceDomain: 'additudemag.com',
    feedUrl: 'https://www.additudemag.com/feed/',
    defaultTiers: [T2, T3, T4],
    authorityWeight: 2,
  },
  {
    id: 'wait-until-8th',
    sourceName: 'Wait Until 8th',
    sourceDomain: 'waituntil8th.org',
    feedUrl: 'https://www.waituntil8th.org/blog?format=rss',
    defaultTiers: [T2, T3],
    authorityWeight: 2,
  },
  {
    id: 'your-teen-magazine',
    sourceName: 'Your Teen Magazine',
    sourceDomain: 'yourteenmag.com',
    feedUrl: 'https://www.yourteenmag.com/feed',
    defaultTiers: [T4, T5],
    authorityWeight: 2,
  },
  {
    id: 'grown-and-flown',
    sourceName: 'Grown and Flown',
    sourceDomain: 'grownandflown.com',
    feedUrl: 'https://grownandflown.com/feed/',
    defaultTiers: [T4, T5],
    authorityWeight: 2,
  },
] as const;

/**
 * Curated allowlist of 32 verified pediatric, developmental psychology,
 * learning-science, and youth-culture YouTube channels spanning all 6 tiers.
 * Uses official zero-quota public Atom feeds (`videos.xml?channel_id=...`).
 */
export const CURATED_YOUTUBE_CHANNELS: readonly CuratedYouTubeChannel[] = [
  // Ages 0–3 & Early Childhood (T0, T1)
  {
    channelId: 'UCx2hGbeaOvy8P5m357V3gBw',
    channelName: 'PedsDocTalk',
    defaultPresenter: 'Dr. Mona Amin, DO, FAAP',
    defaultTiers: [T0, T1],
    topicHint: 'Sleep & Routines',
  },
  {
    channelId: 'UCi5qwwsrTiWxxErD3B3_jag',
    channelName: 'Taking Cara Babies',
    defaultPresenter: 'Cara Dumaplin, RN',
    defaultTiers: [T0],
    topicHint: 'Sleep & Routines',
  },
  {
    channelId: 'UC7JoxFfKCsNSSAsMjGJtgvA',
    channelName: 'Solid Starts',
    defaultPresenter: 'Solid Starts Pediatric Team',
    defaultTiers: [T0],
    topicHint: 'Sleep & Routines',
  },
  {
    channelId: 'UCs_CXnifPUvP1zKIpgAYwqw',
    channelName: 'Emma Hubbard',
    defaultPresenter: 'Emma Hubbard, Pediatric OT',
    defaultTiers: [T0],
    topicHint: 'Play & Learning',
  },
  {
    channelId: 'UCbVnfbuhpDdLt7K6y-Cqq1w',
    channelName: 'ZERO TO THREE',
    defaultPresenter: 'ZERO TO THREE Specialists',
    defaultTiers: [T0],
    topicHint: 'Play & Learning',
  },
  {
    channelId: 'UC3FX6luzKg7m-iLD5TyXxBg',
    channelName: 'Kids Eat in Color',
    defaultPresenter: 'Jennifer Anderson, MSPH, RDN',
    defaultTiers: [T0, T1],
    topicHint: 'Sleep & Routines',
  },
  {
    channelId: 'UChBjCaJyswxsEqz26TZrWRw',
    channelName: 'Center on the Developing Child at Harvard University',
    defaultPresenter: 'Harvard Developing Child Center',
    defaultTiers: [T0, T1, T2],
    topicHint: 'Play & Learning',
  },
  {
    channelId: 'UCGnI3Vulgsap7AyRNLrpPvA',
    channelName: "Stanford Medicine Children's Health",
    defaultPresenter: 'Stanford Pediatric Specialists',
    defaultTiers: [T0, T1, T2],
    topicHint: 'Sleep & Routines',
  },

  // Early & Middle Childhood + Pre-Teen (T1, T2, T3)
  {
    channelId: 'UCQcifo_12x84Uji6h1TVmKg',
    channelName: 'Good Inside',
    defaultPresenter: 'Dr. Becky Kennedy, PhD',
    defaultTiers: [T1, T2, T3],
    topicHint: 'Family Communication',
  },
  {
    channelId: 'UCYNbYGl89UUowy8oXkipC-Q',
    channelName: 'Dr. Becky',
    defaultPresenter: 'Dr. Becky Kennedy, PhD',
    defaultTiers: [T1, T2, T3],
    topicHint: 'Family Communication',
  },
  {
    channelId: 'UCJWqhYTN2h00RsOBQSFEytg',
    channelName: 'Child Mind Institute',
    defaultPresenter: 'Child Mind Institute Clinicians',
    defaultTiers: [T1, T2, T3, T4, T5],
    topicHint: 'Family Communication',
  },
  {
    channelId: 'UCYJTfZSjqUraGJu_GwCwHpw',
    channelName: 'Common Sense Media',
    defaultPresenter: 'Common Sense Media Editors',
    defaultTiers: [T1, T2, T3, T4, T5],
    topicHint: 'Media & Tech',
  },
  {
    channelId: 'UCbXMoF3-74hj2lhLCIp3C-A',
    channelName: 'Understood',
    defaultPresenter: 'Understood Learning Experts',
    defaultTiers: [T2, T3, T4],
    topicHint: 'School & Focus',
  },
  {
    channelId: 'UCPfDETmabmiBHjNrPPHlF5A',
    channelName: 'Greater Good Science Center',
    defaultPresenter: 'UC Berkeley Greater Good Researchers',
    defaultTiers: [T1, T2, T3, T4, T5],
    topicHint: 'Family Communication',
  },
  {
    channelId: 'UCdksaQxXH13BMeHo09MorBg',
    channelName: 'Edutopia',
    defaultPresenter: 'Edutopia Education Team',
    defaultTiers: [T2, T3, T4, T5],
    topicHint: 'School & Focus',
  },
  {
    channelId: 'UC_3d1NVczqxa-cQzFt2iVSw',
    channelName: 'ADDitude Magazine',
    defaultPresenter: 'ADDitude Clinical Experts',
    defaultTiers: [T2, T3, T4],
    topicHint: 'School & Focus',
  },
  {
    channelId: 'UC8fQzKHIhSoZeSq3bwQx4mw',
    channelName: 'Mayo Clinic',
    defaultPresenter: 'Mayo Clinic Pediatricians',
    defaultTiers: [T0, T1, T2, T3],
    topicHint: 'Sleep & Routines',
  },
  {
    channelId: 'UCxyiSz4m161Z6frOsFxJpgw',
    channelName: 'Cleveland Clinic',
    defaultPresenter: 'Cleveland Clinic Children’s Team',
    defaultTiers: [T0, T1, T2, T3, T4],
    topicHint: 'Sleep & Routines',
  },

  // Pre-Teen, Early Adolescence & Late Adolescence (T3, T4, T5)
  {
    channelId: 'UC-nPM1_kSZf91ZGkcgy_95Q',
    channelName: 'How to ADHD',
    defaultPresenter: 'Jessica McCabe',
    defaultTiers: [T3, T4, T5],
    topicHint: 'School & Focus',
  },
  {
    channelId: 'UClHVl2N3jPEbkNJVx-ItQIQ',
    channelName: 'HealthyGamerGG',
    defaultPresenter: 'Dr. Alok Kanojia, MD',
    defaultTiers: [T3, T4, T5],
    topicHint: 'Media & Tech',
  },
  {
    channelId: 'UCpuqYFKLkcEryEieomiAv3Q',
    channelName: 'Therapy in a Nutshell',
    defaultPresenter: 'Emma McAdam, LMFT',
    defaultTiers: [T3, T4, T5],
    topicHint: 'Family Communication',
  },
  {
    channelId: 'UCkJEpR7JmS36tajD34Gp4VA',
    channelName: 'Psych2Go',
    defaultPresenter: 'Psych2Go Editorial Team',
    defaultTiers: [T4, T5],
    topicHint: 'Social & Peers',
  },
  {
    channelId: 'UCsooa4yRKGN_zEE8iknghZA',
    channelName: 'TED-Ed',
    defaultPresenter: 'TED-Ed Educators',
    defaultTiers: [T2, T3, T4, T5],
    topicHint: 'Play & Learning',
  },
  {
    channelId: 'UCX6b17PVsYBQ0ip5gyeme-Q',
    channelName: 'CrashCourse',
    defaultPresenter: 'CrashCourse Educators',
    defaultTiers: [T4, T5],
    topicHint: 'School & Focus',
  },
  {
    channelId: 'UC4a-Gbdw7vOaccHmFo40b9g',
    channelName: 'Khan Academy',
    defaultPresenter: 'Sal Khan & Educators',
    defaultTiers: [T2, T3, T4, T5],
    topicHint: 'School & Focus',
  },
  {
    channelId: 'UC0QHWhjbe5fGJEPz3sVb6nw',
    channelName: 'Doctor Mike',
    defaultPresenter: 'Dr. Mikhail Varshavski, DO',
    defaultTiers: [T3, T4, T5],
    topicHint: 'Sleep & Routines',
  },
  {
    channelId: 'UCrPhcbDwqWRc-3tteE2BS6g',
    channelName: 'Mama Doctor Jones',
    defaultPresenter: 'Dr. Danielle Jones, MD',
    defaultTiers: [T0, T4, T5],
    topicHint: 'Family Communication',
  },
  {
    channelId: 'UC2D2CMWXMOVWx7giW1n3LIg',
    channelName: 'Andrew Huberman',
    defaultPresenter: 'Dr. Andrew Huberman, PhD',
    defaultTiers: [T4, T5],
    topicHint: 'Sleep & Routines',
  },
  {
    channelId: 'UCDnwlb3IQDPJtFysPUJbDFQ',
    channelName: 'Dr Rangan Chatterjee',
    defaultPresenter: 'Dr. Rangan Chatterjee',
    defaultTiers: [T3, T4, T5],
    topicHint: 'Family Communication',
  },
  {
    channelId: 'UCvQECJukTDE2i6aCoMnS-Vg',
    channelName: 'Big Think',
    defaultPresenter: 'Big Think Researchers',
    defaultTiers: [T4, T5],
    topicHint: 'Media & Tech',
  },
  {
    channelId: 'UCZYTClx2T1of7BRZ86-8fow',
    channelName: 'SciShow',
    defaultPresenter: 'SciShow Hosts',
    defaultTiers: [T2, T3, T4],
    topicHint: 'Play & Learning',
  },
  {
    channelId: 'UCC552Sd-3nyi_tk2BudLUzA',
    channelName: 'AsapSCIENCE',
    defaultPresenter: 'Mitchell Moffit & Gregory Brown',
    defaultTiers: [T3, T4, T5],
    topicHint: 'Media & Tech',
  },
] as const;

export function buildYouTubeChannelFeedUrl(channelId: string): string {
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
}

/**
 * Curated per-tier YouTube Data API v3 `search.list` fallback queries.
 * Invoked ONLY when `YOUTUBE_API_KEY` is configured and a tier has fewer
 * than `minVideosPerTier` fresh uploads from curated channels in the target week.
 */
export const TIER_FALLBACK_SEARCH_QUERIES: Record<
  CanonicalDigestTier,
  readonly string[]
> = {
  [T0]: [
    'pediatrician toddler emotional regulation sleep feeding advice',
    'infant brain development serve and return play pediatrician',
  ],
  [T1]: [
    'early childhood preschool behavior boundaries child psychologist',
    'ages 4 to 6 screen time play routines parenting expert',
  ],
  [T2]: [
    'elementary child anxiety friendship focus child psychologist',
    'ages 7 to 9 video games screens homework habits parenting',
  ],
  [T3]: [
    'tween preteen first phone social media readiness psychologist',
    'ages 10 to 12 group chats peer pressure parent communication',
  ],
  [T4]: [
    'teenager sleep circadian social media adolescent psychologist',
    'ages 13 to 15 teen communication digital wellbeing parents',
  ],
  [T5]: [
    'high school teen autonomy executive function burnout psychologist',
    'ages 16 to 18 teen AI study habits independence parenting',
  ],
};
