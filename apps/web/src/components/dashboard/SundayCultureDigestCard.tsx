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
        'border-[#E3E3DC] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-[10px] transition-all hover:border-[#143D2B]/30',
        className
      )}
    >
      <CardHeader className="p-5 pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#EAF3EE] text-[#143D2B] font-bold">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-xs font-mono font-medium text-[#143D2B] uppercase tracking-wider">
              Sunday Youth Culture Digest
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] font-mono border-[#E3E3DC] text-[#143D2B] bg-[#EAF3EE]"
          >
            Issue #{issueNumber}
          </Badge>
        </div>

        <div>
          <CardTitle className="font-serif text-base sm:text-lg font-semibold text-[#111413] leading-snug line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-[#494F4C] mt-1 line-clamp-2 leading-relaxed">
            Stay effortlessly fluent in tween memes, viral trends, and covert app exploits without policing.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3.5">
        {/* Word of the Week Spotlight with Cringe Meter */}
        <div className="rounded-[8px] border border-[#E3E3DC] bg-[#F4F4F0] p-3 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#858C88]">
                Word of the Week:
              </span>
              <span className="font-serif font-bold text-sm text-[#111413]">
                &ldquo;{wordOfTheWeek.term}&rdquo;
              </span>
              {wordOfTheWeek.phonetic && (
                <span className="text-[10px] text-[#858C88] font-mono">
                  {wordOfTheWeek.phonetic}
                </span>
              )}
            </div>

            {/* Visual Cringe Meter */}
            <div className="flex items-center gap-1 font-mono" title={`Cringe Meter: ${wordOfTheWeek.cringeLevel}/5`}>
              <span className="text-[10px] text-[#858C88]">Cringe:</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={cn(
                      'h-2 w-2 rounded-full',
                      lvl <= wordOfTheWeek.cringeLevel
                        ? 'bg-[#B45309]'
                        : 'bg-[#E3E3DC]'
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] font-semibold text-[#B45309] ml-0.5">
                {wordOfTheWeek.cringeLevel}/5
              </span>
            </div>
          </div>

          <p className="text-xs text-[#494F4C] leading-relaxed">
            {wordOfTheWeek.definition}
          </p>
        </div>

        {/* Sunday Dinner Conversation Prompt */}
        <div className="rounded-[8px] border border-[#E3E3DC] bg-[#FFFFFF] p-3 space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono font-medium text-[#143D2B]">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-[#143D2B] shrink-0" />
              <span>Sunday Dinner Table Starter</span>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-[#143D2B] hover:text-[#111413] bg-[#F4F4F0] hover:bg-white px-2 py-0.5 rounded-[4px] border border-[#E3E3DC] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[#143D2B]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <p className="font-serif italic text-xs text-[#111413] leading-relaxed pl-5">
            &ldquo;{conversationStarter}&rdquo;
          </p>
        </div>

        {/* Exploit Early Warning Callout */}
        {topExploit && (
          <div className="rounded-[8px] border border-[#B45309]/30 bg-[#FFFBEB] p-2.5 flex items-start gap-2 text-xs">
            <AlertTriangle className="h-3.5 w-3.5 text-[#B45309] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-mono font-semibold text-[#B45309] block text-[11px]">
                Exploit Alert: {topExploit.appName}
              </span>
              <p className="text-[11px] text-[#494F4C] leading-tight">
                {topExploit.guidance}
              </p>
            </div>
          </div>
        )}

        {/* Slang Radar Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#858C88]">
            <div className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-[#B45309]" />
              <span>Trending Radar:</span>
            </div>
            {topExploit && (
              <span className="text-[10px] text-[#B45309] font-medium truncate max-w-[170px]">
                Alert: {topExploit.appName}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {slangTerms.map((item, idx) => (
              <span
                key={idx}
                title={item.definition}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-[#F4F4F0] text-[#111413] border border-[#E3E3DC]"
              >
                <span className="font-semibold">&ldquo;{item.term}&rdquo;</span>
                {item.definition && (
                  <span className="text-[10px] text-[#858C88] font-normal hidden sm:inline truncate max-w-[110px]">
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
            className="w-full gap-1.5 text-xs font-medium border-[#E3E3DC] text-[#111413] hover:bg-[#F4F4F0] rounded-[5px] min-h-[44px]"
          >
            <span>Explore Slang Radar & Full Digest</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#143D2B]" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
