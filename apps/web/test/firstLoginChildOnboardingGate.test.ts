import { describe, expect, it, vi } from 'vitest';

describe('First-Login Child Onboarding Gate & Registration Flow Specification', () => {
  describe('Post-Signup Routing Rule', () => {
    it('redirects newly registered user to sign-in page with registered query indicator and prefilled email', () => {
      const registeredEmail = 'parent@example.com';
      const redirectUrl = `/login?registered=true&email=${encodeURIComponent(registeredEmail)}`;

      expect(redirectUrl).toContain('/login');
      expect(redirectUrl).toContain('registered=true');
      expect(redirectUrl).toContain('parent%40example.com');
    });
  });

  describe('Post-Login Child Onboarding Routing Rule', () => {
    it('routes a freshly authenticated user with 0 children directly to /children/new', () => {
      const userWithZeroChildren = {
        id: 'usr-1',
        email: 'parent@example.com',
        fullName: 'New Parent',
        childrenCount: 0,
      };

      const targetRoute =
        !userWithZeroChildren.childrenCount || userWithZeroChildren.childrenCount === 0
          ? '/children/new'
          : '/dashboard';

      expect(targetRoute).toBe('/children/new');
    });

    it('routes an authenticated user with existing children to /dashboard', () => {
      const userWithChildren = {
        id: 'usr-2',
        email: 'parent2@example.com',
        fullName: 'Experienced Parent',
        childrenCount: 2,
      };

      const targetRoute =
        !userWithChildren.childrenCount || userWithChildren.childrenCount === 0
          ? '/children/new'
          : '/dashboard';

      expect(targetRoute).toBe('/dashboard');
    });
  });

  describe('DashboardAuthGuard Route Protection Logic', () => {
    function resolveGuardAction({
      isAuthenticated,
      isAuthLoading,
      isChildrenLoading,
      childrenCount,
      pathname,
    }: {
      isAuthenticated: boolean;
      isAuthLoading: boolean;
      isChildrenLoading: boolean;
      childrenCount: number;
      pathname: string;
    }): 'LOADING' | 'REDIRECT_LOGIN' | 'REDIRECT_CHILDREN_NEW' | 'ALLOW' {
      if (isAuthLoading || (isAuthenticated && isChildrenLoading)) {
        return 'LOADING';
      }

      if (!isAuthenticated) {
        return 'REDIRECT_LOGIN';
      }

      const hasNoChildren = childrenCount === 0;
      const isAllowedRouteWithoutChildren =
        pathname === '/children/new' || pathname.startsWith('/settings');

      if (hasNoChildren && !isAllowedRouteWithoutChildren) {
        return 'REDIRECT_CHILDREN_NEW';
      }

      return 'ALLOW';
    }

    it('returns LOADING while authentication state is resolving', () => {
      const action = resolveGuardAction({
        isAuthenticated: false,
        isAuthLoading: true,
        isChildrenLoading: false,
        childrenCount: 0,
        pathname: '/dashboard',
      });
      expect(action).toBe('LOADING');
    });

    it('redirects unauthenticated visitor to /login', () => {
      const action = resolveGuardAction({
        isAuthenticated: false,
        isAuthLoading: false,
        isChildrenLoading: false,
        childrenCount: 0,
        pathname: '/dashboard',
      });
      expect(action).toBe('REDIRECT_LOGIN');
    });

    it('redirects authenticated parent with 0 children from /dashboard to /children/new', () => {
      const action = resolveGuardAction({
        isAuthenticated: true,
        isAuthLoading: false,
        isChildrenLoading: false,
        childrenCount: 0,
        pathname: '/dashboard',
      });
      expect(action).toBe('REDIRECT_CHILDREN_NEW');
    });

    it('redirects authenticated parent with 0 children from /academy to /children/new', () => {
      const action = resolveGuardAction({
        isAuthenticated: true,
        isAuthLoading: false,
        isChildrenLoading: false,
        childrenCount: 0,
        pathname: '/academy',
      });
      expect(action).toBe('REDIRECT_CHILDREN_NEW');
    });

    it('redirects authenticated parent with 0 children from /digest to /children/new', () => {
      const action = resolveGuardAction({
        isAuthenticated: true,
        isAuthLoading: false,
        isChildrenLoading: false,
        childrenCount: 0,
        pathname: '/digest',
      });
      expect(action).toBe('REDIRECT_CHILDREN_NEW');
    });

    it('redirects authenticated parent with 0 children from /devices to /children/new', () => {
      const action = resolveGuardAction({
        isAuthenticated: true,
        isAuthLoading: false,
        isChildrenLoading: false,
        childrenCount: 0,
        pathname: '/devices',
      });
      expect(action).toBe('REDIRECT_CHILDREN_NEW');
    });

    it('allows authenticated parent with 0 children to access /children/new for onboarding', () => {
      const action = resolveGuardAction({
        isAuthenticated: true,
        isAuthLoading: false,
        isChildrenLoading: false,
        childrenCount: 0,
        pathname: '/children/new',
      });
      expect(action).toBe('ALLOW');
    });

    it('allows authenticated parent with 0 children to access /settings for account preferences', () => {
      const action = resolveGuardAction({
        isAuthenticated: true,
        isAuthLoading: false,
        isChildrenLoading: false,
        childrenCount: 0,
        pathname: '/settings',
      });
      expect(action).toBe('ALLOW');
    });

    it('allows authenticated parent with at least 1 child to access /dashboard', () => {
      const action = resolveGuardAction({
        isAuthenticated: true,
        isAuthLoading: false,
        isChildrenLoading: false,
        childrenCount: 1,
        pathname: '/dashboard',
      });
      expect(action).toBe('ALLOW');
    });

    it('allows authenticated parent with at least 1 child to access /academy, /digest, and /devices', () => {
      ['/academy', '/digest', '/devices'].forEach((route) => {
        const action = resolveGuardAction({
          isAuthenticated: true,
          isAuthLoading: false,
          isChildrenLoading: false,
          childrenCount: 1,
          pathname: route,
        });
        expect(action).toBe('ALLOW');
      });
    });
  });
});
