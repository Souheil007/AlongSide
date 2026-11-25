'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  capturePageView,
  initPostHog,
  syncAnalyticsUser,
} from '@/lib/analytics/posthog';

function PostHogPageView({ ready }: { ready: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams?.toString() || '';

  React.useEffect(() => {
    if (!ready || typeof window === 'undefined') {
      return;
    }
    const query = searchKey ? `?${searchKey}` : '';
    capturePageView(`${window.location.origin}${pathname}${query}`);
  }, [ready, pathname, searchKey]);

  return null;
}

function PostHogUserSync({ ready }: { ready: boolean }) {
  const { user, isDemo } = useAuth();

  React.useEffect(() => {
    if (!ready || !user) {
      return;
    }

    syncAnalyticsUser({
      id: user.id,
      role: user.role,
      childrenCount: user.childrenCount,
      subscriptionTier: user.subscription?.tier ?? null,
      isDemo,
    });
  }, [ready, user, isDemo]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(initPostHog());
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView ready={ready} />
      </Suspense>
      <PostHogUserSync ready={ready} />
      {children}
    </>
  );
}
