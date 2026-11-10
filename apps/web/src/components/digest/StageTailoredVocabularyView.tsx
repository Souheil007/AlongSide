'use client';

import * as React from 'react';
import {
  MessageSquare,
  Search,
  Volume2,
  Check,
  Copy,
  Info,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface VocabularyTerm {
  word: string;
  phonetic: string;
  type: string;
  definition: string;
  example: string;
  parentResponse: string;
}

export interface StageVocabularyConfig {
  eligibleForSlang: boolean;
  category: string;
  bannerNotice?: string;
  terms: VocabularyTerm[];
}

export const STAGE_VOCABULARY_DATA: Record<
  'INFANT' | 'ELEMENTARY' | 'ADOLESCENT',
  StageVocabularyConfig
> = {
  ADOLESCENT: {
    eligibleForSlang: true,
    category: 'Adolescent Peer Vernacular',
    terms: [
      {
        word: 'Crashout',
        phonetic: '/ kræʃ · aʊt /',
        type: 'Verb / Noun',
        definition:
          'An explosive, reckless reaction to provocation where someone sacrifices their status or consequences in front of peers.',
        example:
          '"He lost his temper over a dropped pencil and had a total crashout in history class."',
        parentResponse:
          '"Sounds like things got heated fast. Did he end up cooling down afterwards?"',
      },
      {
        word: 'Aura Points',
        phonetic: '/ ˈɔː · rə · pɔɪnts /',
        type: 'Noun Phrase',
        definition:
          'An imaginary social scorecard measuring cool composure, confidence, and effortless grace under pressure.',
        example:
          '"Stumbling on the stairs is minus 500 aura; helping the custodian carry chairs is plus 1,000 aura."',
        parentResponse:
          '"Maintaining your calm during that difficult moment was definitely high aura in my book."',
      },
      {
        word: 'Cooked',
        phonetic: '/ kʊkt /',
        type: 'Adjective',
        definition:
          'Exhausted, in deep trouble, or having zero chance of recovery on a test or difficult situation.',
        example:
          '"I didn\'t study for the chemistry mid-term; I am completely cooked."',
        parentResponse:
          '"If you\'re feeling cooked, let\'s take a 10-minute break and tackle the review sheet together."',
      },
      {
        word: 'Locked In',
        phonetic: '/ lɑːkt · ɪn /',
        type: 'Verb Phrase',
        definition:
          'In a state of hyper-focus, total dedication, and zero distraction.',
        example:
          '"He put his headphones on, shut off Discord, and was fully locked in on that essay."',
        parentResponse:
          '"I see you locked in on that project. I\'ll make sure the house stays quiet for you."',
      },
    ],
  },
  ELEMENTARY: {
    eligibleForSlang: true,
    category: 'Elementary Recess & Gaming Vernacular',
    terms: [
      {
        word: 'Griefing',
        phonetic: '/ ˈɡriː · fɪŋ /',
        type: 'Verb',
        definition:
          "Deliberately sabotaging someone else's digital build, creative world, or game progress.",
        example:
          '"He came into our Minecraft village and started griefing our flower garden!"',
        parentResponse:
          '"That feels really unfair when you worked hard on it. Let\'s make sure the world has saving backups."',
      },
      {
        word: 'No Backsies',
        phonetic: '/ noʊ · ˈbæk · siz /',
        type: 'Phrase / Recess Law',
        definition:
          'The unwritten recess law that once a physical card or toy trade is executed, it cannot be reversed.',
        example:
          '"We shook hands on the holographic Pikachu—no backsies!"',
        parentResponse:
          '"Even with \'no backsies,\' if someone felt pressured, good friends check in to make it right."',
      },
      {
        word: 'Duping',
        phonetic: '/ ˈdjuː · pɪŋ /',
        type: 'Verb',
        definition:
          'Using a game glitch to duplicate rare items or tricks; also used when someone pulls an unfair trick.',
        example:
          '"She said she had two Mewtwos because of duping in the game."',
        parentResponse:
          '"Do you think getting items through shortcuts is as fun as earning them?"',
      },
      {
        word: 'Bruh / Oof',
        phonetic: '/ brʌ / uːf /',
        type: 'Exclamation',
        definition:
          'Universal vocal reaction to an awkward mistake, clumsy fall, or mild disappointment.',
        example:
          '"I dropped my pencil case right as the bell rang... big oof."',
        parentResponse:
          '"Oof indeed! Did everything survive the fall?"',
      },
    ],
  },
  INFANT: {
    eligibleForSlang: false,
    category: 'Pre-Verbal Acoustic Signals & High-Chair Gestures',
    bannerNotice:
      'Youth internet slang is not applicable to an infant. AlongSide conditionally presents this Stage-Appropriate Pre-Verbal Signal Decoder.',
    terms: [
      {
        word: 'Referential Pointing',
        phonetic: '[ Extended index finger + eye gaze ]',
        type: 'Social Milestone',
        definition:
          'Pointing at an object while looking back at your eyes to verify shared attention and mutual discovery.',
        example:
          'Mateo points at the ceiling fan and makes an excited "Ooo!" sound until you look up.',
        parentResponse:
          '"Yes, look at the big fan spinning around and around! (Validates his perceptual discovery)."',
      },
      {
        word: 'Lip Trills / Raspberries',
        phonetic: '[ Pbbbbbt sound with tongue ]',
        type: 'Motor Milestone',
        definition:
          'Vibrating lips to experiment with air pressure, oral-motor control, and acoustic echo.',
        example:
          'Blowing raspberries into his high-chair tray or onto your shoulder during burping.',
        parentResponse:
          '"Blow a raspberry right back with a giggle! It reinforces motor vocal play."',
      },
      {
        word: "Repetitive Syllable Echo ('Ba-Ba')",
        phonetic: '/ bɑː · bɑː /',
        type: 'Phonetic Milestone',
        definition:
          'Canonical babbling practicing bilabial consonants (B, M, P) before true first words emerge.',
        example:
          'Sitting on the rug repeating "Ba-ba-ba" while holding a wooden block.',
        parentResponse:
          '"Ba-ba! Are you holding your blue ball? That is a blue ball!"',
      },
    ],
  },
};

export function resolveVocabStage(
  child: ChildDTO | null | undefined
): 'INFANT' | 'ELEMENTARY' | 'ADOLESCENT' {
  if (!child) return 'ADOLESCENT';
  if (child.age <= 3) return 'INFANT';
  if (child.age <= 10) return 'ELEMENTARY';
  return 'ADOLESCENT';
}

export interface StageTailoredVocabularyViewProps {
  child?: ChildDTO | null;
  className?: string;
}

export function StageTailoredVocabularyView({
  child,
  className,
}: StageTailoredVocabularyViewProps) {
  const stage = resolveVocabStage(child);
  const config = STAGE_VOCABULARY_DATA[stage];
  const [searchQuery, setSearchQuery] = React.useState('');
  const [copiedWord, setCopiedWord] = React.useState<string | null>(null);

  const filteredTerms = React.useMemo(() => {
    if (!searchQuery.trim()) return config.terms;
    const q = searchQuery.toLowerCase();
    return config.terms.filter(
      (t) =>
        t.word.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.example.toLowerCase().includes(q)
    );
  }, [config.terms, searchQuery]);

  const handleCopy = (word: string, textToCopy: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedWord(word);
      setTimeout(() => setCopiedWord(null), 2000);
    }
  };

  return (
    <section className={cn('space-y-5 max-w-7xl mx-auto', className)}>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E3DC] pb-3">
        <div className="space-y-0.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#143D2B] font-bold flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#143D2B]" />
            Pillar 4 · Stage-Tailored Micro-Language Decoder
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#111413]">
            {config.eligibleForSlang
              ? 'Decode Modern Youth Vocabulary'
              : 'Stage-Appropriate Pre-Verbal Decoder'}
          </h2>
        </div>
        <span className="text-xs font-mono text-[#858C88] bg-[#F4F4F0] px-3 py-1 rounded-full border border-[#E3E3DC]">
          {config.category}
        </span>
      </div>

      {/* Reassurance Banner for Infants */}
      {!config.eligibleForSlang && config.bannerNotice && (
        <div className="p-4 sm:p-5 bg-[#EAF3EE] rounded-2xl border border-[#143D2B]/30 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-[#143D2B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#143D2B] block">
              Pre-Device Sanctuary Active
            </span>
            <p className="text-xs sm:text-sm text-[#143D2B] leading-relaxed">
              {config.bannerNotice}
            </p>
          </div>
        </div>
      )}

      {/* Search Input for Slang-Eligible Stages */}
      {config.eligibleForSlang && (
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858C88]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${config.category.toLowerCase()}...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E3DC] bg-white text-xs sm:text-sm text-[#111413] placeholder-[#858C88] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/20 focus:border-[#143D2B] transition"
          />
        </div>
      )}

      {/* Terms Grid (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.map((term) => (
          <div
            key={term.word}
            className="rounded-3xl border border-[#E3E3DC] bg-white p-6 space-y-4 shadow-xs hover:border-[#143D2B]/30 transition"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#E3E3DC] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-[#111413]">
                    {term.word}
                  </h3>
                  <span className="font-mono text-[11px] text-[#858C88]">
                    {term.phonetic}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold block pt-0.5">
                  {term.type}
                </span>
              </div>
              <button
                onClick={() => handleCopy(term.word, `${term.word}: ${term.parentResponse}`)}
                className="text-[11px] font-mono text-[#858C88] hover:text-[#143D2B] flex items-center gap-1 p-1"
                title="Copy term and response"
              >
                {copiedWord === term.word ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#494F4C] leading-relaxed">
              {term.definition}
            </p>

            {/* Example sentence */}
            <div className="p-3 bg-[#F4F4F0] rounded-xl border border-[#E3E3DC] space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#858C88] font-bold block">
                In Context
              </span>
              <p className="text-xs text-[#111413] italic font-medium">
                {term.example}
              </p>
            </div>

            {/* Parent Calm Response Script */}
            <div className="p-3 bg-[#EAF3EE] rounded-xl border border-[#143D2B]/20 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold block">
                Parent Calm Script
              </span>
              <p className="text-xs text-[#143D2B] font-medium italic">
                {term.parentResponse}
              </p>
            </div>
          </div>
        ))}

        {filteredTerms.length === 0 && (
          <div className="md:col-span-2 p-8 text-center rounded-2xl border border-dashed border-[#E3E3DC] text-[#858C88] text-xs font-mono">
            No terms matched "{searchQuery}". Try clearing your search.
          </div>
        )}
      </div>
    </section>
  );
}
