import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  AcademyCategory,
  AlmanacVisualType,
  ChapterPriority,
  DevelopmentalTier,
  EditorialIllustrationKey,
  EpisodeRole,
  Gender,
  LessonArchetype,
  type AcademyLessonDTO,
} from '@alongside/shared';
import { LessonReaderView } from '../src/components/academy/LessonReaderView';
import { MOCK_LESSON_DETAIL_ADRENARCHE } from '../src/lib/api/mocks';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/academy/behavior-toddler-tantrums/amygdala-surge',
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

describe('PLAN-48: Interactive Almanac v2 LessonReaderView', () => {
  const legacyMarkdownLesson: AcademyLessonDTO = {
    id: 'les-legacy-markdown',
    moduleId: 'mod-behavior-toddler',
    chapterId: 'ch-toddler-coregulation',
    slug: 'amygdala-surge',
    title: 'Why Toddlers Melt Down & How to Anchor Calm',
    readingMinutes: 3,
    sortOrder: 1,
    isCompleted: false,
    archetype: LessonArchetype.EVERYDAY_BEHAVIOR,
    audioUrl: 'https://cdn.alongside.care/audio/toddler-amygdala-briefing.mp3',
    audioDurationSeconds: 92,
    dialogueCards: [
      {
        instinctiveMistake: 'Stop crying right now! It is just a blue cup!',
        whyItBackfires:
          'Raises nervous system alarm when the listening brain is already offline.',
        empatheticScript:
          'Your body feels so big and stormy right now. I am right here. You are safe.',
        deliveryTip: 'Drop voice lower. Sit at eye level. Relax your shoulders.',
      },
    ],
    contentMarkdown: `## Part 1: The Kitchen-Table Scenario
When a toddler arches back in tears over the wrong cup color, every parent feels their heart rate spike.

## Part 2: Understanding Your Child
At age two, the braking pathways in the upper brain are still wiring up. Toddlers borrow your steady calm first.

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
Take a breath. You are not failing, and your child is not broken. Your calm presence is the strongest anchor.`,
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
      title: 'Chapter 1: Immediate Calm & Fast Win',
      priority: ChapterPriority.PRIORITY_1_CRITICAL,
    },
  };

  describe('1. 5-Beat Full-Bleed Almanac Composition & Founder Mandates', () => {
    it('renders all 5 Almanac beats, sticky nav with 2px hairline, and quiet margin rail', () => {
      const html = renderToStaticMarkup(
        <LessonReaderView
          lesson={MOCK_LESSON_DETAIL_ADRENARCHE}
          moduleSlug="behavior-tween-adrenarche"
          moduleTitle="Tween Adrenarche & Emotional Volatility"
          episodeNumber={1}
          totalEpisodes={4}
          activeChild={{
            name: 'Maya',
            gender: Gender.FEMALE,
            age: 11,
            developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
          }}
          nextLesson={{
            id: 'les-next',
            moduleId: 'mod-tween',
            slug: 'tween-adrenarche-and-dhea-neurobiology',
            title: 'Adrenarche & DHEA: The Hidden Hormonal Engine of Mood Swings',
            readingMinutes: 4,
            sortOrder: 2,
            isCompleted: false,
          }}
        />
      );

      // Core 5 beats & chrome
      expect(html).toContain('data-testid="lesson-reader-view"');
      expect(html).toContain('data-testid="almanac-reader-nav"');
      expect(html).toContain('data-testid="almanac-scroll-hairline"');
      expect(html).toContain('data-testid="almanac-margin-rail"');
      expect(html).toContain('data-testid="almanac-beat-1"');
      expect(html).toContain('data-testid="almanac-beat-2"');
      expect(html).toContain('data-testid="almanac-beat-3"');
      expect(html).toContain('data-testid="almanac-beat-4"');
      expect(html).toContain('data-testid="almanac-beat-5"');
      expect(html).toContain('data-testid="almanac-pocket-card"');
      expect(html).toContain('data-testid="almanac-next-episode-card"');

      // Read | Listen switch + Nightstand toggle
      expect(html).toContain('data-testid="mode-read-btn"');
      expect(html).toContain('data-testid="mode-listen-btn"');
      expect(html).toContain('data-testid="nightstand-toggle"');

      // Child personalization interpolated cleanly with zero raw tokens
      expect(html).toContain('For Maya (11 yrs)');
      expect(html).toContain('Maya’s Playbook');
      expect(html).toContain('Ask AI Advisor about Maya');
      expect(html).not.toMatch(/\{[a-zA-Z]+\}/);

      // Founder hard constraints: ZERO 30s spoiler drawer, ZERO 6s calm-tone button, ZERO emojis
      expect(html).not.toContain('data-testid="thirty-second-glance"');
      expect(html).not.toContain('Quick 30-Second Read');
      expect(html).not.toContain('30s Rescue');
      expect(html).not.toContain('Hear the calm tone');
      expect(html).not.toContain('🛑');
      expect(html).not.toContain('✅');
      expect(html).not.toContain('🎙️');
    });

    it('gracefully adapts legacy markdown-only lessons without raw token leaks', () => {
      const html = renderToStaticMarkup(
        <LessonReaderView
          lesson={legacyMarkdownLesson}
          moduleSlug="behavior-toddler-tantrums"
          moduleTitle="Toddler Emotional Storms & Co-Regulation"
          activeChild={null}
        />
      );

      expect(html).toContain('data-testid="almanac-beat-1"');
      expect(html).toContain('data-testid="visual-brain-bridge"');
      expect(html).toContain('data-testid="almanac-pocket-card"');
      expect(html).toContain('Your Playbook');
      expect(html).not.toMatch(/\{[a-zA-Z]+\}/);
      expect(html).not.toContain('data-testid="thirty-second-glance"');
    });
  });

  describe('2. Bottom-Only Master Video Talk Placement', () => {
    const lessonWithVideo: AcademyLessonDTO = {
      ...MOCK_LESSON_DETAIL_ADRENARCHE,
      id: 'les-video-almanac',
      videoLecture: {
        videoUrl: 'https://www.youtube.com/watch?v=XT_6Lvkhxvo',
        title: 'Protocols for Excellent Parenting & Nervous System Regulation',
        presenter: 'Dr. Becky Kennedy & Dr. Andrew Huberman',
        channel: 'Huberman Lab',
        durationMinutes: 18,
        parentHook:
          'When parents regulate their own nervous system first, children naturally settle without power struggles.',
        keyTakeaways: [
          'Children detect parental dysregulation instantly through vocal pitch.',
          'Repair after a rupture builds deeper trust than perfection.',
          'A calm exhale before speaking shifts the entire room.',
        ],
        actionPrompt: 'Pause for one slow exhale before answering the next sharp tone.',
        jumpChips: [
          { seconds: 90, label: 'Why calm beats lectures' },
          { seconds: 310, label: 'The repair sequence' },
        ],
      },
    };

    it('renders Master Talk Shelf strictly BELOW Beat 5 Pocket Card and adds quiet Beat 1 anchor', () => {
      const html = renderToStaticMarkup(
        <LessonReaderView
          lesson={lessonWithVideo}
          moduleSlug="behavior-tween-adrenarche"
          moduleTitle="Tween Adrenarche & Emotional Volatility"
        />
      );

      expect(html).toContain('data-testid="meta-jump-video-btn"');
      expect(html).toContain('18-min talk below');
      expect(html).toContain('data-testid="almanac-video-shelf"');
      expect(html).toContain('data-testid="video-jump-chip-0"');
      expect(html).toContain('1:30');
      expect(html).toContain('Read the 3 core ideas instead');

      // Strictly below Pocket Card (Beat 5)
      const pocketIdx = html.indexOf('data-testid="almanac-pocket-card"');
      const videoIdx = html.indexOf('data-testid="almanac-video-shelf"');
      expect(pocketIdx).toBeGreaterThan(-1);
      expect(videoIdx).toBeGreaterThan(pocketIdx);
    });

    it('omits Master Talk Shelf and Beat 1 anchor when lesson has no videoLecture', () => {
      const html = renderToStaticMarkup(
        <LessonReaderView
          lesson={{ ...MOCK_LESSON_DETAIL_ADRENARCHE, videoLecture: null }}
          moduleSlug="behavior-tween-adrenarche"
        />
      );

      expect(html).not.toContain('data-testid="meta-jump-video-btn"');
      expect(html).not.toContain('data-testid="almanac-video-shelf"');
    });

    it('supports all Almanac visual types (e.g. SENSORY_LADDER) cleanly', () => {
      const feedingLesson: AcademyLessonDTO = {
        ...MOCK_LESSON_DETAIL_ADRENARCHE,
        almanacPayload: {
          ...MOCK_LESSON_DETAIL_ADRENARCHE.almanacPayload!,
          episodeRole: EpisodeRole.FAST_WIN,
          illustration: EditorialIllustrationKey.plate,
          visualType: AlmanacVisualType.SENSORY_LADDER,
        },
      };

      const html = renderToStaticMarkup(
        <LessonReaderView
          lesson={feedingLesson}
          moduleSlug="nutrition-older-toddler-independence-and-snacking"
        />
      );

      expect(html).toContain('data-testid="editorial-art-plate"');
      expect(html).toContain('data-testid="visual-sensory-ladder"');
    });
  });
});
