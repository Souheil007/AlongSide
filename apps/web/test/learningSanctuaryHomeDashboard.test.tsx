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
    gender: 'FEMALE',
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
    gender: 'MALE',
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
        <ChildHeroCard
          child={mockTweenMaya}
          parentName="Sarah"
          streakDays={4}
          minsLearnedThisWeek={18}
        />
      );

      expect(html).toContain('Welcome home, Sarah.');
      expect(html).toContain('4-Day Streak');
      expect(html).toContain('18 mins learned this week');
      expect(html).not.toContain("Your Family&#x27;s Calm Daily Headquarters");
      expect(html).not.toContain('Here is today&#x27;s guidance for');
      expect(html).not.toContain('Daily Compass:');
    });

    it('renders 0-Day Streak and Start Today when parent has not completed lessons yet', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={mockTweenMaya} parentName="Sarah" />
      );

      expect(html).toContain('0-Day Streak');
      expect(html).toContain('Start Today');
      expect(html).toContain('0 mins learned this week');
    });

    it('omits redundant child context anchor bar, artificial active goal, and Why this leap matters link from homepage', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={mockTweenMaya} parentName="Sarah" />
      );

      expect(html).not.toContain('Child Context Anchor');
      expect(html).not.toContain('Active Goal:');
      expect(html).not.toContain('Road 1: Pre-Device');
      expect(html).not.toContain('14-Day Independent Morning Alarm');
      expect(html).not.toContain('Why this leap matters');
      expect(html).not.toContain('Advisory Horizon:');
      expect(html).not.toContain('Active Leap:');
      expect(html).not.toContain("Your Family&#x27;s Calm Daily Headquarters");
      expect(html).not.toContain('Here is today&#x27;s guidance for');
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

      expect(html).toContain('Welcome home, Souheil.');
      expect(html).toContain('6-Day Streak');
      expect(html).toContain('24 mins learned this week');
    });

    it('defaults to Parent when parentName is omitted (never static Sarah)', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={mockTweenMaya} />
      );

      expect(html).toContain('Welcome home, Parent.');
      expect(html).not.toContain('Welcome home, Sarah.');
    });

    it('renders toddler-calibrated encouragement for toddler Leo', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={mockToddlerLeo} parentName="Sarah" />
      );

      expect(html).toContain('Welcome home, Sarah.');
      expect(html).not.toContain('Leo&#x27;s Advisory Horizon');
      expect(html).not.toContain('Active Leap:');
      expect(html).not.toContain('Here is today&#x27;s guidance for');
    });

    it('renders empty welcoming state when no child profile exists', () => {
      const html = renderToStaticMarkup(
        <ChildHeroCard child={null} onOpenOnboarding={() => {}} />
      );

      expect(html).toContain('Welcome to Your Family Learning Sanctuary');
      expect(html).toContain('Add First Child Profile');
    });
  });

  describe('2. #1 Hero Centerpiece: Dynamic Course Journey Roadmap (ActiveChapterContinueCard)', () => {
    it('renders dynamic curriculum roadmap with real chapter nodes for tween Maya', () => {
      const html = wrapWithQueryClient(
        <ActiveChapterContinueCard child={mockTweenMaya} />
      );

      expect(html).toContain('Parent Intelligence Academy • Active Course');
      expect(html).toContain('Curriculum Roadmap');
      expect(html).toContain('Tween Adrenarche &amp; Neurobiology Shift');
      expect(html).toContain('The Shift');
      expect(html).toContain('Active Now');
      expect(html).toContain('Read Lesson');
      expect(html).not.toContain('Tonight&#x27;s Script');
      expect(html).not.toContain('Listen to Audio');
    });

    it('renders dynamic course journey roadmap tailored for toddler Leo', () => {
      const html = wrapWithQueryClient(
        <ActiveChapterContinueCard child={mockToddlerLeo} />
      );

      expect(html).toContain('Parent Intelligence Academy • Active Course');
      expect(html).toContain('Curriculum Roadmap');
      expect(html).toContain('Sensory Overload &amp; Infant Co-Regulation: Taming Big Feelings');
      expect(html).toContain('Amygdala Basics');
      expect(html).toContain('Read Lesson');
      expect(html).not.toContain('Tonight&#x27;s Script');
    });
  });

  describe('3. Word-for-Word Empathy Script & Consultation (DailyAdvisoryScriptCard)', () => {
    it('renders word-for-word empathy dialogue and tonight connection challenge for tween', () => {
      const html = renderToStaticMarkup(
        <DailyAdvisoryScriptCard child={mockTweenMaya} />
      );

      expect(html).toContain("Today&#x27;s Word-for-Word Empathy Script");
      expect(html).toContain('Calibrated to Maya (11 yrs)');
      expect(html).toContain('When This Happens Today:');
      expect(html).toContain('Say This (Calm &amp; Connected):');
      expect(html).toContain("Tonight&#x27;s 5-Minute Practice:");
      expect(html).toContain('Consult with 24/7 AI Advisor');
      expect(html).toContain('Consult AI Advisor');
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
    it('renders quiet architectural radar and low-text readiness CTA when tween Maya is unassessed', () => {
      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={mockTweenMaya} />
      );

      expect(html).toContain('Road 1 · Pre-Device');
      expect(html).toContain('Maya&#x27;s First-Phone Readiness');
      expect(html).toContain('Start 3-min check');
      expect(html).toContain('/children/child-maya/readiness');
      expect(html).toContain('Zero surveillance');
      expect(html).toContain('Bedtime');
      expect(html).toContain('Transitions');
      expect(html).toContain('Safety');
      expect(html).toContain('Peer Pressure');
      expect(html).toContain('Reset');
      expect(html).toContain('Trust');

      // Purged cluttered duplicate copy, emojis, spinning sonar, and fake telemetry
      expect(html).not.toContain('Radar Ready');
      expect(html).not.toContain('Awaiting Baseline');
      expect(html).not.toContain('Not Yet Assessed');
      expect(html).not.toContain('animate-pulse');
      expect(html).not.toContain('🌙');
      expect(html).not.toContain('14 Days Independent Morning Alarm Waking');
      expect(html).not.toContain('clinical');
    });

    it('renders filled architectural radar polygon and concise pact CTA when tween Maya is assessed', () => {
      const assessedMaya: ChildDTO = {
        ...mockTweenMaya,
        latestAssessmentScore: 78,
      };

      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={assessedMaya} />
      );

      expect(html).toContain('First-Phone Readiness · Bridge Pact');
      expect(html).toContain('>78<');
      expect(html).toContain('/ 100 · Ready with calm guardrails');
      expect(html).toContain('Build Maya&#x27;s Pact');
      expect(html).toContain('/pacts/builder?childId=child-maya');
      expect(html).toContain('Full diagnostic');
      expect(html).toContain('/children/child-maya/readiness');

      expect(html).not.toContain('14 Days Independent Morning Alarm Waking');
      expect(html).not.toContain('clinical');
    });

    it('renders calm bedtime dock dial for Road 2 active-device children', () => {
      const activeDeviceTeen: ChildDTO = {
        ...mockTweenMaya,
        id: 'child-alex',
        name: 'Alex',
        age: 13,
        roadType: RoadType.ACTIVE_DEVICE,
      };

      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={activeDeviceTeen} />
      );

      expect(html).toContain('Road 2 · Active Device');
      expect(html).toContain('Alex&#x27;s Bedtime Dock');
      expect(html).toContain('8:30 PM');
      expect(html).toContain('Review Pact &amp; Schedule');
      expect(html).toContain('/devices?childId=child-alex');
    });

    it('STRICTLY EXCLUDES First-Phone Readiness for toddler Leo and renders clean Early Screen Boundaries', () => {
      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={mockToddlerLeo} />
      );

      // Verify Phone Readiness is NOT shown for toddler
      expect(html).not.toContain('First-Phone Readiness');
      expect(html).not.toContain('Peer Pressure');

      // Verify streamlined Early Screen Boundaries & 3-Step Meltdown Reset
      expect(html).toContain('Early Screen Boundaries');
      expect(html).toContain('Leo&#x27;s Daily Media Boundary');
      expect(html).toContain('30m');
      expect(html).toContain('Co-Viewed Media');
      expect(html).toContain('Screens off 45 min before sleep');
      expect(html).not.toContain('20 / 30m');
      expect(html).not.toContain('short-wavelength blue light');
      expect(html).toContain('Toddler Meltdown Reset');
      expect(html).toContain('Sit on the floor below eye level');
      expect(html).toContain('Offer a physical bridge');
      expect(html).toContain('Explore screen-free play');
      expect(html).toContain('/digest#play-this-week');
    });

    it('capitalizes lowercase child names cleanly (e.g., oliver -> Oliver)', () => {
      const mockOliver: ChildDTO = {
        ...mockToddlerLeo,
        id: 'child-oliver',
        name: 'oliver',
      };

      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={mockOliver} />
      );

      expect(html).toContain('Oliver&#x27;s Daily Media Boundary');
    });

    it('calibrates calming steps and screen-free standard for an infant (age 0-1)', () => {
      const mockInfant: ChildDTO = {
        ...mockToddlerLeo,
        id: 'child-infant',
        name: 'Noah',
        age: 1,
        developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
      };

      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={mockInfant} />
      );

      expect(html).toContain('Early Screen Boundaries');
      expect(html).toContain('Noah&#x27;s Daily Media Boundary');
      expect(html).toContain('0m');
      expect(html).toContain('Screen-Free Zone');
      expect(html).toContain('Infant Calming Reset');
      expect(html).toContain('Lower ambient input');
      expect(html).toContain('Hold chest-to-chest');
      expect(html).toContain('/digest#play-this-week');
    });

    it('calibrates regulation steps and 60-min cap for early childhood (age 4-6)', () => {
      const mockPreschooler: ChildDTO = {
        ...mockToddlerLeo,
        id: 'child-preschool',
        name: 'Emma',
        age: 5,
        developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      };

      const html = renderToStaticMarkup(
        <BilateralPactStatusCard child={mockPreschooler} />
      );

      expect(html).toContain('Early Screen Boundaries');
      expect(html).toContain('Emma&#x27;s Daily Media Boundary');
      expect(html).toContain('60m');
      expect(html).toContain('Co-Viewed Media');
      expect(html).toContain('Preschool Transition Reset');
      expect(html).toContain('Validate without negotiating');
      expect(html).toContain('Offer two real choices');
      expect(html).toContain('/digest#play-this-week');
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

  describe('6. 24/7 AI Child Advisor - Ultra-Compact Launcher (AskAdvisorPromptBar)', () => {
    it('renders ultra-compact AI Advisor omnibar with 1-tap frequent situations (Direction 3)', () => {
      const html = renderToStaticMarkup(
        <AskAdvisorPromptBar child={mockTweenMaya} />
      );

      expect(html).toContain('24/7 AI Child Advisor');
      expect(html).toContain('Dr. Alongside');
      expect(html).toContain('Ask anything about Maya');
      expect(html).toContain('Frequent Situations:');
      expect(html).toContain('Console Meltdown');
      expect(html).toContain('Peer Phone Pressure');
      expect(html).toContain('Slammed Bedroom Door');

      // Purged clutter: static reading guides and redundant sub-headers
      expect(html).not.toContain('Empathetic Co-Pilot');
      expect(html).not.toContain('Trained on Developmental Neurobiology • Non-Judgmental');
      expect(html).not.toContain('Actionable Guide');
      expect(html).not.toContain('De-escalating Screen Shutdown Meltdowns');
      expect(html).not.toContain('Ask Advisor About This');
    });
  });
});
