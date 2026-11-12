import { describe, expect, it, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  AcademyCategory,
  DevelopmentalTier,
  ChapterPriority,
  type AcademyLessonDTO,
} from '@alongside/shared';
import { LessonReaderView } from '../src/components/academy/LessonReaderView';
import {
  LessonReliefMasthead,
  LessonThirtySecondGlance,
  LessonDialogueDeck,
  LessonActionChecklist,
  LessonToolBridges,
  LessonFooterNav,
  NightstandModeToggle,
  AudioMemoPlayer,
  ScrollProgressBar,
} from '../src/components/academy/reader';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/academy/behavior-toddler-tantrums/amygdala-surge',
}));

describe('Plan 38: Multi-Modal Lesson Reader & Cognitive Ergonomics Architecture', () => {
  const multiModalLesson: AcademyLessonDTO = {
    id: 'les-plan-38-multi-modal',
    moduleId: 'mod-behavior-toddler',
    chapterId: 'ch-toddler-coregulation',
    slug: 'amygdala-surge',
    title: 'The Immature Amygdala: Why Toddlers Melt Down & How to Anchor Calm',
    readingMinutes: 3,
    sortOrder: 1,
    isCompleted: false,
    reliefTagline: '💡 Why this is 100% normal at 24 months, not a discipline failure',
    audioUrl: 'https://cdn.alongside.care/audio/toddler-amygdala-briefing.mp3',
    audioDurationSeconds: 92,
    thirtySecondGlance: {
      coreProblem:
        'Amygdala surge with zero prefrontal cortical regulation. Logical debate inflames the storm.',
      immediateShift:
        'Drop below child eye level. Silence explanations. Speak under 8 words.',
      exactWords:
        'Your body feels big and stormy right now. I am right here. You are safe.',
    },
    dialogueCards: [
      {
        instinctiveMistake: 'Stop crying right now! It is just a blue cup!',
        whyItBackfires:
          'Shames the child’s somatic reality and confirms that big feelings overwhelm parents.',
        empatheticScript:
          'Your body feels so big and stormy right now. It is hard when we wanted the yellow cup. I am right here. You are completely safe.',
        deliveryTip:
          'Drop voice 2 octaves. Sit 3 feet away at eye level. Relax your shoulders.',
      },
    ],
    actionProtocolItems: [
      {
        id: 'step-1',
        label: 'Somatic Eye-Level Drop',
        detail: 'Kneel or sit before speaking to remove towering dominance.',
      },
      {
        id: 'step-2',
        label: 'The 8-Word Limit',
        detail: 'Silence explanations until heart rate slows.',
      },
      {
        id: 'step-3',
        label: 'The Cold Water Reset',
        detail: 'Offer a sip of cold water after the storm breaks.',
      },
    ],
    contentMarkdown: `When a toddler body arches in rage over a cup color, parents experience acute anxiety.
    
> **Clinical Insight:** At age two, prefrontal cortex neural pathways connecting logic to emotional braking are essentially unpaved dirt roads. Toddlers borrow your nervous system through neuroception.

Take a breath. You are not a bad parent, and your child is not broken.`,
    module: {
      id: 'mod-behavior-toddler',
      slug: 'behavior-toddler-tantrums',
      title: 'Toddler Emotional Storms & Co-Regulation',
      developmentalTier: DevelopmentalTier.TIER_0B_TODDLER_1_2,
      category: AcademyCategory.BEHAVIOR_AND_EMOTIONS,
    },
    chapter: {
      id: 'ch-toddler-coregulation',
      slug: 'toddler-brain-foundations',
      title: 'Chapter 1: The Immature Brain',
      priority: ChapterPriority.PRIORITY_1_CRITICAL,
    },
  };

  describe('1. The 10-Second Relief Masthead & 90s Spoken Audio Memo Bar', () => {
    it('renders breadcrumb navigation, chapter title, and reading timer', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReliefMasthead, {
          lesson: multiModalLesson,
          moduleSlug: 'behavior-toddler-tantrums',
          moduleTitle: 'Toddler Emotional Storms & Co-Regulation',
        })
      );

      expect(html).toContain('Back to Toddler Emotional Storms');
      expect(html).toContain('Chapter 1: The Immature Brain');
      expect(html).toContain('Lesson 1');
      expect(html).toContain('3 min read');
      expect(html).toContain(
        'The Immature Amygdala: Why Toddlers Melt Down &amp; How to Anchor Calm'
      );
    });

    it('does not display redundant guilt-release banner in the masthead', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReliefMasthead, {
          lesson: multiModalLesson,
          moduleSlug: 'behavior-toddler-tantrums',
        })
      );

      // Decluttered masthead: guilt-release anchor removed per user direction
      expect(html).not.toContain('data-testid="relief-tagline"');
      expect(html).not.toContain('Guilt-Release Pediatric Anchor');
    });

    it('renders native HTML5 audio memo player with hands-free controls', () => {
      const html = renderToStaticMarkup(
        React.createElement(AudioMemoPlayer, {
          audioUrl: multiModalLesson.audioUrl,
          audioDurationSeconds: multiModalLesson.audioDurationSeconds,
          title: '90s Clinician Voice Briefing',
        })
      );

      expect(html).toContain('data-testid="audio-memo-player"');
      expect(html).toContain('data-testid="audio-play-toggle"');
      expect(html).toContain('data-testid="audio-skip-back"');
      expect(html).toContain('data-testid="audio-skip-forward"');
      expect(html).toContain('data-testid="audio-speed-toggle"');
      expect(html).not.toContain('Hands-Free');
      expect(html).toContain('Listen');
      expect(html).toContain('1:32');
    });
  });

  describe('2. The 30-Second Crisis Summary Drawer', () => {
    it('renders 10-second protocol with core problem, immediate shift, and exact words', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonThirtySecondGlance, {
          glance: multiModalLesson.thirtySecondGlance,
        })
      );

      expect(html).toContain('data-testid="thirty-second-glance"');
      expect(html).toContain('data-testid="thirty-second-glance-toggle"');
      expect(html).toContain('The Biological Trap (Core Problem)');
      expect(html).toContain('Immediate Mindset Pivot');
      expect(html).toContain('Exact Words to Say Right Now');
      expect(html).toContain(
        'Amygdala surge with zero prefrontal cortical regulation'
      );
      expect(html).toContain('Drop below child eye level. Silence explanations.');
      expect(html).toContain(
        'Your body feels big and stormy right now. I am right here. You are safe.'
      );
    });
  });

  describe('3. Tactile Dialogue Deck (Decluttered Say This, Not That)', () => {
    it('renders comparative script cards with What NOT to Say and Empathetic Script without button clutter', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonDialogueDeck, {
          cards: multiModalLesson.dialogueCards,
        })
      );

      expect(html).toContain('data-testid="dialogue-deck"');
      expect(html).toContain('What We Instinctively Say (Why It Fails)');
      expect(html).toContain('Alongside Empathetic Script');
      expect(html).toContain('Stop crying right now! It is just a blue cup!');
      expect(html).toContain(
        'Your body feels so big and stormy right now. It is hard when we wanted the yellow cup.'
      );
      // Decluttered: Copy Script and Save to Vault removed per user request
      expect(html).not.toContain('data-testid="copy-script-btn"');
      expect(html).not.toContain('Copy Script');
      expect(html).not.toContain('Save to Vault');
      expect(html).toContain('Vocal &amp; Physical Delivery Tip:');
    });
  });

  describe('4. Interactive 3-Step Action Checklist', () => {
    it('renders checklist items with interactive checkboxes', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonActionChecklist, {
          lessonId: multiModalLesson.id,
          items: multiModalLesson.actionProtocolItems,
        })
      );

      expect(html).toContain('data-testid="action-checklist"');
      expect(html).toContain('Tonight&#x27;s 3-Step Action Checklist');
      expect(html).toContain('1. Somatic Eye-Level Drop');
      expect(html).toContain('2. The 8-Word Limit');
      expect(html).toContain('3. The Cold Water Reset');
      expect(html).toContain('0 of 3 completed');
    });
  });

  describe('5. Active Tool Action Bridges', () => {
    it('renders launcher buttons for AI Sparring, Family Pact, and Pocket Vault', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonToolBridges, {
          scenarioPrompt: multiModalLesson.title,
        })
      );

      expect(html).toContain('data-testid="tool-bridges"');
      expect(html).toContain('data-testid="practice-with-ai-advisor-btn"');
      expect(html).toContain('Practice with AI');
      expect(html).toContain('data-testid="add-clause-pact-btn"');
      expect(html).toContain('Add to Family Pact');
      expect(html).toContain('data-testid="save-to-vault-btn"');
      expect(html).toContain('Save to Vault');
    });
  });

  describe('6. Nightstand Dim Reading Mode Toggle', () => {
    it('renders toggle button with accessible label and state', () => {
      const onToggle = vi.fn();
      const html = renderToStaticMarkup(
        React.createElement(NightstandModeToggle, {
          isNightstandMode: false,
          onToggle,
        })
      );

      expect(html).toContain('data-testid="nightstand-toggle"');
      expect(html).toContain('🌙 Nightstand Dim');
      expect(html).toContain('aria-pressed="false"');
    });

    it('renders Normal Calm state when nightstand mode is active', () => {
      const onToggle = vi.fn();
      const html = renderToStaticMarkup(
        React.createElement(NightstandModeToggle, {
          isNightstandMode: true,
          onToggle,
        })
      );

      expect(html).toContain('Normal Calm');
      expect(html).toContain('aria-pressed="true"');
    });
  });

  describe('7. Master LessonReaderView Assembly', () => {
    it('assembles multi-modal elements into a cohesive, decluttered reader experience', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: multiModalLesson,
          moduleSlug: 'behavior-toddler-tantrums',
          moduleTitle: 'Toddler Emotional Storms & Co-Regulation',
          nextLesson: {
            id: 'les-next',
            moduleId: 'mod-behavior-toddler',
            slug: 'co-regulation-anchor',
            title: 'Borrowing Your Nervous System',
            readingMinutes: 4,
            sortOrder: 2,
            isCompleted: false,
          },
        })
      );

      // Verify canonical components exist
      expect(html).toContain('data-testid="lesson-reader-view"');
      expect(html).toContain('data-testid="reading-progress-bar"');
      expect(html).toContain('data-testid="lesson-relief-masthead"');
      expect(html).toContain('data-testid="lesson-editorial-section"');
      expect(html).toContain('data-testid="lesson-narration-player"');
      expect(html).toContain('data-testid="adaptive-module-container"');
      expect(html).toContain('data-testid="dialogue-deck"');
      expect(html).toContain('data-testid="action-checklist"');
      expect(html).toContain('data-testid="lesson-footer-nav"');
      expect(html).toContain('data-testid="lesson-progress-completion-wrapper"');
      expect(html).toContain('data-testid="complete-lesson-btn"');
      expect(html).toContain('Up Next');
      expect(html).toContain('Borrowing Your Nervous System');

      // Decluttered per SOU-110: ThirtySecondGlance and ToolBridges removed from lesson reader
      expect(html).not.toContain('data-testid="thirty-second-glance"');
      expect(html).not.toContain('data-testid="tool-bridges"');
    });
  });

  describe('8. Master Video Lecture Player & Masthead Badge Integration (Plan 39)', () => {
    const videoLectureLesson: AcademyLessonDTO = {
      ...multiModalLesson,
      id: 'les-video-test',
      videoLecture: {
        videoUrl: 'https://www.youtube.com/watch?v=XT_6Lvkhxvo',
        title: 'Protocols for Excellent Parenting & Nervous System Regulation',
        presenter: 'Dr. Andrew Huberman & Dr. Becky Kennedy',
        channel: 'Huberman Lab',
        durationMinutes: 18,
        parentHook:
          'When parents learn to regulate their own nervous system first, children naturally down-regulate without coercive discipline.',
        keyTakeaways: [
          'Autonomic nervous system contagion: Children detect parental dysregulation through heart-rate variability and vocal pitch.',
          'The Repair Protocol: The most powerful parenting intervention is the repair that happens after a rupture.',
          'Somatic pause before speech: Taking 3 physiological sighs shifts the parent from sympathetic panic to parasympathetic calm.',
        ],
        actionPrompt:
          'Practice a 3-breath physiological sigh before responding to your child the next time tension spikes.',
      },
    };

    it('renders [ 🎬 Master Lecture ] badge in LessonReliefMasthead when videoLecture is present', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReliefMasthead, {
          lesson: videoLectureLesson,
          moduleSlug: 'behavior-toddler-tantrums',
        })
      );

      expect(html).toContain('data-testid="master-lecture-badge"');
      expect(html).toContain('Master Lecture');
    });

    it('omits [ 🎬 Master Lecture ] badge in LessonReliefMasthead when videoLecture is absent', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReliefMasthead, {
          lesson: multiModalLesson,
          moduleSlug: 'behavior-toddler-tantrums',
        })
      );

      expect(html).not.toContain('data-testid="master-lecture-badge"');
    });

    it('embeds LessonVideoPlayer seamlessly between masthead and editorial section in LessonReaderView', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: videoLectureLesson,
          moduleSlug: 'behavior-toddler-tantrums',
        })
      );

      expect(html).toContain('data-testid="lesson-video-player"');
      expect(html).toContain('Dr. Andrew Huberman &amp; Dr. Becky Kennedy');
      expect(html).toContain('Huberman Lab');
      expect(html).toContain('18 min');
      expect(html).toContain('Clinical Video Hook');
      expect(html).toContain('Clinical Key Takeaways (3 Core Concepts)');
      expect(html).toContain('Practice with AI Advisor');

      // Verify sequence order: ReliefMasthead -> LessonVideoPlayer -> EditorialSection
      const mastheadIdx = html.indexOf('data-testid="lesson-relief-masthead"');
      const videoIdx = html.indexOf('data-testid="lesson-video-player"');
      const editorialIdx = html.indexOf('data-testid="lesson-editorial-section"');

      expect(mastheadIdx).toBeGreaterThan(-1);
      expect(videoIdx).toBeGreaterThan(mastheadIdx);
      expect(editorialIdx).toBeGreaterThan(videoIdx);
    });

    it('omits LessonVideoPlayer in LessonReaderView when lesson has no videoLecture', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: multiModalLesson,
          moduleSlug: 'behavior-toddler-tantrums',
        })
      );

      expect(html).not.toContain('data-testid="lesson-video-player"');
    });
  });
});
