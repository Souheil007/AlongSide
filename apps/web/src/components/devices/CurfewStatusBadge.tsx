'use client';

import * as React from 'react';
import { Lock, ShieldCheck, AlertTriangle, Clock, Smartphone } from 'lucide-react';
import { DeviceProfileStatus, DevicePlatform } from '@alongside/shared';
import { formatCurfew12Hour } from '@/stores/usePactStore';
import { cn } from '@/lib/utils';

export interface CurfewStatusBadgeProps {
  status?: DeviceProfileStatus | string;
  bedtimeCurfewTime?: string; // e.g. "20:30"
  platform?: DevicePlatform | string;
  tamperDetected?: boolean;
  className?: string;
  showDetails?: boolean;
}

export function CurfewStatusBadge({
  status = DeviceProfileStatus.ACTIVE,
  bedtimeCurfewTime = '20:30',
  platform = DevicePlatform.APPLE_IOS,
  tamperDetected = false,
  className,
  showDetails = true,
}: CurfewStatusBadgeProps) {
  const formattedCurfew = formatCurfew12Hour(bedtimeCurfewTime);

  const isPending = status === DeviceProfileStatus.PENDING_ENROLLMENT;
  const isActive = status === DeviceProfileStatus.ACTIVE && !tamperDetected;
  const isTampered = tamperDetected || status === DeviceProfileStatus.REVOKED;

  const platformLabel =
    platform === DevicePlatform.APPLE_IOS ? 'Apple iOS' : 'Android Enterprise';

  if (!showDetails) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
          isActive
            ? 'bg-violet-50 text-violet-900 border-violet-200'
            : isPending
            ? 'bg-amber-50 text-amber-900 border-amber-200'
            : 'bg-red-50 text-red-900 border-red-200',
          className
        )}
      >
        <Lock className="h-3.5 w-3.5" />
        Curfew: {formattedCurfew} Lock | OS: {isActive ? 'Active' : isPending ? 'Pending' : 'Tampered'}
      </span>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl border p-4 transition-all',
        isActive
          ? 'border-violet-200 bg-gradient-to-r from-violet-50/70 via-white to-purple-50/40 shadow-xs'
          : isPending
          ? 'border-amber-200 bg-amber-50/50 shadow-xs'
          : 'border-red-200 bg-red-50/50 shadow-xs',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs',
              isActive
                ? 'bg-violet-600 text-white'
                : isPending
                ? 'bg-amber-600 text-white'
                : 'bg-red-600 text-white'
            )}
          >
            {isTampered ? (
              <AlertTriangle className="h-5 w-5" />
            ) : isActive ? (
              <Lock className="h-5 w-5" />
            ) : (
              <Clock className="h-5 w-5" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                Curfew: {formattedCurfew} Lock
              </span>
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border',
                  isActive
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : isPending
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-red-100 text-red-800 border-red-200'
                )}
              >
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                )}
                {isActive
                  ? 'Operating System Status: Active'
                  : isPending
                  ? 'Pending Device Scan'
                  : 'Tamper Detected / Inactive'}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <Smartphone className="h-3.5 w-3.5 text-slate-400" />
                {platformLabel} Profile
              </span>
              <span>•</span>
              <span>Downtime unlocks at 6:30 AM</span>
            </p>
          </div>
        </div>

        {isActive && (
          <div className="flex items-center gap-1.5 text-xs text-violet-800 font-medium bg-violet-100/70 px-3 py-1.5 rounded-lg border border-violet-200 self-start sm:self-auto">
            <ShieldCheck className="h-4 w-4 text-violet-700" />
            <span>Pact-as-Code Enforced</span>
          </div>
        )}
      </div>
    </div>
  );
}
