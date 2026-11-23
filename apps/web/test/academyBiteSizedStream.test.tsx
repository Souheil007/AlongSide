import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DevelopmentalTier, Gender } from '@alongside/shared';
import {
  BiteSizedCourseDetailView,
  resolveLessonTakeaway,
  formatSeconds,
} from '../src/components/academy/BiteSizedCourseDetailView';
import { MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR } from '../src/lib/api/mocks';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/academy/behavior-tween-adrenarche',
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('PLAN-48: Parent Academy Course Detail - Interactive Almanac v2 Episode Arc', () => {
  const activeChildCalibrated = {
    id: 'child-1',
    name: 'Maya',
    gender: Gender.FEMALE,
    age: 11,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  };

  describe('1. Takeaway & Empathetic Script Resolution Helpers', () => {
    it('resolves curated bedtime dock script and outcome', () => {
      const takeaway = resolveLessonTakeaway({
        id: 'l-bedtime',
        moduleId: 'm-1',
        slug: 'bedtime-dock-protocol',
        title: 'The 8:30 PM Bedtime Dock Protocol',
        readingMinutes: 3,
        sortOrder: 3,
        isCompleted: false,
      });

      expect(takeaway.subtitle).toContain('living-room charging station');
      expect(takeaway.script).toContain(
        'We protect your sleep because we love your growing brain'
      );
    });

    it('resolves explicit empatheticScript when present on lesson summary', () => {
      const takeaway = resolveLessonTakeaway({
        id: 'l-explicit',
        moduleId: 'm-1',
        slug: 'explicit-script-lesson',
        title: 'Explicit Script Lesson',
        readingMinutes: 3,
        sortOrder: 2,
        isCompleted: false,
        empatheticScript: 'I am right here with you through every bump.',
      });

      expect(takeaway.script).toBe('I am right here with you through every bump.');
    });

    it('formats seconds into clean M:SS representation', () => {
      expect(formatSeconds(0)).toBe('0:00');
      expect(formatSeconds(35)).toBe('0:35');
      expect(formatSeconds(105)).toBe('1:45');
    });
  });

  describe('2. Almanac Course Arc Layout, Distinct Episode Roles & Featured Video Shelf', () => {
    it('renders top telemetry, Newsreader masthead, distinct episode role labels, and direct episode links', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('Parent Academy');
      expect(html).toContain('1 of 4 done');
      expect(html).toContain('~12m left');
      expect(html).toContain('4-Episode Course Arc');
      expect(html).toContain('Tween Adrenarche &amp; Emotional Volatility');

      // Distinct episode roles from PLAN-46/48
      expect(html).toContain('Episode 1 · The Fast Win');
      expect(html).toContain('Episode 2 · The Brain Decoder');
      expect(html).toContain('Episode 3 · The Rhythm Reset');
      expect(html).toContain('Episode 4 · The Long-Term Bond');

      // Interactive highlight tags & status badges
      expect(html).toContain('Brain Bridge Toggle');
      expect(html).toContain('Saved');
      expect(html).toContain('Up Next');
      expect(html).toContain('Start Episode');
      expect(html).toContain('Review');

      // Direct link hrefs into episodes
      expect(html).toContain(
        'href="/academy/behavior-tween-adrenarche/tween-adrenarche-and-dhea-neurobiology"'
      );
    });

    it('renders bottom-only Optional Course Master Talk Shelf when featuredVideoLecture exists', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('data-testid="almanac-video-shelf"');
      expect(html).toContain('Optional · Course Master Talk');
      expect(html).toContain('data-testid="video-jump-chip-0"');
      expect(html).toContain('2:00');

      // Video appears strictly BELOW the curriculum list
      const listIdx = html.indexOf('data-testid="curriculum-lessons-list"');
      const videoIdx = html.indexOf('data-testid="almanac-video-shelf"');
      expect(listIdx).toBeGreaterThan(-1);
      expect(videoIdx).toBeGreaterThan(listIdx);
    });

    it('handles fully completed 3-episode course cleanly without bottom video if none set', () => {
      const threeEpCompleted = {
        ...MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
        featuredVideoLecture: null,
        isCompleted: true,
        lessonCount: 3,
        completedLessonCount: 3,
        lessons: MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.lessons
          .slice(0, 3)
          .map((l) => ({
            ...l,
            isCompleted: true,
          })),
      };

      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={threeEpCompleted}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('3-Episode Course Arc');
      expect(html).toContain('3 of 3 done');
      expect(html).toContain('All episodes saved');
      expect(html).not.toContain('data-testid="almanac-video-shelf"');
    });
  });
});
