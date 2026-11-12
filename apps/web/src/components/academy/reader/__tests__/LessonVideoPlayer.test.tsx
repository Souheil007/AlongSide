import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { MasterVideoLectureDTO } from '@alongside/shared';
import {
  LessonVideoPlayer,
  extractYouTubeId,
} from '../LessonVideoPlayer';

describe('Plan 39: LessonVideoPlayer Master Lecture Multi-Modal Architecture', () => {
  const sampleVideo: MasterVideoLectureDTO = {
    videoUrl: 'https://www.youtube.com/watch?v=f-m2YcdMdFw',
    title: "The Calming Reflex & The 5 S's for Infant Soothing",
    presenter: 'Dr. Harvey Karp',
    channel: 'Happiest Baby',
    durationMinutes: 13,
    parentHook:
      'Infants do not cry to manipulate you; crying is an altricial somatic distress siren that can be switched off with the calming reflex.',
    keyTakeaways: [
      'The 4th Trimester: Human babies are born 3 months before other mammals due to brain-to-pelvis ratios.',
      "The 5 S's: Swaddle, Side/Stomach position, Shush, Swing, Suck activate ancient neurological calming reflexes.",
      'Co-Regulation: A caregiver’s steady heart rate and slow exhalations physiologically down-regulate infant cortisol.',
    ],
    actionPrompt:
      'Practice wrapping your infant in a snug swaddle and making a loud white-noise "shhh" sound next to their ear during the next crying episode.',
  };

  describe('1. YouTube Video ID Extractor', () => {
    it('correctly extracts 11-char ID from standard watch URL', () => {
      expect(extractYouTubeId('https://www.youtube.com/watch?v=f-m2YcdMdFw')).toBe('f-m2YcdMdFw');
    });

    it('correctly extracts ID from shortened youtu.be URL', () => {
      expect(extractYouTubeId('https://youtu.be/XT_6Lvkhxvo')).toBe('XT_6Lvkhxvo');
    });

    it('correctly extracts ID from embed URL', () => {
      expect(extractYouTubeId('https://www.youtube.com/embed/MBqVIBwBgAc')).toBe('MBqVIBwBgAc');
    });

    it('returns null on empty or invalid URL', () => {
      expect(extractYouTubeId('')).toBeNull();
      expect(extractYouTubeId(undefined)).toBeNull();
      expect(extractYouTubeId('https://example.com/not-a-video')).toBeNull();
    });
  });

  describe('2. Component Defensive Rendering', () => {
    it('returns null when video prop is null or undefined', () => {
      const html1 = renderToStaticMarkup(<LessonVideoPlayer video={null} />);
      const html2 = renderToStaticMarkup(<LessonVideoPlayer video={undefined} />);
      expect(html1).toBe('');
      expect(html2).toBe('');
    });

    it('returns null when videoUrl is empty', () => {
      const html = renderToStaticMarkup(
        <LessonVideoPlayer video={{ ...sampleVideo, videoUrl: '' }} />
      );
      expect(html).toBe('');
    });
  });

  describe('3. Master Video Player Container & Poster', () => {
    it('renders 16:9 responsive aspect-ratio container with dark theme styling', () => {
      const html = renderToStaticMarkup(<LessonVideoPlayer video={sampleVideo} />);

      expect(html).toContain('data-testid="lesson-video-player"');
      expect(html).toContain('aspect-video');
      expect(html).toContain('rounded-2xl');
      expect(html).toContain('overflow-hidden');
      expect(html).toContain('bg-stone-900');
      expect(html).toContain('border-[#EBE7DF]');
    });

    it('renders poster thumbnail, play button, and title before user initiates playback', () => {
      const html = renderToStaticMarkup(<LessonVideoPlayer video={sampleVideo} />);

      expect(html).toContain('data-testid="video-poster"');
      expect(html).toContain('https://img.youtube.com/vi/f-m2YcdMdFw/hqdefault.jpg');
      expect(html).toContain("The Calming Reflex &amp; The 5 S&#x27;s for Infant Soothing");
    });

    it('renders presenter badge with channel and duration details', () => {
      const html = renderToStaticMarkup(<LessonVideoPlayer video={sampleVideo} />);

      expect(html).toContain('data-testid="presenter-badge"');
      expect(html).toContain('Dr. Harvey Karp');
      expect(html).toContain('Happiest Baby');
      expect(html).toContain('13 min');
      expect(html).toContain('Master Lecture');
    });
  });

  describe('4. Provocative Parent Hook Callout Strip', () => {
    it('renders parent hook in Newsreader serif italic typography', () => {
      const html = renderToStaticMarkup(<LessonVideoPlayer video={sampleVideo} />);

      expect(html).toContain('data-testid="video-parent-hook"');
      expect(html).toContain('Why This Talk Matters');
      expect(html).toContain('font-serif');
      expect(html).toContain('italic');
      expect(html).toContain(
        'Infants do not cry to manipulate you; crying is an altricial somatic distress siren that can be switched off with the calming reflex.'
      );
    });

    it('gracefully omits parent hook strip when not provided', () => {
      const videoWithoutHook = { ...sampleVideo, parentHook: undefined };
      const html = renderToStaticMarkup(<LessonVideoPlayer video={videoWithoutHook} />);

      expect(html).not.toContain('data-testid="video-parent-hook"');
    });
  });

  describe('5. Expandable Key Takeaways Drawer', () => {
    it('renders takeaways drawer toggle button with key concepts count', () => {
      const html = renderToStaticMarkup(<LessonVideoPlayer video={sampleVideo} />);

      expect(html).toContain('data-testid="video-takeaways-drawer"');
      expect(html).toContain('data-testid="takeaways-drawer-toggle"');
      expect(html).toContain('Key Takeaways (3 Core Ideas)');
    });

    it('gracefully omits takeaways drawer when list is empty', () => {
      const videoWithoutTakeaways = { ...sampleVideo, keyTakeaways: [] };
      const html = renderToStaticMarkup(<LessonVideoPlayer video={videoWithoutTakeaways} />);

      expect(html).not.toContain('data-testid="video-takeaways-drawer"');
    });
  });

  describe('6. Action Prompt Clean Removal', () => {
    it('does not render redundant practice exercise card or AI advisor launch button', () => {
      const html = renderToStaticMarkup(<LessonVideoPlayer video={sampleVideo} />);

      expect(html).not.toContain('data-testid="video-action-prompt"');
      expect(html).not.toContain('Parent Practice Exercise');
      expect(html).not.toContain('Practice with AI Advisor');
      expect(html).not.toContain('data-testid="launch-advisor-button"');
    });
  });

  describe('7. Nightstand Mode Calm Styling', () => {
    it('applies stone-900 and amber-200 dark soothing tokens when isNightstandMode is true', () => {
      const html = renderToStaticMarkup(
        <LessonVideoPlayer video={sampleVideo} isNightstandMode={true} />
      );

      expect(html).toContain('bg-amber-950/25');
      expect(html).toContain('text-amber-200');
    });
  });
});
