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

  describe('1. Comparative Dialogue Table (What NOT to Say vs What to Say Instead)', () => {
    it('renders the comparative dialogue table with distinctive side-by-side containers', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      // Verify table wrapper is present with data-testid
      expect(html).toContain('data-testid="comparative-dialogue-table"');

      // Header label
      expect(html).toContain('Comparative Dialogue');
      expect(html).toContain('Verbatim Script Vault');

      // What NOT to Say box (red-tinted)
      expect(html).toContain('data-testid="what-not-to-say-box"');
      expect(html).toContain('What NOT to Say (Instinctive Reaction)');
      expect(html).toContain('Calm down right now or you are losing your phone for a week!');
      expect(html).toContain('bg-rose-50/50');
      expect(html).toContain('border-rose-400');

      // What to Say Instead box (green/emerald-tinted)
      expect(html).toContain('data-testid="what-to-say-instead-box"');
      expect(html).toContain('What to Say Instead (Co-Regulation)');
      expect(html).toContain('bg-emerald-50/50');
      expect(html).toContain('border-emerald-500');
    });

    it('falls back to canonical defaults when lesson does not specify whatNotToSay', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: MOCK_LESSON_DETAIL_ADRENARCHE,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).toContain('data-testid="comparative-dialogue-table"');
      expect(html).toContain('Stop overreacting! You are making a huge deal out of nothing.');
    });
  });

  describe('2. Delivery Tip Badge & Vocal Posture Guidance', () => {
    it('renders delivery tip badge with vocal cadence and posture guidance', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      // Delivery tip badge with testid
      expect(html).toContain('data-testid="delivery-tip-badge"');
      expect(html).toContain('Delivery Tip (Vocal Cadence &amp; Posture)');
      expect(html).toContain(
        'Drop voice pitch 20%, unhurried 3-second pause, and sit down to remove perceived towering dominance.'
      );
    });

    it('renders default delivery tip when deliveryTip is unspecified', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: MOCK_LESSON_DETAIL_ADRENARCHE,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).toContain('data-testid="delivery-tip-badge"');
      expect(html).toContain(
        'Lower your voice tone, unhurried cadence, and match eye level before speaking.'
      );
    });
  });

  describe('3. Copy Dialogue Script Action', () => {
    it('renders copy script button with accessibility label and icon', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).toContain('data-testid="copy-script-btn"');
      expect(html).toContain('aria-label="Copy dialogue script to clipboard"');
      expect(html).toContain('Copy Script');
    });
  });

  describe('4. Practice with AI Advisor Integration', () => {
    it('renders "Practice with AI Advisor" button with pre-populated prompt parameter', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).toContain('data-testid="practice-with-ai-advisor-btn"');
      expect(html).toContain('Practice with AI Advisor');
      expect(html).toContain('/advisor?prompt=');

      // Verify the link includes the lesson title in the roleplay prompt
      const expectedEncodedTitle = encodeURIComponent(
        `I want to roleplay practicing the communication script from the lesson "${editorialLesson.title}". Can you play the role of the child so I can practice my empathetic response?`
      );
      expect(html).toContain(expectedEncodedTitle);
    });
  });

  describe('5. Semantic Markdown Parsing (Clinical Insights & Action Checklist)', () => {
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

    it('renders complete lesson and continue button', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: editorialLesson,
          moduleSlug: 'behavior-tween-adrenarche',
          moduleTitle: 'Tween Adrenarche & Emotional Volatility',
        })
      );

      expect(html).toContain('Complete Lesson &amp; Continue');
    });
  });
});
