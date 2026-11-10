import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  DevicesManagementView,
  getRecommendedCurfew,
} from '@/components/devices/DevicesManagementView';
import { RoadType, DevelopmentalTier, type ChildDTO } from '@alongside/shared';

describe('DevicesManagementView — Sequential Journey Ladder & Phone Canvas (SOU-83)', () => {
  const preteenLeo: ChildDTO = {
    id: 'test-leo-10',
    userId: 'parent-1',
    name: 'Leo',
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
      const html = renderToStaticMarkup(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain("Leo&#x27;s Digital Independence Roadmap");
      expect(html).toContain('Tier 3 Milestone Progression');
      expect(html).toContain('Pact-as-Code Guided Journey');
    });

    it('renders Step 1: First-Phone Neuro-Readiness Diagnostic with completed score', () => {
      const html = renderToStaticMarkup(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain('First-Phone Neuro-Readiness Diagnostic');
      expect(html).toContain('Step 1 of 3');
      expect(html).toContain('Score: 84/100');
      expect(html).toContain('Passed for Bridge Device');
      expect(html).toContain('View Audit');
      expect(html).toContain('/children/test-leo-10/readiness');
    });

    it('renders Step 2 & 3: Bilateral Family Treaty with verified seal and mutual pledges', () => {
      const html = renderToStaticMarkup(
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

    it('renders the Phone Simulator with Bedtime Peace Active notification and emergency dials', () => {
      const html = renderToStaticMarkup(
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
      const html = renderToStaticMarkup(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain('Print Treaty (PDF)');
      expect(html).toContain('Launch Pact Wizard');
      expect(html).toContain('/pacts/builder');
    });

    it('renders the Bridge Device Autonomy Ladder and Youth Culture Digest link', () => {
      const html = renderToStaticMarkup(
        React.createElement(DevicesManagementView, defaultProps)
      );

      expect(html).toContain('The Bridge Device Autonomy Ladder (4 Stages)');
      expect(html).toContain('Explore Sunday Youth Culture Digest');
      expect(html).toContain('/digest');
    });
  });

  describe('Toddler Tier 0 Adaptation View (Toby Age 2)', () => {
    const toddlerProps = {
      child: toddlerToby,
      children: [preteenLeo, toddlerToby],
    };

    it('renders the Developmental Clarification for Toddlers instead of contracts', () => {
      const html = renderToStaticMarkup(
        React.createElement(DevicesManagementView, toddlerProps)
      );

      expect(html).toContain("Toby&#x27;s Screen-Free Sanctuary (Age 2)");
      expect(html).toContain('Tier 0: Toddler Habit');
      expect(html).toContain("Why Toddlers Don&#x27;t Sign Digital Pacts");
      expect(html).toContain(
        'prefrontal executive function and bilateral negotiation do not yet exist'
      );

      // 3 Adult Environmental Routines
      expect(html).toContain('Step 1: Environmental Calm');
      expect(html).toContain('Zero Background TV');

      expect(html).toContain('Step 2: Co-Viewing Only');
      expect(html).toContain('Interactive Video Chat');

      expect(html).toContain('Step 3: Bedtime Sanctuary');
      expect(html).toContain('7:30 PM Sleep Routine');
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
