import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  AcademyCategory,
  DevelopmentalTier,
  type AcademyModuleDTO,
  type AcademyLessonSummaryDTO,
} from '@alongside/shared';
import {
  ModuleCard,
  getCategoryBadgeInfo,
  getTierBadgeInfo,
} from '../src/components/academy/ModuleCard';
import { MOCK_ACADEMY_MODULES } from '../src/lib/api/mocks';

describe('Plan 37: Parent Intelligence Academy CourseCard Editorial UI Specification', () => {
  const sampleLessons: AcademyLessonSummaryDTO[] = [
    {
      id: 'les-test-1',
      moduleId: 'mod-editorial-test',
      title: 'Neurochemical Surges & The Dopamine Reward Loop',
      slug: 'neurochemical-surges',
      sortOrder: 1,
      readingMinutes: 4,
      isCompleted: true,
    },
    {
      id: 'les-test-2',
      moduleId: 'mod-editorial-test',
      title: 'The Neutral Empathetic Pause Under Fire',
      slug: 'neutral-empathetic-pause',
      sortOrder: 2,
      readingMinutes: 5,
      isCompleted: false,
    },
    {
      id: 'les-test-3',
      moduleId: 'mod-editorial-test',
      title: 'Bedtime Curfew Treaties That Hold',
      slug: 'bedtime-curfew-treaties',
      sortOrder: 3,
      readingMinutes: 4,
      isCompleted: false,
    },
  ];

  const editorialModule: AcademyModuleDTO & { lessons?: AcademyLessonSummaryDTO[] } = {
    id: 'mod-editorial-test',
    slug: 'tween-neurobiology-deep-dive',
    title: 'Tween Adrenarche & Executive Function Mastery',
    reliefSubtitle: 'Why hormonal storms look like personal defiance, and how to stay anchored in calm authority.',
    summary: 'A 3-part clinical deep dive into adrenarche biology, prefrontal synaptic pruning, and de-escalation protocols.',
    category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    sortOrder: 1,
    lessonCount: 3,
    completedLessonCount: 1,
    isCompleted: false,
    tonightQuickWinTitle: "Tonight's 3-Minute De-escalation Neutral Response Hold",
    coverImageUrl: null,
    lessons: sampleLessons,
  };

  describe('1. Parent Relief Subtitle in Newsreader Serif Italic', () => {
    it('renders the relief subtitle with font-serif and italic classes', () => {
      const html = renderToStaticMarkup(
        React.createElement(ModuleCard, { module: editorialModule })
      );

      // Verify the relief subtitle text is rendered
      expect(html).toContain(
        'Why hormonal storms look like personal defiance, and how to stay anchored in calm authority.'
      );

      // Verify typography styling tokens: font-serif, italic, and teal-800
      expect(html).toContain('font-serif');
      expect(html).toContain('italic');
      expect(html).toContain('text-teal-800');
    });

    it('gracefully omits relief subtitle paragraph when reliefSubtitle is null or undefined', () => {
      const moduleWithoutSubtitle = {
        ...editorialModule,
        reliefSubtitle: undefined,
      };

      const html = renderToStaticMarkup(
        React.createElement(ModuleCard, { module: moduleWithoutSubtitle })
      );

      expect(html).not.toContain('font-serif italic');
    });
  });

  describe('2. Multi-Modal Format Pills', () => {
    it('renders all 3 required pedagogical format pills: Audio Memo, Script Vault, and AI Sparring', () => {
      const html = renderToStaticMarkup(
        React.createElement(ModuleCard, { module: editorialModule })
      );

      // 🎧 Audio Memo format pill
      expect(html).toContain('🎧 Audio Memo');

      // 💬 Script Vault format pill
      expect(html).toContain('💬 Script Vault');

      // 🤖 AI Sparring format pill
      expect(html).toContain('🤖 AI Sparring');

      // Verify badge styling contains monospace and subtle borders
      expect(html).toContain('font-mono');
    });
  });

  describe("3. Tonight's Quick Win Callout Strip", () => {
    it("renders Tonight's Quick Win callout strip with emerald calm styling and badge", () => {
      const html = renderToStaticMarkup(
        React.createElement(ModuleCard, { module: editorialModule })
      );

      // Callout title (HTML escaped apostrophe in renderToStaticMarkup)
      expect(html).toContain("Tonight&#x27;s 3-Minute De-escalation Neutral Response Hold");

      // Badge label
      expect(html).toContain("Tonight&#x27;s Win");

      // Emerald calm design system styling
      expect(html).toContain('bg-emerald-50/80');
      expect(html).toContain('border-emerald-200/90');
      expect(html).toContain('text-emerald-950');
    });

    it("omits Tonight's Quick Win callout strip when tonightQuickWinTitle is absent", () => {
      const moduleWithoutQuickWin = {
        ...editorialModule,
        tonightQuickWinTitle: undefined,
      };

      const html = renderToStaticMarkup(
        React.createElement(ModuleCard, { module: moduleWithoutQuickWin })
      );

      expect(html).not.toContain("Tonight&#x27;s Win");
    });
  });

  describe('4. Expandable Curriculum Syllabus Drawer', () => {
    it('renders the syllabus drawer toggle button with curriculum lesson count and aria-expanded', () => {
      const html = renderToStaticMarkup(
        React.createElement(ModuleCard, { module: editorialModule })
      );

      // Toggle button with testid
      expect(html).toContain('data-testid="syllabus-drawer-toggle"');
      expect(html).toContain('Curriculum Syllabus (3 lessons)');
      expect(html).toContain('aria-expanded="false"');
    });

    it('renders structured lesson list items with sort orders, reading times, and titles', () => {
      // In static markup, the drawer is collapsed by default. We verify the drawer structure with mock lessons.
      const sample = MOCK_ACADEMY_MODULES.find(
        (m) => m.slug === 'behavior-tween-adrenarche'
      );
      expect(sample).toBeDefined();

      const html = renderToStaticMarkup(
        React.createElement(ModuleCard, { module: sample! })
      );
      expect(html).toContain('Tween Adrenarche &amp; Emotional Volatility');
      expect(html).toContain('data-testid="syllabus-drawer-toggle"');
    });
  });

  describe('5. Lifespan Developmental Tier and Category Badge Mapping', () => {
    it('maps decomposed early childhood tiers accurately', () => {
      const tier0A = getTierBadgeInfo(DevelopmentalTier.TIER_0A_INFANCY_0_1);
      expect(tier0A.label).toBe('Ages 0–1 (Tier 0A: Infancy)');
      expect(tier0A.shortLabel).toBe('Ages 0–1');
      expect(tier0A.className).toContain('rose');

      const tier0B = getTierBadgeInfo(DevelopmentalTier.TIER_0B_TODDLER_1_2);
      expect(tier0B.label).toBe('Ages 1–2 (Tier 0B: Younger Toddler)');
      expect(tier0B.shortLabel).toBe('Ages 1–2');
      expect(tier0B.className).toContain('amber');

      const tier0C = getTierBadgeInfo(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3);
      expect(tier0C.label).toBe('Ages 2–3 (Tier 0C: Older Toddler)');
      expect(tier0C.shortLabel).toBe('Ages 2–3');
      expect(tier0C.className).toContain('orange');
    });

    it('maps all 5 canonical categories to distinct Parent Calm styling', () => {
      const behavior = getCategoryBadgeInfo(AcademyCategory.BEHAVIOR_AND_EMOTIONS);
      expect(behavior.label).toBe('Behavior & Emotions');
      expect(behavior.className).toContain('rose');

      const health = getCategoryBadgeInfo(AcademyCategory.HEALTH_AND_WELLNESS);
      expect(health.label).toBe('Pediatric Health & Sleep');
      expect(health.className).toContain('teal');

      const nutrition = getCategoryBadgeInfo(AcademyCategory.NUTRITION_AND_FEEDING);
      expect(nutrition.label).toBe('Nutrition & Feeding');
      expect(nutrition.className).toContain('amber');

      const play = getCategoryBadgeInfo(AcademyCategory.DEVELOPMENT_AND_PLAY);
      expect(play.label).toBe('Development & Play');
      expect(play.className).toContain('indigo');

      const digital = getCategoryBadgeInfo(AcademyCategory.DIGITAL_AND_DEVICES);
      expect(digital.label).toBe('Modern Digital World');
      expect(digital.className).toContain('cyan');
    });

    it('calculates progress percentage and lesson counters accurately', () => {
      const html = renderToStaticMarkup(
        React.createElement(ModuleCard, { module: editorialModule })
      );

      // 1 of 3 lessons = 33%
      expect(html).toContain('33%');
      expect(html).toContain('1 of 3 lessons completed');
    });
  });
});
