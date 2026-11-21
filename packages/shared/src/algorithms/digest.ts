import { DevelopmentalTier } from '../constants/index.js';
import type {
  DigestVideoDurationBucket,
  VideoJumpChip,
} from '../types/index.js';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MAX_CHAPTER_CHIPS = 4;
const MAX_CHAPTER_LABEL_LENGTH = 72;

/**
 * The 6 canonical developmental tier buckets powering Culture & Trends.
 * All 8 lifespan tiers (including Tier 0A/0B/0C) and legacy v2.3 aliases
 * collapse cleanly into one of these 6 buckets.
 */
export const CANONICAL_DIGEST_TIERS = [
  DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
  DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
  DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
  DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
  DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
] as const;

export type CanonicalDigestTier = (typeof CANONICAL_DIGEST_TIERS)[number];

export const DEFAULT_DIGEST_TIER: CanonicalDigestTier =
  DevelopmentalTier.TIER_3_PRE_TEEN_10_12;

const SLANG_ELIGIBLE_BUCKETS = new Set<DevelopmentalTier>([
  DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
  DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
  DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
]);

/**
 * Normalizes any lifespan sub-tranche (0A/0B/0C) or legacy v2.3 alias
 * into one of the 6 canonical Culture & Trends developmental buckets.
 */
export function resolveDigestTierBucket(
  tier: DevelopmentalTier
): CanonicalDigestTier {
  switch (tier) {
    case DevelopmentalTier.TIER_0A_INFANCY_0_1:
    case DevelopmentalTier.TIER_0B_TODDLER_1_2:
    case DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3:
    case DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3:
      return DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3;

    case DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6:
      return DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6;

    case DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9:
    case DevelopmentalTier.TIER_1_AGES_8_9:
      return DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9;

    case DevelopmentalTier.TIER_3_PRE_TEEN_10_12:
    case DevelopmentalTier.TIER_2_AGES_10_11:
      return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;

    case DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15:
    case DevelopmentalTier.TIER_3_AGES_12_13:
      return DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15;

    case DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18:
    case DevelopmentalTier.TIER_4_AGES_14_PLUS:
      return DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18;

    default:
      return DEFAULT_DIGEST_TIER;
  }
}

/**
 * Returns true strictly for ages 7–18 (middle childhood through late adolescence)
 * where weekly youth phrases are developmentally relevant, and false for ages 0–6.
 */
export function isSlangEligibleTier(tier: DevelopmentalTier): boolean {
  return SLANG_ELIGIBLE_BUCKETS.has(resolveDigestTierBucket(tier));
}

function formatChapterTimestamp(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ss = String(seconds).padStart(2, '0');

  if (hours > 0) {
    const mm = String(minutes).padStart(2, '0');
    return `${hours}:${mm}:${ss}`;
  }
  return `${minutes}:${ss}`;
}

function parseTimestampToSeconds(raw: string): number | null {
  const parts = raw.split(':').map((part) => Number(part));
  if (parts.some((n) => !Number.isInteger(n) || n < 0)) {
    return null;
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts as [number, number];
    if (seconds >= 60) {
      return null;
    }
    return minutes * 60 + seconds;
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts as [number, number, number];
    if (minutes >= 60 || seconds >= 60) {
      return null;
    }
    return hours * 3600 + minutes * 60 + seconds;
  }

  return null;
}

const CHAPTER_LINE_REGEX =
  /^\s*(?:[-*•]\s*)?[\[(]?(\d{1,2}:\d{2}(?::\d{2})?)[\])]?\s*(?:[-–—:|·•]+\s*|\s+)(.+?)\s*$/;

const CLOCK_SUFFIX_REGEX = /^(?:a\.?m\.?|p\.?m\.?)(?:\b|$)/i;

/**
 * Deterministically extracts real YouTube chapter markers (`M:SS` or `H:MM:SS`)
 * from a video's description text. Discards invalid or out-of-range timestamps,
 * sorts ascending, deduplicates, caps to top 4 distinct highlights, and returns
 * `[]` when fewer than 2 valid markers exist (never fabricates timestamps).
 */
export function parseYouTubeDescriptionChapters(
  description: string,
  durationSeconds?: number
): VideoJumpChip[] {
  if (!description || typeof description !== 'string') {
    return [];
  }

  if (
    durationSeconds !== undefined &&
    (!Number.isFinite(durationSeconds) || durationSeconds <= 0)
  ) {
    return [];
  }

  const seenSeconds = new Map<number, string>();
  const lines = description.split(/\r?\n/);

  for (const line of lines) {
    const match = CHAPTER_LINE_REGEX.exec(line);
    if (!match) {
      continue;
    }

    const rawTimestamp = match[1];
    const rawTitle = match[2];
    if (!rawTimestamp || !rawTitle) {
      continue;
    }

    // Reject ordinary clock times like "8:30 PM bedtime"
    if (CLOCK_SUFFIX_REGEX.test(rawTitle.trim())) {
      continue;
    }

    const seconds = parseTimestampToSeconds(rawTimestamp);
    if (seconds === null) {
      continue;
    }

    if (durationSeconds !== undefined && seconds >= durationSeconds) {
      continue;
    }

    const cleanedTitle = rawTitle
      .replace(/^[-–—:|·•\s]+/, '')
      .replace(/[-–—:|·•\s]+$/, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (cleanedTitle.length < 2) {
      continue;
    }

    if (!seenSeconds.has(seconds)) {
      const clippedTitle =
        cleanedTitle.length > MAX_CHAPTER_LABEL_LENGTH
          ? `${cleanedTitle.slice(0, MAX_CHAPTER_LABEL_LENGTH - 1).trimEnd()}…`
          : cleanedTitle;
      seenSeconds.set(
        seconds,
        `${formatChapterTimestamp(seconds)} · ${clippedTitle}`
      );
    }
  }

  if (seenSeconds.size < 2) {
    return [];
  }

  return Array.from(seenSeconds.entries())
    .sort((a, b) => a[0] - b[0])
    .slice(0, MAX_CHAPTER_CHIPS)
    .map(([seconds, label]) => ({ seconds, label }));
}

/**
 * Computes the canonical Sunday-to-Sunday UTC 7-day edition window anchored
 * to the most recent Sunday at 00:00:00.000Z on or before `referenceDate`.
 *
 * Example:
 * - Reference Sun 2026-11-15T05:00:00Z (or Wed 2026-11-18T14:00:00Z):
 *   weekStart   = 2026-11-08T00:00:00.000Z (Sunday)
 *   weekEnd     = 2026-11-15T00:00:00.000Z (Sunday)
 *   publishDate = 2026-11-15T00:00:00.000Z (Sunday)
 */
export function computeWeeklyEditionWindow(
  referenceDate: Date = new Date()
): { weekStart: Date; weekEnd: Date; publishDate: Date } {
  if (!(referenceDate instanceof Date) || Number.isNaN(referenceDate.getTime())) {
    throw new RangeError('referenceDate must be a valid Date instance.');
  }

  const utcMidnightMs = Date.UTC(
    referenceDate.getUTCFullYear(),
    referenceDate.getUTCMonth(),
    referenceDate.getUTCDate()
  );
  const dayOfWeek = referenceDate.getUTCDay(); // 0 = Sunday
  const publishMs = utcMidnightMs - dayOfWeek * MS_PER_DAY;

  return {
    weekStart: new Date(publishMs - 7 * MS_PER_DAY),
    weekEnd: new Date(publishMs),
    publishDate: new Date(publishMs),
  };
}

/**
 * Evaluates whether a video's duration in minutes matches a duration bucket chip.
 * - 'short':  under 12 minutes (< 12)
 * - 'medium': 12 to 25 minutes inclusive (12..25)
 * - 'deep':   over 25 minutes (> 25)
 */
export function matchesVideoDurationBucket(
  durationMinutes: number,
  bucket: DigestVideoDurationBucket = 'all'
): boolean {
  switch (bucket) {
    case 'short':
      return durationMinutes < 12;
    case 'medium':
      return durationMinutes >= 12 && durationMinutes <= 25;
    case 'deep':
      return durationMinutes > 25;
    case 'all':
    default:
      return true;
  }
}
