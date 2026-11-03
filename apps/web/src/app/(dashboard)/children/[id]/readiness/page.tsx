import type { Metadata } from 'next';
import { ReadinessWizardClient } from '@/components/quizzes/ReadinessWizardClient';

export const metadata: Metadata = {
  title: 'First-Phone Readiness Assessment • AlongSide',
  description:
    '10-dimension holistic evaluation of adolescent impulse control, bedtime sleep, and digital hazard awareness.',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReadinessAssessmentPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-4xl mx-auto">
        <ReadinessWizardClient childId={id} />
      </div>
    </div>
  );
}
