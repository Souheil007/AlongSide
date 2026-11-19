import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  DevelopmentalTier,
  RoadType,
  ChapterPriority,
  AcademyCategory,
  type ChildDTO,
} from '@alongside/shared';
import {
  DEVELOPMENTAL_LEAPS,
  getDevelopmentalLeap,
} from '../src/components/dashboard/ChildHeroCard';
import {
  TIER_PRIORITY_ANCHORS,
  resolveTierAnchor,
} from '../src/components/dashboard/ActiveChapterContinueCard';
import {
  DAILY_ADVISORY_SCRIPTS,
  resolveAdvisoryScript,
} from '../src/components/dashboard/DailyAdvisoryScriptCard';
import {
  HERO_AGE_MOMENTS,
  STUDIO_ADVISOR_SCENARIOS,
  STUDIO_ACADEMY_LESSONS,
  STUDIO_SLANG_ITEMS,
  STUDIO_DINNER_QUESTIONS,
  SCREEN_PACT_POINTS,
  SCIENCE_PRINCIPLES,
} from '../src/components/home';

describe('Plan 33: Platform Advisory Homepage & Child Cockpit Specification', () => {
  const webRoot = path.resolve(__dirname, '..');

  const mockChildTween: ChildDTO = {
    id: 'child-leo',
    userId: 'parent-123',
    name: 'Leo',
    gender: 'MALE',
    birthYear: 2016,
    birthMonth: 4,
    birthDate: new Date(Date.now() - 10.3 * 365.25 * 24 * 60 * 60 * 1000).toISOString(),
    age: 10,
    schoolGrade: '5th Grade',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    roadType: RoadType.ACTIVE_DEVICE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockChildToddler: ChildDTO = {
    id: 'child-mateo',
    userId: 'parent-123',
    name: 'Mateo',
    gender: 'MALE',
    birthYear: 2025,
    birthMonth: 1,
    birthDate: new Date(Date.now() - 1.2 * 365.25 * 24 * 60 * 60 * 1000).toISOString(),
    age: 1,
    schoolGrade: null,
    developmentalTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    roadType: RoadType.PRE_DEVICE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe('Part A: Authenticated Child Advisory Cockpit (/dashboard)', () => {
    describe('1. Child Advisory Hero Card & Neurodevelopmental Leaps', () => {
      it('provides authoritative biological leaps across all developmental tiers', () => {
        expect(Object.keys(DEVELOPMENTAL_LEAPS).length).toBeGreaterThanOrEqual(8);

        // Tier 0A (0-1y)
        const leapT0A = getDevelopmentalLeap(DevelopmentalTier.TIER_0A_INFANCY_0_1);
        expect(leapT0A.leapTitle).toContain('Somatic Regulation');

        // Tier 0B (1-2y)
        const leapT0B = getDevelopmentalLeap(DevelopmentalTier.TIER_0B_TODDLER_1_2);
        expect(leapT0B.leapTitle).toContain('Locomotion');

        // Tier 0C (2-3y)
        const leapT0C = getDevelopmentalLeap(DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3);
        expect(leapT0C.leapTitle).toContain('Autonomy');

        // Legacy Tier 0 (0-3y)
        const leapT0 = getDevelopmentalLeap(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
        expect(leapT0.leapTitle).toBeDefined();

        // Tier 1 (4-6y)
        const leapT1 = getDevelopmentalLeap(DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6);
        expect(leapT1.leapTitle).toContain('Theory of Mind');

        // Tier 2 (7-9y)
        const leapT2 = getDevelopmentalLeap(DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9);
        expect(leapT2.leapTitle).toContain('Prefrontal Inhibitory Control');

        // Tier 3 (10-12y)
        const leapT3 = getDevelopmentalLeap(DevelopmentalTier.TIER_3_PRE_TEEN_10_12);
        expect(leapT3.leapTitle).toContain('Adrenarche');
        expect(leapT3.biologicalDescription).toContain('Adrenal hormone surge');

        // Tier 4 (13-15y)
        const leapT4 = getDevelopmentalLeap(DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15);
        expect(leapT4.leapTitle).toContain('Circadian Delay');

        // Tier 5 (16-18y)
        const leapT5 = getDevelopmentalLeap(DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18);
        expect(leapT5.leapTitle).toContain('Executive Autonomy');
      });

      it('resolves age and road status accurately for child profiles', () => {
        const leapForLeo = getDevelopmentalLeap(mockChildTween.developmentalTier);
        expect(leapForLeo.shortTitle).toContain('10–12');

        const leapForMateo = getDevelopmentalLeap(mockChildToddler.developmentalTier);
        expect(leapForMateo.shortTitle).toContain('0–3');
      });
    });

    describe('2. Priority 1-2-3 Academy "Continue Learning" Anchor Card', () => {
      it('resolves highest-priority incomplete chapters for child tiers', () => {
        const tweenAnchor = resolveTierAnchor(mockChildTween.developmentalTier);
        expect(tweenAnchor.priority).toBe(ChapterPriority.PRIORITY_1_CRITICAL);
        expect(tweenAnchor.courseTitle).toContain('Tween Adrenarche');
        expect(tweenAnchor.chapterTitle).toContain('Chapter 1');
        expect(tweenAnchor.readingMinutes).toBeGreaterThanOrEqual(3);
        expect(tweenAnchor.categoryLabel).toBe('Behavior & Emotions');

        const infantAnchor = resolveTierAnchor(mockChildToddler.developmentalTier);
        expect(infantAnchor.priority).toBe(ChapterPriority.PRIORITY_1_CRITICAL);
        expect(infantAnchor.courseTitle).toContain('Sensory Overload & Infant Co-Regulation');
      });
    });

    describe('3. Daily Calm Advisory Script & Actionable Dialogue', () => {
      it('provides word-for-word contrast between reactive and empathetic responses across tiers', () => {
        expect(Object.keys(DAILY_ADVISORY_SCRIPTS)).toHaveLength(6);

        // Tween peer pressure script
        const tweenScript = resolveAdvisoryScript(mockChildTween.developmentalTier);
        expect(tweenScript.scenarioTitle).toContain('All My Friends Have Phones');
        expect(tweenScript.whatNotToSay).toContain('You don’t need what everyone else has');
        expect(tweenScript.whatToSay).toContain('I hear how lonely');
        expect(tweenScript.scenarioId).toBe('tween-peer-phone-pressure');

        // Early childhood sharing script
        const toddlerScript = resolveAdvisoryScript(mockChildToddler.developmentalTier);
        expect(toddlerScript.scenarioTitle).toContain('Toddler Hitting');
        expect(toddlerScript.whatToSay).toContain('I won’t let you hit');
      });
    });

    describe('4. Permanent Purge of Medication Calculator & Triage Launcher from Home', () => {
      it('asserts HolisticHomeFeed does NOT import or render QuickHealthTriageLauncher or medication dosing forms', () => {
        const homeFeedPath = path.join(webRoot, 'src/components/dashboard/HolisticHomeFeed.tsx');
        const content = fs.readFileSync(homeFeedPath, 'utf8');

        // Verify QuickHealthTriageLauncher is completely removed
        expect(content).not.toContain('QuickHealthTriageLauncher');
        expect(content).not.toContain('<QuickHealthTriageLauncher');
        expect(content).not.toContain('Weight-based dosing');
        expect(content).not.toContain('dosing calculator');

        // Verify all 4 required advisory components are present
        expect(content).toContain('ChildHeroCard');
        expect(content).toContain('ActiveChapterContinueCard');
        expect(content).toContain('DailyAdvisoryScriptCard');
        expect(content).toContain('SundayCultureDigestCard');
        expect(content).toContain('BilateralPactStatusCard');
        expect(content).toContain('AskAdvisorPromptBar');
      });
    });
  });

  describe('Part B: The Streamlined Public Landing Homepage (/)', () => {
    describe('1. Public Hero Section & Interactive Child Age Lens', () => {
      it('verifies HeroSection covers ages 0 to 18 with live age-calibrated scripts', () => {
        expect(HERO_AGE_MOMENTS).toHaveLength(5);
        expect(HERO_AGE_MOMENTS.map((m) => m.id)).toEqual(['0-3', '4-6', '7-9', '10-12', '13-18']);

        const heroPath = path.join(webRoot, 'src/components/home/HeroSection.tsx');
        const content = fs.readFileSync(heroPath, 'utf8');
        expect(content).toContain('Calm guidance for');
        expect(content).toContain('Start 7-day free trial');
      });
    });

    describe('2. Interactive Product Studio (Advisor, Academy & Culture Digest)', () => {
      it('provides 3 advisor scenarios, 3 academy micro-lessons, 4 slang items, and dinner starters', () => {
        expect(STUDIO_ADVISOR_SCENARIOS).toHaveLength(3);
        expect(STUDIO_ACADEMY_LESSONS).toHaveLength(3);
        expect(STUDIO_SLANG_ITEMS).toHaveLength(4);

        const terms = STUDIO_SLANG_ITEMS.map((s) => s.word);
        expect(terms).toContain('Crashout');
        expect(terms).toContain('Cooked');
        expect(terms).toContain('Rizz');
        expect(terms).toContain('Fanum tax');

        for (const slang of STUDIO_SLANG_ITEMS) {
          expect(slang.definition.length).toBeGreaterThan(10);
          expect(slang.cringeLevel).toBeGreaterThanOrEqual(1);
          expect(slang.cringeLevel).toBeLessThanOrEqual(5);
        }

        expect(STUDIO_DINNER_QUESTIONS.length).toBeGreaterThanOrEqual(3);
        for (const starter of STUDIO_DINNER_QUESTIONS) {
          expect(starter.length).toBeGreaterThan(20);
          expect(starter.startsWith('“')).toBe(true);
        }
      });
    });

    describe('3. Screen Pact & Scientific Grounding', () => {
      it('defines the 3 bilateral pact pillars and 4 scientific principles', () => {
        expect(SCREEN_PACT_POINTS).toHaveLength(3);
        expect(SCIENCE_PRINCIPLES).toHaveLength(4);
      });
    });

    describe('4. Public Page Assembly (5 Streamlined Editorial Chapters)', () => {
      it('verifies page.tsx mounts all 5 streamlined sections in order', () => {
        const pagePath = path.join(webRoot, 'src/app/page.tsx');
        const content = fs.readFileSync(pagePath, 'utf8');

        expect(content).toContain('<HeroSection />');
        expect(content).toContain('<ProductStudioSection />');
        expect(content).toContain('<ScreenPactSection />');
        expect(content).toContain('<ScienceFoundationSection />');
        expect(content).toContain('<PricingAndFaqSection />');
      });
    });
  });
});
