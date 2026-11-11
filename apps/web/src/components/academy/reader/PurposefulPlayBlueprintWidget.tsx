'use client';

import * as React from 'react';
import { Gamepad2, CheckSquare, Square, MessageCircle, Sparkles } from 'lucide-react';
import { DevelopmentalTier } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface PurposefulPlayBlueprintWidgetProps {
  tier?: DevelopmentalTier | string | null;
  isNightstandMode?: boolean;
  className?: string;
}

export function PurposefulPlayBlueprintWidget({
  tier,
  isNightstandMode = false,
  className,
}: PurposefulPlayBlueprintWidgetProps) {
  const [checkedItems, setCheckedItems] = React.useState<Record<number, boolean>>({});

  const { materials, languagePrompts, subtitle } = React.useMemo(() => {
    if (tier === DevelopmentalTier.TIER_0A_INFANCY_0_1) {
      return {
        subtitle: 'High-Contrast Tracking & Mirror Serve-and-Return',
        materials: [
          'High-contrast black-and-white cards or geometric patterns',
          'Unbreakable floor mirror (~12 inches away for tummy time)',
          'Soft vocal turn-taking with reciprocal pauses',
        ],
        languagePrompts: [
          '“Look at these bold lines! Your eyes are tracking back and forth so smoothly.”',
          '“Who is that in the mirror? That’s you! Hello!”',
          '“I hear your soft coo. Ooooh! Tell me more.”',
        ],
      };
    }

    if (
      tier === DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6 ||
      tier === DevelopmentalTier.TIER_1_AGES_8_9
    ) {
      return {
        subtitle: 'Cooperative Play & Growth Mindset Scaffolding',
        materials: [
          'Cooperative board game or card matching set (e.g., Peaceable Kingdom)',
          'Timer or hourglass for playful turn-taking',
          'Growth mindset token or cheer jar',
        ],
        languagePrompts: [
          '“We’re on the same team! What move helps both of us reach the goal?”',
          '“You worked so hard trying that puzzle piece three different ways before it fit!”',
          '“Mistakes mean our brain is growing a brand-new pathway.”',
        ],
      };
    }

    if (tier === DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9) {
      return {
        subtitle: 'Maker Exploration, Chess & Robotics Logic',
        materials: [
          'Standard chess board or strategic logic puzzle deck',
          'Recycled cardboard, rubber bands & wooden skewers for maker engineering',
          'Graph paper for game design or maze blueprints',
        ],
        languagePrompts: [
          '“What do you predict will happen two moves ahead?”',
          '“If this cardboard axle bends under load, how can we reinforce the triangular base?”',
          '“Let’s test your hypothesis with a quick 30-second stress test!”',
        ],
      };
    }

    // Default baseline materials and prompts
    return {
      subtitle: 'Household Materials Only',
      materials: [
        'Empty cardboard box or shoe box',
        '2 wooden kitchen spoons or spatulas',
        '3 different textured household items (sponge, soft cloth, dry pasta)',
      ],
      languagePrompts: [
        '“Look how this surface feels bumpy compared to this smooth one! What does your hand think?”',
        '“What do you predict will happen if we slide the spoon down the ramp?”',
        '“Let’s test your theory together!”',
      ],
    };
  }, [tier]);

  const toggleMaterial = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div
      data-testid="purposeful-play-widget"
      aria-label="Purposeful Play Blueprint & Materials"
      className={cn(
        'rounded-2xl border p-5 sm:p-6 my-8 shadow-xs transition-colors space-y-5',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-gradient-to-br from-teal-50/50 via-sky-50/30 to-white border-teal-200/90 text-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
          <Gamepad2 className="h-4 w-4 text-teal-600" />
          <span>Purposeful Play · 5-Minute Low-Prep Developmental Lab</span>
        </div>
        <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
          {subtitle}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Materials Checklist */}
        <div
          className={cn(
            'p-4 rounded-xl border space-y-2.5',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700'
              : 'bg-white border-teal-100'
          )}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300 block">
            Household Items Needed:
          </span>
          <div className="space-y-2">
            {materials.map((mat, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleMaterial(i)}
                className="flex items-start gap-2.5 w-full text-left text-xs leading-snug cursor-pointer"
              >
                <span className="text-teal-600 mt-0.5 shrink-0">
                  {checkedItems[i] ? (
                    <CheckSquare className="h-3.5 w-3.5" />
                  ) : (
                    <Square className="h-3.5 w-3.5 text-slate-400" />
                  )}
                </span>
                <span
                  className={cn(
                    checkedItems[i]
                      ? 'line-through text-slate-400 dark:text-stone-500'
                      : 'text-slate-700 dark:text-stone-200'
                  )}
                >
                  {mat}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Language Spark Prompts */}
        <div
          className={cn(
            'p-4 rounded-xl border space-y-2.5',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700'
              : 'bg-white border-sky-100'
          )}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
            <MessageCircle className="h-3.5 w-3.5 text-sky-600" />
            <span>Language Expansion Prompts</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-700 dark:text-stone-300 italic">
            {languagePrompts.map((p, i) => (
              <p key={i}>• {p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
