'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { useChild } from '@/hooks/useChildren';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { ReadinessWizard } from './ReadinessWizard';
import { ReadinessScoreCard } from './ReadinessScoreCard';
import { calculateReadinessScore, ReadinessPreset } from '@alongside/shared';

export interface ChildReadinessAssessmentViewProps {
  childId: string;
}

export function ChildReadinessAssessmentView({
  childId,
}: ChildReadinessAssessmentViewProps) {
  const { child, isLoading, isError, refetchChild } = useChild(childId);
  const [forceRetake, setForceRetake] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
        <p className="text-sm text-slate-600 font-medium">
          Loading child profile and readiness assessment...
        </p>
      </div>
    );
  }

  if (isError || !child) {
    return (
      <Card className="max-w-lg mx-auto text-center p-8 space-y-4">
        <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Child Profile Not Found</h3>
          <p className="text-sm text-slate-600">
            We couldn&apos;t load the profile for this assessment. It may have been removed or you may need to log in again.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="outline" onClick={() => refetchChild()} className="gap-1.5">
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </Card>
    );
  }

  // If child already has completed assessment score and not forcing retake
  const hasExistingScore =
    child.latestAssessmentScore !== null &&
    child.latestAssessmentScore !== undefined &&
    !forceRetake;

  if (hasExistingScore) {
    // Generate simulated dimension breakdown matching the existing score for presentation
    const mockExistingResult = calculateReadinessScore([
      { questionId: 'q1', dimensionKey: 'executive_function', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q2', dimensionKey: 'online_safety', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q3', dimensionKey: 'bedtime_habits', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q4', dimensionKey: 'peer_pressure_resilience', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q5', dimensionKey: 'emotional_regulation', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q6', dimensionKey: 'family_communication', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q7', dimensionKey: 'screen_time_balance', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q8', dimensionKey: 'critical_thinking', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q9', dimensionKey: 'privacy_awareness', score: (child.latestAssessmentScore! / 100) * 10 },
      { questionId: 'q10', dimensionKey: 'co_regulation_readiness', score: (child.latestAssessmentScore! / 100) * 10 },
    ]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setForceRetake(true)}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retake Full Assessment
          </Button>
        </div>

        <ReadinessScoreCard
          childName={child.name}
          result={mockExistingResult}
          onRetake={() => setForceRetake(true)}
          dashboardHref="/dashboard"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>
        <Badge variant="roadPre" className="text-xs">
          Road 1: Pre-Device Preparation
        </Badge>
      </div>

      {/* Main Wizard */}
      <ReadinessWizard
        child={child}
        onCompleted={() => {
          refetchChild();
        }}
      />
    </div>
  );
}
