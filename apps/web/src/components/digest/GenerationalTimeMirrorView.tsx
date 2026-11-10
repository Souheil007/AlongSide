'use client';

import * as React from 'react';
import { History, Sparkles, ArrowRightLeft, Lightbulb } from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import { formatChildAge } from '@/stores/useChildContextStore';
import { cn } from '@/lib/utils';

export interface GenerationalDimension {
  label: string;
  then: string;
  now: string;
}

export interface GenerationalMirrorData {
  heading: string;
  thenTitle: string;
  nowTitle: string;
  dimensions: GenerationalDimension[];
  insight: string;
}

export const GENERATIONAL_MIRRORS_BY_STAGE: Record<
  'INFANT' | 'ELEMENTARY' | 'ADOLESCENT',
  GenerationalMirrorData
> = {
  ADOLESCENT: {
    heading: 'When You Were 14 vs. Julian at 14',
    thenTitle: 'You in 1999 (Age 14)',
    nowTitle: 'Julian in 2026 (Age 14)',
    dimensions: [
      {
        label: 'Staying in Touch',
        then: 'Dial-up AOL Instant Messenger (AIM) with dramatic away messages quoting blink-182 lyrics.',
        now: 'Discord persistent voice lobbies with screen-shares and ephemeral Snapchat Snapstreaks.',
      },
      {
        label: 'Music & Media Discovery',
        then: 'Waiting 45 minutes on Napster for one MP3 file, or recording tracks from the radio onto cassette.',
        now: 'Algorithmic Spotify Blend playlists and 15-second viral sound loops on TikTok.',
      },
      {
        label: 'Peer Currency & Status',
        then: 'Having a clear Motorola pager with numeric codes, or wearing JNCO jeans and frosted tips.',
        now: 'Accumulating unspoken "Aura Points", Discord server roles, and Fortnite battle pass cosmetics.',
      },
      {
        label: 'The Adult Dread',
        then: '"Video games and internet chatrooms are rotting this generation\'s brain!"',
        now: '"Algorithmic doomscrolling and brainrot memes are destroying teen attention spans!"',
      },
    ],
    insight:
      'Every generation invents a cultural clubhouse that baffles their parents. The human need for peer belonging, identity experimentation, and autonomy remains identical across decades.',
  },
  ELEMENTARY: {
    heading: 'When You Were 8 vs. Maya at 8',
    thenTitle: 'You in 1999 (Age 8)',
    nowTitle: 'Maya in 2026 (Age 8)',
    dimensions: [
      {
        label: 'Playground Currency',
        then: 'Pogs, Slammers, Beanie Babies, and trading stickers in spiral notebooks on the blacktop.',
        now: 'Holographic Pokemon cards, mini Squishmallows, and scented Japanese eraser sets.',
      },
      {
        label: 'After-School Entertainment',
        then: 'Saturday morning VHS cartoons, Game Boy Color with an attachable worm light.',
        now: 'Minecraft Bedrock creative worlds, Bluey episodes on demand, and YouTube slime videos.',
      },
      {
        label: 'Schoolyard Drama',
        then: '"You can\'t jump on our hopscotch grid!" and secret lunchtime club passwords.',
        now: '"You broke the pinky promise and traded Emma my holographic Mewtwo!"',
      },
      {
        label: 'Parent Worry',
        then: '"If you sit that close to the television tube, your eyes will turn permanently square!"',
        now: '"Is playing Minecraft on the tablet giving her too much visual screen time?"',
      },
    ],
    insight:
      'Elementary blacktop politics have not altered in four decades. Children are simply practicing how to establish agreements, negotiate perceived value, and repair broken trust.',
  },
  INFANT: {
    heading: 'When You Were a Baby vs. Mateo at 14 Months',
    thenTitle: 'You as a Toddler (Early 1990s)',
    nowTitle: 'Mateo in 2026 (14 Months)',
    dimensions: [
      {
        label: 'Sensory Audio & Tunes',
        then: 'Barney tapes on VHS, Raffi cassette tapes, and Fisher-Price plastic tape players with big buttons.',
        now: 'Ms. Rachel songs, gentle CoComelon cadence, and personalized acoustic white noise machines.',
      },
      {
        label: 'Motor Exploration',
        then: 'Banging metal pots with wooden kitchen spoons, dropping plastic keys off the high chair tray.',
        now: 'Silicone suction bowls, sensory water mats, and tactile wooden Montessori nesting cylinders.',
      },
      {
        label: 'Parent Advisory Tools',
        then: 'The dog-eared Sears baby encyclopedia book and calling Grandma on a corded landline phone.',
        now: 'AlongSide evidence-based pediatric neurobiology feeds and 24/7 empathetic parenting guidance.',
      },
      {
        label: 'Old-School Advice Debunked',
        then: '"Just let the baby cry it out in the crib—he has to learn independence early!"',
        now: '"Prompt attunement and comforting builds secure attachment that enables true lifelong autonomy!"',
      },
    ],
    insight:
      'The human infant nervous system has not changed in 50,000 years. Biological attunement, warm touch, and vocal resonance remain the universal foundation of healthy brain architecture.',
  },
};

export function resolveMirrorStage(
  child: ChildDTO | null | undefined
): 'INFANT' | 'ELEMENTARY' | 'ADOLESCENT' {
  if (!child) return 'ADOLESCENT';
  if (child.age <= 3) return 'INFANT';
  if (child.age <= 10) return 'ELEMENTARY';
  return 'ADOLESCENT';
}

export interface GenerationalTimeMirrorViewProps {
  child?: ChildDTO | null;
  className?: string;
}

export function GenerationalTimeMirrorView({
  child,
  className,
}: GenerationalTimeMirrorViewProps) {
  const stage = resolveMirrorStage(child);
  const data = GENERATIONAL_MIRRORS_BY_STAGE[stage];

  const childName = child?.name ?? (stage === 'INFANT' ? 'Mateo' : stage === 'ELEMENTARY' ? 'Maya' : 'Julian');
  const childAgeLabel = child ? formatChildAge(child) : (stage === 'INFANT' ? '14 mo' : stage === 'ELEMENTARY' ? '8 yrs' : '14 yrs');

  const customHeading = child
    ? `When You Were ${child.age <= 3 ? 'a Baby' : child.age} vs. ${childName} at ${childAgeLabel}`
    : data.heading;

  const customNowTitle = child
    ? `${childName} in 2026 (${childAgeLabel})`
    : data.nowTitle;

  return (
    <section className={cn('space-y-5 max-w-7xl mx-auto', className)}>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E3DC] pb-3">
        <div className="space-y-0.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#6D28D9] font-bold flex items-center gap-1.5">
            <History className="w-4 h-4 text-[#6D28D9]" />
            Pillar 3 · Generational Time Mirror
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#111413]">
            {customHeading}
          </h2>
        </div>
        <span className="text-xs font-mono bg-[#F5F3FF] text-[#6D28D9] px-3 py-1 rounded-full font-semibold border border-[#6D28D9]/20">
          The Pediatric Truth: "Tools evolve; biology stays constant."
        </span>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Past Era: You in 1999 */}
        <div className="rounded-3xl border border-[#E3E3DC] bg-white p-6 sm:p-7 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E3E3DC] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F5F3FF] border border-[#6D28D9]/30 flex items-center justify-center text-xs font-bold text-[#6D28D9]">
                ↺
              </span>
              <h3 className="font-serif text-lg font-bold text-[#111413]">
                {data.thenTitle}
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#6D28D9] bg-[#F5F3FF] px-2.5 py-0.5 rounded-full font-bold">
              Past Era
            </span>
          </div>

          <div className="space-y-4">
            {data.dimensions.map((dim, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#858C88] font-bold block">
                  {dim.label}
                </span>
                <p className="text-xs sm:text-sm text-[#494F4C] leading-relaxed">
                  {dim.then}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Present Era: Child in 2026 */}
        <div className="rounded-3xl border border-[#143D2B]/30 bg-white p-6 sm:p-7 space-y-5 shadow-xs ring-1 ring-[#143D2B]/10">
          <div className="flex items-center justify-between border-b border-[#E3E3DC] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EAF3EE] border border-[#143D2B]/30 flex items-center justify-center text-xs font-bold text-[#143D2B]">
                ★
              </span>
              <h3 className="font-serif text-lg font-bold text-[#111413]">
                {customNowTitle}
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full font-bold">
              Present Reality
            </span>
          </div>

          <div className="space-y-4">
            {data.dimensions.map((dim, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold block">
                  {dim.label}
                </span>
                <p className="text-xs sm:text-sm text-[#111413] font-medium leading-relaxed">
                  {dim.now}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pediatric Insight Callout */}
      <div className="p-4 sm:p-5 bg-[#F4F4F0] rounded-2xl border border-[#E3E3DC] flex items-start gap-3.5">
        <Lightbulb className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold block">
            Pediatric Insight & Parent Relief
          </span>
          <p className="text-xs sm:text-sm text-[#494F4C] leading-relaxed">
            {data.insight}
          </p>
        </div>
      </div>
    </section>
  );
}
