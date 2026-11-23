import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DevicesManagementView,
  getRecommendedCurfew,
} from '@/components/devices/DevicesManagementView';
import {
  computeEveningWindDown,
  formatMinutes12Hour,
} from '@/components/devices/EarlyTierSanctuaryView';
import { RoadType, DevelopmentalTier, type ChildDTO } from '@alongside/shared';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function renderWithProviders(ui: React.ReactElement) {
  return renderToStaticMarkup(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('DevicesManagementView - Sequential Journey Ladder & Phone Canvas (SOU-83)', () => {
  const preteenLeo: ChildDTO = {
    id: 'test-leo-10',
    userId: 'parent-1',
    name: 'Leo',
    gender: 'MALE',
    birthYear: new Date().getFullYear() - 10,
    birthMonth: 5,
    age: 10,
    roadType: RoadType.PRE_DEVICE,
    developmentalTier: DevelopmentalTier.TIER_2_AGES_10_11,
    schoolGrade: '5th Grade',
    latestAssessmentScore: 84,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const toddlerToby: ChildDTO = {
    id: 'test-toby-2',
    userId: 'parent-1',
    name: 'Toby',
    gender: 'MALE',
    birthYear: new Date().getFullYear() - 2,
    birthMonth: 4,
    age: 2,
    roadType: RoadType.PRE_DEVICE,
    developmentalTier: 'TIER_0_INFANCY_TODDLER_0_3' as unknown as DevelopmentalTier,
    schoolGrade: 'Toddler Daycare',
    latestAssessmentScore: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const defaultProps = {
    child: preteenLeo,
    children: [preteenLeo, toddlerToby],
  };

  describe('Pre-Teen Sequential Stepper & Phone Canvas View', () => {
    it('renders the Roadmap header with developmental milestone progression badge', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain("Leo&#x27;s Digital Independence Roadmap");
      expect(html).toContain('Tier 3 Milestone Progression');
      expect(html).toContain('Pact-as-Code Guided Journey');
    });

    it('renders Step 1: First-Phone Neuro-Readiness Diagnostic with completed score', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain('First-Phone Neuro-Readiness Diagnostic');
      expect(html).toContain('Step 1 of 3');
      expect(html).toContain('Score: 84/100');
      expect(html).toContain('Passed for Bridge Device');
      expect(html).toContain('View Audit');
      expect(html).toContain('/children/test-leo-10/readiness');
    });

    it('renders "Not Yet Assessed" and "Start Diagnostic" when child has no assessment score', () => {
      const unassessedChild: ChildDTO = {
        ...preteenLeo,
        id: 'test-unassessed',
        latestAssessmentScore: null,
      };

      const html = renderWithProviders(
        React.createElement(DevicesManagementView, {
          child: unassessedChild,
          children: [unassessedChild],
        })
      );

      expect(html).toContain('Not Yet Assessed');
      expect(html).toContain('Pending Diagnostic');
      expect(html).toContain('Start Diagnostic');
      expect(html).not.toContain('Score: 84/100');
    });

    it('renders Step 2 & 3: Bilateral Family Treaty with verified seal and mutual pledges', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain('Bilateral Treaty &amp; Nightly Phone Enforcement');
      expect(html).toContain('The Bilateral Family Treaty');
      expect(html).toContain('Certified Bilateral Agreement');
      expect(html).toContain('Co-authored by Leo and Parents');

      // Child's Mutual Pledges
      expect(html).toContain("Leo&#x27;s Mutual Pledges (Child)");
      expect(html).toContain('Dock phone at hallway station by 8:30 PM nightly');
      expect(html).toContain('Homework &amp; household tasks completed');
      expect(html).toContain('Zero secret disguise apps');

      // Parents' Mutual Pledges
      expect(html).toContain("Parents&#x27; Mutual Pledges (Adults)");
      expect(html).toContain('Zero stealth spyware');
      expect(html).toContain('Device-free dinner table');
      expect(html).toContain('Safe Harbor Guarantee');

      // Verified Digital Signatures
      expect(html).toContain('✍ Leo Davies');
      expect(html).toContain('✍ Sarah &amp; Michael');
      expect(html).toContain('Verified Digital Seal');
    });

    it('renders dynamic connected parent signature when user is authenticated (Souheil)', () => {
      const customClient = new QueryClient();
      customClient.setQueryData(['auth', 'me'], {
        id: 'user-souheil',
        fullName: 'Souheil Bichiou',
        email: 'souheil@example.com',
      });
      const html = renderToStaticMarkup(
        <QueryClientProvider client={customClient}>
          <DevicesManagementView {...defaultProps} />
        </QueryClientProvider>
      );
      expect(html).toContain('✍ Souheil Bichiou');
      expect(html).toContain('✍ Leo');
      expect(html).not.toContain('✍ Sarah &amp; Michael');
    });

    it('renders the Phone Simulator with Bedtime Peace Active notification and emergency dials', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain('Lock Screen Preview');
      expect(html).toContain('Live Simulation');
      expect(html).toContain('8:30 PM');
      expect(html).toContain('Bedtime Peace Active');
      expect(html).toContain(
        'Recreational apps are paused until 7:00 AM under your AlongSide Family Pact.'
      );

      // Emergency dials
      expect(html).toContain('Call Mom');
      expect(html).toContain('Call Dad');
      expect(html).toContain('Emergency 911 &amp; Contacts Always Open');

      // Device Enrollment QR Trigger
      expect(html).toContain('Scan Device Enrollment QR');
    });

    it('renders Print Treaty (PDF) and Launch Pact Wizard action buttons', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain('Print Treaty (PDF)');
      expect(html).toContain('Launch Pact Wizard');
      expect(html).toContain('/pacts/builder');
    });

    it('focuses cleanly on device enrollment and curfew without redundant ladder or cross-sell clutter', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain('Scan Device Enrollment QR');
      expect(html).toContain('Bedtime Peace Active');
      expect(html).not.toContain('The Bridge Device Autonomy Ladder (4 Stages)');
      expect(html).not.toContain('Need help deciphering youth slang or gaming exploit risks?');
      expect(html).not.toContain('Explore Sunday Youth Culture Digest');
    });
  });

  describe('Early Tier Home Screen Rhythm Views (Ages 0–6)', () => {
    const toddlerProps = {
      child: toddlerToby,
      children: [preteenLeo, toddlerToby],
    };

    it('renders the calm Home Screen Rhythm for toddler Toby (Age 2) with interactive wind-down and scripts', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, toddlerProps)
      );

      expect(html).toContain('Early Screen Rhythm · Toddlerhood (Ages 2–3)');
      expect(html).toContain("Toby&#x27;s Home Screen Rhythm");
      expect(html).toContain('30m');
      expect(html).toContain('Co-viewed, slow-paced media');
      expect(html).toContain('6:45 PM');
      expect(html).toContain('7:30 PM');

      // Interactive Adult Home Habits & Screen-Off Script Switcher
      expect(html).toContain('Zero background TV');
      expect(html).toContain('Co-view slow shows with autoplay off');
      expect(html).toContain('When Screens Turn Off');
      expect(html).toContain('2 min left');
      expect(html).toContain('Meltdown');
      expect(html).toContain('/brain-games?childId=test-toby-2');

      // Purged apologetic corporate wording & wrong-age under-2 FaceTime note
      expect(html).not.toContain('Pact-as-Code Guided Journey');
      expect(html).not.toContain('Giving a toddler a screen pact causes parental confusion');
      expect(html).not.toContain('Grandparent FaceTime is the only recommended screen interaction');
    });

    it('capitalizes lowercase toddler names cleanly (oliver Age 3 -> Oliver)', () => {
      const toddlerOliver: ChildDTO = {
        ...toddlerToby,
        id: 'test-oliver-3',
        name: 'oliver',
        age: 3,
      };

      const html = renderWithProviders(
        React.createElement(DevicesManagementView, {
          child: toddlerOliver,
          children: [toddlerOliver],
        })
      );

      expect(html).toContain("Oliver&#x27;s Home Screen Rhythm");
      expect(html).toContain('Age 3');
      expect(html).toContain('30m');
    });

    it('calibrates Screen-Free Infancy view (Age 1) with 0m cap and family video calls', () => {
      const infantNoah: ChildDTO = {
        ...toddlerToby,
        id: 'test-noah-1',
        name: 'Noah',
        age: 1,
        developmentalTier: DevelopmentalTier.TIER_0A_INFANCY_0_1,
      };

      const html = renderWithProviders(
        React.createElement(DevicesManagementView, {
          child: infantNoah,
          children: [infantNoah],
        })
      );

      expect(html).toContain('Early Screen Rhythm · Infancy (Ages 0–1)');
      expect(html).toContain("Noah&#x27;s Home Screen Rhythm");
      expect(html).toContain('0m');
      expect(html).toContain('Family video calls only');
      expect(html).toContain('Live family video calls only');
      expect(html).toContain('7:00 PM');
    });

    it('routes Early Childhood (Age 5) to the calm Early Screen Rhythm instead of smartphone enrollment', () => {
      const preschoolerEmma: ChildDTO = {
        ...toddlerToby,
        id: 'test-emma-5',
        name: 'Emma',
        age: 5,
        developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
      };

      const html = renderWithProviders(
        React.createElement(DevicesManagementView, {
          child: preschoolerEmma,
          children: [preschoolerEmma],
        })
      );

      expect(html).toContain('Early Screen Rhythm · Early Childhood (Ages 4–6)');
      expect(html).toContain("Emma&#x27;s Home Screen Rhythm");
      expect(html).toContain('60m');
      expect(html).toContain('Shared living-room screens only');
      expect(html).toContain('8:00 PM');
      expect(html).not.toContain('Scan Device Enrollment QR');
      expect(html).not.toContain('Zero secret disguise apps');
    });

    it('computes evening wind-down schedule accurately from target bedtime', () => {
      expect(formatMinutes12Hour(19 * 60 + 30)).toBe('7:30 PM');
      expect(computeEveningWindDown(19 * 60 + 30)).toEqual({
        cutoffTime: '6:45 PM',
        bridgeTime: '7:05 PM',
        bedtime: '7:30 PM',
      });
    });
  });

  describe('getRecommendedCurfew pure helper', () => {
    it('recommends 8:00 PM for kids under 9', () => {
      const res = getRecommendedCurfew(7);
      expect(res.time24).toBe('20:00');
      expect(res.time12).toBe('8:00 PM');
      expect(res.rationale).toContain('Elementary sleep protection');
    });

    it('recommends 8:30 PM for kids 9–12', () => {
      const res = getRecommendedCurfew(10);
      expect(res.time24).toBe('20:30');
      expect(res.time12).toBe('8:30 PM');
      expect(res.rationale).toContain('Pre-teen melatonin release');
    });

    it('recommends 9:30 PM for teens 13+', () => {
      const res = getRecommendedCurfew(14);
      expect(res.time24).toBe('21:30');
      expect(res.time12).toBe('9:30 PM');
      expect(res.rationale).toContain('Adolescent circadian rhythm');
    });
  });
});
