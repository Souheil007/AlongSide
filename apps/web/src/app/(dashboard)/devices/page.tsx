import type { Metadata } from 'next';
import { DevicesManagementView } from '@/components/devices/DevicesManagementView';

export const metadata: Metadata = {
  title: 'Device Safety & Parental Controls',
  description:
    'Check whether your child is ready for a phone and configure built-in Apple Screen Time, Google Family Link, Roblox, YouTube, and Safe DNS parental controls.',
};

interface PageProps {
  searchParams?: Promise<{ tab?: string; childId?: string }>;
}

export default async function DevicesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <div className="py-4 sm:py-8">
      <DevicesManagementView initialTab={resolvedSearchParams?.tab || 'controls'} />
    </div>
  );
}
