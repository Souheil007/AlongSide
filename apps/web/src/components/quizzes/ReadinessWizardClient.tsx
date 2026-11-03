'use client';

import * as React from 'react';
import Link from 'next/link';
import { useChild } from '@/hooks/useChildren';
import { ReadinessWizard } from './ReadinessWizard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowLeft, Loader2, UserX } from 'lucide-react';

export interface ReadinessWizardClientProps {
  childId: string;
}

export function ReadinessWizardClient({ childId }: ReadinessWizardClientProps) {
  const { child, isLoading, isError, error } = useChild(childId);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <p className="text-sm font-medium text-slate-600">
          Loading child profile and assessment data...
        </p>
      </div>
    );
  }

  if (isError || !child) {
    return (
      <Card className="max-w-md mx-auto my-12 border-slate-200">
        <CardContent className="pt-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <UserX className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Child Profile Not Found</h3>
            <p className="text-sm text-slate-500">
              {error?.message || 'We could not retrieve the requested child profile.'}
            </p>
          </div>
          <div className="pt-2">
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <Link href={`/dashboard?childId=${child.id}`}>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-slate-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <span className="text-xs text-slate-500 font-medium">
          Road 1 • Readiness Protocol
        </span>
      </div>

      <ReadinessWizard child={child} childId={child.id} childName={child.name} />
    </div>
  );
}
