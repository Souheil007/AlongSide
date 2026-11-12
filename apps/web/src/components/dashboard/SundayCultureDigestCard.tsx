'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Sparkles,
  MessageSquare,
  Flame,
  ArrowRight,
  Copy,
  Check,
  AlertTriangle,
  RotateCw,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getLatestDigest } from '@/lib/api/digest';
import { cn } from '@/lib/utils';

export interface SundayCultureDigestCardProps {
  child: ChildDTO | null;
  className?: string;
}

const STATIC_FALLBACK_DIGEST = {
  issueNumber: 42,
  title: "Decoding 'Crashout' & The Calculator Vault Bypass",
  conversationStarter:
    'Ask your child what the funniest meme or phrase they heard this week was, and why it made them or their friends laugh.',
  wordOfTheWeek: {
    term: 'Rizz',
    phonetic: '/rɪz/',
    definition: 'Short for charisma. The ability to charm someone through conversation or confidence without trying too hard.',
    cringeLevel: 3,
  },
  topSlang: [
    { term: 'Rizz', definition: 'Effortless charisma/charm', cringe: 3 },
    { term: 'Crashout', definition: 'Explosive overreaction', cringe: 4 },
    { term: 'Cooked', definition: 'Exhausted, in trouble', cringe: 2 },
  ],
  exploitWarning: {
    appName: 'Roblox Voice Chat & Trading',
    risk: "Kids are feeling social pressure to trade 'Adopt Me' pets and cosmetics. Unmoderated spatial voice chat can expose younger tweens to older peer profanity.",
    guidance: 'Enable account PIN to lock trade requests and restrict spatial voice to verified friends.',
  },
};

const DINNER_QUESTIONS = [
  {
    title: 'The "Rose, Thorn & Banana"',
    prompt: '“What was one funny or bizarre thing that happened at school today that nobody else noticed?”',
  },
  {
    title: 'The Avatar Swap',
    prompt: '“If our family had to survive inside Minecraft for 24 hours, who builds the shelter and who guards the door?”',
  },
  {
    title: 'The Schoolyard Rumor',
    prompt: '“What is one game or app that everyone at school is talking about, but you think is completely overrated?”',
  },
  {
    title: 'The Superpower Trade',
    prompt: '“Would you rather have unlimited Robux for 1 hour, or be able to pause time in real life whenever you want?”',
  },
];

const CRINGE_LABELS = [
  '1/5 (Zero Cringe)',
  '2/5 (Mild)',
  '3/5 (Moderate)',
  '4/5 (Heavy Cringe)',
  '5/5 (Nuclear Cringe)',
];

const CRINGE_NOTES = [
  'Safe to use casually. Kids will find it normal.',
  'Acceptable to acknowledge, mild chuckles.',
  'Safe to understand, but do NOT use it out loud in front of their friends!',
  'Instant eye-roll guaranteed if uttered by a parent.',
  'Social catastrophe. Never say this in public or school carpool!',
];

export function SundayCultureDigestCard({ child, className }: SundayCultureDigestCardProps) {
  const [copied, setCopied] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [cringeLevel, setCringeLevel] = React.useState(3);

  const { data } = useQuery({
    queryKey: ['sunday-culture-digest-card'],
    queryFn: getLatestDigest,
    staleTime: 10 * 60 * 1000,
  });

  const digest = data?.digest;
  const issueNumber = digest?.issueNumber ?? STATIC_FALLBACK_DIGEST.issueNumber;

  const currentDinnerQuestion = DINNER_QUESTIONS[questionIndex]!;

  const wordOfTheWeek = digest?.slangTerms?.[0]
    ? {
        term: digest.slangTerms[0].term,
        phonetic: '/ˈkræʃ.aʊt/',
        definition: digest.slangTerms[0].definition,
        cringeLevel: 4,
      }
    : STATIC_FALLBACK_DIGEST.wordOfTheWeek;

  const slangTerms =
    digest?.slangTerms && digest.slangTerms.length > 0
      ? digest.slangTerms.slice(0, 3).map((s) => ({
          term: s.term,
          definition: s.definition,
          cringe: 3,
        }))
      : STATIC_FALLBACK_DIGEST.topSlang;

  const topExploit = digest?.exploitAlerts?.[0]
    ? {
        appName: digest.exploitAlerts[0].appName,
        risk: digest.exploitAlerts[0].exploitDescription,
        guidance: digest.exploitAlerts[0].parentRemedy,
      }
    : STATIC_FALLBACK_DIGEST.exploitWarning;

  const handleShuffleQuestion = () => {
    setQuestionIndex((prev) => (prev + 1) % DINNER_QUESTIONS.length);
  };

  const handleCopyPrompt = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(currentDinnerQuestion.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <Card
      className={cn(
        'rounded-[2.5rem] bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_40px_-10px_rgba(20,61,43,0.05)] overflow-hidden transition-all hover:border-[#143D2B]/30 flex flex-col justify-between',
        className
      )}
    >
      <CardHeader className="p-6 sm:p-7 pb-3 space-y-2 border-b border-black/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-[#C85A32] uppercase tracking-wider">
                Living Schoolyard Feed
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <CardTitle className="font-serif text-xl sm:text-2xl font-bold text-[#111413] mt-0.5">
              Sunday Youth Culture Digest
            </CardTitle>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#858C88]">
            <Badge
              variant="outline"
              className="text-[10px] font-mono border-emerald-900/10 text-[#143D2B] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full"
            >
              Issue #{issueNumber}
            </Badge>
            <span className="hidden sm:inline">Pre-Teen Slang &amp; Gaming Radar</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
        {/* 3-Column Balanced Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Interactive Slang Decoder with Cringe Meter */}
          <div className="p-5 rounded-2xl bg-white/80 border border-white shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
                  Slang of the Week
                </span>
                <span className="font-mono text-[10px] text-[#858C88]">
                  {wordOfTheWeek.phonetic}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h4 className="font-serif text-xl font-bold text-[#111413]">
                  &ldquo;{wordOfTheWeek.term}&rdquo;
                </h4>
                <span className="text-xs text-[#494F4C] font-mono">noun / verb</span>
              </div>
              <p className="text-xs text-[#494F4C] leading-snug">
                {wordOfTheWeek.definition}
              </p>
            </div>

            {/* Interactive Cringe Meter */}
            <div className="pt-2 border-t border-stone-200/60 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#858C88]">Parent Cringe Meter:</span>
                <span className="font-bold text-[#B45309]">
                  {CRINGE_LABELS[cringeLevel - 1]}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCringeLevel(level)}
                    className={cn(
                      'flex-1 h-2 rounded-full transition cursor-pointer',
                      level <= cringeLevel
                        ? level <= 2
                          ? 'bg-emerald-500'
                          : level === 3
                          ? 'bg-amber-500'
                          : 'bg-[#C85A32]'
                        : 'bg-stone-200 hover:opacity-80'
                    )}
                    title={`Set Cringe Level ${level}/5`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-[#494F4C] italic leading-tight">
                {CRINGE_NOTES[cringeLevel - 1]}
              </p>
            </div>
          </div>

          {/* Column 2: App & Gaming Safety Spotlight */}
          <div className="p-5 rounded-2xl bg-white/80 border border-white shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C85A32] font-bold">
                  App Spotlight
                </span>
                <span className="font-mono text-[10px] text-[#858C88]">Ages 8–12</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#111413]">
                {topExploit.appName}
              </h4>
              <p className="text-xs text-[#494F4C] leading-snug">
                {topExploit.risk}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#858C88]">Recommended Action</span>
              <span className="font-mono text-[10px] font-bold text-[#143D2B] bg-[#EAF3EE] px-2 py-0.5 rounded border border-emerald-900/10">
                Check Account Pin
              </span>
            </div>
          </div>

          {/* Column 3: Dynamic Sunday Dinner Table Starter with Shuffle */}
          <div className="p-5 rounded-2xl bg-[#F6FAF7] border border-emerald-900/10 shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#143D2B]" />
                  <span>Sunday Dinner Table Starter</span>
                </span>
                <button
                  type="button"
                  onClick={handleShuffleQuestion}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-[#143D2B] hover:text-[#0E2B1E] font-bold cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Shuffle 🎲</span>
                </button>
              </div>
              <h4 className="font-serif text-base font-bold text-[#111413]">
                {currentDinnerQuestion.title}
              </h4>
              <p className="text-xs text-[#111413] italic leading-snug font-serif">
                {currentDinnerQuestion.prompt}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <span className="text-[10px] text-[#494F4C] leading-tight">
                Promotes laughter without interrogation.
              </span>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="shrink-0 font-mono text-[10px] font-bold text-[#143D2B] hover:text-[#0E2B1E] px-2.5 py-1 rounded-full bg-white border border-[#143D2B]/30 shadow-2xs transition cursor-pointer flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#143D2B]" />
                    <span>Copy 📱</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer: Trending Slang Tags & Link to Full Digest */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#E3E3DC]/70">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] text-[#858C88] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Trending Radar:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {slangTerms.map((item, idx) => (
                <span
                  key={idx}
                  title={item.definition}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-white/90 text-[#111413] border border-stone-200/80 shadow-2xs hover:border-[#143D2B]/30 transition"
                >
                  <span className="font-semibold">&ldquo;{item.term}&rdquo;</span>
                </span>
              ))}
            </div>
          </div>

          <Link href="/digest" className="shrink-0 self-end sm:self-center">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-semibold border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] rounded-lg min-h-[38px]"
            >
              <span>Explore Slang Radar &amp; Full Digest</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#143D2B]" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
