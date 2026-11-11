import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DevelopmentalTier } from '@alongside/shared';
import {
  BiteSizedCourseDetailView,
  resolveLessonTakeaway,
  formatSeconds,
} from '../src/components/academy/BiteSizedCourseDetailView';
import {
  MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
} from '../src/lib/api/mocks';

// Mock Next.js navigation and Link
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

describe('SOU-85 / SOU-102: Parent Academy Course Detail — Direction A2 Bite-Sized Micro-Stream', () => {
  const activeChildCalibrated = {
    id: 'child-1',
    name: 'Maya',
    age: 11,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  };

  describe('1. Takeaway & Empathetic Script Resolution', () => {
    it('resolves curated bedtime dock clinical script and outcome', () => {
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
      expect(takeaway.script).toContain('We protect your sleep because we love your growing brain');
    });

    it('resolves curated adrenarche script and neurobiology takeaway', () => {
      const takeaway = resolveLessonTakeaway({
        id: 'l-adrenarche',
        moduleId: 'm-1',
        slug: 'adrenarche-neurobiology',
        title: 'Adrenarche: The Biological Awakening to Peer Status',
        readingMinutes: 4,
        sortOrder: 1,
        isCompleted: true,
      });

      expect(takeaway.subtitle).toContain('biological awakening');
      expect(takeaway.script).toContain("I see you're overwhelmed right now");
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

    it('generates a graceful clinical fallback script for arbitrary custom lessons', () => {
      const takeaway = resolveLessonTakeaway({
        id: 'l-custom',
        moduleId: 'm-1',
        slug: 'custom-household-logistics',
        title: 'Calm Household Logistics',
        readingMinutes: 3,
        sortOrder: 2,
        isCompleted: false,
      });

      expect(takeaway.subtitle).toContain('calm household logistics');
      expect(takeaway.script).toContain('one calm breath and work through it together');
    });

    it('formats seconds into clean M:SS representation', () => {
      expect(formatSeconds(0)).toBe('0:00');
      expect(formatSeconds(35)).toBe('0:35');
      expect(formatSeconds(105)).toBe('1:45');
      expect(formatSeconds(110)).toBe('1:50');
    });
  });

  describe('2. Header Bar & Progress Telemetry', () => {
    it('renders top navigation with Parent Academy return link and compact progress count', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('Parent Academy');
      // 1 completed lesson out of 4 in canonical MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR
      expect(html).toContain('1 of 4 done');
      expect(html).toContain('~12m left');
    });
  });

  describe('3. Masthead Decluttering & Redundancy Removal', () => {
    it('renders Newsreader serif title without age mention and concise outcome summary', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('Tween Adrenarche &amp; Emotional Volatility');
      expect(html).toContain(MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.summary);
    });

    it('does not display redundant child calibration info or stage match line', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).not.toContain('data-testid="active-child-stage-match"');
      expect(html).not.toContain('Calibrated for Maya');
      expect(html).not.toContain('Tier 3: Pathfinder');
    });

    it('does not display redundant 3 Core Course Takeaways card', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).not.toContain('data-testid="core-takeaways-card"');
      expect(html).not.toContain('3 Core Course Takeaways');
      expect(html).not.toContain('1. Biological Root');
      expect(html).not.toContain('2. Verbatim Scripts');
      expect(html).not.toContain('3. Action Protocol');
    });
  });

  describe('4. Unified Course Curriculum Stream & In-Place Focus Card (Zero Parts)', () => {
    it('renders unified curriculum list without artificial Part 1 or Part 2 sections', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('Course Curriculum');
      expect(html).toContain('3 lessons remaining');
      expect(html).toContain('data-testid="curriculum-lessons-list"');
      expect(html).not.toContain('Part 1');
      expect(html).not.toContain('Part 2');
      expect(html).not.toContain('Open in box');
    });

    it('elevates next active lesson in place with hero focus card details', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('data-testid="hero-focus-card"');
      expect(html).toContain("Tonight&#x27;s Objective");
      expect(html).toContain('2. Adrenarche &amp; DHEA: The Hidden Hormonal Engine of Mood Swings');
      expect(html).toContain('Empathetic Script to Use');
      expect(html).toContain('Start Lesson 2 (4 min)');
    });

    it('removes audio toggle from course detail view per decluttering mandate', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      // Audio briefing removed from course detail view; placed inside lesson reader directly
      expect(html).not.toContain('data-testid="audio-briefing-toggle"');
      expect(html).not.toContain('spoken-audio-briefing-panel');
    });

    it('renders completed lessons with muted grey styling and reduced visibility', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      // Lesson 1 is completed in MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR
      expect(html).toContain('opacity-60');
      expect(html).toContain('line-through');
      expect(html).toContain('Completed');
    });

    it('renders all course lessons sequentially in the stream', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('1. The Non-Reactive Neutral Stance');
      expect(html).toContain('2. Adrenarche &amp; DHEA');
      expect(html).toContain('3. The Car-Ride Protocol');
      expect(html).toContain('4. Respectful Repair Contracts');
    });
  });

  describe('5. Edge Cases & Reassurance Footer', () => {
    it('renders pediatric evidence reassurance footer', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain(
        'Evidence-based pediatric framework · Dr. Aris Thorne, MD'
      );
    });

    it('handles fully completed course with review mode hero card', () => {
      const completedModule = {
        ...MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
        isCompleted: true,
        completedLessonCount: 4,
        lessons: MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.lessons.map((l) => ({
          ...l,
          isCompleted: true,
        })),
      };

      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={completedModule}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('Course Completed · Review');
      expect(html).toContain('Review Lesson');
      expect(html).toContain('All complete');
    });

    it('handles fresh unstarted course (0 completed lessons)', () => {
      const unstartedModule = {
        ...MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
        isCompleted: false,
        completedLessonCount: 0,
        lessons: MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.lessons.map((l) => ({
          ...l,
          isCompleted: false,
        })),
      };

      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={unstartedModule}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain("Tonight&#x27;s Objective");
      expect(html).toContain('Start Lesson 1');
      expect(html).toContain('4 lessons remaining');
    });

    it('displays dynamic progress telemetry and remaining count matching actual course state', () => {
      const partialModule = {
        ...MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
        isCompleted: false,
        completedLessonCount: 1,
        lessons: [
          {
            id: 'les-1',
            moduleId: 'mod-1',
            slug: 'lesson-1',
            title: 'First Step',
            readingMinutes: 4,
            sortOrder: 1,
            isCompleted: true,
          },
          {
            id: 'les-2',
            moduleId: 'mod-1',
            slug: 'lesson-2',
            title: 'Second Step',
            readingMinutes: 5,
            sortOrder: 2,
            isCompleted: false,
          },
          {
            id: 'les-3',
            moduleId: 'mod-1',
            slug: 'lesson-3',
            title: 'Third Step',
            readingMinutes: 3,
            sortOrder: 3,
            isCompleted: false,
          },
          {
            id: 'les-4',
            moduleId: 'mod-1',
            slug: 'lesson-4',
            title: 'Fourth Step',
            readingMinutes: 4,
            sortOrder: 4,
            isCompleted: false,
          },
        ],
      };

      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={partialModule}
          activeChild={activeChildCalibrated}
        />
      );

      // 1 of 4 done • ~12m left
      expect(html).toContain('1 of 4 done');
      expect(html).toContain('~12m left');
      // 3 uncompleted lessons remaining across the course
      expect(html).toContain('3 lessons remaining');
      // Hero card opens for first uncompleted lesson (Lesson 2)
      expect(html).toContain('2. Second Step');
      expect(html).toContain('Start Lesson 2');
    });
  });
});
