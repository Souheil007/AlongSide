import type { Metadata } from 'next';
import { PactDetailView } from '@/components/pacts/PactDetailView';

export const metadata: Metadata = {
  title: 'Family Tech Treaty',
  description:
    '1-page refrigerator-ready physical family agreement layout with bilateral signatures, 8:30 PM bedtime curfew, and Alongside seal.',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PactDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="py-6 sm:py-8">
      <PactDetailView agreementId={id} />
    </div>
  );
}
