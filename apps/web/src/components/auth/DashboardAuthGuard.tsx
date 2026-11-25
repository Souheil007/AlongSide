'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useChildren } from '@/hooks/useChildren';

export interface DashboardAuthGuardProps {
  children: React.ReactNode;
}

export function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isDemo, isLoading: isAuthLoading } = useAuth();
  const { children: childList, isLoading: isChildrenLoading } = useChildren();

  React.useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!isAuthLoading && isAuthenticated && !isDemo && !isChildrenLoading) {
      const hasNoChildren = !childList || childList.length === 0;
      const isAllowedRouteWithoutChildren =
        pathname === '/children/new' ||
        pathname?.startsWith('/settings');

      if (hasNoChildren && !isAllowedRouteWithoutChildren) {
        router.push('/children/new');
      }
    }
  }, [isAuthLoading, isAuthenticated, isDemo, isChildrenLoading, childList, pathname, router]);

  if (isAuthLoading || (isAuthenticated && isChildrenLoading)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#143D2B] border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
