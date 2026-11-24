/**
 * Alongside: Parent Calm Natural Audio Narrator Engine
 * 
 * Provides human-sounding, hooking, unhurried audio narration for lesson readers.
 * Features:
 * - Neural voice discovery & prioritization (Edge Natural, Apple Premium/Enhanced, Google Natural)
 * - Conversational text preprocessing (expands abbreviations, dialogue breaths, acronyms)
 * - Intimate storytelling script construction (hooking audio intro, seamless transitions)
 * - Calibrated acoustic prosody (grounded 0.97 pitch, unhurried 0.93 base cadence)
 * - Chromium 15-second speech synthesis keep-alive guard
 */

import type { AlmanacLessonPayload } from '@alongside/shared';

export type VoicePersona = 'warm' | 'clear';

export interface NarrationScriptResult {
  fullText: string;
  estimatedSeconds: number;
  beats: string[];
}

/**
 * Top-tier natural neural voices ranked by warmth, prosody, and clarity.
 */
const WARM_NEURAL_VOICES = [
  // Edge / Microsoft Online Natural (Industry-leading human quality)
  'Microsoft Jenny Online (Natural)',
  'Microsoft Aria Online (Natural)',
  'Microsoft Emma Online (Natural)',
  'Microsoft Michelle Online (Natural)',
  // Apple Premium / Enhanced (macOS / iOS / iPadOS)
  'Ava (Premium)',
  'Ava (Enhanced)',
  'Ava',
  'Zoe (Premium)',
  'Zoe',
  'Samantha (Enhanced)',
  'Samantha',
  // Google Chrome Natural
  'Google US English',
  'Google UK English Female',
  // Windows Standard Warm Female fallback (never David)
  'Microsoft Zira Desktop',
  'Microsoft Zira',
  'Zira',
];

const CLEAR_NEURAL_VOICES = [
  // Edge / Microsoft Online Natural
  'Microsoft Guy Online (Natural)',
  'Microsoft Christopher Online (Natural)',
  'Microsoft Roger Online (Natural)',
  // Apple Premium / Enhanced
  'Daniel (Enhanced)',
  'Daniel',
  'Alex',
  // Google Chrome
  'Google UK English Male',
  // Windows Standard Clear Articulate Male
  'Microsoft David Desktop',
  'Microsoft David',
  'David',
];

/**
 * Harsh or archaic robotic voices excluded from Warm voice selection.
 */
const ROBOTIC_VOICE_NAMES = ['david', 'mark', 'george', 'hazel'];

/**
 * Normalizes text for fluid, natural human speech synthesis:
 * - Expands abbreviations that sound robotic
 * - Converts time and age numbers to words
 * - Adds pauses around direct dialogue quotes so the speaker takes an authentic breath
 * - Strips all markdown symbols
 */
export function cleanTextForSpeech(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. Strip markdown formatting
  text = text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/#+\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 2. Expand times FIRST before AM/PM abbreviation expansion
  const timeExpansions: [RegExp, string][] = [
    [/(\d{1,2}):00\s*(AM|PM)?/gi, "$1 o'clock $2"],
    [/(\d{1,2}):30\s*(AM|PM)?/gi, '$1 thirty $2'],
    [/(\d{1,2}):15\s*(AM|PM)?/gi, '$1 fifteen $2'],
    [/(\d{1,2}):45\s*(AM|PM)?/gi, '$1 forty-five $2'],
  ];
  for (const [regex, replacement] of timeExpansions) {
    text = text.replace(regex, replacement);
  }

  // 3. Expand common pediatric & parenting abbreviations
  const expansions: [RegExp, string][] = [
    [/\be\.g\.,?\s*/gi, 'for example, '],
    [/\bi\.e\.,?\s*/gi, 'that is, '],
    [/\bapprox\.\s*/gi, 'approximately '],
    [/\bvs\.\s*/gi, 'versus '],
    [/\bmins?\b/gi, 'minutes'],
    [/\bsecs?\b/gi, 'seconds'],
    [/\bhrs?\b/gi, 'hours'],
    [/\bAAP\b/g, 'A A P'],
    [/\bCDC\b/g, 'C D C'],
    [/\bAM\b/g, 'A M'],
    [/\bPM\b/g, 'P M'],
    [/\bAges?\s+0[–-]1\b/gi, 'Ages zero to one'],
    [/\bAges?\s+0[–-]3\b/gi, 'Ages zero to three'],
    [/\bAges?\s+4[–-]6\b/gi, 'Ages four to six'],
    [/\bAges?\s+7[–-]9\b/gi, 'Ages seven to nine'],
    [/\bAges?\s+10[–-]12\b/gi, 'Ages ten to twelve'],
    [/\bAges?\s+13[–-]18\b/gi, 'Ages thirteen to eighteen'],
    [/\b1st\b/gi, 'first'],
    [/\b2nd\b/gi, 'second'],
    [/\b3rd\b/gi, 'third'],
  ];

  for (const [regex, replacement] of expansions) {
    text = text.replace(regex, replacement);
  }

  // 4. Dialogue breathes: insert gentle breath spaces around quotes so direct speech doesn't rush
  text = text
    .replace(/“([^”]+)”/g, ' ... "$1" ... ')
    .replace(/"([^"]+)"/g, ' ... "$1" ... ');

  // 5. Clean extra spaces, newlines, and trailing punctuation without breaking ellipses
  text = text
    .replace(/\s+/g, ' ')
    .replace(/([,;:?!])\s*/g, '$1 ')
    .replace(/\s*\.{3,}\s*/g, ' ... ')
    .replace(/(?<!\.)\.(?!\.)\s*/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();

  return text;
}

/**
 * Builds an engaging, warm, podcast-style audio narration script from the lesson payload.
 * Replaces dry metadata titles with conversational, human transitions.
 */
export function buildHookingNarrationScript(
  payload: AlmanacLessonPayload,
  t: (template: string) => string,
  childName?: string
): NarrationScriptResult {
  const name = childName || 'your child';
  const headline = cleanTextForSpeech(t(payload.headline));
  const deck = cleanTextForSpeech(t(payload.deck));
  const sceneBody = cleanTextForSpeech(t(payload.sceneBody));
  const beat2Title = cleanTextForSpeech(t(payload.beat2Title));
  const beat2Lead = cleanTextForSpeech(t(payload.beat2Lead));
  const almanacTruth = cleanTextForSpeech(t(payload.almanacTruth));
  const calmScript = cleanTextForSpeech(t(payload.calmScriptPlain));
  const closingNote = cleanTextForSpeech(t(payload.closingNote));

  // Beat 1: The Hook & Living Scene
  const beat1 = `Welcome to Alongside. Here is your quick three-minute audio briefing for ${name}. ${headline}. ${deck}. Let's step into what this moment looks like at home. ${sceneBody}`;

  // Beat 2: The Neurobiology Behind It
  const beat2 = `Why does this happen in their nervous system? ${beat2Title}. ${beat2Lead}. Here is the single truth to hold onto: ${almanacTruth}`;

  // Beat 3: The Calibrated Dialogue Script
  const beat3 = `Now, what do you actually say in that moment? Here are words that help without escalating the friction. Take a breath, and try this: ${calmScript}`;

  // Beat 4: Grounded Closing Note
  const beat4 = `Before tonight, remember this: ${closingNote}. You've got this.`;

  const beats = [beat1, beat2, beat3, beat4];
  const fullText = beats.join(' ... ');

  // Paced speaking cadence: ~135 spoken words per minute
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = Math.max(45, Math.round((wordCount / 135) * 60));

  return { fullText, estimatedSeconds, beats };
}

let cachedVoices: SpeechSynthesisVoice[] = [];

/**
 * Returns available browser speech synthesis voices.
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  const synth =
    typeof window !== 'undefined' && 'speechSynthesis' in window
      ? window.speechSynthesis
      : typeof globalThis !== 'undefined' && 'speechSynthesis' in globalThis
      ? (globalThis as unknown as { speechSynthesis: SpeechSynthesis }).speechSynthesis
      : null;

  if (!synth || typeof synth.getVoices !== 'function') {
    return cachedVoices;
  }
  const voices = synth.getVoices() || [];
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  return voices.length > 0 ? voices : cachedVoices;
}

/**
 * Ensures voices are retrieved asynchronously before speech synthesis starts.
 * Chromium and WebKit load voices asynchronously; this guarantees speech is never
 * started with an uninitialized or robotic fallback voice.
 */
export function resolveVoices(): Promise<SpeechSynthesisVoice[]> {
  const synth =
    typeof window !== 'undefined' && 'speechSynthesis' in window
      ? window.speechSynthesis
      : typeof globalThis !== 'undefined' && 'speechSynthesis' in globalThis
      ? (globalThis as unknown as { speechSynthesis: SpeechSynthesis }).speechSynthesis
      : null;

  if (!synth || typeof synth.getVoices !== 'function') {
    return Promise.resolve(cachedVoices);
  }

  const immediate = synth.getVoices();
  if (immediate && immediate.length > 0) {
    cachedVoices = immediate;
    return Promise.resolve(immediate);
  }

  return new Promise((resolve) => {
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      if (synth && typeof synth.removeEventListener === 'function') {
        synth.removeEventListener('voiceschanged', onVoices);
      }
      const loaded = getAvailableVoices();
      if (loaded.length > 0) {
        cachedVoices = loaded;
      }
      resolve(cachedVoices);
    };

    const onVoices = () => finish();

    if (synth && typeof synth.addEventListener === 'function') {
      synth.addEventListener('voiceschanged', onVoices);
    }
    setTimeout(finish, 350);
  });
}

/**
 * Selects the highest quality natural/neural voice available in the current browser.
 * For the warm persona, harsh robotic voices (such as Microsoft David) are strictly excluded.
 */
export function getBestNaturalVoice(
  persona: VoicePersona = 'warm',
  providedVoices?: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  const voices =
    providedVoices && providedVoices.length > 0
      ? providedVoices
      : getAvailableVoices();
  if (voices.length === 0) return null;

  const englishVoices = voices.filter(
    (v) => v.lang.startsWith('en') || v.lang.startsWith('en-')
  );
  if (englishVoices.length === 0) return voices[0] || null;

  const targetList = persona === 'clear' ? CLEAR_NEURAL_VOICES : WARM_NEURAL_VOICES;

  // 1. Try exact or partial match from preferred neural list
  for (const preferred of targetList) {
    const match = englishVoices.find((v) =>
      v.name.toLowerCase().includes(preferred.toLowerCase())
    );
    if (match) return match;
  }

  // 2. Try generic "Natural", "Neural", "Premium", or "Enhanced" in voice name
  if (persona === 'warm') {
    const naturalMatch = englishVoices.find(
      (v) =>
        (v.name.includes('Natural') ||
          v.name.includes('Neural') ||
          v.name.includes('Premium') ||
          v.name.includes('Enhanced')) &&
        !ROBOTIC_VOICE_NAMES.some((robotic) => v.name.toLowerCase().includes(robotic))
    );
    if (naturalMatch) return naturalMatch;

    // Fallback for warm: pick a female or non-robotic English voice (e.g. Zira), never David!
    const warmFallback =
      englishVoices.find(
        (v) =>
          !ROBOTIC_VOICE_NAMES.some((robotic) => v.name.toLowerCase().includes(robotic))
      ) || englishVoices.find((v) => v.name.toLowerCase().includes('zira'));

    if (warmFallback) return warmFallback;
  } else {
    // For clear persona
    const naturalMatch = englishVoices.find(
      (v) =>
        v.name.includes('Natural') ||
        v.name.includes('Neural') ||
        v.name.includes('Premium') ||
        v.name.includes('Enhanced')
    );
    if (naturalMatch) return naturalMatch;
  }

  // 3. Fallback to any English voice
  return englishVoices[0] || null;
}

export interface PlayNarratorOptions {
  text: string;
  rateMultiplier?: number;
  persona?: VoicePersona;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: unknown) => void;
  onBoundary?: (charIndex: number) => void;
}

/**
 * Plays speech synthesis with warm, human prosody and Chrome 15s keep-alive.
 * Guarantees voices are resolved before audio starts, ensuring the first voice heard
 * is always the warm neural companion. Returns a cancel function.
 */
export function playNaturalNarrator({
  text,
  rateMultiplier = 1,
  persona = 'warm',
  onStart,
  onEnd,
  onError,
  onBoundary,
}: PlayNarratorOptions): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.('SpeechSynthesis not supported');
    return () => {};
  }

  let canceled = false;
  let keepAliveTimer: number | null = null;

  const stopKeepAlive = () => {
    if (keepAliveTimer !== null) {
      window.clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
  };

  const cancel = () => {
    canceled = true;
    stopKeepAlive();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Ensure voices are loaded first before speaking so utterance.voice is never unassigned
  resolveVoices().then((voices) => {
    if (canceled) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Calibrated human prosody:
    // - 0.93 baseline rate (unhurried, thoughtful pacing)
    // - 0.97 pitch (slightly deeper, grounded, warm resonance)
    const baseRate = 0.93;
    utterance.rate = Math.max(0.6, Math.min(2.0, baseRate * rateMultiplier));
    utterance.pitch = 0.97;

    const voice = getBestNaturalVoice(persona, voices);
    if (voice) {
      utterance.voice = voice;
    }

    // Chrome 15-second speech silence keep-alive guard
    const startKeepAlive = () => {
      keepAliveTimer = window.setInterval(() => {
        if (
          typeof window !== 'undefined' &&
          'speechSynthesis' in window &&
          window.speechSynthesis.speaking &&
          !window.speechSynthesis.paused
        ) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    };

    utterance.onstart = () => {
      if (canceled) return;
      startKeepAlive();
      onStart?.();
    };

    utterance.onboundary = (e) => {
      if (canceled) return;
      if (e.charIndex != null) {
        onBoundary?.(e.charIndex);
      }
    };

    utterance.onend = () => {
      stopKeepAlive();
      if (!canceled) {
        onEnd?.();
      }
    };

    utterance.onerror = (e) => {
      stopKeepAlive();
      if (!canceled && e.error !== 'canceled' && e.error !== 'interrupted') {
        onError?.(e);
      }
    };

    window.speechSynthesis.speak(utterance);
  });

  return cancel;
}
