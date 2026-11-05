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
  Volume2,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
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
    term: 'Crashout',
    phonetic: '/ˈkræʃ.aʊt/',
    definition: 'An explosive overreaction to minor friction or losing a match.',
    cringeLevel: 4,
  },
  topSlang: [
    { term: 'Crashout', definition: 'Explosive overreaction', cringe: 4 },
    { term: 'Rizz', definition: 'Effortless charisma/charm', cringe: 3 },
    { term: 'Cooked', definition: 'Exhausted, in trouble', cringe: 2 },
  ],
  exploitWarning: {
    appName: 'Disguised Calculator Vault apps',
    risk: 'Secondary PIN vault concealing unmonitored browsers or group chats behind a working calculator interface.',
    guidance: 'Have a calm conversation about device transparency rather than sudden punitive phone searches.',
  },
};

export function SundayCultureDigestCard({ child, className }: SundayCultureDigestCardProps) {
  const [copied, setCopied] = React.useState(false);

  const { data } = useQuery({
    queryKey: ['sunday-culture-digest-card'],
    queryFn: getLatestDigest,
    staleTime: 10 * 60 * 1000,
  });

  const digest = data?.digest;
  const issueNumber = digest?.issueNumber ?? STATIC_FALLBACK_DIGEST.issueNumber;
  const title = digest?.title ?? STATIC_FALLBACK_DIGEST.title;
  const conversationStarter =
    digest?.conversationStarter ?? STATIC_FALLBACK_DIGEST.conversationStarter;

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

  const handleCopyPrompt = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(conversationStarter);
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
        'border-purple-200/80 bg-gradient-to-br from-white via-purple-50/20 to-white shadow-xs hover:border-purple-300 transition-colors',
        className
      )}
    >
      <CardHeader className="p-5 pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
            <Sparkles className="h-4 w-4 text-purple-700" />
            <span>Sunday Youth Culture Digest</span>
          </div>
          <Badge
            variant="outline"
            className="text-[11px] font-bold border-purple-200 text-purple-800 bg-purple-50/60"
          >
            Issue #{issueNumber}
          </Badge>
        </div>

        <div>
          <CardTitle className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            Stay effortlessly fluent in tween memes, viral trends, and covert app exploits without policing.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3.5">
        {/* Word of the Week Spotlight with Cringe Meter */}
        <div className="rounded-xl border border-purple-200/70 bg-purple-50/40 p-3 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900">
                Word of the Week:
              </span>
              <span className="text-xs font-bold text-purple-950">
                &ldquo;{wordOfTheWeek.term}&rdquo;
              </span>
              {wordOfTheWeek.phonetic && (
                <span className="text-[10px] text-purple-700 font-mono">
                  {wordOfTheWeek.phonetic}
                </span>
              )}
            </div>

            {/* Visual Cringe Meter */}
            <div className="flex items-center gap-1" title={`Cringe Meter: ${wordOfTheWeek.cringeLevel}/5`}>
              <span className="text-[10px] font-bold text-slate-500">Cringe:</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={cn(
                      'h-2 w-2 rounded-full',
                      lvl <= wordOfTheWeek.cringeLevel
                        ? 'bg-amber-500 ring-1 ring-amber-300'
                        : 'bg-slate-200'
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-amber-700 ml-0.5">
                {wordOfTheWeek.cringeLevel}/5
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            {wordOfTheWeek.definition}
          </p>
        </div>

        {/* Sunday Dinner Conversation Prompt */}
        <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-3 space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-purple-950">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-purple-700 shrink-0" />
              <span>Sunday Dinner Table Starter</span>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-700 hover:text-purple-900 bg-white/80 hover:bg-white px-2 py-0.5 rounded border border-purple-200/80 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-700 italic leading-relaxed pl-5">
            &ldquo;{conversationStarter}&rdquo;
          </p>
        </div>

        {/* Exploit Early Warning Callout */}
        {topExploit && (
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-2.5 flex items-start gap-2 text-xs">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-950 block text-[11px]">
                Exploit Alert: {topExploit.appName}
              </span>
              <p className="text-[11px] text-amber-900/90 leading-tight">
                {topExploit.guidance}
              </p>
            </div>
          </div>
        )}

        {/* Slang Radar Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <div className="flex items-center gap-1 text-slate-600">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>Trending Radar:</span>
            </div>
            {topExploit && (
              <span className="text-[10px] text-amber-700 font-medium truncate max-w-[170px]">
                Alert: {topExploit.appName}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {slangTerms.map((item, idx) => (
              <span
                key={idx}
                title={item.definition}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/80"
              >
                <span className="font-bold">&ldquo;{item.term}&rdquo;</span>
                {item.definition && (
                  <span className="text-[10px] text-slate-500 font-normal hidden sm:inline truncate max-w-[110px]">
                    • {item.definition}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Link to Full Digest */}
        <Link href="/digest" className="block w-full pt-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1.5 text-xs font-semibold border-purple-200 text-purple-900 hover:bg-purple-50 hover:border-purple-300 min-h-[44px]"
          >
            <span>Explore Slang Radar & Full Digest</span>
            <ArrowRight className="h-3.5 w-3.5 text-purple-700" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
