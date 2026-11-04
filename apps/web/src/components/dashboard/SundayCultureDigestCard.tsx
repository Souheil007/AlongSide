'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, MessageSquare, Flame, ArrowRight } from 'lucide-react';
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
  topSlang: [
    { term: 'Crashout', def: 'Explosive overreaction' },
    { term: 'Rizz', def: 'Effortless charisma/charm' },
    { term: 'Cooked', def: 'Exhausted, in trouble' },
  ],
  exploitWarning: 'Disguised Calculator Vault apps',
};

export function SundayCultureDigestCard({ child, className }: SundayCultureDigestCardProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['sunday-culture-digest-card'],
    queryFn: getLatestDigest,
    staleTime: 10 * 60 * 1000,
  });

  const digest = data?.digest;
  const issueNumber = digest?.issueNumber ?? STATIC_FALLBACK_DIGEST.issueNumber;
  const title = digest?.title ?? STATIC_FALLBACK_DIGEST.title;
  const conversationStarter =
    digest?.conversationStarter ?? STATIC_FALLBACK_DIGEST.conversationStarter;

  const slangTerms: Array<{ term: string; definition: string }> =
    digest?.slangTerms && digest.slangTerms.length > 0
      ? digest.slangTerms.slice(0, 3).map((s) => ({ term: s.term, definition: s.definition }))
      : STATIC_FALLBACK_DIGEST.topSlang.map((s) => ({ term: s.term, definition: s.def }));

  const topExploit = digest?.exploitAlerts?.[0]?.appName ?? STATIC_FALLBACK_DIGEST.exploitWarning;

  return (
    <Card
      className={cn(
        'border-slate-200/80 bg-white hover:border-purple-300 transition-colors shadow-xs',
        className
      )}
    >
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-900">
            <Sparkles className="h-4 w-4 text-purple-700" />
            <span>Sunday Youth Culture Digest</span>
          </div>
          <Badge
            variant="outline"
            className="text-[11px] font-medium border-purple-200 text-purple-800 bg-purple-50/60"
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

      <CardContent className="pt-0 space-y-3">
        {/* Sunday Dinner Conversation Prompt */}
        <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-950">
            <MessageSquare className="h-3.5 w-3.5 text-purple-700 shrink-0" />
            <span>Sunday Dinner Table Starter</span>
          </div>
          <p className="text-xs text-slate-700 italic leading-relaxed pl-5">
            &ldquo;{conversationStarter}&rdquo;
          </p>
        </div>

        {/* Slang Radar Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <div className="flex items-center gap-1 text-slate-600">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>Trending Radar:</span>
            </div>
            {topExploit && (
              <span className="text-[10px] text-amber-700 font-medium truncate max-w-[170px]">
                Alert: {topExploit}
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
            className="w-full gap-1.5 text-xs font-semibold border-purple-200 text-purple-900 hover:bg-purple-50 hover:border-purple-300"
          >
            <span>Open Culture Digest</span>
            <ArrowRight className="h-3.5 w-3.5 text-purple-700" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
