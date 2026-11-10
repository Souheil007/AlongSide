import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { DevelopmentalTier } from '@alongside/shared';
import { getTierBadgeInfo } from '../src/components/academy/ModuleCard';
import {
  getModulesByTier,
  getModuleBySlug,
  getLesson,
  markLessonComplete,
} from '../src/lib/api/academy';

describe('Parent Intelligence Academy Component & API Specification', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });
  describe('Developmental Tier Badge Mapping', () => {
    it('maps Tier 0 (Ages 0-3) to Infancy & Toddler with rose styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
      expect(badge.label).toContain('Tier 0: Infancy & Toddler');
      expect(badge.shortLabel).toBe('Ages 0–3');
      expect(badge.className).toContain('rose');
    });

    it('maps Tier 1 (Ages 4-6) to Early Childhood with amber styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
      expect(badge.label).toContain('Tier 1: Early Childhood');
      expect(badge.shortLabel).toBe('Ages 4–6');
      expect(badge.className).toContain('amber');
    });

    it('maps Tier 2 (Ages 7-9) to Explorer with emerald styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
      expect(badge.label).toContain('Tier 2: Explorer');
      expect(badge.shortLabel).toBe('Ages 7–9');
      expect(badge.className).toContain('emerald');
    });

    it('maps Tier 3 (Ages 10-12) to Pathfinder with teal styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
      expect(badge.label).toContain('Tier 3: Pathfinder');
      expect(badge.shortLabel).toBe('Ages 10–12');
      expect(badge.className).toContain('teal');
    });

    it('maps Tier 4 (Ages 13-15) to Navigator with indigo styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
      expect(badge.label).toContain('Tier 4: Navigator');
      expect(badge.shortLabel).toBe('Ages 13–15');
      expect(badge.className).toContain('indigo');
    });

    it('maps Tier 5 (Ages 16-18) to Pioneer with purple styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
      expect(badge.label).toContain('Tier 5: Pioneer');
      expect(badge.shortLabel).toBe('Ages 16–18');
      expect(badge.className).toContain('purple');
    });

    it('maps legacy Tier 1 (Ages 8-9) to Explorer with emerald styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_1_AGES_8_9);
      expect(badge.label).toContain('Tier 1: Explorer');
      expect(badge.shortLabel).toBe('Ages 8–9');
      expect(badge.className).toContain('emerald');
    });

    it('maps legacy Tier 2 (Ages 10-11) to Pathfinder with teal styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_2_AGES_10_11);
      expect(badge.label).toContain('Tier 2: Pathfinder');
      expect(badge.shortLabel).toBe('Ages 10–11');
      expect(badge.className).toContain('teal');
    });

    it('maps legacy Tier 3 (Ages 12-13) to Navigator with indigo styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_3_AGES_12_13);
      expect(badge.label).toContain('Tier 3: Navigator');
      expect(badge.shortLabel).toBe('Ages 12–13');
      expect(badge.className).toContain('indigo');
    });

    it('maps legacy Tier 4 (Ages 14+) to Pioneer with amber styling', () => {
      const badge = getTierBadgeInfo(DevelopmentalTier.TIER_4_AGES_14_PLUS);
      expect(badge.label).toContain('Tier 4: Pioneer');
      expect(badge.shortLabel).toBe('Ages 14+');
      expect(badge.className).toContain('amber');
    });
  });

  describe('Module Progress Calculations', () => {
    it('calculates 0% when zero lessons are completed', () => {
      const lessonCount = 4;
      const completedCount = 0;
      const percent = Math.round((completedCount / lessonCount) * 100);
      expect(percent).toBe(0);
    });

    it('calculates rounded percentage for partial completion', () => {
      const lessonCount = 3;
      const completedCount = 1;
      const percent = Math.round((completedCount / lessonCount) * 100);
      expect(percent).toBe(33);
    });

    it('calculates 100% when all lessons are complete', () => {
      const lessonCount = 5;
      const completedCount = 5;
      const percent = Math.round((completedCount / lessonCount) * 100);
      expect(percent).toBe(100);
    });

    it('handles zero lessonCount gracefully without NaN', () => {
      const lessonCount = 0;
      const completedCount = 0;
      const percent = lessonCount > 0 ? Math.round((completedCount / lessonCount) * 100) : 0;
      expect(percent).toBe(0);
    });
  });

  describe('Lesson Markdown Parsing & Section Extraction', () => {
    it('detects and extracts Clinical Insight callouts', () => {
      const sampleMarkdown =
        '# Introduction\n\nAdrenarche triggers heightened social sensitivity.\n\n> **Clinical Insight:** The amygdala develops before the prefrontal cortex.\n\nSummary text.';
      const blocks = sampleMarkdown.split(/\n\n+/);
      const clinicalBlock = blocks.find((b) => b.includes('Clinical Insight'));

      expect(clinicalBlock).toBeDefined();
      const cleaned = clinicalBlock
        ?.replace(/^>\s*/, '')
        .replace(/^\*\*Clinical Insight:?\*\*:?\s*/i, '');
      expect(cleaned).toBe('The amygdala develops before the prefrontal cortex.');
    });

    it('detects and extracts "What to Say" actionable parent dialogue', () => {
      const sampleMarkdown =
        '## Handling the Screen Transition\n\n**What to Say:** "Leo, I know shutting down during a match feels awful. Let us plan 10 minutes before dinner."\n\nClinical commentary follows.';
      const blocks = sampleMarkdown.split(/\n\n+/);
      const dialogueBlock = blocks.find((b) => b.toLowerCase().includes('what to say'));

      expect(dialogueBlock).toBeDefined();
      const cleaned = dialogueBlock
        ?.replace(/^\*\*What to Say:?\*\*:?\s*/i, '')
        .replace(/^"|"$/g, '');
      expect(cleaned).toContain('shutting down during a match feels awful');
    });
  });

  describe('Academy API Client', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('invokes GET /api/v1/academy/modules with optional tier filter', async () => {
      const mockModules = [
        {
          id: 'mod-1',
          slug: 'tween-neurobiology',
          title: 'Tween Neurobiology',
          summary: 'Adrenarche and dopamine',
          developmentalTier: DevelopmentalTier.TIER_2_AGES_10_11,
          sortOrder: 1,
          lessonCount: 3,
          completedLessonCount: 1,
          isCompleted: false,
        },
      ];

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: { modules: mockModules },
        }),
      });

      const res = await getModulesByTier(DevelopmentalTier.TIER_2_AGES_10_11);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/academy/modules?tier=TIER_2_AGES_10_11'),
        expect.any(Object)
      );
      expect(res.modules).toHaveLength(1);
      expect(res.modules[0]?.slug).toBe('tween-neurobiology');
    });

    it('invokes GET /api/v1/academy/modules/:slug for detailed module', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            module: {
              id: 'mod-1',
              slug: 'tween-brain',
              title: 'The Tween Brain',
              summary: 'Summary',
              developmentalTier: DevelopmentalTier.TIER_2_AGES_10_11,
              sortOrder: 1,
              lessonCount: 1,
              completedLessonCount: 0,
              isCompleted: false,
              lessons: [
                {
                  id: 'les-1',
                  moduleId: 'mod-1',
                  slug: 'adrenarche',
                  title: 'Adrenarche Lesson',
                  readingMinutes: 5,
                  sortOrder: 1,
                  isCompleted: false,
                },
              ],
            },
          },
        }),
      });

      const res = await getModuleBySlug('tween-brain');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/academy/modules/tween-brain'),
        expect.any(Object)
      );
      expect(res.module.lessons).toHaveLength(1);
    });

    it('invokes GET /api/v1/academy/lessons/:id for full lesson content', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            lesson: {
              id: 'les-123',
              moduleId: 'mod-1',
              slug: 'lesson-1',
              title: 'Lesson 1',
              contentMarkdown: '# Content',
              readingMinutes: 4,
              sortOrder: 1,
              isCompleted: false,
            },
          },
        }),
      });

      const res = await getLesson('les-123');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/academy/lessons/les-123'),
        expect.any(Object)
      );
      expect(res.lesson.id).toBe('les-123');
    });

    it('invokes POST /api/v1/academy/lessons/:id/complete to mark lesson complete', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          success: true,
          data: {
            progress: {
              id: 'prog-1',
              userId: 'u-1',
              lessonId: 'les-123',
              isCompleted: true,
              completedAt: new Date().toISOString(),
            },
            module: {
              id: 'mod-1',
              slug: 'mod-slug',
              title: 'Mod Title',
              lessonCount: 3,
              completedLessonCount: 2,
              percentComplete: 67,
              isCompleted: false,
            },
          },
        }),
      });

      const res = await markLessonComplete('les-123');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/academy/lessons/les-123/complete'),
        expect.objectContaining({ method: 'POST' })
      );
      expect(res.progress.isCompleted).toBe(true);
      expect(res.module.percentComplete).toBe(67);
    });
  });
});
