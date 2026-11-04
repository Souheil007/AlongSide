import { describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  AUTHENTICATED_CORE_LINKS,
  AUTHENTICATED_SECONDARY_LINKS,
  PUBLIC_NAV_LINKS,
  getInitials,
} from '../src/components/shared/Header';
import {
  PRIMARY_MOBILE_ITEMS,
  MORE_MOBILE_ITEMS,
} from '../src/components/shared/MobileNav';
import { metadata as dashboardMetadata } from '../src/app/(dashboard)/dashboard/page';

describe('Streamlined Navigation & Account Menu Decluttering Specification (PLAN-25)', () => {
  describe('Task 1: Rename "Today" to "Home" in Navigation & Page Titles', () => {
    it('renames primary dashboard link from "Today" to "Home" in AUTHENTICATED_CORE_LINKS', () => {
      const homeLink = AUTHENTICATED_CORE_LINKS.find((link) => link.href === '/dashboard');
      expect(homeLink).toBeDefined();
      expect(homeLink?.label).toBe('Home');

      // Verify "Today" is purged from core links
      const todayLink = AUTHENTICATED_CORE_LINKS.find((link) => link.label === 'Today');
      expect(todayLink).toBeUndefined();
    });

    it('renames first mobile navigation action from "Today" to "Home" in PRIMARY_MOBILE_ITEMS', () => {
      expect(PRIMARY_MOBILE_ITEMS[0]?.href).toBe('/dashboard');
      expect(PRIMARY_MOBILE_ITEMS[0]?.label).toBe('Home');

      const mobileTodayItem = PRIMARY_MOBILE_ITEMS.find((item) => item.label === 'Today');
      expect(mobileTodayItem).toBeUndefined();
    });

    it('sets dashboard page metadata title to "Home • AlongSide Family Operating System"', () => {
      expect(dashboardMetadata.title).toBe('Home • AlongSide Family Operating System');
      expect(dashboardMetadata.description).toContain('Daily developmental milestones');
    });
  });

  describe('Task 2 & 3: Streamlined Desktop Navigation & Account Menu Decluttering', () => {
    it('defines exactly the 6 canonical desktop domain hubs in the primary navigation', () => {
      expect(AUTHENTICATED_CORE_LINKS).toHaveLength(6);

      const expectedLinks = [
        { href: '/dashboard', label: 'Home' },
        { href: '/health', label: 'Health' },
        { href: '/nutrition', label: 'Nutrition' },
        { href: '/brain-games', label: 'Play' },
        { href: '/behavior', label: 'Behavior' },
        { href: '/devices', label: 'Devices' },
      ];

      const coreLinks = AUTHENTICATED_CORE_LINKS.map((link) => ({
        href: link.href,
        label: link.label,
      }));

      expect(coreLinks).toEqual(expectedLinks);
    });

    it('verifies Header component source purges desktop "More" dropdown and clutter', () => {
      const headerPath = path.resolve(__dirname, '../src/components/shared/Header.tsx');
      const headerContent = fs.readFileSync(headerPath, 'utf-8');

      // Desktop "More" dropdown state and refs should be eliminated
      expect(headerContent).not.toContain('const [moreMenuOpen');
      expect(headerContent).not.toContain('const moreMenuRef');

      // Primary navigation bar should directly render the 6 core links without a desktop "More" menu button
      expect(headerContent).not.toContain('<span>More</span>');
    });

    it('verifies User Account Dropdown in Header strictly houses account governance and purges domain links', () => {
      const headerPath = path.resolve(__dirname, '../src/components/shared/Header.tsx');
      const headerContent = fs.readFileSync(headerPath, 'utf-8');

      // Locate the user account menu dropdown popup in Header.tsx
      const userMenuIndex = headerContent.indexOf('role="menu"');
      expect(userMenuIndex).toBeGreaterThan(-1);

      const userMenuEnd = headerContent.indexOf('Mobile View Right Controls', userMenuIndex);
      const userMenuSection = headerContent.slice(userMenuIndex, userMenuEnd > -1 ? userMenuEnd : userMenuIndex + 6000);

      // Must NOT contain redundant domain links
      expect(userMenuSection).not.toContain('href="/dashboard"');
      expect(userMenuSection).not.toContain('href="/academy"');
      expect(userMenuSection).not.toContain('href="/digest"');
      expect(userMenuSection).not.toContain('Family Dashboard');
      expect(userMenuSection).not.toContain('Parent Academy');
      expect(userMenuSection).not.toContain('Sunday Culture Digest');

      // Must retain and polish account items
      expect(userMenuSection).toContain('href="/settings"');
      expect(userMenuSection).toContain('Account Settings');
      expect(userMenuSection).toContain('href="/#pricing"');
      expect(userMenuSection).toContain('Billing &amp; Hero Pass');
      expect(userMenuSection).toContain('href="/advisor"');
      expect(userMenuSection).toContain('Help &amp; Clinical Guidance');

      // Must retain hardened session logout button
      expect(userMenuSection).toContain('onClick={handleLogout}');
      expect(userMenuSection).toContain('Log out');
    });

    it('retains 5 thumb-friendly mobile tabs with More drawer for secondary tools', () => {
      expect(PRIMARY_MOBILE_ITEMS).toHaveLength(4);
      expect(MORE_MOBILE_ITEMS).toHaveLength(4);

      const moreHrefs = MORE_MOBILE_ITEMS.map((item) => item.href);
      expect(moreHrefs).toEqual(['/nutrition', '/behavior', '/academy', '/digest']);
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

      // Right column must cleanly conclude with DailyNutritionTipCard and AskAdvisorPromptBar
      expect(homeFeedContent).toContain('<DailyNutritionTipCard child={activeChild} />');
      expect(homeFeedContent).toContain('<AskAdvisorPromptBar child={activeChild} />');
    });
  });
});
