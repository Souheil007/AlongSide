import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DevelopmentalTier,
  RoadType,
  type ChildDTO,
  type AcademyModuleDTO,
} from '@alongside/shared';
import { ActiveChapterContinueCard } from '../src/components/dashboard/ActiveChapterContinueCard';
import { ModuleCard } from '../src/components/academy/ModuleCard';

describe('Child placeholder interpolation on homepage and Academy (SOU issue)', () => {
  const toddlerLeo: ChildDTO = {
    id: 'child-leo-123',
    userId: 'parent-user-456',
    name: 'Leo',
    gender: 'MALE',
    birthYear: 2023,
    birthMonth: 4,
    age: 3,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    roadType: RoadType.PRE_DEVICE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const sampleModuleWithPlaceholders: AcademyModuleDTO = {
    id: 'mod-media-audit-123',
    slug: 'digital-older-toddler-audiobooks-and-co-viewing',
    title: 'Calm Shows, Audio Stories & Screen Peace for {Name}',
    summary:
      'Spot the rapid scene-cut trap in modern kids’ cartoons using a 2-minute pacing audit, build screen-free quiet time with toddler audiobooks, and turn occasional shared viewing into rich conversation with {name}.',
    category: 'DIGITAL_AND_DEVICES' as any,
    developmentalTier: DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3,
    chapterCount: 1,
    lessonCount: 1,
    sortOrder: 1,
    completedLessonCount: 0,
    isCompleted: false,
    lessons: [
      {
        id: 'lesson-slow-paced-audit',
        moduleId: 'mod-media-audit-123',
        chapterId: 'chap-1',
        slug: 'older-toddler-slow-paced-media-audit',
        title: 'Why Some Shows Leave {Name} Wired (And How to Pick Calm Ones)',
        readingMinutes: 3,
        sortOrder: 1,
        isCompleted: false,
      },
    ],
  };

  it('interpolates {Name} and {name} in ActiveChapterContinueCard on homepage for logged in child', () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    // Prime the tier modules cache
    queryClient.setQueryData(
      ['active-chapter-modules', DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3],
      [sampleModuleWithPlaceholders]
    );

    const html = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ActiveChapterContinueCard child={toddlerLeo} />
      </QueryClientProvider>
    );

    // Verify course and lesson titles are interpolated with Leo
    expect(html).toContain('Calm Shows, Audio Stories &amp; Screen Peace for Leo');
    expect(html).toContain('Why Some Shows Leave Leo Wired (And How to Pick Calm Ones)');
    expect(html).toContain('rich conversation with Leo.');

    // Crucial: Must NEVER contain raw placeholder brackets
    expect(html).not.toContain('{Name}');
    expect(html).not.toContain('{name}');
  });

  it('interpolates fallback stage label when no child profile is active on homepage', () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    queryClient.setQueryData(
      ['active-chapter-modules', DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3],
      [sampleModuleWithPlaceholders]
    );

    const html = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ActiveChapterContinueCard child={null} />
      </QueryClientProvider>
    );

    // Must gracefully fall back to developmental stage and never leak raw placeholders
    expect(html).not.toContain('{Name}');
    expect(html).not.toContain('{name}');
  });

  it('interpolates {Name} in ModuleCard in Academy catalog when child is provided', () => {
    const html = renderToStaticMarkup(
      <ModuleCard module={sampleModuleWithPlaceholders} child={toddlerLeo} />
    );

    expect(html).toContain('Calm Shows, Audio Stories &amp; Screen Peace for Leo');
    expect(html).toContain('rich conversation with Leo.');
    expect(html).not.toContain('{Name}');
    expect(html).not.toContain('{name}');
  });
});
