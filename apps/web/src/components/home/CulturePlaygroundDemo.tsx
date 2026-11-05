'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Flame,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Shuffle,
  Search,
  Volume2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface SlangDemoItem {
  term: string;
  phonetic: string;
  definition: string;
  cringeLevel: number;
  exampleSentence: string;
  parentContext: string;
}

export const DEMO_SLANG_TERMS: SlangDemoItem[] = [
  {
    term: 'Crashout',
    phonetic: '/ˈkræʃ.aʊt/',
    definition: 'An explosive overreaction to minor friction, a game loss, or being told no.',
    cringeLevel: 4,
    exampleSentence: '“Bro literally crashed out because his teammate didn’t drop extra shields.”',
    parentContext: 'When your child says someone “crashed out”, they mean an amygdala meltdown where someone lost emotional control.',
  },
  {
    term: 'Rizz',
    phonetic: '/rɪz/',
    definition: 'Effortless charisma, social charm, or the ability to flatter and attract peers.',
    cringeLevel: 3,
    exampleSentence: '“He thinks he has unspoken rizz, but he’s just being loud.”',
    parentContext: 'Short for “charisma”. Harmless tween social currency regarding confidence and peer status.',
  },
  {
    term: 'Skibidi',
    phonetic: '/ˈskɪb.ɪ.diː/',
    definition: 'A nonsense filler word representing chaotic Gen-Alpha surreal humor or absurdity.',
    cringeLevel: 5,
    exampleSentence: '“What in the skibidi toilet is going on in this group chat?”',
    parentContext: 'Derived from a viral YouTube animation. Used ironically or as playful absurdity with zero harmful intent.',
  },
  {
    term: 'Cooked',
    phonetic: '/kʊkt/',
    definition: 'Doomed, exhausted, in deep trouble, or having failed completely.',
    cringeLevel: 2,
    exampleSentence: '“I forgot the math project was due first period, I am completely cooked.”',
    parentContext: 'Often signals genuine academic or social panic masked behind humor. A good cue to offer support.',
  },
  {
    term: 'Fanum Tax',
    phonetic: '/ˈfæn.əm tæks/',
    definition: 'The act of stealing a bite of food or snack from a friend or sibling.',
    cringeLevel: 4,
    exampleSentence: '“Give me that french fry, that’s just standard Fanum tax.”',
    parentContext: 'Originates from streamer Fanum raiding snacks. Tween sibling banter around food sharing.',
  },
];

export const DEMO_DINNER_STARTERS: string[] = [
  '“What was the funniest meme or phrase you heard in school this week, and why did everyone laugh at it?”',
  '“If an alien landed and checked your friends’ group chat right now, what would confuse them the most?”',
  '“Which game or app are your friends obsessing over right now, and is it actually fun or just addictive?”',
  '“What is one rule we have in this house that you think is completely old-fashioned, and what would you replace it with?”',
  '“Have you seen someone get excluded or roasted in a chat recently, and how did people react?”',
];

export function CulturePlaygroundDemo() {
  const [selectedTerm, setSelectedTerm] = React.useState<SlangDemoItem>(DEMO_SLANG_TERMS[0]!);
  const [starterIndex, setStarterIndex] = React.useState<number>(0);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const currentStarter = DEMO_DINNER_STARTERS[starterIndex % DEMO_DINNER_STARTERS.length]!;

  const handleShuffleStarter = () => {
    setStarterIndex((prev) => prev + 1);
  };

  const handleCopyStarter = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(currentStarter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  const filteredTerms = searchQuery
    ? DEMO_SLANG_TERMS.filter((s) =>
        s.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : DEMO_SLANG_TERMS;

  return (
    <section id="digest" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
      <div className="rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50/40 via-white to-purple-50/20 p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-purple-100">
          <div className="space-y-2 max-w-2xl">
            <Badge
              variant="outline"
              className="text-xs font-bold text-purple-900 bg-purple-50 border-purple-200"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1 text-purple-700" />
              Live Culture Playground
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Interactive Sunday Culture Radar & Dinner Starters
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Never feel out of the loop again. Test out real youth culture slang terms, gauge their cringe rating, and draw Sunday dinner conversation starters.
            </p>
          </div>

          <Link href="/digest" className="shrink-0">
            <Button
              className="min-h-[44px] gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-5 shadow-xs"
            >
              <span>Explore Full Culture Digest</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Interactive 2-Column Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Left Column (7 cols): Slang Radar & Cringe Meter */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-500" />
                Select or Search a Modern Slang Term:
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Click any word below
              </span>
            </div>

            {/* Quick Word Selection Chips */}
            <div className="flex flex-wrap gap-2">
              {DEMO_SLANG_TERMS.map((item) => {
                const isSelected = selectedTerm.term === item.term;
                return (
                  <button
                    key={item.term}
                    onClick={() => setSelectedTerm(item)}
                    className={cn(
                      'px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[40px]',
                      isSelected
                        ? 'bg-purple-700 text-white shadow-xs ring-2 ring-purple-600 ring-offset-1'
                        : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-purple-50 hover:border-purple-200'
                    )}
                  >
                    &ldquo;{item.term}&rdquo;
                  </button>
                );
              })}
            </div>

            {/* Selected Word Detail Card with Cringe Meter */}
            <div className="rounded-2xl border border-purple-200 bg-white p-5 space-y-3 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-50 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-purple-950">
                    &ldquo;{selectedTerm.term}&rdquo;
                  </h3>
                  <span className="text-xs text-purple-700 font-mono bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
                    {selectedTerm.phonetic}
                  </span>
                </div>

                {/* Cringe Meter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500">Cringe Meter:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <span
                        key={lvl}
                        className={cn(
                          'h-2.5 w-2.5 rounded-full transition-all',
                          lvl <= selectedTerm.cringeLevel
                            ? 'bg-amber-500 ring-2 ring-amber-200'
                            : 'bg-slate-200'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black text-amber-700 ml-1">
                    {selectedTerm.cringeLevel} / 5
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Literal Definition:
                </span>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {selectedTerm.definition}
                </p>
              </div>

              <div className="rounded-xl bg-purple-50/50 border border-purple-100 p-3 text-xs text-slate-700 italic">
                <span className="font-bold text-purple-900 not-italic block text-[11px] mb-0.5">
                  How Tweens Use It:
                </span>
                {selectedTerm.exampleSentence}
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block text-[11px] mb-0.5">
                  Parent Psychological Translation:
                </span>
                {selectedTerm.parentContext}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Sunday Dinner Conversation Starters */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-purple-700" />
              Sunday Dinner Table Starter:
            </span>

            <div className="rounded-2xl border border-purple-200 bg-white p-5 space-y-4 shadow-xs flex flex-col justify-between min-h-[300px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Card #{starterIndex + 1}
                  </span>
                  <button
                    onClick={handleCopyStarter}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-950 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl bg-purple-50/70 border border-purple-100 p-4">
                  <p className="text-sm font-bold text-slate-900 leading-relaxed italic">
                    {currentStarter}
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  💡 <span className="font-semibold text-slate-700">Tip:</span> Ask this neutrally without lecturing. Let your child be the expert explaining their world to you.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleShuffleStarter}
                  variant="outline"
                  className="w-full min-h-[44px] gap-2 text-xs font-bold border-purple-300 text-purple-900 hover:bg-purple-50"
                >
                  <Shuffle className="h-4 w-4" />
                  <span>Draw Another Dinner Conversation Starter</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
