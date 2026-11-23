'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, UserX } from 'lucide-react';
import { useChild } from '@/hooks/useChildren';
import { ReadinessWizard } from './ReadinessWizard';
import { Button } from '@/components/ui/Button';

export interface ReadinessWizardClientProps {
  childId: string;
}

export function ReadinessWizardClient({ childId }: ReadinessWizardClientProps) {
  const { child, isLoading, isError, error } = useChild(childId);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-3 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--spruce)]" aria-hidden="true" />
        <p className="text-sm text-[var(--body)]">
          Preparing readiness check-in...
        </p>
      </div>
    );
  }

  if (isError || !child) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-[16px] border border-[var(--hairline)] bg-[var(--elevated)] p-8 text-center space-y-4">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[var(--canvas-subtle)] text-[var(--body)]">
          <UserX className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <h2 className="font-serif-almanac text-xl font-semibold text-[var(--ink)]">
            Child profile not found
          </h2>
          <p className="text-sm leading-relaxed text-[var(--body)]">
            {error?.message || 'We could not load this child profile right now.'}
          </p>
        </div>
        <div className="pt-2">
          <Link href="/devices">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Devices
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/devices"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[var(--body)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Devices</span>
        </Link>
        <span className="text-[13px] text-[var(--mute)] tabular-nums">
          {child.name} · Age {child.age} · ~2 min check-in
        </span>
      </div>

      <ReadinessWizard child={child} childId={child.id} childName={child.name} />
    </div>
  );
}
