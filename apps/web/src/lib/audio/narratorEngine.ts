/**
 * Alongside: Parent Calm Natural Audio Narrator Engine
 *
 * Provides human-sounding, seekable, unhurried audio narration for lesson readers.
 * Features:
 * - Default male clear neural voice discovery & prioritization, with optional warm female voice
 * - Conversational text preprocessing (expands abbreviations, dialogue breaths, acronyms, strips em-dashes)
 * - Intimate 5-beat storytelling script construction mapped to exact chapter boundaries
 * - Real word-and-pause duration calculation (zero static placeholder times)
 * - Word-aligned character offset seeking for seamless pause/resume, ±10s skip, and scrubbing
 * - Synchronous speech start when voices are pre-warmed to respect browser gesture policies
 * - Chromium 15-second speech synthesis keep-alive guard
 */

import {
  estimateSpokenDurationSeconds,
  stripEmDashes,
  type AlmanacLessonPayload,
} from '@alongside/shared';

export type VoicePersona = 'clear' | 'warm';

export interface NarrationBeatRange {
  beatIndex: number;
  startChar: number;
  endChar: number;
  startSeconds: number;
  endSeconds: number;
}

export interface NarrationScriptResult {
  fullText: string;
  estimatedSeconds: number;
  beats: string[];
  beatRanges: NarrationBeatRange[];
}

/**
 * Top-tier natural male voices ranked by natural prosody, clarity, and warmth (default persona: 'clear').
 */
const CLEAR_NEURAL_VOICES = [
  // Edge / Microsoft Online Natural Male (Industry-leading human quality)
  'Microsoft Andrew Online (Natural)',
  'Microsoft Brian Online (Natural)',
  'Microsoft Guy Online (Natural)',
  'Microsoft Christopher Online (Natural)',
  'Microsoft Eric Online (Natural)',
  'Microsoft Steffan Online (Natural)',
  'Microsoft Roger Online (Natural)',
  'Microsoft Ryan Online (Natural)',
  // Apple Premium / Enhanced Male (macOS / iOS / iPadOS)
  'Daniel (Enhanced)',
  'Daniel',
  'Alex',
  'Aaron',
  'Arthur',
  'Oliver',
  'Nathan',
  // Google Chrome Natural Male
  'Google UK English Male',
  // Windows Standard Male fallbacks
  'Microsoft Mark Desktop',
  'Microsoft Mark',
  'Microsoft George Desktop',
  'Microsoft George',
  'Microsoft David Desktop',
  'Microsoft David',
  'Mark',
  'David',
];

/**
 * Top-tier natural female voices ranked by warmth, prosody, and clarity (optional persona: 'warm').
 */
const WARM_NEURAL_VOICES = [
  // Edge / Microsoft Online Natural Female
  'Microsoft Jenny Online (Natural)',
  'Microsoft Aria Online (Natural)',
  'Microsoft Emma Online (Natural)',
  'Microsoft Michelle Online (Natural)',
  'Microsoft Ava Online (Natural)',
  'Microsoft Sonia Online (Natural)',
  // Apple Premium / Enhanced Female (macOS / iOS / iPadOS)
  'Ava (Premium)',
  'Ava (Enhanced)',
  'Ava',
  'Zoe (Premium)',
  'Zoe',
  'Samantha (Enhanced)',
  'Samantha',
  // Google Chrome Natural Female
  'Google US English',
  'Google UK English Female',
  // Windows Standard Warm Female fallback
  'Microsoft Zira Desktop',
  'Microsoft Zira',
  'Zira',
];

const FEMALE_VOICE_HINTS = [
  'female',
  'jenny',
  'aria',
  'emma',
  'michelle',
  'ava',
  'zoe',
  'samantha',
  'zira',
  'sonia',
  'libby',
  'hazel',
  'susan',
  'catherine',
  'karen',
  'moira',
  'tessa',
  'victoria',
  'allison',
  'serena',
  'claire',
  'natasha',
  'clara',
  'neerja',
  'molly',
  'ana',
];

const MALE_VOICE_HINTS = [
  'male',
  'andrew',
  'brian',
  'guy',
  'christopher',
  'eric',
  'steffan',
  'roger',
  'ryan',
  'daniel',
  'alex',
  'aaron',
  'arthur',
  'oliver',
  'nathan',
  'david',
  'mark',
  'george',
  'james',
  'william',
  'liam',
  'connor',
  'mitchell',
];

/**
 * Harsh or archaic robotic voices excluded from Warm voice selection.
 */
const ROBOTIC_VOICE_NAMES = ['david', 'mark', 'george', 'hazel'];

/**
 * Normalizes text for fluid, natural human speech synthesis:
 * - Removes LLM em-dashes cleanly
 * - Expands abbreviations that sound robotic
 * - Converts time and age numbers to words
 * - Adds pauses around direct dialogue quotes so the speaker takes an authentic breath
 * - Strips all markdown symbols
 */
export function cleanTextForSpeech(raw: string): string {
  if (!raw) return '';

  let text = stripEmDashes(raw);

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

  // 4. Dialogue breaths: insert gentle breath spaces around quotes so direct speech doesn't rush
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

function asSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';
  return /[.?!]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

/**
 * Builds an engaging, grounded 5-beat podcast-style audio narration script from
 * the lesson payload, with real duration computed from actual words and pauses
 * and exact beat boundaries for live chapter sync & scrubbing.
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
  const beat4Title = cleanTextForSpeech(t(payload.beat4Title));
  const beat4Lead = cleanTextForSpeech(t(payload.beat4Lead));
  const firstMove = payload.moves[0];
  const firstMoveTitle = firstMove ? cleanTextForSpeech(t(firstMove.title)) : '';
  const firstMoveDesc = firstMove ? cleanTextForSpeech(t(firstMove.desc)) : '';
  const closingNote = cleanTextForSpeech(t(payload.closingNote));

  // Beat 1 (The Mirror): Hook & Living Scene (no hardcoded static duration claim)
  const beat1 = `Welcome to Alongside. Here is your audio briefing for ${name}. ${asSentence(headline)} ${asSentence(deck)} Let's step into what this moment looks like at home. ${sceneBody}`.replace(/\s+/g, ' ').trim();

  // Beat 2 (Inside Mind): The Neurobiology Behind It
  const beat2 = `Why does this happen in their nervous system? ${asSentence(beat2Title)} ${asSentence(beat2Lead)} Here is the single truth to hold onto: ${almanacTruth}`.replace(/\s+/g, ' ').trim();

  // Beat 3 (Practice): The Calibrated Dialogue Script
  const beat3 = `Now, what do you actually say in that moment? Here are words that help without escalating the friction. Take a breath, and try this: ${calmScript}`.replace(/\s+/g, ' ').trim();

  // Beat 4 (One Move): Tonight's Smallest Step
  const beat4 = (
    firstMoveTitle
      ? `Tonight, keep it small. ${asSentence(beat4Title)} One easy place to start: ${asSentence(firstMoveTitle)} ${firstMoveDesc}`
      : `Tonight, keep it small. ${asSentence(beat4Title)} ${beat4Lead}`
  ).replace(/\s+/g, ' ').trim();

  // Beat 5 (Pocket Card): Grounded Closing Note
  const beat5 = `Before tonight, remember this: ${asSentence(closingNote)} You've got this.`.replace(/\s+/g, ' ').trim();

  const beats = [beat1, beat2, beat3, beat4, beat5];
  const separator = ' ... ';

  const beatDurations = beats.map((b) => estimateSpokenDurationSeconds(b));
  const totalSeconds = Math.max(
    15,
    beatDurations.reduce((sum, sec) => sum + sec, 0)
  );

  const beatRanges: NarrationBeatRange[] = [];
  let charCursor = 0;
  let secCursor = 0;

  beats.forEach((beatText, idx) => {
    const startChar = charCursor;
    const endChar = startChar + beatText.length;
    const dur = beatDurations[idx] ?? 0;
    beatRanges.push({
      beatIndex: idx,
      startChar,
      endChar,
      startSeconds: secCursor,
      endSeconds: secCursor + dur,
    });
    charCursor = endChar + (idx < beats.length - 1 ? separator.length : 0);
    secCursor += dur;
  });

  const fullText = beats.join(separator);

  return {
    fullText,
    estimatedSeconds: totalSeconds,
    beats,
    beatRanges,
  };
}

/**
 * Aligns a target character offset to the start of a whole word so resuming or
 * skipping never cuts mid-word.
 */
export function findWordAlignedOffset(fullText: string, rawOffset: number): number {
  if (!fullText) return 0;
  const clamped = Math.max(0, Math.min(fullText.length, Math.round(rawOffset)));
  if (clamped === 0 || clamped >= fullText.length) {
    return clamped;
  }

  // If we're already right after whitespace, skip any leading spaces or ellipsis separators
  let pos = clamped;
  if (!/\s/.test(fullText[pos - 1] ?? '')) {
    const prevSpace = fullText.lastIndexOf(' ', pos);
    const nextSpace = fullText.indexOf(' ', pos);
    if (prevSpace === -1) {
      pos = 0;
    } else if (nextSpace === -1) {
      pos = prevSpace + 1;
    } else {
      // Snap to the closer word boundary
      pos = pos - prevSpace <= nextSpace - pos ? prevSpace + 1 : nextSpace + 1;
    }
  }

  // Advance past any whitespace or standalone ellipsis dots ("... ")
  while (pos < fullText.length && /[\s.]/.test(fullText[pos] ?? '')) {
    pos += 1;
  }

  return Math.min(pos, fullText.length);
}

/**
 * Translates an elapsed audio timestamp (in seconds) into a word-aligned
 * character offset in `fullText`, using per-beat timing ranges when provided.
 */
export function secondsToCharOffset(
  fullText: string,
  seconds: number,
  totalSeconds: number,
  beatRanges?: NarrationBeatRange[]
): number {
  if (!fullText || totalSeconds <= 0) return 0;
  const clampedSec = Math.max(0, Math.min(totalSeconds, seconds));
  if (clampedSec <= 0) return 0;
  if (clampedSec >= totalSeconds) return fullText.length;

  if (beatRanges && beatRanges.length > 0) {
    const range =
      beatRanges.find(
        (b) => clampedSec >= b.startSeconds && clampedSec <= b.endSeconds
      ) ?? beatRanges[beatRanges.length - 1]!;
    const spanSec = Math.max(1, range.endSeconds - range.startSeconds);
    const localRatio = Math.max(
      0,
      Math.min(1, (clampedSec - range.startSeconds) / spanSec)
    );
    const rawChar =
      range.startChar + localRatio * (range.endChar - range.startChar);
    return findWordAlignedOffset(fullText, rawChar);
  }

  const ratio = clampedSec / totalSeconds;
  return findWordAlignedOffset(fullText, ratio * fullText.length);
}

/**
 * Translates a character offset in `fullText` into an elapsed timestamp (in seconds).
 */
export function charOffsetToSeconds(
  fullText: string,
  charOffset: number,
  totalSeconds: number,
  beatRanges?: NarrationBeatRange[]
): number {
  if (!fullText || totalSeconds <= 0) return 0;
  const clampedChar = Math.max(0, Math.min(fullText.length, charOffset));
  if (clampedChar <= 0) return 0;
  if (clampedChar >= fullText.length) return totalSeconds;

  if (beatRanges && beatRanges.length > 0) {
    for (let i = 0; i < beatRanges.length; i++) {
      const range = beatRanges[i]!;
      const nextRange = beatRanges[i + 1];
      if (
        clampedChar <= range.endChar ||
        !nextRange ||
        clampedChar < nextRange.startChar
      ) {
        const spanChar = Math.max(1, range.endChar - range.startChar);
        const localRatio = Math.max(
          0,
          Math.min(1, (clampedChar - range.startChar) / spanChar)
        );
        return range.startSeconds + localRatio * (range.endSeconds - range.startSeconds);
      }
    }
  }

  return (clampedChar / Math.max(1, fullText.length)) * totalSeconds;
}

/**
 * Resolves the active Almanac beat index (0..4) for a character offset or timestamp.
 */
export function resolveBeatIndexForChar(
  beatRanges: NarrationBeatRange[],
  charOffset: number
): number {
  if (!beatRanges.length) return 0;
  for (let i = beatRanges.length - 1; i >= 0; i--) {
    if (charOffset >= beatRanges[i]!.startChar) {
      return beatRanges[i]!.beatIndex;
    }
  }
  return beatRanges[0]!.beatIndex;
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
 * started with an uninitialized fallback voice.
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

function matchesAnyHint(name: string, hints: string[]): boolean {
  const lower = name.toLowerCase();
  return hints.some((hint) => lower.includes(hint));
}

/**
 * Selects the highest quality natural/neural voice available in the current browser.
 * Defaults to the male 'clear' voice persona unless the user explicitly switches to 'warm' (female).
 */
export function getBestNaturalVoice(
  persona: VoicePersona = 'clear',
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

  const targetList = persona === 'warm' ? WARM_NEURAL_VOICES : CLEAR_NEURAL_VOICES;

  // 1. Try exact or partial match from preferred neural list
  for (const preferred of targetList) {
    const match = englishVoices.find((v) =>
      v.name.toLowerCase().includes(preferred.toLowerCase())
    );
    if (match) return match;
  }

  // 2. Try generic "Natural", "Neural", "Premium", or "Enhanced" matching gender preference
  const isHighQuality = (v: SpeechSynthesisVoice) =>
    v.name.includes('Natural') ||
    v.name.includes('Neural') ||
    v.name.includes('Premium') ||
    v.name.includes('Enhanced');

  if (persona === 'clear') {
    const maleNeural = englishVoices.find(
      (v) => isHighQuality(v) && !matchesAnyHint(v.name, FEMALE_VOICE_HINTS)
    );
    if (maleNeural) return maleNeural;

    const maleFallback = englishVoices.find(
      (v) => matchesAnyHint(v.name, MALE_VOICE_HINTS)
    );
    if (maleFallback) return maleFallback;

    const nonFemaleFallback = englishVoices.find(
      (v) => !matchesAnyHint(v.name, FEMALE_VOICE_HINTS)
    );
    if (nonFemaleFallback) return nonFemaleFallback;
  } else {
    const femaleNeural = englishVoices.find(
      (v) =>
        isHighQuality(v) &&
        !matchesAnyHint(v.name, ROBOTIC_VOICE_NAMES) &&
        !matchesAnyHint(v.name, MALE_VOICE_HINTS)
    );
    if (femaleNeural) return femaleNeural;

    const warmFallback =
      englishVoices.find(
        (v) =>
          !matchesAnyHint(v.name, ROBOTIC_VOICE_NAMES) &&
          !matchesAnyHint(v.name, MALE_VOICE_HINTS)
      ) ||
      englishVoices.find(
        (v) => !matchesAnyHint(v.name, ROBOTIC_VOICE_NAMES)
      ) ||
      englishVoices.find((v) => v.name.toLowerCase().includes('zira'));

    if (warmFallback) return warmFallback;
  }

  // 3. Fallback to any English voice
  return englishVoices[0] || null;
}

export interface PlayNarratorOptions {
  text: string;
  startCharOffset?: number;
  rateMultiplier?: number;
  persona?: VoicePersona;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: unknown) => void;
  onBoundary?: (globalCharIndex: number) => void;
}

/**
 * Plays speech synthesis from an optional character offset with calm human prosody
 * and Chrome 15s keep-alive. Starts synchronously when voices are already cached
 * so browser user-gesture autoplay rules are always satisfied. Returns a cancel fn.
 */
export function playNaturalNarrator({
  text,
  startCharOffset = 0,
  rateMultiplier = 1,
  persona = 'clear',
  onStart,
  onEnd,
  onError,
  onBoundary,
}: PlayNarratorOptions): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.('SpeechSynthesis not supported');
    return () => {};
  }

  const safeOffset = findWordAlignedOffset(text, startCharOffset);
  if (safeOffset >= text.length) {
    onEnd?.();
    return () => {};
  }

  const sliceText = text.slice(safeOffset);
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

  const speakWithVoices = (voices: SpeechSynthesisVoice[]) => {
    if (canceled) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(sliceText);

    // Calibrated human prosody:
    // - 0.93 baseline rate (unhurried, thoughtful pacing)
    // - 0.97 pitch (grounded resonance)
    const baseRate = 0.93;
    utterance.rate = Math.max(0.6, Math.min(2.0, baseRate * rateMultiplier));
    utterance.pitch = 0.97;

    const voice = getBestNaturalVoice(persona, voices);
    if (voice) {
      utterance.voice = voice;
    }

    // Chrome 15-second speech silence keep-alive guard
    const startKeepAlive = () => {
      stopKeepAlive();
      keepAliveTimer = window.setInterval(() => {
        if (
          !canceled &&
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
        onBoundary?.(safeOffset + e.charIndex);
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
  };

  // Speak synchronously when voices are already loaded (preserves browser user-gesture token)
  const immediateVoices = getAvailableVoices();
  if (immediateVoices.length > 0) {
    speakWithVoices(immediateVoices);
  } else {
    resolveVoices().then(speakWithVoices);
  }

  return cancel;
}
