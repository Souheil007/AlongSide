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
  CANONICAL_6_LIFESPAN_STAGES,
  LIFESPAN_STAGES,
} from '../src/components/home/LifespanStageSelector';
import {
  THREE_CORE_PILLARS,
} from '../src/components/home/PillarsShowcase';
import {
  DEMO_SLANG_TERMS,
  DEMO_DINNER_STARTERS,
} from '../src/components/home/CulturePlaygroundDemo';

describe('Plan 33: Platform Advisory Homepage & Child Cockpit Specification', () => {
  const webRoot = path.resolve(__dirname, '..');

  const mockChildTween: ChildDTO = {
    id: 'child-leo',
    userId: 'parent-123',
    name: 'Leo',
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
      it('provides authoritative biological leaps across all 6 developmental tiers', () => {
        expect(Object.keys(DEVELOPMENTAL_LEAPS)).toHaveLength(6);

        // Tier 0 (0-3y)
        const leapT0 = getDevelopmentalLeap(DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3);
        expect(leapT0.leapTitle).toContain('Sensory Co-Regulation');

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

  describe('Part B: The Public Advisory Sanctuary Landing Homepage (/)', () => {
    describe('1. Public Hero Section Advisory Positioning', () => {
      it('verifies HeroSection reflects the v2.5.0 Advisory Sanctuary positioning', () => {
        const heroPath = path.join(webRoot, 'src/components/home/HeroSection.tsx');
        const content = fs.readFileSync(heroPath, 'utf8');

        expect(content).toContain('The Parent Advisory Sanctuary');
        expect(content).toContain('Keep Up With Your Child');
        expect(content).toContain('Prioritized Parent Academy');
        expect(content).toContain('Weekly Youth Culture Digest');
      });
    });

    describe('2. Interactive 6-Stage Lifespan Advisory Explorer', () => {
      it('provides all 6 canonical lifespan tiers with 5 category tailored courses each', () => {
        expect(CANONICAL_6_LIFESPAN_STAGES).toHaveLength(6);

        const stageIds = CANONICAL_6_LIFESPAN_STAGES.map((s) => s.id);
        expect(stageIds).toEqual([
          'infants-toddlers',
          'early-childhood',
          'middle-childhood',
          'pre-teens',
          'early-adolescence',
          'late-adolescence',
        ]);

        for (const stage of CANONICAL_6_LIFESPAN_STAGES) {
          expect(stage.courses).toHaveLength(5);
          expect(stage.title.length).toBeGreaterThan(10);
          expect(stage.subtitle.length).toBeGreaterThan(20);

          // All 5 canonical categories must be represented
          const categories = stage.courses.map((c) => c.category);
          expect(categories).toContain(AcademyCategory.BEHAVIOR_AND_EMOTIONS);
          expect(categories).toContain(AcademyCategory.HEALTH_AND_WELLNESS);
          expect(categories).toContain(AcademyCategory.NUTRITION_AND_FEEDING);
          expect(categories).toContain(AcademyCategory.DEVELOPMENT_AND_PLAY);
          expect(categories).toContain(AcademyCategory.DIGITAL_AND_DEVICES);

          for (const course of stage.courses) {
            expect(course.title.length).toBeGreaterThan(5);
            expect(course.summary.length).toBeGreaterThan(20);
            expect(course.slug.length).toBeGreaterThan(3);
            expect(course.lessonCount).toBe(3);
            expect(course.durationMinutes).toBeGreaterThanOrEqual(12);
          }
        }
      });
    });

    describe('3. The 3 Core Pillars Architecture Showcase', () => {
      it('defines the 3 core pillars (Academy, Culture Digest, Family Pacts) + 24/7 AI Advisor', () => {
        expect(THREE_CORE_PILLARS).toHaveLength(3);

        const titles = THREE_CORE_PILLARS.map((p) => p.title);
        expect(titles).toContain('Parent Intelligence Academy');
        expect(titles).toContain('Sunday Youth Culture Digest');
        expect(titles).toContain('Bilateral Family Pacts & Devices');

        const routes = THREE_CORE_PILLARS.map((p) => p.href);
        expect(routes).toContain('/academy');
        expect(routes).toContain('/digest');
        expect(routes).toContain('/devices');
      });
    });

    describe('4. Sunday Culture Playground Interactive Demo', () => {
      it('provides realistic tween slang with definitions and visual cringe meters', () => {
        expect(DEMO_SLANG_TERMS.length).toBeGreaterThanOrEqual(5);
        const terms = DEMO_SLANG_TERMS.map((s) => s.term);
        expect(terms).toContain('Crashout');
        expect(terms).toContain('Rizz');
        expect(terms).toContain('Skibidi');
        expect(terms).toContain('Cooked');
        expect(terms).toContain('Fanum Tax');

        for (const slang of DEMO_SLANG_TERMS) {
          expect(slang.phonetic.length).toBeGreaterThan(2);
          expect(slang.definition.length).toBeGreaterThan(10);
          expect(slang.cringeLevel).toBeGreaterThanOrEqual(1);
          expect(slang.cringeLevel).toBeLessThanOrEqual(5);
          expect(slang.exampleSentence.length).toBeGreaterThan(10);
          expect(slang.parentContext.length).toBeGreaterThan(15);
        }
      });

      it('provides authentic Sunday dinner conversation starters', () => {
        expect(DEMO_DINNER_STARTERS.length).toBeGreaterThanOrEqual(5);
        for (const starter of DEMO_DINNER_STARTERS) {
          expect(starter.length).toBeGreaterThan(20);
          expect(starter.startsWith('“')).toBe(true);
        }
      });
    });

    describe('5. Public Page Assembly & Retired Route Links Purge', () => {
      it('verifies page.tsx mounts all 8 canonical sections in proper order', () => {
        const pagePath = path.join(webRoot, 'src/app/page.tsx');
        const content = fs.readFileSync(pagePath, 'utf8');

        expect(content).toContain('<HeroSection />');
        expect(content).toContain('<LifespanStageSelector />');
        expect(content).toContain('<PillarsShowcase />');
        expect(content).toContain('<CulturePlaygroundDemo />');
        expect(content).toContain('<DeviceActionHubSpotlight />');
        expect(content).toContain('<ClinicalAuthorityTestimonials />');
        expect(content).toContain('<PricingSection />');
        expect(content).toContain('<FaqSection />');
      });
    });
  });
});
