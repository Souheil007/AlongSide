import type { Metadata } from 'next';
import { PactWizard } from '@/components/pacts/PactWizard';

export const metadata: Metadata = {
  title: 'Family Pact Wizard',
  description:
    'Sit together, trade real promises, set a calm bedtime dock time, and sign a bilateral family tech agreement.',
};

interface PageProps {
  searchParams: Promise<{ childId?: string; preset?: string }>;
}

export default async function PactBuilderPage({ searchParams }: PageProps) {
  const { childId, preset } = await searchParams;

  return (
    <div className="py-4 sm:py-8">
      <PactWizard initialChildId={childId} initialPreset={preset} />
    </div>
  );
}
