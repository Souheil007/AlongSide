import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DevelopmentalTier,
  RoadType,
  type ChildDTO,
} from '@alongside/shared';
import { ChildHeroCard } from '../src/components/dashboard/ChildHeroCard';
import { ActiveChapterContinueCard } from '../src/components/dashboard/ActiveChapterContinueCard';
import { DailyAdvisoryScriptCard } from '../src/components/dashboard/DailyAdvisoryScriptCard';
import { BilateralPactStatusCard } from '../src/components/dashboard/BilateralPactStatusCard';
import { SundayCultureDigestCard } from '../src/components/dashboard/SundayCultureDigestCard';
import { AskAdvisorPromptBar } from '../src/components/dashboard/AskAdvisorPromptBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function wrapWithQueryClient(ui: React.ReactElement) {
  return renderToStaticMarkup(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('Paperclip SOU-79: Direction B.1 The Learning Sanctuary Dashboard Specification', () => {
  const mockTweenMaya: ChildDTO = {
    id: 'child-maya',
    userId: 'parent-sarah',
    name: 'Maya',
    birthYear: 2015,
    birthMonth: 5,
    birthDate: new Date(Date.now() - 11.2 * 365.25 * 24 * 60 * 60 * 1000).toISOString(),
    age: 11,
    schoolGrade: '6th Grade',
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
    roadType: RoadType.PRE_DEVICE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockToddlerLeo: ChildDTO = {
    id: 'child-leo',
    userId: 'parent-sarah',
    name: 'Leo',
    birthYear: 2023,
    birthMonth: 2,
    birthDate: new Date(Date.now() - 3.1 * 365.25 * 24 * 60 * 60 * 1000).toISOString(),
    age: 3,
    schoolGrade: null,
    developmentalTier: DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
    roadType: RoadType.PRE_DEVICE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe('1. Welcoming Value Banner & Family Headquarters (ChildHeroCard)', () => {
    it('renders welcoming greeting making user feel at home and clear on purpose', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={mockTweenMaya} parentName="Sarah" />
      );

      expect(html).toContain("Your Family&#x27;s Calm Daily Headquarters");
      expect(html).toContain('Welcome home, Sarah. Here is today&#x27;s guidance for Maya.');
      expect(html).toContain('building healthy habits and emotional trust');
      expect(html).toContain('4-Day Streak');
      expect(html).toContain('18 mins learned this week');
    });

    it('renders dynamic greeting for connected user Souheil and child Lina (SOU-89)', () => {
      const mockChildLina: ChildDTO = {
        ...mockTweenMaya,
        id: 'child-lina',
        name: 'Lina',
      };
      const html = renderToStaticMarkup(
        <ChildHeroCard
          child={mockChildLina}
          parentName="Souheil"
          streakDays={6}
          minsLearnedThisWeek={24}
        />
      );

      expect(html).toContain('Welcome home, Souheil. Here is today&#x27;s guidance for Lina.');
      expect(html).toContain('6-Day Streak');
      expect(html).toContain('24 mins learned this week');
    });

    it('defaults to Parent when parentName is omitted (never static Sarah)', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={mockTweenMaya} />
      );

      expect(html).toContain('Welcome home, Parent. Here is today&#x27;s guidance for Maya.');
      expect(html).not.toContain('Welcome home, Sarah.');
    });

    it('renders toddler-calibrated encouragement for toddler Leo', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={mockToddlerLeo} parentName="Sarah" />
      );

      expect(html).toContain('Welcome home, Sarah. Here is today&#x27;s guidance for Leo.');
      expect(html).toContain('Toddlerhood is about emotional co-regulation');
      expect(html).toContain('Leo&#x27;s Advisory Horizon');
      expect(html).toContain('Co-Regulation Routines');
    });

    it('renders empty welcoming state when no child profile exists', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={null} onOpenOnboarding={() => {}} />
      );

      expect(html).toContain('Welcome to Your Family Learning Sanctuary');
      expect(html).toContain('Add First Child Profile');
    });
  });

  describe('2. #1 Hero Centerpiece: Course Journey Roadmap (ActiveChapterContinueCard)', () => {
    it('renders visual curriculum roadmap with 5 connected chapter nodes for tween Maya', () => {
      const html = wrapWithQueryClient(
        <ActiveChapterContinueCard child={mockTweenMaya} />
      );

      expect(html).toContain('Parent Intelligence Academy • Active Course');
      expect(html).toContain('Curriculum Roadmap');
      expect(html).toContain('Ch 1: The Shift');
      expect(html).toContain('Ch 2: Peer Validation');
      expect(html).toContain('Ch 3: Exclusion (Today)');
      expect(html).toContain('Ch 4: Screen Pacts');
      expect(html).toContain('Ch 5: Bedtime Trust');
      expect(html).toContain('Listen to Audio (3:45)');
      expect(html).toContain('Read Lesson');
    });

    it('renders toddler-tailored course journey for toddler Leo', () => {
      const html = wrapWithQueryClient(
        <ActiveChapterContinueCard child={mockToddlerLeo} />
      );

      expect(html).toContain('Parent Intelligence Academy • Active Course');
      expect(html).toContain('Ch 1: Amygdala Basics');
      expect(html).toContain('Ch 2: Tantrum Reset');
      expect(html).toContain('Listen to Audio (3:15)');
    });
  });

  describe('3. Word-for-Word Empathy Script & Practice Sparring (DailyAdvisoryScriptCard)', () => {
    it('renders word-for-word empathy dialogue and tonight connection challenge for tween', () => {
      const html = renderToStaticMarkup(
        <DailyAdvisoryScriptCard child={mockTweenMaya} />
      );

      expect(html).toContain("Today&#x27;s Word-for-Word Empathy Script");
      expect(html).toContain('Calibrated to Maya (11 yrs)');
      expect(html).toContain('When This Happens Today:');
      expect(html).toContain('Say This (Calm &amp; Connected):');
      expect(html).toContain("Tonight&#x27;s 5-Minute Practice:");
      expect(html).toContain('Practice with AI Child Simulator');
      expect(html).toContain('Start Practice Sparring');
    });

    it('renders toddler-calibrated script and floor calming steps for toddler', () => {
      const html = renderToStaticMarkup(
        <DailyAdvisoryScriptCard child={mockToddlerLeo} />
      );

      expect(html).toContain('Calibrated to Leo (3 yrs)');
      expect(html).toContain('I won’t let you hit. Hitting hurts');
      expect(html).toContain('sit down on the floor so your eyes are below their level');
    });
  });

  describe('4. Stage-Adaptive Telemetry Widget (BilateralPactStatusCard)', () => {
    it('renders First-Phone Readiness Radar and 4 quadrants for tween Maya', () => {
      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={mockTweenMaya} />
      );

      expect(html).toContain('First-Phone Readiness Radar');
      expect(html).toContain('78%');
      expect(html).toContain('Sleep Independence');
      expect(html).toContain('Task Responsibility');
      expect(html).toContain('Peer Impulse Control');
      expect(html).toContain('Emotional Reset');
      expect(html).toContain('Next Goal: 2 weeks alarm waking');
      expect(html).toContain('14 Days Independent Morning Alarm Waking');
      expect(html).toContain('Day 9 of 14 Completed');
      expect(html).toContain('Parent Compass Reminder');
      expect(html).toContain('You don&#x27;t have to get every moment right');
    });

    it('STRICTLY EXCLUDES First-Phone Readiness for toddler Leo and renders Early Screen Boundaries', () => {
      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={mockToddlerLeo} />
      );

      // Verify Phone Readiness is NOT shown for toddler
      expect(html).not.toContain('First-Phone Readiness');
      expect(html).not.toContain('Readiness Radar');
      expect(html).not.toContain('Sleep Independence');

      // Verify Early Screen Boundaries & Meltdown Reset are shown
      expect(html).toContain('Early Screen Boundaries');
      expect(html).toContain('Leo&#x27;s Daily Media Boundary');
      expect(html).toContain('Max 30 min/day');
      expect(html).toContain('20 / 30m (10 min remaining)');
      expect(html).toContain('Toddler Meltdown Reset Steps:');
      expect(html).toContain('Get low to eye level (sit on floor)');
      expect(html).toContain('Offer physical bridge');
      expect(html).toContain('Today&#x27;s Sensory Activity');
      expect(html).toContain('15 min outdoor water &amp; leaf play');
      expect(html).toContain('Parent Compass Reminder');
    });
  });

  describe('5. Sunday Youth Culture Digest (SundayCultureDigestCard)', () => {
    it('renders 3-column living feed with Cringe Meter, App Spotlight, and Dinner Starter', () => {
      const html = wrapWithQueryClient(
        <SundayCultureDigestCard child={mockTweenMaya} />
      );

      expect(html).toContain('Living Schoolyard Feed');
      expect(html).toContain('Sunday Youth Culture Digest');
      expect(html).toContain('Slang of the Week');
      expect(html).toContain('Parent Cringe Meter:');
      expect(html).toContain('App Spotlight');
      expect(html).toContain('Sunday Dinner Table Starter');
      expect(html).toContain('Shuffle 🎲');
      expect(html).toContain('Trending Radar:');
    });
  });

  describe('6. 24/7 AI Child Advisor — Empathetic Co-Pilot (AskAdvisorPromptBar)', () => {
    it('renders Empathetic Co-Pilot format matching user approval with Frequent Situations and Voice Sparring', () => {
      const html = renderToStaticMarkup(
        <AskAdvisorPromptBar child={mockTweenMaya} />
      );

      expect(html).toContain('Empathetic Co-Pilot');
      expect(html).toContain('24/7 AI Child Advisor');
      expect(html).toContain('Trained on Developmental Neurobiology • Non-Judgmental');
      expect(html).toContain('Ask Dr. Alongside');
      expect(html).toContain('Frequent Situations:');
      expect(html).toContain('Console Meltdown');
      expect(html).toContain('Peer Phone Pressure');
      expect(html).toContain('Slammed Bedroom Door');
      expect(html).toContain('De-escalating Screen Shutdown Meltdowns');
      expect(html).toContain('Actionable Guide');
      expect(html).toContain('Practice Voice Sparring (2 Min)');
    });
  });
});
