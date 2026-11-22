import { describe, expect, it, afterEach } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AcademyCategory,
  DevelopmentalTier,
  RoadType,
  type AcademyModuleDTO,
  type ChildDTO,
} from '@alongside/shared';
import { ActiveChapterContinueCard } from '../src/components/dashboard/ActiveChapterContinueCard';

const mockTeenMaya: ChildDTO = {
  id: 'child-maya-14',
  userId: 'parent-1',
  name: 'Maya',
  gender: 'FEMALE',
  birthYear: 2012,
  birthMonth: 5,
  age: 14,
  schoolGrade: '9th Grade',
  developmentalTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
  roadType: RoadType.ACTIVE_DEVICE,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const realModulesForTeen: AcademyModuleDTO[] = [
  {
    id: 'mod-real-teen-1',
    category: AcademyCategory.DIGITAL_AND_DEVICES,
    slug: 'teen-sleep-and-phone-dock',
    title: 'Protecting Teen Sleep Without Nightly Battles',
    summary: 'Build a neutral phone charging dock routine that honors circadian biology.',
    coverImageUrl: '/images/sleep.jpg',
    developmentalTier: DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
    sortOrder: 1,
    chapterCount: 2,
    lessonCount: 3,
    completedLessonCount: 1,
    isCompleted: false,
    lessons: [
      {
        id: 'les-1',
        moduleId: 'mod-real-teen-1',
        slug: 'why-teens-cannot-sleep-at-10pm',
        title: 'Melatonin Delay: Why 10 PM Feels Like Noon',
        readingMinutes: 4,
        sortOrder: 1,
        isCompleted: true,
      },
      {
        id: 'les-2',
        moduleId: 'mod-real-teen-1',
        slug: 'kitchen-charging-station',
        title: 'Kitchen Dock: Making the Boundary Neutral',
        readingMinutes: 5,
        sortOrder: 2,
        isCompleted: false,
      },
      {
        id: 'les-3',
        moduleId: 'mod-real-teen-1',
        slug: 'weekend-sleep-reset',
        title: 'Weekend Reset: Protecting Monday Mornings',
        readingMinutes: 3,
        sortOrder: 3,
        isCompleted: false,
      },
    ],
  },
];

describe('ActiveChapterContinueCard roadmap flash prevention', () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    if (originalWindow === undefined) {
      delete (globalThis as { window?: unknown }).window;
    } else {
      (globalThis as { window?: unknown }).window = originalWindow;
    }
  });

  it('shows a loading skeleton in the browser instead of flashing hardcoded fallback roadmap while modules load', () => {
    (globalThis as { window?: unknown }).window = {};
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const html = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ActiveChapterContinueCard child={mockTeenMaya} />
      </QueryClientProvider>
    );

    expect(html).toContain('data-testid="active-chapter-roadmap-skeleton"');
    // Must NOT flash the hardcoded TIER_4 fallback course or chapters while real data loads
    expect(html).not.toContain('Pubertal Circadian Delay &amp; Algorithmic Resistance');
    expect(html).not.toContain('Sleep Architecture');
    expect(html).not.toContain('Melatonin Shift');
  });

  it('renders the real curriculum roadmap immediately from module list lessons without waiting for a second detail query', () => {
    (globalThis as { window?: unknown }).window = {};
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    // Populate ONLY the tier modules list cache (no separate academy-module-detail cache)
    queryClient.setQueryData(
      ['active-chapter-modules', DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15],
      realModulesForTeen
    );

    const html = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ActiveChapterContinueCard child={mockTeenMaya} />
      </QueryClientProvider>
    );

    expect(html).not.toContain('data-testid="active-chapter-roadmap-skeleton"');
    expect(html).toContain('Protecting Teen Sleep Without Nightly Battles');
    expect(html).toContain('33% Completed (1 of 3 Lessons)');
    expect(html).toContain('Melatonin Delay');
    expect(html).toContain('Kitchen Dock');
    expect(html).toContain('Weekend Reset');
    expect(html).toContain('/academy/teen-sleep-and-phone-dock/kitchen-charging-station');
    // Hardcoded fallback must never leak in
    expect(html).not.toContain('Pubertal Circadian Delay &amp; Algorithmic Resistance');
  });
});
