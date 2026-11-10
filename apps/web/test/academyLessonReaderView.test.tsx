import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  AcademyCategory,
  DevelopmentalTier,
  ChapterPriority,
  type AcademyLessonDTO,
} from '@alongside/shared';
import { LessonReaderView } from '../src/components/academy/LessonReaderView';
import { MOCK_LESSON_DETAIL_ADRENARCHE } from '../src/lib/api/mocks';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/academy/behavior-tween-adrenarche/adrenarche-neurobiology',
}));

describe('Plan 37: Parent Intelligence Academy LessonReaderView Editorial UI Specification', () => {
  const editorialLesson: AcademyLessonDTO = {
    id: 'les-comparative-dialogue-test',
    moduleId: 'mod-behavior-tween',
    chapterId: 'ch-tween-p1',
    slug: 'comparative-dialogue-mastery',
    title: 'De-escalating the Meltdown with Co-Regulation',
    readingMinutes: 4,
    sortOrder: 1,
    isCompleted: false,
    whatNotToSay: 'Calm down right now or you are losing your phone for a week!',
    deliveryTip: 'Drop voice pitch 20%, unhurried 3-second pause, and sit down to remove perceived towering dominance.',
    contentMarkdown: `When a tween nervous system is in acute dysregulation, instinctive parental corrections invariably trigger defiance.

> **Clinical Insight:** The prefrontal cortex temporarily decouples from limbic command during adrenarche emotional surges. Correcting facts while adrenaline is elevated forces the autonomic nervous system into fight-or-flight defense.

### Comparative Dialogue Protocol

What NOT to Say: "Calm down right now or you are losing your phone for a week!"
What to Say Instead: "I can see how overwhelming this is right now. You are safe. We will pause and figure this out together once your nervous system feels calm."

### Action Protocol Checklist
- [ ] Drop physical eye level below the child's line of sight.
- [ ] Take a slow 2-part physiological sigh before responding.
- [ ] Postpone analytical problem-solving for at least 20 minutes.`,
    module: {
      id: 'mod-behavior-tween',
      slug: 'behavior-tween-adrenarche',
      title: 'Tween Adrenarche & Emotional Volatility',
      developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
      category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    },
    chapter: {
      id: 'ch-tween-p1',
      slug: 'adrenarche-and-mood-friction',
      title: 'Chapter 1: The Adrenarche Biological Shift',
      priority: ChapterPriority.PRIORITY_1_CRITICAL,
    },
  };

  describe('1. Removal of Overwhelming Comparative Dialogue', () => {
    it('does not render the comparative dialogue table to keep the lesson calm and focused', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      // Verify comparative dialogue table and script vault are removed to prevent overwhelm
      expect(html).not.toContain('data-testid="comparative-dialogue-table"');
      expect(html).not.toContain('Verbatim Script Vault');
      expect(html).not.toContain('data-testid="what-not-to-say-box"');
      expect(html).not.toContain('data-testid="what-to-say-instead-box"');
    });

    it('does not render comparative dialogue even with fallback lesson data', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: MOCK_LESSON_DETAIL_ADRENARCHE,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).not.toContain('data-testid="comparative-dialogue-table"');
    });
  });

  describe('2. Decluttering: Removal of Practice with AI Advisor Button', () => {
    it('does not render "Practice with AI Advisor" button to eliminate user overwhelm', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).not.toContain('data-testid="practice-with-ai-advisor-btn"');
      expect(html).not.toContain('Practice with AI Advisor');
    });
  });

  describe('3. Action Footer & Navigation Buttons', () => {
    it('renders "Complete Lesson" button without "& Continue"', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).toContain('Complete Lesson');
      expect(html).not.toContain('&amp; Continue');
      expect(html).not.toContain('& Continue');
    });

    it('renders next and previous navigation buttons in the footer', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
          prevLesson: {
            id: 'les-prev',
            moduleId: 'mod-behavior-tween',
            slug: 'previous-lesson',
            title: 'Foundational Somatic Regulation',
            readingMinutes: 3,
            sortOrder: 0,
            isCompleted: true,
          },
          nextLesson: {
            id: 'les-next',
            moduleId: 'mod-behavior-tween',
            slug: 'next-lesson',
            title: 'Repairing Ruptures Calmly',
            readingMinutes: 4,
            sortOrder: 2,
            isCompleted: false,
          },
        })
      );

      expect(html).toContain('Previous Lesson');
      expect(html).toContain('Foundational Somatic Regulation');
      expect(html).toContain('Next Prioritized Lesson');
      expect(html).toContain('Repairing Ruptures Calmly');
    });
  });

  describe('4. Semantic Markdown Compilation (Headers, Lists, and Inline Bold)', () => {
    it('renders Developmental / Clinical Insight callout card with pediatric neurobiology styling', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).toContain('aria-label="Developmental Insight Callout"');
      expect(html).toContain('Pediatric Neurobiology · Developmental Insight');
      expect(html).toContain(
        'The prefrontal cortex temporarily decouples from limbic command'
      );
    });

    it('renders interactive action protocol checklist items', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).toContain('Action Protocol Checklist');
      expect(html).toContain("Drop physical eye level below the child&#x27;s line of sight.");
      expect(html).toContain('Take a slow 2-part physiological sigh before responding.');
      expect(html).toContain('Postpone analytical problem-solving for at least 20 minutes.');
    });

    it('compiles markdown headers and inline bold text in action protocols without showing raw markdown syntax', () => {
      const rawMarkdownLesson: AcademyLessonDTO = {
        ...editorialLesson,
        id: 'les-raw-md-test',
        contentMarkdown: `#### Recommended Action Protocol: 1. **Notice the Physical Baseline:** Observe autonomic nervous system indicators (breathing rate, posture, muscle tone). 2. **De-escalate Before Reasoning:** Do not offer logical debate or explanations while emotional arousal is elevated. 3. **Establish Clear, Calm Boundaries:** Pair unwavering physical boundaries with unconditional emotional warmth.`,
      };

      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: rawMarkdownLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      // Verify raw markdown is compiled and not displayed raw
      expect(html).not.toContain('####');
      expect(html).not.toContain('**Notice');
      expect(html).toContain('Recommended Action Protocol');
      expect(html).toContain('<strong class="font-bold text-slate-900">Notice the Physical Baseline:</strong>');
      expect(html).toContain('<strong class="font-bold text-slate-900">De-escalate Before Reasoning:</strong>');
      expect(html).toContain('<strong class="font-bold text-slate-900">Establish Clear, Calm Boundaries:</strong>');
      expect(html).toContain('<ol class="list-decimal');
    });
  });
});
