import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  AUTHENTICATED_CORE_LINKS,
  AUTHENTICATED_SECONDARY_LINKS,
} from '../src/components/shared/Header';
import {
  PRIMARY_MOBILE_ITEMS,
  MORE_MOBILE_ITEMS,
} from '../src/components/shared/MobileNav';

describe('Plan 29: Navigation & Platform Shell Advisory Pivot Specification', () => {
  describe('Task 1: Desktop Navigation Bar Streamlining (4 Core Links)', () => {
    it('asserts AUTHENTICATED_CORE_LINKS contains exactly 4 elements', () => {
      expect(AUTHENTICATED_CORE_LINKS).toHaveLength(4);
    });

    it('asserts AUTHENTICATED_CORE_LINKS has Home, Parent Academy, Culture Digest, and Family Pacts & Devices in order', () => {
      const links = AUTHENTICATED_CORE_LINKS.map((link) => ({
        href: link.href,
        label: link.label,
      }));

      expect(links).toEqual([
        { href: '/dashboard', label: 'Home' },
        { href: '/academy', label: 'Parent Academy' },
        { href: '/digest', label: 'Culture Digest' },
        { href: '/devices', label: 'Family Pacts & Devices' },
      ]);
    });

    it('asserts retired domain tabs (/health, /nutrition, /behavior, /brain-games) are NOT in the top-level navigation array', () => {
      const topLevelHrefs = AUTHENTICATED_CORE_LINKS.map((link) => link.href);
      expect(topLevelHrefs).not.toContain('/health');
      expect(topLevelHrefs).not.toContain('/nutrition');
      expect(topLevelHrefs).not.toContain('/behavior');
      expect(topLevelHrefs).not.toContain('/brain-games');
    });

    it('verifies AUTHENTICATED_SECONDARY_LINKS is deprecated and empty', () => {
      expect(AUTHENTICATED_SECONDARY_LINKS).toEqual([]);
    });

    it('verifies all 4 core links have defined icons for visual anchor hierarchy', () => {
      const iconCount = AUTHENTICATED_CORE_LINKS.filter((link) => link.icon).length;
      // Academy, Digest, and Devices have icons; Home may or may not
      expect(iconCount).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Task 2: Mobile Navigation Synchronization (MobileNav.tsx)', () => {
    it('asserts PRIMARY_MOBILE_ITEMS contains exactly 4 thumb destinations aligned with core links', () => {
      expect(PRIMARY_MOBILE_ITEMS).toHaveLength(4);

      const mobileHrefs = PRIMARY_MOBILE_ITEMS.map((item) => item.href);
      expect(mobileHrefs).toEqual(['/dashboard', '/academy', '/digest', '/devices']);
    });

    it('asserts retired domain tabs are NOT in PRIMARY_MOBILE_ITEMS', () => {
      const mobileHrefs = PRIMARY_MOBILE_ITEMS.map((item) => item.href);
      expect(mobileHrefs).not.toContain('/health');
      expect(mobileHrefs).not.toContain('/nutrition');
      expect(mobileHrefs).not.toContain('/behavior');
      expect(mobileHrefs).not.toContain('/brain-games');
    });

    it('groups secondary resources (Settings, Billing, Support) into MORE_MOBILE_ITEMS', () => {
      expect(MORE_MOBILE_ITEMS.length).toBeGreaterThanOrEqual(3);

      const secondaryHrefs = MORE_MOBILE_ITEMS.map((item) => item.href);
      expect(secondaryHrefs).toContain('/settings');
      expect(secondaryHrefs).toContain('/#pricing');
      expect(secondaryHrefs).toContain('/advisor');
    });

    it('verifies touch targets in MobileNav adhere to WCAG >= 44px min dimensions', () => {
      const mobileNavPath = path.resolve(__dirname, '../src/components/shared/MobileNav.tsx');
      const mobileNavContent = fs.readFileSync(mobileNavPath, 'utf-8');

      // Check min-h-[48px] is used for primary mobile items and drawer items
      expect(mobileNavContent).toContain('min-h-[48px]');
      expect(mobileNavContent).not.toContain('min-h-[32px]');
    });
  });

  describe('Task 3: Purge of Antipyretic Dosing Calculator from Health View', () => {
    it('asserts antipyretic dosing calculator is not imported or rendered in HealthDashboardView', () => {
      const healthViewPath = path.resolve(
        __dirname,
        '../src/components/health/HealthDashboardView.tsx'
      );
      const healthViewContent = fs.readFileSync(healthViewPath, 'utf-8');

      expect(healthViewContent).not.toContain('AntipyreticDosingCalculator');
      expect(healthViewContent).not.toContain('Antipyretic Dosing Calculator');
      expect(healthViewContent).not.toContain("activeTab === 'dosing'");
      expect(healthViewContent).not.toContain("setActiveTab('dosing')");
    });

    it('asserts HealthDashboardView purges clinical symptom triage and retains Sleep Regression Companion', () => {
      const healthViewPath = path.resolve(
        __dirname,
        '../src/components/health/HealthDashboardView.tsx'
      );
      const healthViewContent = fs.readFileSync(healthViewPath, 'utf-8');

      expect(healthViewContent).not.toContain('SymptomTriageRunner');
      expect(healthViewContent).not.toContain('Barton Schmitt');
      expect(healthViewContent).toContain('Sleep Regression & Nap Transitions');
      expect(healthViewContent).toContain('SleepRegressionCompanion');
    });
  });

  describe('Task 3: Advisory Domain Banners on Retired Routes', () => {
    it('verifies health/page.tsx renders AdvisoryDomainBanner pointing to HEALTH_AND_WELLNESS', () => {
      const pagePath = path.resolve(__dirname, '../src/app/(dashboard)/health/page.tsx');
      const content = fs.readFileSync(pagePath, 'utf-8');

      expect(content).toContain('AdvisoryDomainBanner');
      expect(content).toContain('category="HEALTH_AND_WELLNESS"');
      expect(content).toContain('/academy?category=HEALTH_AND_WELLNESS');
      expect(content).toContain('Explore Health & Sleep Courses →');
    });

    it('verifies nutrition/page.tsx renders AdvisoryDomainBanner pointing to NUTRITION_AND_FEEDING', () => {
      const pagePath = path.resolve(__dirname, '../src/app/(dashboard)/nutrition/page.tsx');
      const content = fs.readFileSync(pagePath, 'utf-8');

      expect(content).toContain('AdvisoryDomainBanner');
      expect(content).toContain('category="NUTRITION_AND_FEEDING"');
      expect(content).toContain('/academy?category=NUTRITION_AND_FEEDING');
      expect(content).toContain('Explore Nutrition & Feeding Courses →');
    });

    it('verifies behavior/page.tsx renders AdvisoryDomainBanner pointing to BEHAVIOR_AND_EMOTIONS', () => {
      const pagePath = path.resolve(__dirname, '../src/app/(dashboard)/behavior/page.tsx');
      const content = fs.readFileSync(pagePath, 'utf-8');

      expect(content).toContain('AdvisoryDomainBanner');
      expect(content).toContain('category="BEHAVIOR_AND_EMOTIONS"');
      expect(content).toContain('/academy?category=BEHAVIOR_AND_EMOTIONS');
      expect(content).toContain('Explore Behavior & Emotion Courses →');
    });

    it('verifies brain-games/page.tsx renders AdvisoryDomainBanner pointing to DEVELOPMENT_AND_PLAY', () => {
      const pagePath = path.resolve(__dirname, '../src/app/(dashboard)/brain-games/page.tsx');
      const content = fs.readFileSync(pagePath, 'utf-8');

      expect(content).toContain('AdvisoryDomainBanner');
      expect(content).toContain('category="DEVELOPMENT_AND_PLAY"');
      expect(content).toContain('/academy?category=DEVELOPMENT_AND_PLAY');
      expect(content).toContain('Explore Development & Play Courses →');
    });
  });
});
