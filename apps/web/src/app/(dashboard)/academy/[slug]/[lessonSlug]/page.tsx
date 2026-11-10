import type { Metadata } from 'next';
import { LessonReaderClient } from '@/components/academy/LessonReaderClient';

interface PageProps {
  params: Promise<{
    slug: string;
    lessonSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonSlug } = await params;
  const formattedTitle = lessonSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} — Academy Reader | AlongSide`,
    description: 'Distraction-free developmental lesson reader with actionable parent dialogue scripts.',
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonSlug } = await params;
  return <LessonReaderClient moduleSlug={slug} lessonSlug={lessonSlug} />;
}
