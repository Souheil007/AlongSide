import type { Metadata } from 'next';
import { DevicesManagementView } from '@/components/devices/DevicesManagementView';

export const metadata: Metadata = {
  title: 'Modern World & Devices Hub — AlongSide Family Operating System',
  description:
    'Readiness diagnostic scoring, bilateral family pacts, automated 8:30 PM curfews, and Sunday youth culture digest.',
};

interface PageProps {
  searchParams?: Promise<{ tab?: string; childId?: string }>;
}

export default async function DevicesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <div className="py-6 sm:py-8">
      <DevicesManagementView initialTab={resolvedSearchParams?.tab || 'curfews'} />
    </div>
  );
}
