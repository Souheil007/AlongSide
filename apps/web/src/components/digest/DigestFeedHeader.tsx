'use client';

import * as React from 'react';
import { Calendar, UserCheck } from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { cn } from '@/lib/utils';

export interface DigestFeedHeaderProps {
  child?: ChildDTO | null;
  issueNumber?: number;
  className?: string;
}

export function DigestFeedHeader({
  child: propChild,
  issueNumber = 42,
  className,
}: DigestFeedHeaderProps) {
  const storeActiveChild = useChildContextStore(selectActiveChild);

  const activeChild = propChild !== undefined ? propChild : storeActiveChild;

  // Calibration badge text for unit tests and display
  let calibrationText = 'Tailored for Leo (Age 10 · Pre-Teen)';
  let subtitleText =
    "Your weekly window into your child's evolving social world, media consumption, and peer micro-language.";

  if (activeChild) {
    let stageLabel = 'Pre-Teen';
    if (activeChild.age <= 3) {
      stageLabel = 'Infant/Toddler';
      subtitleText =
        'Auditory cadence loops, mirror neuron synchronization, high-chair physics, and pre-verbal milestones.';
    } else if (activeChild.age <= 6) {
      stageLabel = 'Early Childhood';
      subtitleText =
        'Curiosity windows, purposeful turn-taking, imaginative play, and acoustic soothing.';
    } else if (activeChild.age <= 9) {
      stageLabel = 'Elementary';
      subtitleText =
        'Elementary playground dynamics, Roblox & Minecraft co-op rules, trading card etiquette, and fairness.';
    } else if (activeChild.age <= 12) {
      stageLabel = 'Pre-Teen';
      subtitleText =
        'Tween identity, first-phone readiness, group chat dynamics, and negotiating healthy screen limits.';
    } else {
      stageLabel = 'Teen';
      subtitleText =
        'Adolescent peer culture, group chat social dynamics, viral memes, and navigating autonomy without conflict.';
    }

    calibrationText = `Tailored for ${activeChild.name} (Age ${activeChild.age} · ${stageLabel})`;
  }

  return (
    <header className={cn('space-y-6 max-w-7xl mx-auto', className)}>
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E3DC] pb-4 font-mono">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Edition Pill */}
          <span
            data-testid="edition-pill"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E3E3DC] bg-[#EAF3EE] px-3 py-1 text-xs font-semibold text-[#143D2B]"
          >
            <Calendar className="h-3.5 w-3.5 text-[#143D2B]" aria-hidden="true" />
            <span>Volume {issueNumber} · Released Sunday 8:00 AM</span>
          </span>

          {/* Active Child Calibration Badge */}
          <span
            data-testid="child-calibration-badge"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E3E3DC] bg-[#F4F4F0] px-3 py-1 text-xs font-medium text-[#494F4C]"
          >
            <UserCheck className="h-3.5 w-3.5 text-[#143D2B]" aria-hidden="true" />
            <span>{calibrationText}</span>
          </span>
        </div>

        <span className="text-xs text-[#858C88] hidden sm:inline-block">
          Editorial Pediatric Guide · Issue #{issueNumber}
        </span>
      </div>

      {/* Masthead Card */}
      <div className="rounded-3xl border border-[#E3E3DC] bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#143D2B] font-bold">
              Living Cultural Magazine
            </span>
            <span className="text-[#858C88] font-mono text-xs">·</span>
            <span className="font-mono text-xs text-[#858C88]">
              {activeChild ? `Viewing: ${activeChild.name}` : 'Family Digest'}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111413]">
            Sunday Youth Culture Digest
          </h1>
          <p className="text-[#494F4C] text-sm sm:text-base max-w-2xl leading-relaxed">
            {subtitleText}
          </p>
        </div>
      </div>
    </header>
  );
}
