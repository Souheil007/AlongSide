import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  AUTHENTICATED_CORE_LINKS,
  AUTHENTICATED_SECONDARY_LINKS,
  getInitials,
} from '../src/components/shared/Header';

describe('Plan 25: Streamlined Navigation & Account Menu Decluttering Specification', () => {
  describe('Task 1 & Task 3: Streamlined Desktop Navigation Shell', () => {
    it('asserts AUTHENTICATED_CORE_LINKS renames "Today" to "Home" at /dashboard', () => {
      const homeLink = AUTHENTICATED_CORE_LINKS.find((link) => link.href === '/dashboard');
      expect(homeLink).toBeDefined();
      expect(homeLink?.label).toBe('Home');
    });

    it('asserts AUTHENTICATED_CORE_LINKS contains exactly the 6 canonical domain tabs', () => {
      expect(AUTHENTICATED_CORE_LINKS).toHaveLength(6);
      const labels = AUTHENTICATED_CORE_LINKS.map((link) => link.label);
      expect(labels).toEqual(['Home', 'Health', 'Nutrition', 'Play', 'Behavior', 'Devices']);
    });

    it('asserts "Devices & Pacts" is simplified to "Devices" in primary navigation', () => {
      const devicesLink = AUTHENTICATED_CORE_LINKS.find((link) => link.href === '/devices');
      expect(devicesLink).toBeDefined();
      expect(devicesLink?.label).toBe('Devices');
    });

    it('verifies "More" dropdown was eliminated from desktop Header navigation', () => {
      const headerPath = path.resolve(__dirname, '../src/components/shared/Header.tsx');
      const headerContent = fs.readFileSync(headerPath, 'utf-8');

      // The desktop navigation must NOT render moreMenuRef or "More" button with ChevronDown
      expect(headerContent).not.toContain('ref={moreMenuRef}');
      expect(headerContent).not.toContain("setMoreMenuOpen(!moreMenuOpen)");
    });
  });

  describe('Task 1: Mobile Navigation Drawer Alignment', () => {
    it('verifies MobileNav renders "Home" as its primary root destination', () => {
      const mobileNavPath = path.resolve(__dirname, '../src/components/shared/MobileNav.tsx');
      const mobileNavContent = fs.readFileSync(mobileNavPath, 'utf-8');

      expect(mobileNavContent).toContain("{ href: '/dashboard', label: 'Home'");
      expect(mobileNavContent).not.toContain("{ href: '/dashboard', label: 'Today'");
    });

    it('verifies Home page metadata title is updated to "Home • AlongSide Family Operating System"', () => {
      const pagePath = path.resolve(__dirname, '../src/app/(dashboard)/dashboard/page.tsx');
      const pageContent = fs.readFileSync(pagePath, 'utf-8');

      expect(pageContent).toContain("title: 'Home • AlongSide Family Operating System'");
    });
  });

  describe('Task 2: Clean Up the User Account Dropdown', () => {
    it('verifies user dropdown menu no longer renders redundant quick navigation links', () => {
      const headerPath = path.resolve(__dirname, '../src/components/shared/Header.tsx');
      const headerContent = fs.readFileSync(headerPath, 'utf-8');

      // Locate the user menu container
      const userMenuIndex = headerContent.indexOf('{userMenuOpen && (');
      expect(userMenuIndex).toBeGreaterThan(0);
      const userMenuSection = headerContent.slice(userMenuIndex, userMenuIndex + 6000);

      // Must NOT contain redundant domain links
      expect(userMenuSection).not.toContain("href=\"/dashboard\">");
      expect(userMenuSection).not.toContain("Family Dashboard");
      expect(userMenuSection).not.toContain("Parent Academy");
      expect(userMenuSection).not.toContain("Sunday Culture Digest");
      expect(userMenuSection).not.toContain("24/7 AI Child Advisor");

      // Must retain dedicated account links
      expect(userMenuSection).toContain("href=\"/settings\"");
      expect(userMenuSection).toContain("Account Settings");
      expect(userMenuSection).toContain("Log out");
    });

    it('correctly calculates user initials for account badge rendering', () => {
      expect(getInitials('Sarah Jenkins')).toBe('SJ');
      expect(getInitials('Dr. Jane Doe')).toBe('DD');
      expect(getInitials('Alex')).toBe('A');
      expect(getInitials('')).toBe('U');
      expect(getInitials(undefined)).toBe('U');
    });
  });

  describe('Task 4: Purge Redundant "Family OS Domain Hubs" Card from Home Feed', () => {
    it('verifies HolisticHomeFeed right column concludes cleanly without duplicate domain links', () => {
      const homeFeedPath = path.resolve(__dirname, '../src/components/dashboard/HolisticHomeFeed.tsx');
      const homeFeedContent = fs.readFileSync(homeFeedPath, 'utf-8');

      // Must NOT contain the redundant "Family OS Domain Hubs" card or duplicate links
      expect(homeFeedContent).not.toContain('Family OS Domain Hubs');
      expect(homeFeedContent).not.toContain('7 Canonical Hubs');

      // Right column contains DailyNutritionTipCard, AcademyBriefingCard, and AskAdvisorPromptBar
      expect(homeFeedContent).toContain('<DailyNutritionTipCard child={activeChild} />');
      expect(homeFeedContent).toContain('<AcademyBriefingCard child={activeChild} />');
      expect(homeFeedContent).toContain('<AskAdvisorPromptBar child={activeChild} />');
    });
  });
});
