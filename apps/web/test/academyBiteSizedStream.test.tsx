import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DevelopmentalTier } from '@alongside/shared';
import {
  BiteSizedCourseDetailView,
  resolveLessonTakeaway,
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

describe('SOU-85: Parent Academy Course Detail — Direction A2 Bite-Sized Micro-Stream', () => {
  const activeChildCalibrated = {
    id: 'child-1',
    name: 'Maya',
    age: 11,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  };

  const activeChildMismatch = {
    id: 'child-2',
    name: 'Sammy',
    age: 5,
    developmentalTier: DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
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

    it('generates a graceful clinical fallback script for arbitrary custom lessons', () => {
      const takeaway = resolveLessonTakeaway({
        id: 'l-custom',
        moduleId: 'm-1',
        slug: 'custom-potty-training-routine',
        title: 'Gentle Potty Transitions',
        readingMinutes: 3,
        sortOrder: 2,
        isCompleted: false,
      });

      expect(takeaway.subtitle).toContain('gentle potty transitions');
      expect(takeaway.script).toContain('We are a team figuring this out together');
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
      // 2 completed lessons out of 6 in MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR
      expect(html).toContain('2 of 6 done');
      expect(html).toContain('~16m left');
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

  describe('4. Part 1 · Quick Wins for Tonight (Hero Card & Completed Checklist)', () => {
    it('renders completed lessons in the compact checklist box with review links', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('data-testid="completed-checklist"');
      expect(html).toContain('1. Adrenarche: The Biological Awakening to Peer Status');
      expect(html).toContain('2. De-escalating Amygdala Spikes: The 3-Step Pause');
      expect(html).toContain('Review');
    });

    it('elevates next active lesson into the Tonight Focus Hero Card', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('data-testid="hero-focus-card"');
      expect(html).toContain("Tonight&#x27;s Objective");
      expect(html).toContain('3. Neutralizing Eye-Rolls: The Non-Defensive Dialogue');
      expect(html).toContain('Empathetic Script to Use');
      expect(html).toContain('Start Lesson 3 (4 min)');
    });

    it('renders audio briefing button with audio icon and duration', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('data-testid="audio-briefing-toggle"');
      expect(html).toContain('Audio (1:45)');
    });
  });

  describe('5. Part 2 · Habits for this Weekend', () => {
    it('renders fluid, borderless/clean rows for upcoming lessons', () => {
      const html = renderToStaticMarkup(
        <BiteSizedCourseDetailView
          module={MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR}
          activeChild={activeChildCalibrated}
        />
      );

      expect(html).toContain('Part 2 · Habits for this Weekend');
      // Lessons 4, 5, 6 in Part 2
      expect(html).toContain('The Post-School Decompression Sanctuary');
      expect(html).toContain('Group Chat Friction &amp; The Agony of Unread Messages');
      expect(html).toContain('The Non-Punitive Relational Repair Blueprint');
    });
  });

  describe('6. Edge Cases & Reassurance Footer', () => {
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
        completedLessonCount: 6,
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
    });

    it('handles fresh unstarted course (0 completed lessons) without showing empty checklist', () => {
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

      expect(html).not.toContain('data-testid="completed-checklist"');
      expect(html).toContain("Tonight&#x27;s Objective");
      expect(html).toContain('Start Lesson 1');
    });
  });
});
