import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  cleanTextForSpeech,
  buildHookingNarrationScript,
  getBestNaturalVoice,
  resolveVoices,
  findWordAlignedOffset,
  secondsToCharOffset,
  charOffsetToSeconds,
  resolveBeatIndexForChar,
  playNaturalNarrator,
} from '../src/lib/audio/narratorEngine';
import { MOCK_LESSON_DETAIL_ADRENARCHE } from '../src/lib/api/mocks';
import { interpolateChildCopy, Gender, DevelopmentalTier } from '@alongside/shared';

describe('NarratorEngine: Natural Audio Reader Voice, Seeking & Real Timing', () => {
  const childLeo = {
    name: 'Leo',
    gender: Gender.MALE,
    ageMonths: 120,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  };
  const tLeo = (s: string) => interpolateChildCopy(s, childLeo);

  describe('cleanTextForSpeech', () => {
    it('expands medical, time, and pediatric abbreviations into fluent spoken words', () => {
      const input =
        'Call the AAP or CDC at 8:30 PM. Needs approx. 15 mins vs. 2 hrs for Ages 10-12 (1st, 2nd, 3rd step).';
      const result = cleanTextForSpeech(input);

      expect(result).toContain('A A P');
      expect(result).toContain('C D C');
      expect(result).toContain('8 thirty P M');
      expect(result).toContain('approximately 15 minutes versus 2 hours');
      expect(result).toContain('Ages ten to twelve');
      expect(result).toContain('first, second, third step');
      expect(result).not.toContain('mins');
      expect(result).not.toContain('hrs');
      expect(result).not.toContain('vs.');
    });

    it('adds breath pauses around direct dialogue quotes and strips LLM em-dashes', () => {
      const input = 'Say "I hear how unfair that feels"\u2014then pause.';
      const result = cleanTextForSpeech(input);

      expect(result).toContain('... "I hear how unfair that feels" ...');
      expect(result).not.toContain('\u2014');
    });

    it('strips all markdown formatting tokens', () => {
      const input = '### Header\n**Crucial rule:** Never _shame_ [the child](/guide).';
      const result = cleanTextForSpeech(input);

      expect(result).not.toContain('###');
      expect(result).not.toContain('**');
      expect(result).not.toContain('_');
      expect(result).not.toContain('[');
      expect(result).not.toContain('](/guide)');
      expect(result).toContain('Crucial rule: Never shame the child.');
    });
  });

  describe('buildHookingNarrationScript', () => {
    it('creates a 5-beat podcast script with real duration and zero hardcoded three-minute claims', () => {
      const payload = MOCK_LESSON_DETAIL_ADRENARCHE.almanacPayload!;
      const result = buildHookingNarrationScript(payload, tLeo, 'Leo');

      expect(result.beats).toHaveLength(5);
      expect(result.beatRanges).toHaveLength(5);
      // Beat 1: Hook & Scene (no hardcoded static "three-minute" claim)
      expect(result.beats[0]).toContain('Welcome to Alongside');
      expect(result.beats[0]).toContain('audio briefing for Leo');
      expect(result.beats[0]).not.toContain('three-minute');
      // Beat 2: Neurobiology
      expect(result.beats[1]).toContain('Why does this happen in their nervous system?');
      expect(result.beats[1]).toContain('single truth to hold onto');
      // Beat 3: Dialogue
      expect(result.beats[2]).toContain('Now, what do you actually say in that moment?');
      expect(result.beats[2]).toContain('Take a breath, and try this:');
      // Beat 4: One Move
      expect(result.beats[3]).toContain('Tonight, keep it small.');
      // Beat 5: Closing note
      expect(result.beats[4]).toContain('Before tonight, remember this:');
      expect(result.beats[4]).toContain("You've got this.");

      // Overall script quality checks
      expect(result.fullText).not.toContain('*');
      expect(result.fullText).not.toContain('\u2014');
      expect(result.fullText).not.toMatch(/(?<!\.)\.\.(?!\.)/);
      expect(result.fullText).not.toMatch(/[?!]\./);
      expect(result.fullText).not.toMatch(/\{[a-zA-Z]+\}/);
      expect(result.estimatedSeconds).toBeGreaterThanOrEqual(30);
      expect(result.beatRanges[4]!.endSeconds).toBe(result.estimatedSeconds);
    });
  });

  describe('Seek, Resume & ±10s Word-Aligned Offsets', () => {
    it('aligns mid-word offsets cleanly to whole word boundaries', () => {
      const sample = 'Welcome to Alongside. Here is your calm briefing.';
      const offset = findWordAlignedOffset(sample, 14); // inside "Alongside."
      const sliced = sample.slice(offset);
      expect(sliced.startsWith('Alongside') || sliced.startsWith('Here')).toBe(true);
    });

    it('maps seconds <-> char offsets and beat indices consistently for ±10s skip and resume', () => {
      const payload = MOCK_LESSON_DETAIL_ADRENARCHE.almanacPayload!;
      const script = buildHookingNarrationScript(payload, tLeo, 'Leo');

      const charAt30 = secondsToCharOffset(
        script.fullText,
        30,
        script.estimatedSeconds,
        script.beatRanges
      );
      expect(charAt30).toBeGreaterThan(0);
      expect(charAt30).toBeLessThan(script.fullText.length);

      const roundTrippedSec = charOffsetToSeconds(
        script.fullText,
        charAt30,
        script.estimatedSeconds,
        script.beatRanges
      );
      expect(Math.abs(roundTrippedSec - 30)).toBeLessThanOrEqual(4);

      const beatIdx = resolveBeatIndexForChar(script.beatRanges, charAt30);
      expect(beatIdx).toBeGreaterThanOrEqual(0);
      expect(beatIdx).toBeLessThanOrEqual(4);
    });

    it('resumes playNaturalNarrator from startCharOffset and reports global char boundaries', () => {
      const spokenTexts: string[] = [];
      let capturedUtterance: any = null;

      class MockUtterance {
        text: string;
        rate = 1;
        pitch = 1;
        voice: any = null;
        onstart: (() => void) | null = null;
        onboundary: ((e: { charIndex: number }) => void) | null = null;
        onend: (() => void) | null = null;
        onerror: ((e: { error: string }) => void) | null = null;
        constructor(t: string) {
          this.text = t;
          spokenTexts.push(t);
          capturedUtterance = this;
        }
      }

      const mockVoices = [
        { name: 'Microsoft Guy Online (Natural)', lang: 'en-US' },
        { name: 'Microsoft Jenny Online (Natural)', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      vi.stubGlobal('SpeechSynthesisUtterance', MockUtterance);
      vi.stubGlobal('window', {
        speechSynthesis: {
          getVoices: () => mockVoices,
          cancel: vi.fn(),
          speak: vi.fn(),
          pause: vi.fn(),
          resume: vi.fn(),
          speaking: false,
          paused: false,
        },
        setInterval: vi.fn(() => 1),
        clearInterval: vi.fn(),
      });

      const full = 'Welcome to Alongside. Here is your calm evening guide.';
      const onBoundary = vi.fn();

      const cancel = playNaturalNarrator({
        text: full,
        startCharOffset: 22, // "Here is..."
        onBoundary,
      });

      expect(spokenTexts[0]).toBe('Here is your calm evening guide.');
      // Default persona must select male voice ('clear')
      expect(capturedUtterance.voice?.name).toBe('Microsoft Guy Online (Natural)');

      capturedUtterance.onboundary?.({ charIndex: 5 });
      expect(onBoundary).toHaveBeenCalledWith(27);

      cancel();
      vi.unstubAllGlobals();
    });
  });

  describe('getBestNaturalVoice', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('defaults to the male clear voice unless warm is explicitly requested', () => {
      const mockVoices = [
        { name: 'Microsoft Jenny Online (Natural)', lang: 'en-US' },
        { name: 'Microsoft Guy Online (Natural)', lang: 'en-US' },
        { name: 'Microsoft David Desktop', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      vi.stubGlobal('speechSynthesis', {
        getVoices: () => mockVoices,
      });

      // Default call (no persona arg) MUST return male voice
      const defaultVoice = getBestNaturalVoice();
      expect(defaultVoice?.name).toBe('Microsoft Guy Online (Natural)');

      const clearVoice = getBestNaturalVoice('clear');
      expect(clearVoice?.name).toBe('Microsoft Guy Online (Natural)');

      const warmVoice = getBestNaturalVoice('warm');
      expect(warmVoice?.name).toBe('Microsoft Jenny Online (Natural)');
    });

    it('selects male fallback on Windows (David/Mark) for default clear persona and Zira for warm persona', () => {
      const mockVoices = [
        { name: 'Microsoft Zira Desktop', lang: 'en-US' },
        { name: 'Microsoft David Desktop', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      vi.stubGlobal('speechSynthesis', {
        getVoices: () => mockVoices,
      });

      const clearVoice = getBestNaturalVoice('clear', mockVoices);
      expect(clearVoice?.name).toBe('Microsoft David Desktop');

      const warmVoice = getBestNaturalVoice('warm', mockVoices);
      expect(warmVoice?.name).toBe('Microsoft Zira Desktop');
    });

    it('excludes female voices when selecting generic neural voice for clear persona', () => {
      const mockVoices = [
        { name: 'Microsoft Aria Online (Natural)', lang: 'en-US' },
        { name: 'Custom Neural Narrator Male', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      const voice = getBestNaturalVoice('clear', mockVoices);
      expect(voice?.name).toBe('Custom Neural Narrator Male');
    });

    it('resolves voices asynchronously when window.speechSynthesis is available', async () => {
      const mockVoices = [
        { name: 'Microsoft Guy Online (Natural)', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      vi.stubGlobal('speechSynthesis', {
        getVoices: () => mockVoices,
      });

      const voices = await resolveVoices();
      expect(voices).toHaveLength(1);
      expect(voices[0]?.name).toBe('Microsoft Guy Online (Natural)');
    });
  });
});
