import type { Metadata } from 'next';
import { ModuleDetailClient } from '@/components/academy/ModuleDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} — Parent Intelligence Academy`,
    description: 'Explore lessons and communication scripts for this neurodevelopmental milestone.',
  };
}

export default async function ModuleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ModuleDetailClient slug={slug} />;
}
