import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  AcademyCategory,
  DevelopmentalTier,
  ChapterPriority,
  LessonArchetype,
  type AcademyLessonDTO,
} from '@alongside/shared';
import { LessonReaderView } from '../src/components/academy/LessonReaderView';
import {
  LessonReliefMasthead,
  LessonThirtySecondGlance,
  LessonActionChecklist,
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

describe('Plan 38 & Plan 40: Unified Editorial Blog Post Reader & De-Clinicalization', () => {
  const multiModalLesson: AcademyLessonDTO = {
    id: 'les-plan-38-multi-modal',
    moduleId: 'mod-behavior-toddler',
    chapterId: 'ch-toddler-coregulation',
    slug: 'amygdala-surge',
    title: 'The Immature Amygdala: Why Toddlers Melt Down & How to Anchor Calm',
    readingMinutes: 3,
    sortOrder: 1,
    isCompleted: false,
    archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
    reliefTagline: '💡 Why this is 100% normal at 24 months, not a discipline failure',
    audioUrl: 'https://cdn.alongside.care/audio/toddler-amygdala-briefing.mp3',
    audioDurationSeconds: 92,
    thirtySecondGlance: {
      coreProblem:
        'A normal wave of big feelings as their brain builds self-regulation. Logic in the heat of the moment inflames friction.',
      immediateShift:
        'Drop your eye level below your child. Take a calm breath. Speak under 8 soft words to offer a steady anchor.',
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
    contentMarkdown: `## Part 1: The Kitchen-Table Scenario
When a toddler body arches in rage over a cup color, parents experience acute anxiety.

## Part 2: Understanding Your Child
At age two, the brain's emotional braking pathways are actively developing. Toddlers borrow your calm nervous system.

> **Key Takeaway:** Toddlers do not melt down out of spite; when overwhelmed, the listening part of their mind temporarily goes offline.

## Part 3: What to Say
| What NOT to Say | Why It Backfires | What to Say Instead |
| :--- | :--- | :--- |
| "Stop crying right now!" | Escalates alarm | "I am right here with you." |

## Part 4: Putting It Into Practice
1. Drop below eye level
2. Breathe slowly
3. Offer comfort

### A Note for You as a Parent
Take a breath. You are not a bad parent, and your child is not broken. Your calm presence is the strongest anchor.`,
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

  describe('1. The 10-Second Relief Masthead & Spoken Audio Memo Bar', () => {
    it('renders breadcrumb navigation, badges, and decluttered masthead without redundant title', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReliefMasthead, {
          lesson: multiModalLesson,
          moduleSlug: 'behavior-toddler-tantrums',
          moduleTitle: 'Toddler Emotional Storms & Co-Regulation',
        })
      );

      expect(html).toContain('Back to Toddler Emotional Storms');
      expect(html).toContain('data-testid="lesson-relief-masthead"');
      expect(html).not.toContain(
        'The Immature Amygdala: Why Toddlers Melt Down &amp; How to Anchor Calm'
      );
      expect(html).not.toContain('3 min read');
    });

    it('renders completed status badge in masthead when isCompleted is true', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReliefMasthead, {
          lesson: multiModalLesson,
          moduleSlug: 'behavior-toddler-tantrums',
          isCompleted: true,
        })
      );

      expect(html).toContain('data-testid="lesson-completed-badge"');
      expect(html).toContain('Completed');
    });

    it('renders minimalist audio memo player with de-clinicalized fallback intro and skip controls', () => {
      const html = renderToStaticMarkup(
        React.createElement(AudioMemoPlayer, {
          audioUrl: multiModalLesson.audioUrl,
          audioDurationSeconds: multiModalLesson.audioDurationSeconds,
          title: 'Lesson Briefing',
        })
      );

      expect(html).toContain('data-testid="audio-memo-player"');
      expect(html).toContain('data-testid="audio-play-toggle"');
      expect(html).toContain('data-testid="audio-skip-back"');
      expect(html).toContain('data-testid="audio-skip-forward"');
      expect(html).toContain('data-testid="audio-speed-toggle"');
      expect(html).not.toContain('Stop narration');
      expect(html).toContain('Listen');
      expect(html).toContain('1:32');
    });
  });

  describe('2. The De-Clinicalized Quick 30-Second Summary Drawer', () => {
    it('renders warm, parent-friendly labels: What\'s Going On, Your Best First Move, and What to Say', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonThirtySecondGlance, {
          glance: multiModalLesson.thirtySecondGlance,
        })
      );

      expect(html).toContain('data-testid="thirty-second-glance"');
      expect(html).toContain('data-testid="thirty-second-glance-toggle"');
      expect(html).toContain('⚡ Quick 30-Second Read');
      expect(html).toContain('What&#x27;s Going On');
      expect(html).toContain('Your Best First Move');
      expect(html).toContain('What to Say');
      expect(html).not.toContain('The Biological Trap (Core Problem)');
      expect(html).not.toContain('Crisis Glance');
      expect(html).not.toContain('Emergency Protocol');
    });
  });

  describe('3. Interactive 3-Step Action Checklist', () => {
    it('renders checklist items with interactive checkboxes', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonActionChecklist, {
          lessonId: multiModalLesson.id,
          items: multiModalLesson.actionProtocolItems,
        })
      );

      expect(html).toContain('data-testid="action-checklist"');
      expect(html).toContain('Your 3-Step Checklist');
      expect(html).toContain('1. Somatic Eye-Level Drop');
      expect(html).toContain('2. The 8-Word Limit');
      expect(html).toContain('3. The Cold Water Reset');
      expect(html).toContain('0 of 3 completed');
    });
  });

  describe('4. Nightstand Dim Reading Mode Toggle', () => {
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
  });

  describe('5. Master LessonReaderView Unified Blog Post Assembly (Plan 40)', () => {
    it('assembles all 4 parts inside one continuous blog post container and eliminates friction widgets', () => {
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

      // 1. Single continuous article container
      expect(html).toContain('data-testid="lesson-reader-view"');
      expect(html).toContain('data-testid="lesson-editorial-section"');
      expect(html).toContain('data-testid="lesson-article-container"');

      // 2. Blog header elements
      expect(html).not.toContain('data-testid="lesson-archetype-banner"');
      expect(html).not.toContain('💡 Why this happens:');
      expect(html).toContain('data-testid="lesson-narration-player"');
      expect(html).toContain('data-testid="thirty-second-glance"');

      // 3. Four parts sequentially inside article body
      expect(html).toContain('data-testid="lesson-part-1"');
      expect(html).toContain('Part 1 · A Moment Every Parent Knows');
      expect(html).toContain('What It Looks Like at Home');

      expect(html).toContain('data-testid="lesson-part-2"');
      expect(html).toContain('Part 2 · Understanding Your Child');
      expect(html).toContain('What&#x27;s Going On Inside Their Growing Mind');
      expect(html).toContain('data-testid="lesson-clinical-insight"');
      expect(html).toContain('The Key Takeaway to Remember');
      expect(html).not.toContain('Clinical Neurobiology Takeaway');

      expect(html).toContain('data-testid="lesson-part-3"');
      expect(html).toContain('Part 3 · Words That Help');
      expect(html).toContain('What to Say (and What If They Push Back?)');
      expect(html).toContain('data-testid="comparative-dialogue-section"');
      expect(html).toContain('🛑 Common Reaction');
      expect(html).toContain('✅ Try Saying This Instead');
      expect(html).toContain('🎙️ Tone &amp; Body Language Tip:');
      expect(html).not.toContain('data-testid="copy-script-btn"');
      expect(html).not.toContain('Copy Script');

      expect(html).toContain('data-testid="lesson-part-4"');
      expect(html).toContain('Part 4 · Putting It Into Practice');
      expect(html).toContain('3 Simple Steps to Try at Home');
      expect(html).toContain('data-testid="action-checklist"');
      expect(html).toContain('data-testid="lesson-grounding-anchor"');
      expect(html).toContain('A Note for You as a Parent');

      // 4. Verification that obsolete widgets are removed
      expect(html).not.toContain('data-testid="adaptive-module-container"');
      expect(html).not.toContain('data-testid="tool-bridges"');
      expect(html).not.toContain('Pin to Pocket Vault');
      expect(html).not.toContain('Roleplay with AI');

      // 5. Lesson title appears once in article header
      const titleOccurrences = (
        html.match(/The Immature Amygdala: Why Toddlers Melt Down &amp; How to Anchor Calm/g) || []
      ).length;
      expect(titleOccurrences).toBe(1);
    });

    it('renders CHILD_GROWTH_CONCEPT archetype headings cleanly without top banner', () => {
      const growthLesson: AcademyLessonDTO = {
        ...multiModalLesson,
        id: 'les-growth',
        slug: 'vocal-echo-game',
        title: 'The Vocal Echo Game: Building First Sounds',
        archetype: LessonArchetype.CHILD_GROWTH_CONCEPT,
      };

      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: growthLesson,
          moduleSlug: 'play-language',
        })
      );

      expect(html).not.toContain('data-testid="lesson-archetype-banner"');
      expect(html).not.toContain('🌱 How your child grows:');
      expect(html).toContain('Part 1 · What You&#x27;ll Notice');
      expect(html).toContain('A New Stage of Growth');
      expect(html).toContain('Part 2 · Why This Milestone Matters');
      expect(html).toContain('How This Builds Confidence &amp; Connection');
      expect(html).toContain('Part 3 · Encouraging Their Curiosity');
      expect(html).toContain('Part 4 · Fun Ideas for This Week');
    });

    it('renders PRACTICAL_FAMILY_GUIDE archetype headings cleanly without top banner', () => {
      const guideLesson: AcademyLessonDTO = {
        ...multiModalLesson,
        id: 'les-guide',
        slug: 'baby-fever-guide',
        title: 'Baby & Toddler Fever Guide: When to Stay Calm',
        archetype: LessonArchetype.PRACTICAL_FAMILY_GUIDE,
      };

      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: guideLesson,
          moduleSlug: 'health-fever',
        })
      );

      expect(html).not.toContain('data-testid="lesson-archetype-banner"');
      expect(html).not.toContain('🧭 Parent&#x27;s guide:');
      expect(html).toContain('Part 1 · Why Clear Guidance Matters');
      expect(html).toContain('The Everyday Family Decision');
      expect(html).toContain('Part 2 · What Every Parent Should Know');
      expect(html).toContain('Part 3 · Common Myths vs. Helpful Habits');
      expect(html).toContain('Part 4 · Your Home Checklist');
    });
  });

  describe('6. Master Video Lecture Player Positioned BELOW Blog Post (Plan 40)', () => {
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
          'Children detect parental dysregulation through heart-rate variability and vocal pitch.',
          'The Repair Protocol: The most powerful parenting intervention is the repair that happens after a rupture.',
          'Somatic pause before speech: Taking 3 physiological sighs shifts the parent from panic to calm.',
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

    it('renders LessonVideoPlayer BELOW the unified blog post under "Watch & Go Deeper"', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: videoLectureLesson,
          moduleSlug: 'behavior-toddler-tantrums',
        })
      );

      expect(html).toContain('data-testid="lesson-video-section"');
      expect(html).toContain('Watch &amp; Go Deeper');
      expect(html).toContain('data-testid="lesson-video-player"');
      expect(html).toContain('Why This Talk Matters');
      expect(html).toContain('Key Takeaways (3 Core Ideas)');
      expect(html).not.toContain('Clinical Video Hook');
      expect(html).not.toContain('Clinical Key Takeaways');

      // Critical Plan 40 Rule: Video appears BELOW the blog post
      const editorialIdx = html.indexOf('data-testid="lesson-editorial-section"');
      const videoIdx = html.indexOf('data-testid="lesson-video-section"');
      expect(editorialIdx).toBeGreaterThan(-1);
      expect(videoIdx).toBeGreaterThan(editorialIdx);
    });

    it('omits LessonVideoPlayer in LessonReaderView when lesson has no videoLecture', () => {
      const html = renderToStaticMarkup(
        React.createElement(LessonReaderView, {
          lesson: multiModalLesson,
          moduleSlug: 'behavior-toddler-tantrums',
        })
      );

      expect(html).not.toContain('data-testid="lesson-video-section"');
      expect(html).not.toContain('data-testid="lesson-video-player"');
    });
  });
});
