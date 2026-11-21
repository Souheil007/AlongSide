import { describe, expect, it } from 'vitest';
import {
  CANONICAL_DIGEST_TIERS,
  computeWeeklyEditionWindow,
  isSlangEligibleTier,
  matchesVideoDurationBucket,
  parseYouTubeDescriptionChapters,
  resolveDigestTierBucket,
} from '../src/algorithms/digest.js';
import {
  DevelopmentalTier,
  DigestItemType,
} from '../src/constants/index.js';
import {
  DigestArticlesQuerySchema,
  DigestInteractionMutationSchema,
  DigestVideosQuerySchema,
} from '../src/schemas/digest.js';

describe('Culture & Trends digest algorithms (PLAN-49)', () => {
  describe('resolveDigestTierBucket', () => {
    it('defines exactly 6 canonical Culture & Trends developmental buckets', () => {
      expect(CANONICAL_DIGEST_TIERS).toEqual([
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
        DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
        DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
        DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,
      ]);
    });

    it('collapses decomposed Tier 0A, 0B, and 0C sub-tranches into TIER_0_INFANCY_TODDLER_0_3', () => {
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_0A_INFANCY_0_1)).toBe(
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_0B_TODDLER_1_2)).toBe(
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3)).toBe(
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3)).toBe(
        DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3
      );
    });

    it('preserves canonical tiers 1 through 5 unchanged', () => {
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6)).toBe(
        DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9)).toBe(
        DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_3_PRE_TEEN_10_12)).toBe(
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15)).toBe(
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18)).toBe(
        DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18
      );
    });

    it('maps all legacy v2.3 smartphone-bridge aliases to their canonical lifespan buckets', () => {
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_1_AGES_8_9)).toBe(
        DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_2_AGES_10_11)).toBe(
        DevelopmentalTier.TIER_3_PRE_TEEN_10_12
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_3_AGES_12_13)).toBe(
        DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15
      );
      expect(resolveDigestTierBucket(DevelopmentalTier.TIER_4_AGES_14_PLUS)).toBe(
        DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18
      );
    });
  });

  describe('isSlangEligibleTier', () => {
    it('returns false for ages 0–3 (including 0A, 0B, 0C) and ages 4–6', () => {
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_0A_INFANCY_0_1)).toBe(false);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_0B_TODDLER_1_2)).toBe(false);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3)).toBe(false);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3)).toBe(false);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6)).toBe(false);
    });

    it('returns true strictly for ages 7–18 canonical tiers and legacy aliases', () => {
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9)).toBe(true);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_3_PRE_TEEN_10_12)).toBe(true);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15)).toBe(true);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18)).toBe(true);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_1_AGES_8_9)).toBe(true);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_2_AGES_10_11)).toBe(true);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_3_AGES_12_13)).toBe(true);
      expect(isSlangEligibleTier(DevelopmentalTier.TIER_4_AGES_14_PLUS)).toBe(true);
    });
  });

  describe('parseYouTubeDescriptionChapters', () => {
    it('extracts M:SS and H:MM:SS chapter lines, sorts ascending, and caps to top 4', () => {
      const description = [
        'In this parent seminar we cover sleep and screen transitions.',
        '',
        '04:10 - Bedtime curfew negotiations',
        '0:00 Intro & overview',
        '01:15:05 Q&A with parents',
        '(01:45) Why tween sleep shifts biologically',
        '- 08:30 · Building a kitchen charging dock',
        '12:00 Closing script',
      ].join('\n');

      const chips = parseYouTubeDescriptionChapters(description, 5400);
      expect(chips).toHaveLength(4);
      expect(chips).toEqual([
        { seconds: 0, label: '0:00 · Intro & overview' },
        { seconds: 105, label: '1:45 · Why tween sleep shifts biologically' },
        { seconds: 250, label: '4:10 · Bedtime curfew negotiations' },
        { seconds: 510, label: '8:30 · Building a kitchen charging dock' },
      ]);
    });

    it('parses H:MM:SS timestamps accurately when under durationSeconds', () => {
      const description = [
        '00:00 Welcome',
        '1:02:15 Deep dive into adolescent dopamine',
      ].join('\n');

      const chips = parseYouTubeDescriptionChapters(description, 4000);
      expect(chips).toEqual([
        { seconds: 0, label: '0:00 · Welcome' },
        { seconds: 3735, label: '1:02:15 · Deep dive into adolescent dopamine' },
      ]);
    });

    it('discards out-of-range timestamps (>= durationSeconds), invalid seconds, and clock times', () => {
      const description = [
        '8:30 PM dock phones in the kitchen',
        '0:75 Invalid seconds marker',
        '1:00 Real first chapter',
        '5:00 Real second chapter',
        '10:00 Equal to duration (discarded)',
        '14:20 Past duration (discarded)',
      ].join('\n');

      const chips = parseYouTubeDescriptionChapters(description, 600);
      expect(chips).toEqual([
        { seconds: 60, label: '1:00 · Real first chapter' },
        { seconds: 300, label: '5:00 · Real second chapter' },
      ]);
    });

    it('deduplicates identical timestamps and returns [] when fewer than 2 valid markers exist', () => {
      expect(parseYouTubeDescriptionChapters('')).toEqual([]);
      expect(
        parseYouTubeDescriptionChapters('Just a regular description with no timestamps.')
      ).toEqual([]);
      expect(
        parseYouTubeDescriptionChapters('0:00 Only one chapter\n0:00 Duplicate timestamp')
      ).toEqual([]);
      expect(parseYouTubeDescriptionChapters('0:00 Intro\n1:00 Next', 0)).toEqual([]);
    });
  });

  describe('computeWeeklyEditionWindow', () => {
    it('computes canonical Sunday-to-Sunday 7-day UTC window for Sunday cron execution', () => {
      // Sun Nov 15, 2026 at 05:00 UTC
      const window = computeWeeklyEditionWindow(new Date('2026-11-15T05:00:00.000Z'));

      expect(window.weekStart.toISOString()).toBe('2026-11-08T00:00:00.000Z');
      expect(window.weekEnd.toISOString()).toBe('2026-11-15T00:00:00.000Z');
      expect(window.publishDate.toISOString()).toBe('2026-11-15T00:00:00.000Z');
      expect(window.weekStart.getUTCDay()).toBe(0);
      expect(window.weekEnd.getUTCDay()).toBe(0);
      expect(window.weekEnd.getTime() - window.weekStart.getTime()).toBe(
        7 * 24 * 60 * 60 * 1000
      );
    });

    it('resolves any mid-week day to the same most recent Sunday edition window', () => {
      const wed = computeWeeklyEditionWindow(new Date('2026-11-18T16:45:00.000Z'));
      const sat = computeWeeklyEditionWindow(new Date('2026-11-21T23:59:59.000Z'));

      expect(wed.publishDate.toISOString()).toBe('2026-11-15T00:00:00.000Z');
      expect(sat.publishDate.toISOString()).toBe('2026-11-15T00:00:00.000Z');
      expect(wed.weekStart.toISOString()).toBe('2026-11-08T00:00:00.000Z');
      expect(sat.weekEnd.toISOString()).toBe('2026-11-15T00:00:00.000Z');
    });

    it('throws RangeError on invalid Date inputs', () => {
      expect(() => computeWeeklyEditionWindow(new Date('not-a-date'))).toThrow(RangeError);
    });
  });

  describe('matchesVideoDurationBucket', () => {
    it('classifies short (<12), medium (12–25), deep (>25), and all accurately', () => {
      expect(matchesVideoDurationBucket(6, 'short')).toBe(true);
      expect(matchesVideoDurationBucket(11, 'short')).toBe(true);
      expect(matchesVideoDurationBucket(12, 'short')).toBe(false);

      expect(matchesVideoDurationBucket(12, 'medium')).toBe(true);
      expect(matchesVideoDurationBucket(25, 'medium')).toBe(true);
      expect(matchesVideoDurationBucket(26, 'medium')).toBe(false);

      expect(matchesVideoDurationBucket(26, 'deep')).toBe(true);
      expect(matchesVideoDurationBucket(60, 'deep')).toBe(true);
      expect(matchesVideoDurationBucket(25, 'deep')).toBe(false);

      expect(matchesVideoDurationBucket(2, 'all')).toBe(true);
      expect(matchesVideoDurationBucket(174, 'all')).toBe(true);
    });
  });

  describe('Zod digest schemas', () => {
    it('defaults articles and videos queries to scope="issue" and parses string booleans accurately', () => {
      const articles = DigestArticlesQuerySchema.parse({
        issueNumber: '41',
        unreadOnly: 'false',
      });
      expect(articles.issueNumber).toBe(41);
      expect(articles.scope).toBe('issue');
      expect(articles.unreadOnly).toBe(false);

      const articlesTrue = DigestArticlesQuerySchema.parse({
        unreadOnly: 'true',
      });
      expect(articlesTrue.unreadOnly).toBe(true);

      const videos = DigestVideosQuerySchema.parse({});
      expect(videos.scope).toBe('issue');
      expect(videos.durationBucket).toBe('all');
    });

    it('requires at least one of isRead or isSaved on DigestInteractionMutationSchema', () => {
      const invalid = DigestInteractionMutationSchema.safeParse({
        itemType: DigestItemType.ARTICLE,
        itemId: 'art-42-1',
      });
      expect(invalid.success).toBe(false);

      const valid = DigestInteractionMutationSchema.safeParse({
        itemType: DigestItemType.ARTICLE,
        itemId: 'art-42-1',
        isRead: true,
      });
      expect(valid.success).toBe(true);
    });
  });
});
