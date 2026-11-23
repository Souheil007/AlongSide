import type { Metadata } from 'next';
import { ReadinessWizardClient } from '@/components/quizzes/ReadinessWizardClient';

export const metadata: Metadata = {
  title: 'Device Readiness Check-In',
  description:
    'A calm, two-minute check-in on everyday screen transitions, sleep habits, online instincts, and family teamwork.',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReadinessAssessmentPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-[calc(100vh-8rem)] py-4 sm:py-8">
      <div className="mx-auto max-w-3xl">
        <ReadinessWizardClient childId={id} />
      </div>
    </div>
  );
}
