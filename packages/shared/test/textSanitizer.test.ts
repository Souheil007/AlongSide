import { describe, expect, it } from 'vitest';
import {
  stripEmDashes,
  sanitizeEmDashesDeep,
  estimateLessonReadingMinutes,
  estimateSpokenDurationSeconds,
} from '../src/index.js';

describe('Text Sanitizer & Real Lesson Duration Helpers', () => {
  describe('stripEmDashes', () => {
    it('replaces mid-sentence and parenthetical em-dashes cleanly with commas', () => {
      expect(
        stripEmDashes(
          'Keep food descriptions neutral\u2014never tie dessert to cleaning a plate.'
        )
      ).toBe(
        'Keep food descriptions neutral, never tie dessert to cleaning a plate.'
      );

      expect(
        stripEmDashes(
          'A three-beat goodbye \u2014 hug, wave, confident exit \u2014 reassures young nervous systems.'
        )
      ).toBe(
        'A three-beat goodbye, hug, wave, confident exit, reassures young nervous systems.'
      );
    });

    it('handles punctuation boundaries and preserves newlines cleanly', () => {
      expect(stripEmDashes('Line one?\u2014Yes.\n\u2014Line two')).toBe(
        'Line one? Yes.\nLine two'
      );
      expect(stripEmDashes('No dashes here.')).toBe('No dashes here.');
    });

    it('sanitizes nested objects and arrays without mutating input', () => {
      const input = {
        title: 'Calm\u2014Steady',
        nested: [{ note: 'One \u2014 two' }],
        count: 4,
      };
      const result = sanitizeEmDashesDeep(input);
      expect(result).toEqual({
        title: 'Calm, Steady',
        nested: [{ note: 'One, two' }],
        count: 4,
      });
      expect(input.title).toContain('\u2014');
    });
  });

  describe('Real Reading & Spoken Duration Estimators', () => {
    it('computes readingMinutes from real lesson word count instead of static defaults', () => {
      const shortLesson = {
        title: 'Quick Breathing Reset',
        contentMarkdown: 'Take one slow breath with your child tonight.'.repeat(10), // ~80 words -> 1 min
      };
      const longerLesson = {
        title: 'Deep Developmental Guide',
        contentMarkdown:
          'When children feel overwhelmed by sensory overload at the end of a long school day their brain needs co-regulation. '.repeat(
            45
          ), // ~900 words -> 5 min
      };

      expect(estimateLessonReadingMinutes(shortLesson)).toBe(1);
      expect(estimateLessonReadingMinutes(longerLesson)).toBeGreaterThanOrEqual(4);
    });

    it('computes real spoken duration dynamically from word count and pauses', () => {
      const shortSpoken = 'Welcome to Alongside. Take one slow exhale tonight.';
      const longSpoken =
        'Welcome to Alongside. Here is your calm guide for tonight. '.repeat(25);

      const shortSec = estimateSpokenDurationSeconds(shortSpoken);
      const longSec = estimateSpokenDurationSeconds(longSpoken);

      expect(shortSec).toBeGreaterThanOrEqual(10);
      expect(shortSec).toBeLessThan(25);
      expect(longSec).toBeGreaterThan(95);
      expect(longSec).toBeLessThan(150);
    });
  });
});
