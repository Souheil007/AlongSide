'use client';

import * as React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { trackEvent } from '@/lib/analytics/posthog';

export function DemoModeBanner() {
  const { isDemo, logout, isLoggingOut } = useAuth();
  const [targetPath, setTargetPath] = React.useState<'/register' | '/' | null>(null);

  if (!isDemo) {
    return null;
  }

  const handleExitDemo = async (destination: '/register' | '/') => {
    setTargetPath(destination);
    trackEvent('demo_exited', {
      destination: destination === '/register' ? 'register' : 'home',
    });
    try {
      await logout();
    } catch {
      // Safe fallback redirect even if logout request fails
    } finally {
      window.location.href = destination;
    }
  };

  return (
    <div
      role="region"
      aria-label="Live demo preview banner"
      className="no-print border-b border-[#C5DDD0] bg-[#EAF3EE] text-[#143D2B]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6 lg:px-8 text-xs sm:text-[13px]">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="h-4 w-4 shrink-0 text-[#143D2B]" aria-hidden="true" />
          <span>
            Sample family preview (Leo, 3 &amp; Maya, 11). Read-only mode.
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={isLoggingOut}
            onClick={() => handleExitDemo('/register')}
            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-[7px] bg-[#143D2B] px-3 py-1 text-xs font-semibold text-white hover:bg-[#0E2B1E] transition-colors disabled:opacity-60"
          >
            {isLoggingOut && targetPath === '/register' && (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            )}
            <span>Set up your own family</span>
          </button>

          <button
            type="button"
            disabled={isLoggingOut}
            onClick={() => handleExitDemo('/')}
            className="inline-flex min-h-[34px] items-center rounded-[7px] px-2.5 py-1 text-xs font-medium text-[#143D2B] hover:bg-[#D8EAE0] transition-colors disabled:opacity-60"
          >
            Exit demo
          </button>
        </div>
      </div>
    </div>
  );
}
