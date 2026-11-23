import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DevicesManagementView,
  getRecommendedCurfew,
} from '@/components/devices/DevicesManagementView';
import {
  CONTROL_GOALS,
  DEVICE_PLATFORMS,
  getCalibratedControlSteps,
} from '@/lib/parentalControlsCatalog';
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

describe('DevicesManagementView — Separate Phone Readiness & OS Parental Controls Hub', () => {
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

  describe('Parental Controls Setup Builder (Default Tab)', () => {
    it('renders the Device Safety Hub with two independent tool tabs and zero pact wording', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain("Leo&#x27;s Device Safety Hub");
      expect(html).toContain('Parental Controls Setup');
      expect(html).toContain('Phone Readiness Check');
      expect(html).toContain('1. Pick the device or app to lock down');
      expect(html).toContain('2. Choose what you want to control');

      // Zero pact / treaty / fake QR enrollment chrome
      expect(html).not.toContain('Bilateral Family Treaty');
      expect(html).not.toContain('Launch Pact Wizard');
      expect(html).not.toContain('/pacts/builder');
      expect(html).not.toContain('Scan Device Enrollment QR');
    });

    it('renders all 5 OS & app platforms and all 6 priority-ordered protection goals', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, defaultProps)
      );

      for (const platform of DEVICE_PLATFORMS) {
        expect(html).toContain(platform.name.replace(/&/g, '&amp;'));
      }
      for (const goal of CONTROL_GOALS) {
        expect(html).toContain(goal.label.replace(/&/g, '&amp;'));
      }
      expect(html).toContain('Apple Screen Time');
      expect(html).toContain('Lock Screen Time passcode');
      expect(html).toContain('Parent on Android?');
      expect(html).toContain('Limit Adult Websites');
      expect(html).toContain('Communication Safety');
      expect(html).toContain('Ask to Buy');
      expect(html).toContain('8:30 PM');
    });
  });

  describe('Standalone Phone Readiness Check Tab', () => {
    it('renders Leo readiness verdict and link to /children/test-leo-10/readiness when readiness tab is open', () => {
      const html = renderWithProviders(
        React.createElement(DevicesManagementView, {
          ...defaultProps,
          initialTab: 'readiness',
        })
      );

      expect(html).toContain('Is Leo ready for a phone yet?');
      expect(html).toContain('>84<');
      expect(html).toContain('Almost ready (use strict limits)');
      expect(html).toContain('/children/test-leo-10/readiness');
      expect(html).toContain('Retake readiness check');
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
          initialTab: 'readiness',
        })
      );

      expect(html).toContain('Start readiness check');
      expect(html).toContain('/children/test-unassessed/readiness');
      expect(html).toContain('Everyday rhythms');
      expect(html).toContain('Online instincts');
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
      expect(html).not.toContain('Parental Controls Setup');
    });
  });

  describe('Age-Calibrated OS Blueprint Engine', () => {
    it('calibrates Apple Screen Time adult filtering strictly for younger kids vs older kids', () => {
      const age7Steps = getCalibratedControlSteps('apple_ios', ['adult_content'], 7);
      const age12Steps = getCalibratedControlSteps('apple_ios', ['adult_content'], 12);

      expect(age7Steps[0]?.recommendedSetting).toContain('Allowed Websites Only');
      expect(age12Steps[0]?.recommendedSetting).toContain('Limit Adult Websites');
    });

    it('filters steps cleanly by selected control goals across Android, Roblox, YouTube, and Home DNS', () => {
      const androidAll = getCalibratedControlSteps(
        'android_family_link',
        ['tamper_lock', 'adult_content', 'strangers_dms', 'bedtime_downtime'],
        11
      );
      expect(androidAll).toHaveLength(4);
      expect(androidAll[0]?.title).toContain('APK sideloading');
      expect(androidAll[2]?.title).toContain('Parent-Managed Contacts');
      expect(androidAll[2]?.title).toContain('Sensitive Content Warnings');
      expect(androidAll[3]?.title).toContain('School Time');

      expect(getCalibratedControlSteps('roblox', ['tamper_lock', 'strangers_dms'], 10)).toHaveLength(2);
      const ytSteps = getCalibratedControlSteps('youtube', ['adult_content', 'time_limits'], 10);
      expect(ytSteps).toHaveLength(2);
      expect(ytSteps[1]?.recommendedSetting).toContain('0 minutes');

      expect(getCalibratedControlSteps('home_dns', ['adult_content'], 10)[0]?.menuPath.join(' ')).toContain(
        '1.1.1.3'
      );
    });

    it('recommends age-appropriate bedtime downtime schedules', () => {
      expect(getRecommendedCurfew(7).time12).toBe('8:00 PM');
      expect(getRecommendedCurfew(10).time12).toBe('8:30 PM');
      expect(getRecommendedCurfew(14).time12).toBe('9:30 PM');
    });
  });
});
