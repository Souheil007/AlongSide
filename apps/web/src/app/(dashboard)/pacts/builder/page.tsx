import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ childId?: string }>;
}

export default async function PactBuilderRedirectPage({ searchParams }: PageProps) {
  const { childId } = await searchParams;
  const target = childId
    ? `/devices?tab=controls&childId=${encodeURIComponent(childId)}`
    : '/devices?tab=controls';
  redirect(target);
}
