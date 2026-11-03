import type { Metadata } from 'next';
import { PactWizard } from '@/components/pacts/PactWizard';

export const metadata: Metadata = {
  title: 'Bilateral Family Pact Wizard — AlongSide Parent OS',
  description:
    'Co-negotiate family digital boundaries, configure the canonical 8:30 PM bedtime curfew, and seal with bilateral digital signatures.',
};

interface PageProps {
  searchParams: Promise<{ childId?: string }>;
}

export default async function PactBuilderPage({ searchParams }: PageProps) {
  const { childId } = await searchParams;

  return (
    <div className="py-6 sm:py-8">
      <PactWizard initialChildId={childId} />
    </div>
  );
}
