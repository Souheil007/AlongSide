import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  cleanTextForSpeech,
  buildHookingNarrationScript,
  getBestNaturalVoice,
  resolveVoices,
} from '../src/lib/audio/narratorEngine';
import { MOCK_LESSON_DETAIL_ADRENARCHE } from '../src/lib/api/mocks';
import { interpolateChildCopy, Gender, DevelopmentalTier } from '@alongside/shared';

describe('NarratorEngine: Natural Audio Reader Voice & Script', () => {
  const childLeo = {
    name: 'Leo',
    gender: Gender.MALE,
    ageMonths: 120,
    developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  };
  const tLeo = (s: string) => interpolateChildCopy(s, childLeo);

  describe('cleanTextForSpeech', () => {
    it('expands medical, time, and pediatric abbreviations into fluent spoken words', () => {
      const input = 'Call the AAP or CDC at 8:30 PM. Needs approx. 15 mins vs. 2 hrs for Ages 10-12 (1st, 2nd, 3rd step).';
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

    it('adds breath pauses around direct dialogue quotes so speech feels natural', () => {
      const input = 'Say "I hear how unfair that feels" then pause.';
      const result = cleanTextForSpeech(input);

      expect(result).toContain('... "I hear how unfair that feels" ...');
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
    it('creates an intimate 4-beat podcast script with warm conversational transitions', () => {
      const payload = MOCK_LESSON_DETAIL_ADRENARCHE.almanacPayload!;
      const result = buildHookingNarrationScript(payload, tLeo, 'Leo');

      expect(result.beats).toHaveLength(4);
      // Beat 1: Hook & Scene
      expect(result.beats[0]).toContain('Welcome to Alongside');
      expect(result.beats[0]).toContain('quick three-minute audio briefing for Leo');
      // Beat 2: Neurobiology
      expect(result.beats[1]).toContain('Why does this happen in their nervous system?');
      expect(result.beats[1]).toContain('single truth to hold onto');
      // Beat 3: Dialogue
      expect(result.beats[2]).toContain('Now, what do you actually say in that moment?');
      expect(result.beats[2]).toContain('Take a breath, and try this:');
      // Beat 4: Closing note
      expect(result.beats[3]).toContain('Before tonight, remember this:');
      expect(result.beats[3]).toContain("You've got this.");

      // Overall script quality checks
      expect(result.fullText).not.toContain('*');
      expect(result.fullText).not.toContain('—'); // Zero em-dashes
      expect(result.fullText).not.toMatch(/\{[a-zA-Z]+\}/);
      expect(result.estimatedSeconds).toBeGreaterThanOrEqual(45);
    });
  });

  describe('getBestNaturalVoice', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('prioritizes Microsoft Natural and Apple Premium voices when available', () => {
      const mockVoices = [
        { name: 'Microsoft David Desktop', lang: 'en-US' },
        { name: 'Microsoft Jenny Online (Natural)', lang: 'en-US' },
        { name: 'Microsoft Guy Online (Natural)', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      // Mock window.speechSynthesis
      vi.stubGlobal('speechSynthesis', {
        getVoices: () => mockVoices,
      });

      const warmVoice = getBestNaturalVoice('warm');
      expect(warmVoice?.name).toBe('Microsoft Jenny Online (Natural)');

      const clearVoice = getBestNaturalVoice('clear');
      expect(clearVoice?.name).toBe('Microsoft Guy Online (Natural)');
    });

    it('strictly excludes robotic David voice from warm persona and selects warm voice instead', () => {
      const mockVoices = [
        { name: 'Microsoft David Desktop', lang: 'en-US' },
        { name: 'Microsoft Zira Desktop', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      vi.stubGlobal('speechSynthesis', {
        getVoices: () => mockVoices,
      });

      // Warm persona must NEVER choose David
      const warmVoice = getBestNaturalVoice('warm', mockVoices);
      expect(warmVoice?.name).toBe('Microsoft Zira Desktop');

      // Clear persona can choose David when Guy is unavailable
      const clearVoice = getBestNaturalVoice('clear', mockVoices);
      expect(clearVoice?.name).toBe('Microsoft David Desktop');
    });

    it('falls back gracefully to non-robotic English voice when neural voices are absent', () => {
      const mockVoices = [
        { name: 'Microsoft David Desktop', lang: 'en-US' },
        { name: 'Calm English Speaker', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      vi.stubGlobal('speechSynthesis', {
        getVoices: () => mockVoices,
      });

      const voice = getBestNaturalVoice('warm', mockVoices);
      expect(voice?.name).toBe('Calm English Speaker');
    });

    it('resolves voices asynchronously when window.speechSynthesis is available', async () => {
      const mockVoices = [
        { name: 'Microsoft Jenny Online (Natural)', lang: 'en-US' },
      ] as SpeechSynthesisVoice[];

      vi.stubGlobal('speechSynthesis', {
        getVoices: () => mockVoices,
      });

      const voices = await resolveVoices();
      expect(voices).toHaveLength(1);
      expect(voices[0]?.name).toBe('Microsoft Jenny Online (Natural)');
    });
  });
});
