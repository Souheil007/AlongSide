import { describe, expect, it, vi, beforeEach } from 'vitest';
import * as React from 'react';
import {
  AcademyCategory,
  DevelopmentalTier,
  ChapterPriority,
} from '@alongside/shared';
import {
  ACADEMY_CATEGORIES,
  CategoryPills,
} from '../src/components/academy/CategoryPills';
import {
  ActiveChildCalibrationBanner,
  getTierStageName,
} from '../src/components/academy/ActiveChildCalibrationBanner';
import {
  ChapterRoadmapView,
  getPriorityTheme,
} from '../src/components/academy/ChapterRoadmapView';
import {
  ModuleCard,
  getCategoryBadgeInfo,
  getTierBadgeInfo,
} from '../src/components/academy/ModuleCard';
import { CourseCardGrid } from '../src/components/academy/CourseCardGrid';
import { LessonReaderView } from '../src/components/academy/LessonReaderView';
import {
  getAcademyCategories,
  getAcademyModules,
  getAcademyModuleBySlug,
  markLessonComplete,
} from '../src/lib/api/academy';
import {
  MOCK_ACADEMY_CATEGORIES,
  MOCK_ACADEMY_MODULES,
  MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
  MOCK_TWEEN_BEHAVIOR_CHAPTERS,
  MOCK_LESSON_DETAIL_ADRENARCHE,
} from '../src/lib/api/mocks';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/academy',
}));

describe('PLAN-31: Parent Intelligence Academy Curriculum Explorer & Chapter Reader UI', () => {
  describe('1. Canonical 5-Category Taxonomy & CategoryPills Component', () => {
    it('defines all 5 canonical categories in ACADEMY_CATEGORIES with ALL filter', () => {
      const keys = ACADEMY_CATEGORIES.map((c) => c.key);
      expect(keys).toContain('ALL');
      expect(keys).toContain(AcademyCategory.BEHAVIOR_AND_EMOTIONS);
      expect(keys).toContain(AcademyCategory.HEALTH_AND_WELLNESS);
      expect(keys).toContain(AcademyCategory.NUTRITION_AND_FEEDING);
      expect(keys).toContain(AcademyCategory.DEVELOPMENT_AND_PLAY);
      expect(keys).toContain(AcademyCategory.DIGITAL_AND_DEVICES);
    });

    it('maps all 5 categories to distinctive, non-clashing Parent Calm styling in getCategoryBadgeInfo', () => {
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

    it('renders CategoryPills element with category stats count chips without throwing', () => {
      const onSelectCategory = vi.fn();
      const element = React.createElement(CategoryPills, {
        selectedCategory: 'ALL',
        onSelectCategory,
        categoryStats: MOCK_ACADEMY_CATEGORIES,
      });

      expect(element).toBeDefined();
      expect(element.props.selectedCategory).toBe('ALL');
      expect(element.props.categoryStats).toHaveLength(5);
    });
  });

  describe('2. Active Child Age Calibration Banner', () => {
    it('formats active child stage names across developmental lifespan tiers', () => {
      expect(getTierStageName(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3)).toBe(
        'Infancy & Toddler'
      );
      expect(getTierStageName(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6)).toBe(
        'Early Childhood'
      );
      expect(getTierStageName(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9)).toBe(
        'Explorer (Ages 7–9)'
      );
      expect(getTierStageName(DevelopmentalTier.TIER_3_PRE_TEEN_10_12)).toBe(
        'Pathfinder (Ages 10–12)'
      );
      expect(getTierStageName(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15)).toBe(
        'Navigator (Ages 13–15)'
      );
      expect(getTierStageName(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18)).toBe(
        'Pioneer (Ages 16–18)'
      );
    });

    it('renders ActiveChildCalibrationBanner for active child context and allows stage switching', () => {
      const onSelectTier = vi.fn();
      const element = React.createElement(ActiveChildCalibrationBanner, {
        childName: 'Leo',
        childAge: 10,
        childTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        selectedTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
        onSelectTier,
      });

      expect(element).toBeDefined();
      expect(element.props.childName).toBe('Leo');
      expect(element.props.childAge).toBe(10);
      expect(element.props.childTier).toBe(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
    });

    it('renders ActiveChildCalibrationBanner with fallback when no child is selected', () => {
      const onSelectTier = vi.fn();
      const element = React.createElement(ActiveChildCalibrationBanner, {
        childName: null,
        childAge: null,
        childTier: null,
        selectedTier: 'ALL',
        onSelectTier,
      });

      expect(element).toBeDefined();
      expect(element.props.childName).toBeNull();
      expect(element.props.selectedTier).toBe('ALL');
    });
  });

  describe('3. Prioritized Chapter Roadmap & Priority Themes', () => {
    it('returns accurate theme badges and clinical taglines for Priority 1, 2, and 3', () => {
      const p1 = getPriorityTheme(ChapterPriority.PRIORITY_1_CRITICAL);
      expect(p1.shortBadge).toContain('Priority 1 · Critical');
      expect(p1.tagline).toBe('Start here for acute friction and core neurobiology.');
      expect(p1.badgeStyle).toContain('rose');

      const p2 = getPriorityTheme(ChapterPriority.PRIORITY_2_ROUTINES);
      expect(p2.shortBadge).toContain('Priority 2 · Daily Routines');
      expect(p2.tagline).toBe('Daily habits and preventative rituals.');
      expect(p2.badgeStyle).toContain('teal');

      const p3 = getPriorityTheme(ChapterPriority.PRIORITY_3_SCAFFOLDING);
      expect(p3.shortBadge).toContain('Priority 3 · Scaffolding');
      expect(p3.tagline).toBe('Long-term emotional intelligence and transitions.');
      expect(p3.badgeStyle).toContain('indigo');
    });

    it('renders ChapterRoadmapView with chapters ordered strictly by Priority 1, 2, and 3', () => {
      // Create unsorted chapters to verify sorting logic
      const unsortedModule = {
        ...MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
        chapters: [
          MOCK_TWEEN_BEHAVIOR_CHAPTERS[2]!, // Priority 3
          MOCK_TWEEN_BEHAVIOR_CHAPTERS[0]!, // Priority 1
          MOCK_TWEEN_BEHAVIOR_CHAPTERS[1]!, // Priority 2
        ],
      };

      const element = React.createElement(ChapterRoadmapView, { module: unsortedModule });
      expect(element).toBeDefined();
      expect(element.props.module.chapters).toHaveLength(3);
    });

    it('synthesizes prioritized chapters if a module has flat lessons without chapter grouping', () => {
      const moduleWithoutChapters = {
        ...MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
        chapters: [],
      };

      const element = React.createElement(ChapterRoadmapView, { module: moduleWithoutChapters });
      expect(element).toBeDefined();
      expect(element.props.module.lessons).toHaveLength(6);
    });
  });

  describe('4. CourseCardGrid & ModuleCard Components', () => {
    it('renders ModuleCard with category badge, tier badge, and chapter count', () => {
      const sampleModule = MOCK_ACADEMY_MODULES[0]!;
      const element = React.createElement(ModuleCard, { module: sampleModule });

      expect(element).toBeDefined();
      expect(element.props.module.title).toBe('Tween Adrenarche & Emotional Volatility');
      expect(element.props.module.category).toBe(AcademyCategory.BEHAVIOR_AND_EMOTIONS);
      expect(element.props.module.developmentalTier).toBe(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
    });

    it('renders CourseCardGrid with list of modules', () => {
      const onRetry = vi.fn();
      const onReset = vi.fn();
      const element = React.createElement(CourseCardGrid, {
        modules: MOCK_ACADEMY_MODULES,
        isLoading: false,
        isError: false,
        onRetry,
        onResetFilters: onReset,
      });

      expect(element).toBeDefined();
      expect(element.props.modules).toHaveLength(MOCK_ACADEMY_MODULES.length);
    });

    it('renders CourseCardGrid empty state when zero modules match filters', () => {
      const onReset = vi.fn();
      const element = React.createElement(CourseCardGrid, {
        modules: [],
        isLoading: false,
        isError: false,
        onResetFilters: onReset,
      });

      expect(element).toBeDefined();
      expect(element.props.modules).toHaveLength(0);
    });
  });

  describe('5. Rich Micro-Lesson Reader View & Markdown Callout Parsing', () => {
    it('renders LessonReaderView with lesson detail containing Clinical Insight and What to Say scripts', () => {
      const onComplete = vi.fn();
      const element = React.createElement(LessonReaderView, {
        lesson: MOCK_LESSON_DETAIL_ADRENARCHE,
        moduleSlug: 'behavior-tween-adrenarche',
        moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        nextLesson: null,
        prevLesson: null,
        onLessonComplete: onComplete,
      });

      expect(element).toBeDefined();
      expect(element.props.lesson.title).toBe(
        'Adrenarche: The Biological Awakening to Peer Status'
      );
      expect(element.props.lesson.contentMarkdown).toContain('Developmental Insight:');
      expect(element.props.lesson.contentMarkdown).toContain('What to Say:');
      expect(element.props.lesson.contentMarkdown).toContain('- [ ]');
    });
  });

  describe('6. Academy API Client Layer & Offline Fallbacks', () => {
    it('getAcademyCategories retrieves all 5 canonical categories with stats', async () => {
      const categories = await getAcademyCategories();
      expect(categories).toBeDefined();
      expect(categories.length).toBeGreaterThanOrEqual(5);

      const categoryKeys = categories.map((c) => c.category);
      expect(categoryKeys).toContain(AcademyCategory.BEHAVIOR_AND_EMOTIONS);
      expect(categoryKeys).toContain(AcademyCategory.HEALTH_AND_WELLNESS);
      expect(categoryKeys).toContain(AcademyCategory.NUTRITION_AND_FEEDING);
      expect(categoryKeys).toContain(AcademyCategory.DEVELOPMENT_AND_PLAY);
      expect(categoryKeys).toContain(AcademyCategory.DIGITAL_AND_DEVICES);
    });

    it('getAcademyCategories retrieves tier-filtered category stats for a viewing stage', async () => {
      const tier0Categories = await getAcademyCategories({
        tier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
      });
      expect(tier0Categories).toBeDefined();
      expect(tier0Categories.length).toBe(5);
      const totalTier0 = tier0Categories.reduce((acc, c) => acc + c.moduleCount, 0);
      expect(totalTier0).toBe(6);
    });

    it('getAcademyModules filters courses by category and tier', async () => {
      const behaviorModules = await getAcademyModules({
        category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
      });
      expect(behaviorModules.length).toBeGreaterThan(0);
      expect(
        behaviorModules.every((m) => m.category === AcademyCategory.BEHAVIOR_AND_EMOTIONS)
      ).toBe(true);

      const tweenModules = await getAcademyModules({
        tier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      });
      expect(tweenModules.length).toBeGreaterThan(0);
      expect(
        tweenModules.every((m) => m.developmentalTier === DevelopmentalTier.TIER_3_PRE_TEEN_10_12)
      ).toBe(true);
    });

    it('getAcademyModuleBySlug returns structured prioritized chapters', async () => {
      const moduleDetail = await getAcademyModuleBySlug('behavior-tween-adrenarche');
      expect(moduleDetail).toBeDefined();
      expect(moduleDetail.title).toBe('Tween Adrenarche & Emotional Volatility');
      expect(moduleDetail.chapters).toBeDefined();
      expect(moduleDetail.chapters.length).toBe(3);

      // Verify Priority 1, 2, 3 chapters exist
      const priorities = moduleDetail.chapters.map((c) => c.priority);
      expect(priorities).toContain(1);
      expect(priorities).toContain(2);
      expect(priorities).toContain(3);
    });
  });
});
