'use client';

import * as React from 'react';
import {
  Search,
  Sparkles,
  Flame,
  HelpCircle,
  Quote,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { SlangTermDTO } from '@alongside/shared';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export type SlangTierFilter = 'ALL' | 'ELEMENTARY' | 'TWEEN' | 'TEEN';

export interface RichSlangTerm {
  id: string;
  term: string;
  phonetic: string;
  definition: string;
  culturalOrigin: 'TikTok' | 'Twitch' | 'Gaming' | 'YouTube' | 'Internet Culture';
  cringeMeter: 1 | 2 | 3 | 4 | 5; // 1 = minimal cringe, 5 = nuclear cringe
  exampleQuote: string;
  tier: 'ELEMENTARY' | 'TWEEN' | 'TEEN' | 'ALL';
  contextTone?: string;
  parentTip?: string;
}

export const CANONICAL_SLANG_CATALOG: RichSlangTerm[] = [
  {
    id: 'slang-rizz',
    term: 'Rizz',
    phonetic: '/rɪz/',
    definition: 'Short for charisma; the effortless ability to charm, flirt with, or attract others.',
    culturalOrigin: 'Twitch',
    cringeMeter: 3,
    exampleQuote: 'He has unspoken rizz; he didn’t even say a word and they all wanted to sit with him.',
    tier: 'TWEEN',
    contextTone: 'Harmless Slang',
    parentTip: 'Completely harmless playground currency. Playful ribbing like "Working on your rizz?" gets a fond eye-roll.',
  },
  {
    id: 'slang-skibidi',
    term: 'Skibidi',
    phonetic: '/ˈskɪb.ɪ.di/',
    definition: 'Nonsense adjective meaning cool, bad, or merely used as absurd conversational filler.',
    culturalOrigin: 'YouTube',
    cringeMeter: 5,
    exampleQuote: 'What the skibidi are you even doing right now bro?',
    tier: 'ELEMENTARY',
    contextTone: 'Playful meme humor',
    parentTip: 'Absurdist elementary school humor from YouTube series. Do not try to say this seriously.',
  },
  {
    id: 'slang-crashout',
    term: 'Crashout',
    phonetic: '/ˈkræʃ.aʊt/',
    definition: 'An explosive, irrational emotional meltdown over a minor frustration or gaming loss.',
    culturalOrigin: 'TikTok',
    cringeMeter: 4,
    exampleQuote: 'Bro had a total crashout when his WiFi disconnected during the final Fortnite circle.',
    tier: 'TWEEN',
    contextTone: 'Dysregulation / Caution',
    parentTip: 'Signals emotional exhaustion or dysregulation. Respond calmly with de-escalation rather than punishment.',
  },
  {
    id: 'slang-cap',
    term: 'Cap / No Cap',
    phonetic: '/kæp/',
    definition: '"Cap" means a lie or exaggeration; "No cap" signifies absolute truth or genuine fact.',
    culturalOrigin: 'Internet Culture',
    cringeMeter: 2,
    exampleQuote: 'That was the hardest science quiz of the entire semester, no cap.',
    tier: 'TWEEN',
    contextTone: 'Harmless Slang',
    parentTip: 'Standard truth-testing phrase. Translate simply as "Are you serious?"',
  },
  {
    id: 'slang-bet',
    term: 'Bet',
    phonetic: '/bɛt/',
    definition: 'Affirmative agreement meaning "Yes", "Sounds good", "Challenge accepted", or "Deal".',
    culturalOrigin: 'Internet Culture',
    cringeMeter: 1,
    exampleQuote: 'Parent: "Dinner in 10 minutes." Teen: "Bet."',
    tier: 'TEEN',
    contextTone: 'Harmless Slang',
    parentTip: 'One of the least cringe words for parents to acknowledge. Safe and brief.',
  },
  {
    id: 'slang-gyatt',
    term: 'Gyatt',
    phonetic: '/ɡjɑːt/',
    definition: 'Exclamation of shock or surprise (short for "God damn"), often repeated as a viral meme sound.',
    culturalOrigin: 'Twitch',
    cringeMeter: 4,
    exampleQuote: 'Bro saw that new custom skateboard and whispered gyatt.',
    tier: 'TWEEN',
    contextTone: 'Use Caution',
    parentTip: 'Cheeky meme exclamation among 9-12 year olds. Remind older kids about respectful speech regarding bodies.',
  },
  {
    id: 'slang-mid',
    term: 'Mid',
    phonetic: '/mɪd/',
    definition: 'Mediocre, average, underwhelming, or uninspired quality.',
    culturalOrigin: 'TikTok',
    cringeMeter: 2,
    exampleQuote: 'That new animated movie everyone was hyping up was completely mid.',
    tier: 'TEEN',
    contextTone: 'Harmless Slang',
    parentTip: 'Harmless critical assessment. Kids use it to evaluate movies, music, and food.',
  },
  {
    id: 'slang-drip',
    term: 'Drip',
    phonetic: '/drɪp/',
    definition: 'Stylish, fashionable clothing, sneakers, accessories, or cool aesthetic presence.',
    culturalOrigin: 'Internet Culture',
    cringeMeter: 3,
    exampleQuote: 'Look at those vintage kicks, bro’s got serious drip today.',
    tier: 'TEEN',
    contextTone: 'Harmless Slang',
    parentTip: 'Compliment about personal style or effort put into an outfit.',
  },
  {
    id: 'slang-cooked',
    term: 'Cooked',
    phonetic: '/kʊkt/',
    definition: 'Doomed, exhausted, defeated, or completely unprepared for an upcoming challenge.',
    culturalOrigin: 'TikTok',
    cringeMeter: 4,
    exampleQuote: 'I have three tests tomorrow and haven’t even opened my notes, I am cooked.',
    tier: 'TEEN',
    contextTone: 'Emotional Distress / Caution',
    parentTip: 'Signals feeling overwhelmed. Break the task down into three bite-sized steps.',
  },
  {
    id: 'slang-brainrot',
    term: 'Brainrot',
    phonetic: '/ˈbreɪn.rɑːt/',
    definition: 'Low-effort, hyper-stimulating short-form algorithm content; also mental exhaustion from over-scrolling.',
    culturalOrigin: 'TikTok',
    cringeMeter: 3,
    exampleQuote: 'I’ve been watching short-form clips for an hour and my brainrot is real.',
    tier: 'TWEEN',
    contextTone: 'Self-Aware Caution',
    parentTip: 'Celebrate their self-awareness! Suggest a screen-free physical reset like a bike ride or board game.',
  },
  {
    id: 'slang-slay',
    term: 'Slay',
    phonetic: '/sleɪ/',
    definition: 'To do something exceptionally well, look amazing, or achieve victory.',
    culturalOrigin: 'Internet Culture',
    cringeMeter: 2,
    exampleQuote: 'You slayed that school piano recital!',
    tier: 'TEEN',
    contextTone: 'Harmless Slang',
    parentTip: 'Highly supportive and encouraging praise. Safe for parents when said with genuine warmth.',
  },
  {
    id: 'slang-fanum-tax',
    term: 'Fanum Tax',
    phonetic: '/ˈfæn.əm tæks/',
    definition: 'The act of playfully stealing food or snacks from a friend or sibling’s plate.',
    culturalOrigin: 'Twitch',
    cringeMeter: 5,
    exampleQuote: 'Bro grabbed half my french fries and claimed it was the Fanum Tax.',
    tier: 'ELEMENTARY',
    contextTone: 'Playful meme humor',
    parentTip: 'Originated with streamer Fanum. If you take a fry from their plate, say "parent tax" instead.',
  },
  {
    id: 'slang-mewing',
    term: 'Mewing',
    phonetic: '/ˈmjuː.ɪŋ/',
    definition: 'Tongue-posture technique claimed to define jawlines; often done silently as a shushing gesture.',
    culturalOrigin: 'TikTok',
    cringeMeter: 5,
    exampleQuote: 'Teacher asked him a question and he just tapped his jawline because he was mewing.',
    tier: 'TWEEN',
    contextTone: 'Meme play / Caution',
    parentTip: 'Often used by middle schoolers to avoid talking to adults. Don’t take it personally.',
  },
  {
    id: 'slang-sus',
    term: 'Sus',
    phonetic: '/sʌs/',
    definition: 'Short for suspicious or suspect; behavior that feels shady or questionable.',
    culturalOrigin: 'Gaming',
    cringeMeter: 3,
    exampleQuote: 'Why are you hiding your screen when I walk in? That is super sus.',
    tier: 'ELEMENTARY',
    contextTone: 'Harmless Slang',
    parentTip: 'Popularized by Among Us. Useful for discussing privacy vs secrecy.',
  },
  {
    id: 'slang-bop',
    term: 'Bop',
    phonetic: '/bɑːp/',
    definition: 'An exceptionally catchy, upbeat, and enjoyable song.',
    culturalOrigin: 'Internet Culture',
    cringeMeter: 2,
    exampleQuote: 'Turn the volume up in the car, this song is an absolute bop.',
    tier: 'TEEN',
    contextTone: 'Harmless Slang',
    parentTip: 'Innocent musical compliment that bridges generations easily.',
  },
  {
    id: 'slang-ohio',
    term: 'Only in Ohio',
    phonetic: '/oʊˈhaɪ.oʊ/',
    definition: 'Internet meme designating anything absurd, surreal, bizarre, or unexplainable.',
    culturalOrigin: 'TikTok',
    cringeMeter: 5,
    exampleQuote: 'A goat wearing sneakers? Only in Ohio.',
    tier: 'ELEMENTARY',
    contextTone: 'Absurdist humor',
    parentTip: 'Pure elementary absurdity with no geographic offense intended.',
  },
];

export function getCringeDescription(score: number): {
  label: string;
  badgeClass: string;
  meterColor: string;
} {
  switch (score) {
    case 1:
      return {
        label: 'Low Cringe (Parent Safe)',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        meterColor: 'bg-emerald-500',
      };
    case 2:
      return {
        label: 'Mild Cringe (Gentle Smile)',
        badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
        meterColor: 'bg-teal-500',
      };
    case 3:
      return {
        label: 'Moderate Cringe (Eye Roll)',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        meterColor: 'bg-amber-500',
      };
    case 4:
      return {
        label: 'High Cringe (Awkward)',
        badgeClass: 'bg-orange-50 text-orange-800 border-orange-200',
        meterColor: 'bg-orange-500',
      };
    case 5:
    default:
      return {
        label: 'Nuclear Cringe (Do Not Say)',
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
        meterColor: 'bg-rose-500',
      };
  }
}

export function CringeMeterVisual({ score }: { score: number }) {
  const cringe = getCringeDescription(score);

  return (
    <div
      data-testid="cringe-meter"
      data-cringe-score={score}
      className="space-y-1.5"
      aria-label={`Cringe Meter: ${score} out of 5 - ${cringe.label}`}
    >
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
        <span className="flex items-center gap-1 text-slate-700">
          <Flame className={cn('h-3.5 w-3.5', score >= 4 ? 'text-rose-500' : 'text-amber-500')} />
          <span>Cringe Meter:</span>
          <span className="font-extrabold text-slate-900">{score}/5</span>
        </span>
        <span
          className={cn(
            'px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider',
            cringe.badgeClass
          )}
        >
          {cringe.label}
        </span>
      </div>

      {/* 5-bar visual indicator */}
      <div className="flex gap-1 h-2 w-full rounded-full bg-slate-100 p-0.5 border border-slate-200/80">
        {[1, 2, 3, 4, 5].map((level) => {
          const isFilled = level <= score;
          return (
            <div
              key={level}
              data-testid={`cringe-bar-${level}`}
              className={cn(
                'flex-1 rounded-full transition-all duration-200',
                isFilled ? cringe.meterColor : 'bg-transparent'
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export interface SlangDecoderViewProps {
  initialTerms?: RichSlangTerm[];
  apiSlangTerms?: SlangTermDTO[];
  className?: string;
}

export function SlangDecoderView({
  initialTerms = CANONICAL_SLANG_CATALOG,
  apiSlangTerms,
  className,
}: SlangDecoderViewProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTier, setSelectedTier] = React.useState<SlangTierFilter>('ALL');
  const [expandedCardId, setExpandedCardId] = React.useState<string | null>(null);

  // Merge canonical catalog with any additional API terms
  const termsList = React.useMemo(() => {
    const list: RichSlangTerm[] = [...initialTerms];

    if (apiSlangTerms && apiSlangTerms.length > 0) {
      for (const apiTerm of apiSlangTerms) {
        const existing = list.find(
          (t) => t.term.toLowerCase() === apiTerm.term.toLowerCase()
        );
        if (!existing) {
          list.push({
            id: apiTerm.id,
            term: apiTerm.term,
            phonetic: `/${apiTerm.term.toLowerCase()}/`,
            definition: apiTerm.definition,
            culturalOrigin: 'Internet Culture',
            cringeMeter: 3,
            exampleQuote: apiTerm.exampleSentence,
            tier: 'ALL',
            contextTone: apiTerm.contextTone,
          });
        }
      }
    }

    return list;
  }, [initialTerms, apiSlangTerms]);

  // Instant reactive filter
  const filteredTerms = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return termsList.filter((item) => {
      // Tier match
      if (selectedTier !== 'ALL') {
        if (item.tier !== selectedTier && item.tier !== 'ALL') {
          return false;
        }
      }

      // Query match
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.culturalOrigin.toLowerCase().includes(q) ||
        item.exampleQuote.toLowerCase().includes(q)
      );
    });
  }, [termsList, searchQuery, selectedTier]);

  const toggleExpand = (id: string) => {
    setExpandedCardId((current) => (current === id ? null : id));
  };

  return (
    <section
      aria-labelledby="slang-decoder-heading"
      className={cn('space-y-6 pt-2', className)}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Searchable Slang Radar & Decoder</span>
          </div>
          <h2
            id="slang-decoder-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
          >
            Decode Modern Youth Vocabulary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Understand phonetic pronunciations, viral origins, and our Cringe Meter so you know what words mean without sounding awkward.
          </p>
        </div>

        {/* Search input with instant filtering */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="slang-search-input"
            data-testid="slang-search-input"
            type="search"
            placeholder="Search any word your child said (e.g., rizz, skibidi, crash out, bet)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-xs sm:text-sm bg-white"
            aria-label="Search slang words"
          />
        </div>
      </div>

      {/* Tier Filter Pills */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by age tier">
        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
          <Layers className="h-3.5 w-3.5" />
          <span>Filter by Tier:</span>
        </span>
        {[
          { key: 'ALL', label: 'All' },
          { key: 'ELEMENTARY', label: 'Elementary (7–9)' },
          { key: 'TWEEN', label: 'Tween (10–12)' },
          { key: 'TEEN', label: 'Teen (13–18)' },
        ].map((pill) => {
          const isSelected = selectedTier === pill.key;
          return (
            <button
              key={pill.key}
              data-testid={`filter-tier-${pill.key.toLowerCase()}`}
              type="button"
              onClick={() => setSelectedTier(pill.key as SlangTierFilter)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all border shadow-2xs',
                isSelected
                  ? 'border-teal-800 bg-teal-800 text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              )}
              aria-pressed={isSelected}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Slang Cards Grid */}
      {filteredTerms.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center space-y-3">
          <HelpCircle className="h-8 w-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">
            No Slang Terms Matching &quot;{searchQuery}&quot;
          </h3>
          <p className="text-xs text-slate-500">
            Try searching another tween phrase, checking your spelling, or selecting &quot;All&quot; tiers.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedTier('ALL');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div
          data-testid="slang-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredTerms.map((slang) => {
            const isExpanded = expandedCardId === slang.id;

            return (
              <Card
                key={slang.id}
                data-testid={`slang-card-${slang.id}`}
                className="group flex flex-col justify-between border-slate-200/80 bg-white shadow-xs hover:border-teal-300 hover:shadow-md transition-all select-none"
              >
                <div>
                  <CardHeader className="space-y-3 pb-2">
                    {/* Origin & Tier Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-800">
                        <span>{slang.culturalOrigin}</span>
                      </span>

                      <span className="text-[11px] font-medium text-slate-500">
                        {slang.tier === 'ELEMENTARY'
                          ? 'Ages 7–9'
                          : slang.tier === 'TWEEN'
                          ? 'Ages 10–12'
                          : slang.tier === 'TEEN'
                          ? 'Ages 13–18'
                          : 'All Ages'}
                      </span>
                    </div>

                    {/* Word Title & Phonetic Pronunciation */}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <CardTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors">
                          &ldquo;{slang.term}&rdquo;
                        </CardTitle>
                        <span
                          data-testid="phonetic-pronunciation"
                          className="text-xs font-mono text-slate-500"
                        >
                          {slang.phonetic}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-1">
                    {/* Modern Meaning */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {slang.definition}
                    </p>

                    {/* Cringe Meter */}
                    <CringeMeterVisual score={slang.cringeMeter} />

                    {/* Example Conversation Quote */}
                    <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <Quote className="h-3 w-3" />
                        <span>Example Quote</span>
                      </span>
                      <blockquote className="text-xs text-slate-800 italic leading-relaxed">
                        &ldquo;{slang.exampleQuote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Expanded Drawer: Parent Reaction Guidance */}
                    {isExpanded && slang.parentTip && (
                      <div className="rounded-xl bg-teal-50/70 border border-teal-200/80 p-3 space-y-1 animate-in fade-in duration-200">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Parent Calm Insight</span>
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {slang.parentTip}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </div>

                {/* Footer Toggle */}
                {slang.parentTip && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(slang.id)}
                    className="w-full px-5 py-2.5 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-[11px] text-slate-600 font-medium hover:bg-slate-100/80 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide guidance' : 'View parent strategy'}</span>
                    <span className="flex items-center gap-1 font-semibold text-teal-700">
                      {isExpanded ? (
                        <>
                          <span>Collapse</span>
                          <ChevronUp className="h-3.5 w-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Read tip</span>
                          <ChevronDown className="h-3.5 w-3.5" />
                        </>
                      )}
                    </span>
                  </button>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
