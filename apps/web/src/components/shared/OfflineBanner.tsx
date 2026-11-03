'use client';

import * as React from 'react';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OfflineBannerProps {
  className?: string;
}

export function OfflineBanner({ className }: OfflineBannerProps) {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);
  const [showReconnected, setShowReconnected] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Only access navigator in browser environment
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'w-full px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm border-b',
        !isOnline
          ? 'bg-amber-50 border-amber-200 text-amber-900'
          : 'bg-emerald-50 border-emerald-200 text-emerald-900',
        className
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {!isOnline ? (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-200/70 text-amber-800 shrink-0">
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200/70 text-emerald-800 shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          )}

          <div>
            {!isOnline ? (
              <span>
                <strong className="font-semibold">Offline Mode:</strong> No internet connection detected. Academy lessons and conversation scripts are available offline from your local cache.
              </span>
            ) : (
              <span>
                <strong className="font-semibold">Back Online:</strong> Connection restored. Academy progress and new culture digests are synced.
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0 text-[11px] uppercase tracking-wider font-semibold opacity-75">
          {!isOnline ? 'Cached' : 'Synced'}
        </div>
      </div>
    </div>
  );
}
