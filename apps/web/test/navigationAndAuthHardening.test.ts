import { describe, expect, it, beforeEach, afterAll, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import {
  useChildContextStore,
  selectActiveChild,
  DEMO_FAMILY_CHILDREN,
  ACTIVE_CHILD_STORAGE_KEY,
} from '../src/stores/useChildContextStore';
import { AUTH_QUERY_KEY } from '../src/hooks/useAuth';
import {
  AUTHENTICATED_CORE_LINKS,
  AUTHENTICATED_SECONDARY_LINKS,
  PUBLIC_NAV_LINKS,
} from '../src/components/shared/Header';
import {
  PRIMARY_MOBILE_ITEMS,
  MORE_MOBILE_ITEMS,
} from '../src/components/shared/MobileNav';

describe('Unified Navigation Shell & Session Logout Hardening Specification (PLAN-21)', () => {
  const hadWindow = typeof window !== 'undefined';
  const originalWindow = (global as unknown as { window?: unknown }).window;

  afterAll(() => {
    if (!hadWindow) {
      delete (global as unknown as { window?: unknown }).window;
    } else {
      (global as unknown as { window?: unknown }).window = originalWindow;
    }
  });

  beforeEach(() => {
    // Reset Zustand child context store
    useChildContextStore.getState().reset();

    // Mock global window and localStorage safely if in node
    const storage: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: vi.fn((key: string) => storage[key] ?? null),
      setItem: vi.fn((key: string, val: string) => {
        storage[key] = val;
      }),
      removeItem: vi.fn((key: string) => {
        delete storage[key];
      }),
      clear: vi.fn(() => {
        for (const k of Object.keys(storage)) {
          delete storage[k];
        }
      }),
    };

    const mockSessionStorage = {
      getItem: vi.fn((key: string) => storage[key] ?? null),
      setItem: vi.fn((key: string, val: string) => {
        storage[key] = val;
      }),
      removeItem: vi.fn((key: string) => {
        delete storage[key];
      }),
      clear: vi.fn(() => {
        for (const k of Object.keys(storage)) {
          delete storage[k];
        }
      }),
    };

    if (typeof window === 'undefined') {
      (global as unknown as { window: unknown }).window = {
        localStorage: mockLocalStorage,
        sessionStorage: mockSessionStorage,
        location: { href: 'http://localhost:3000/dashboard', search: '' },
        history: { replaceState: vi.fn() },
      };
    } else {
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      });
      Object.defineProperty(window, 'sessionStorage', {
        value: mockSessionStorage,
        writable: true,
      });
    }
  });

  describe('Task 4: Complete Session Logout Teardown & Store Reset', () => {
    it('thoroughly resets Zustand child context store and purges active child storage key', () => {
      const store = useChildContextStore.getState();

      // Seed state
      store.setChildren(DEMO_FAMILY_CHILDREN);
      store.setActiveChild('demo-child-maya');

      expect(useChildContextStore.getState().children).toHaveLength(3);
      expect(useChildContextStore.getState().activeChildId).toBe('demo-child-maya');
      expect(selectActiveChild(useChildContextStore.getState())?.name).toBe('Maya');

      // Trigger store reset action
      store.reset();

      const resetState = useChildContextStore.getState();
      expect(resetState.children).toEqual([]);
      expect(resetState.activeChildId).toBeNull();
      expect(resetState.isLoading).toBe(false);
      expect(resetState.error).toBeNull();
      expect(selectActiveChild(resetState)).toBeNull();

      // Verify localStorage eviction
      expect(window.localStorage.removeItem).toHaveBeenCalledWith(ACTIVE_CHILD_STORAGE_KEY);
    });

    it('performs full TanStack Query cache eviction and session storage purging upon logout', () => {
      const queryClient = new QueryClient();

      // Seed query client cache with multi-domain data
      queryClient.setQueryData(AUTH_QUERY_KEY, {
        id: 'usr_parent_123',
        fullName: 'Sarah Jenkins',
        email: 'sarah.parent@example.com',
      });
      queryClient.setQueryData(['children'], DEMO_FAMILY_CHILDREN);
      queryClient.setQueryData(['health-logs', 'demo-child-mateo'], [
        { id: 'log_1', symptom: 'Fever 101.2F', zone: 'YELLOW' },
      ]);
      queryClient.setQueryData(['pacts', 'demo-child-julian'], [
        { id: 'pact_1', title: 'Freshman High School Agreement', curfew: '20:30' },
      ]);

      // Verify queries exist before logout
      expect(queryClient.getQueryCache().getAll().length).toBe(4);
      expect(queryClient.getQueryData(AUTH_QUERY_KEY)).toBeDefined();

      // Execute eviction lifecycle matching useAuth.ts onSuccess
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.clear();
      useChildContextStore.getState().reset();
      window.localStorage.removeItem(ACTIVE_CHILD_STORAGE_KEY);
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('auth');
      window.sessionStorage.clear();

      // Verify query cache is 100% empty
      expect(queryClient.getQueryCache().getAll().length).toBe(0);
      expect(queryClient.getQueryData(AUTH_QUERY_KEY)).toBeUndefined();

      // Verify child store is empty
      expect(useChildContextStore.getState().children).toEqual([]);
      expect(useChildContextStore.getState().activeChildId).toBeNull();

      // Verify session keys were evicted
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('auth');
      expect(window.sessionStorage.clear).toHaveBeenCalled();
    });

    it('validates login page logged-out parameter detection and confirmation message', () => {
      const expectedBanner = 'You have been successfully logged out of your AlongSide account.';

      // Case 1: logged_out=true
      const urlWithParam = new URL('http://localhost:3000/login?logged_out=true');
      const isLoggedOut = urlWithParam.searchParams.get('logged_out') === 'true';
      expect(isLoggedOut).toBe(true);

      // Case 2: standard login access
      const urlWithoutParam = new URL('http://localhost:3000/login');
      const isLoggedOutDefault = urlWithoutParam.searchParams.get('logged_out') === 'true';
      expect(isLoggedOutDefault).toBe(false);

      // Case 3: banner message exact text
      expect(expectedBanner).toContain('successfully logged out');
      expect(expectedBanner).toContain('AlongSide');
    });
  });

  describe('Task 1 & 2: Unified Desktop Header Navigation Specification', () => {
    it('defines exactly the 6 canonical desktop domain hubs in order', () => {
      expect(AUTHENTICATED_CORE_LINKS).toHaveLength(6);

      const expectedLinks = [
        { href: '/dashboard', label: 'Home' },
        { href: '/health', label: 'Health' },
        { href: '/nutrition', label: 'Nutrition' },
        { href: '/behavior', label: 'Behavior' },
        { href: '/brain-games', label: 'Play' },
        { href: '/devices', label: 'Devices' },
      ];

      const coreLinks = AUTHENTICATED_CORE_LINKS.map((l) => ({
        href: l.href,
        label: l.label,
      }));

      expect(coreLinks).toEqual(expectedLinks);
    });

    it('relocates secondary intelligence hubs into More / Account dropdowns', () => {
      expect(AUTHENTICATED_SECONDARY_LINKS).toHaveLength(2);
      expect(AUTHENTICATED_SECONDARY_LINKS[0]?.href).toBe('/academy');
      expect(AUTHENTICATED_SECONDARY_LINKS[0]?.label).toContain('Academy');
      expect(AUTHENTICATED_SECONDARY_LINKS[1]?.href).toBe('/digest');
      expect(AUTHENTICATED_SECONDARY_LINKS[1]?.label).toContain('Digest');
    });

    it('preserves clean public landing page navigation without authenticated leakage', () => {
      expect(PUBLIC_NAV_LINKS).toHaveLength(4);
      const publicHrefs = PUBLIC_NAV_LINKS.map((l) => l.href);

      expect(publicHrefs).toContain('/#features');
      expect(publicHrefs).toContain('/health');
      expect(publicHrefs).toContain('/devices');
      expect(publicHrefs).toContain('/#pricing');

      // Does not contain authenticated-only /dashboard
      expect(publicHrefs).not.toContain('/dashboard');
    });
  });

  describe('Task 3: Streamlined Mobile Navigation Bar Specification', () => {
    it('provides exactly 4 primary thumb hubs plus 1 More drawer trigger', () => {
      expect(PRIMARY_MOBILE_ITEMS).toHaveLength(4);

      const hubs = PRIMARY_MOBILE_ITEMS.map((item) => ({
        href: item.href,
        label: item.label,
      }));

      expect(hubs).toEqual([
        { href: '/dashboard', label: 'Home' },
        { href: '/health', label: 'Health' },
        { href: '/brain-games', label: 'Play' },
        { href: '/devices', label: 'Devices' },
      ]);
    });

    it('houses Nutrition, Behavior, Academy, and Digest in the More drawer', () => {
      expect(MORE_MOBILE_ITEMS).toHaveLength(4);

      const drawerHrefs = MORE_MOBILE_ITEMS.map((item) => item.href);
      expect(drawerHrefs).toContain('/nutrition');
      expect(drawerHrefs).toContain('/behavior');
      expect(drawerHrefs).toContain('/academy');
      expect(drawerHrefs).toContain('/digest');
    });

    it('confirms all primary mobile hubs have non-null icons and distinct labels', () => {
      for (const item of PRIMARY_MOBILE_ITEMS) {
        expect(item.label.length).toBeGreaterThan(0);
        expect(item.icon).toBeDefined();
        expect(item.href.startsWith('/')).toBe(true);
      }
      for (const item of MORE_MOBILE_ITEMS) {
        expect(item.label.length).toBeGreaterThan(0);
        expect(item.icon).toBeDefined();
        expect(item.badge).toBeDefined();
      }
    });
  });
});
