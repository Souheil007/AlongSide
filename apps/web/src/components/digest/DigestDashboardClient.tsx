'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ShieldCheck, Smartphone, ArrowRight, Sparkles } from 'lucide-react';
import { RoadType } from '@alongside/shared';
import { getLatestDigest } from '@/lib/api/digest';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { DigestFeedHeader } from '@/components/digest/DigestFeedHeader';
import { CulturalReelsView } from '@/components/digest/CulturalReelsView';
import { WeeklyMagazineView } from '@/components/digest/WeeklyMagazineView';
import { GenerationalTimeMirrorView } from '@/components/digest/GenerationalTimeMirrorView';
import { StageTailoredVocabularyView } from '@/components/digest/StageTailoredVocabularyView';
import { DinnerConversationStarters } from '@/components/digest/DinnerConversationStarters';
import { cn } from '@/lib/utils';

export interface DigestDashboardClientProps {
  className?: string;
}

export function DigestDashboardClient({ className }: DigestDashboardClientProps) {
  const activeChild = useChildContextStore(selectActiveChild);

  // Fetch latest digest briefing
  const { data: digestData } = useQuery({
    queryKey: ['latest-digest'],
    queryFn: getLatestDigest,
    staleTime: 10 * 60 * 1000,
  });

  const digest = digestData?.digest;
  const issueNumber = digest?.issueNumber ?? 42;

  const isPreDevice =
    !activeChild ||
    activeChild.roadType === RoadType.PRE_DEVICE ||
    activeChild.age <= 9;

  return (
    <div className={cn('space-y-12 max-w-7xl mx-auto py-2', className)}>
      {/* 1. Feed Masthead, Edition Navigator & Child Switcher */}
      <DigestFeedHeader
        child={activeChild}
        issueNumber={issueNumber}
      />

      {/* 2. Pillar 1: 45-Second Parent Reels */}
      <CulturalReelsView child={activeChild} />

      {/* 3. Pillar 2: Weekly Magazine & Field Dispatches */}
      <WeeklyMagazineView child={activeChild} />

      {/* 4. Pillar 3: Generational Time Mirror */}
      <GenerationalTimeMirrorView child={activeChild} />

      {/* 5. Pillar 4: Stage-Tailored Micro-Language Decoder */}
      <StageTailoredVocabularyView child={activeChild} />

      {/* 6. Sunday Dinner Conversation Starters */}
      <DinnerConversationStarters child={activeChild} />

      {/* 7. Digital Horizon / Pre-Device Sanctuary Indicator */}
      <section className="rounded-3xl border border-[#E3E3DC] bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        {isPreDevice ? (
          <>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF3EE] border border-[#143D2B]/20 flex items-center justify-center shrink-0 text-[#143D2B]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
                    Pre-Device Sanctuary
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#EAF3EE] text-[#143D2B] font-mono text-[10px] font-semibold">
                    Road 1 Active
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#111413]">
                  Zero Covert Screen Exploits in This Stage
                </h3>
                <p className="text-xs sm:text-sm text-[#494F4C] max-w-2xl leading-relaxed">
                  {activeChild ? activeChild.name : 'Your child'} is protected in AlongSide\'s screen-free sanctuary. Covert device exploits, dark pattern loops, and passcode vaults are not applicable at this developmental milestone.
                </p>
              </div>
            </div>

            <Link
              href="/devices?tab=readiness"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E3E3DC] text-[#143D2B] font-mono text-xs font-semibold hover:bg-[#F4F4F0] transition shrink-0"
            >
              <span>Explore Device Readiness</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#F4F4F0] border border-[#E3E3DC] flex items-center justify-center shrink-0 text-[#143D2B]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
                    Digital Horizon & Curfew Status
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#EAF3EE] text-[#143D2B] font-mono text-[10px] font-semibold">
                    Bedtime Lock: 8:30 PM Active
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#111413]">
                  Neutral Device Guardrails in Place
                </h3>
                <p className="text-xs sm:text-sm text-[#494F4C] max-w-2xl leading-relaxed">
                  Technical device controls and security exploits are managed centrally in your Device Hub. Automatic bedtime curfews protect restful sleep without making you the household enforcer.
                </p>
              </div>
            </div>

            <Link
              href="/devices?tab=curfews"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143D2B] text-white font-mono text-xs font-semibold hover:bg-[#0E2A1E] transition shrink-0"
            >
              <span>Manage Device Curfews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
