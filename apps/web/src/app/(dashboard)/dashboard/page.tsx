import type { Metadata } from 'next';
import { ParentDashboard } from '@/components/dashboard/ParentDashboard';

export const metadata: Metadata = {
  title: 'Parent Dashboard • AlongSide Family Operating System',
  description:
    'Monitor readiness milestones, bedtime curfew status, and bilateral agreements across your children.',
};

interface PageProps {
  searchParams?: Promise<{ childId?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50/40">
      <ParentDashboard initialChildId={resolvedSearchParams?.childId} />
    </div>
  );
}
