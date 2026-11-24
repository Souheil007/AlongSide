import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevelopmentalTier, RoadType, type ChildDTO } from '@alongside/shared';
import {
  DevicesManagementView,
  getRecommendedCurfew,
} from '@/components/devices/DevicesManagementView';
import {
  getCalibratedControlSteps,
  getExtraAddonPacks,
} from '@/lib/parentalControlsCatalog';

function renderWithProviders(element: React.ReactElement): string {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return renderToStaticMarkup(
    React.createElement(QueryClientProvider, { client: queryClient }, element)
  );
}

describe('DevicesManagementView (Direction G: 3-Step Vertical Journey Timeline)', () => {
  const preteenLeo: ChildDTO = {
    id: 'test-leo-10',
    userId: 'parent-1',
    name: 'Leo',
    gender: 'MALE',
    birthYear: new Date().getFullYear() - 10,
    birthMonth: 6,
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

  describe('Step 1: Phone Readiness Check', () => {
    it('renders score, verdict, and Retake assessment button when child is assessed', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain("Leo&#x27;s Device Roadmap");
      expect(html).toContain('Step 1 · Phone Readiness Check');
      expect(html).toContain('>84<');
      expect(html).toContain('Almost ready (use strict limits)');
      expect(html).toContain('Retake assessment');
      expect(html).toContain('/children/test-leo-10/readiness');

      // Zero pact / treaty / fake QR enrollment chrome
      expect(html).not.toContain('Bilateral Family Treaty');
      expect(html).not.toContain('Launch Pact Wizard');
      expect(html).not.toContain('/pacts/builder');
      expect(html).not.toContain('Scan Device Enrollment QR');
    });

    it('renders Start readiness check prompt when child has not been assessed yet', () => {
      const unassessedLeo: ChildDTO = {
        ...preteenLeo,
        id: 'test-unassessed',
        latestAssessmentScore: null,
      };
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, {
          child: unassessedLeo,
          children: [unassessedLeo],
        })
      );

      expect(html).toContain('Is Leo ready for a phone yet?');
      expect(html).toContain('Start readiness check');
      expect(html).toContain('/children/test-unassessed/readiness');
    });
  });

  describe('Step 2 & Step 3: Live Network Shield + Built-in OS Controls & Optional Apps', () => {
    it('renders Step 2 Live Shield, Step 3 OS checklist with 2-way switcher, and 4 optional add-on chips', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      // Step 2: Live Network Shield
      expect(html).toContain('Step 2 · Live Network Shield');
      expect(html).toContain('Enforced Network Protection');
      expect(html).toContain('Adult &amp; Explicit Content Filter');
      expect(html).toContain('Strict SafeSearch &amp; YouTube Restricted Mode');
      expect(html).toContain('Bedtime Internet Pause');

      // Step 3: Built-In OS Controls & Go Further
      expect(html).toContain('Step 3 · Device Passcode &amp; Built-In Controls');
      expect(html).toContain('Apple Screen Time');
      expect(html).toContain('iPhone / iPad');
      expect(html).toContain('Android');
      expect(html).toContain('Lock Screen Time passcode');
      expect(html).toContain('8:30 PM');
      expect(html).toContain('Parent on Android?');

      // Step 3: Optional Go Further apps & Wi-Fi chips
      expect(html).toContain('Optional · Go Further');
      expect(html).toContain('Apps, games &amp; home Wi-Fi');
      expect(html).toContain('YouTube');
      expect(html).toContain('Roblox');
      expect(html).toContain('Social Apps');
      expect(html).toContain('Home Wi-Fi &amp; Consoles');
    });
  });

  describe('Toddler Tier 0 Screen-Free Sanctuary (Ages 0–3)', () => {
    it('renders adult environment guidance instead of phone controls for toddlers', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, {
          child: toddlerToby,
          children: [preteenLeo, toddlerToby],
        })
      );

      expect(html).toContain("Toby&#x27;s Screen-Free Sanctuary");
      expect(html).toContain('Zero background TV');
      expect(html).toContain('7:30 PM screen-free wind-down');
      expect(html).not.toContain('Step 2 · Live Network Shield');
    });
  });

  describe('Age-Calibrated OS Blueprint & Add-on Engine', () => {
    it('calibrates Apple Screen Time adult filtering strictly for younger kids vs older kids', () => {
      const age7Steps = getCalibratedControlSteps('apple_ios', ['adult_content'], 7);
      const age12Steps = getCalibratedControlSteps('apple_ios', ['adult_content'], 12);

      expect(age7Steps[0]?.recommendedSetting).toContain('Allowed Websites Only');
      expect(age12Steps[0]?.recommendedSetting).toContain('Limit Adult Websites');
    });

    it('builds all 4 optional add-on packs with age-calibrated YouTube Shorts and Social Media guidance', () => {
      const packsAge10 = getExtraAddonPacks(10);
      const packsAge14 = getExtraAddonPacks(14);

      expect(packsAge10.map((p) => p.id)).toEqual(['youtube', 'roblox', 'social', 'home_dns']);
      expect(packsAge10.find((p) => p.id === 'youtube')?.steps.some((s) => s.recommendedSetting.includes('0 minutes'))).toBe(true);
      expect(packsAge10.find((p) => p.id === 'social')?.shortTag).toBe('Hold until 13+');
      expect(packsAge14.find((p) => p.id === 'social')?.shortTag).toBe('Private · DMs off');
    });

    it('recommends age-appropriate bedtime downtime schedules', () => {
      expect(getRecommendedCurfew(7).time12).toBe('8:00 PM');
      expect(getRecommendedCurfew(10).time12).toBe('8:30 PM');
      expect(getRecommendedCurfew(14).time12).toBe('9:30 PM');
    });
  });
});
