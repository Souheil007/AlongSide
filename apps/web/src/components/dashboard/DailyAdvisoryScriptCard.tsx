'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  XCircle,
  CheckCircle2,
  Mic,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Brain,
} from 'lucide-react';
import {
  DevelopmentalTier,
  type ChildDTO,
} from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface DailyAdvisoryScriptCardProps {
  child: ChildDTO | null;
  className?: string;
}

export interface AdvisoryScript {
  scenarioTitle: string;
  scenarioContext: string;
  whatNotToSay: string;
  notToSayWhy: string;
  whatToSay: string;
  toSayWhy: string;
  scenarioId: string;
  neurobiologyPillar: string;
}

export const DAILY_ADVISORY_SCRIPTS: Record<string, AdvisoryScript> = {
  [DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]: {
    scenarioTitle: 'Toddler Hitting & Sensory Overload Meltdown',
    scenarioContext: 'When your toddler suddenly swats your face or throws toys during bedtime exhaustion.',
    whatNotToSay: '“Bad boy! We don’t hit! Go sit in time-out right now!”',
    notToSayWhy: 'Activates pre-verbal amygdala panic before prefrontal impulse inhibitory wiring exists.',
    whatToSay: '“I won’t let you hit. Hitting hurts. You are exhausted and having big feelings. I am right here with you.”',
    toSayWhy: 'Sets an unshakeable boundary with calm nervous system co-regulation.',
    scenarioId: 'toddler-hitting-boundary',
    neurobiologyPillar: 'Pre-Verbal Amygdala Co-Regulation',
  },
  [DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]: {
    scenarioTitle: 'Grocery Aisle Toy Meltdown & Impulse Frustration',
    scenarioContext: 'When your child demands a checkout aisle toy and begins screaming on the floor.',
    whatNotToSay: '“You have 50 toys at home! Stop crying or no dessert for a week!”',
    notToSayWhy: 'Shames natural dopamine wanting without scaffolding delayed gratification.',
    whatToSay: '“It is so hard to walk past that dinosaur when your brain really wants it. Let’s take a picture on my phone so we remember it for your wishlist.”',
    toSayWhy: 'Validates wanting without giving in to the impulse, engaging the prefrontal pause.',
    scenarioId: 'preschool-store-meltdown',
    neurobiologyPillar: 'Theory of Mind & Delay Scaffolding',
  },
  [DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]: {
    scenarioTitle: 'Sibling Gaming Fairness & Screentime Transition Rage',
    scenarioContext: 'When your child shouts “You always favor him! It’s not fair!” as the tablet timer goes off.',
    whatNotToSay: '“Life isn’t fair! Get off the iPad right now or it’s locked forever!”',
    notToSayWhy: 'Triggers defensive fight-or-flight rebellion instead of cooperative problem-solving.',
    whatToSay: '“It feels unfair when the screen turns off right in the middle of your round. I hear you. The timer was set for 30 minutes, and the deal holds. Come help me choose the dinner music.”',
    toSayWhy: 'Firm limit anchored to predictability, followed by positive dopamine redirection.',
    scenarioId: 'elementary-screentime-transition',
    neurobiologyPillar: 'Concrete Operational Delayed Gratification',
  },
  [DevelopmentalTier.TIER_3_PRE_TEEN_10_12]: {
    scenarioTitle: '“All My Friends Have Phones Except Me! You’re Ruining My Life!”',
    scenarioContext: 'When your tween arrives home furious after being left out of a middle school group chat.',
    whatNotToSay: '“You don’t need what everyone else has. You’re too young, and that’s final.”',
    notToSayWhy: 'Dismisses severe adrenarche-driven peer belonging fear as frivolous entitlement.',
    whatToSay: '“I hear how lonely and painful it feels when friends talk about a chat you can’t see. We protect your sleep and mental health because we love you. Let’s look at our First-Phone Readiness checklist together.”',
    toSayWhy: 'Deeply validates peer status ache while maintaining an authoritative developmental boundary.',
    scenarioId: 'tween-peer-phone-pressure',
    neurobiologyPillar: 'Adrenarche & Social Reward Circuitry',
  },
  [DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]: {
    scenarioTitle: 'Bedtime Device Dock Resistance (8:30 PM Curfew)',
    scenarioContext: 'When your teen argues “My friends are literally all still snapping! Just 15 more minutes!”',
    whatNotToSay: '“Give me that phone right now or I’m canceling your cellular plan!”',
    notToSayWhy: 'Turns biological circadian biology into an adversarial parent-child power struggle.',
    whatToSay: '“I know your social brain wants to stay locked in. But your melatonin window needs 9 hours without blue light so your brain can recharge. The pact says 8:30 PM in the kitchen dock. Let’s plug it in together.”',
    toSayWhy: 'Depersonalizes enforcement using Pact-as-Code and circadian neurobiology.',
    scenarioId: 'teen-bedtime-dock-resistance',
    neurobiologyPillar: 'Biological Melatonin Delay Defense',
  },
  [DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]: {
    scenarioTitle: 'Algorithmic Comparison, Doomscrolling & Anxiety',
    scenarioContext: 'When your teen is visibly drained, irritable, and withdrawn after hours on social feeds.',
    whatNotToSay: '“If social media makes you so miserable, why don’t you just delete the apps?”',
    notToSayWhy: 'Ignores that adolescent social connectivity is real infrastructure, not just a casual app.',
    whatToSay: '“These feeds are built by rooms of engineers using variable rewards to keep you scrolling even when you feel depleted. You’re not broken for feeling exhausted. Want to take a walk or grab tea?”',
    toSayWhy: 'Allies with the teen against algorithmic manipulation without patronizing lecturing.',
    scenarioId: 'young-adult-algorithmic-burnout',
    neurobiologyPillar: 'Executive Autonomy & Digital Sovereignty',
  },
};

export function resolveAdvisoryScript(tierOrAge?: string | number | null): AdvisoryScript {
  if (!tierOrAge) {
    return DAILY_ADVISORY_SCRIPTS[DevelopmentalTier.TIER_3_PRE_TEEN_10_12]!;
  }

  if (typeof tierOrAge === 'string' && DAILY_ADVISORY_SCRIPTS[tierOrAge]) {
    return DAILY_ADVISORY_SCRIPTS[tierOrAge]!;
  }

  let age = typeof tierOrAge === 'number' ? tierOrAge : 10;
  if (typeof tierOrAge === 'string') {
    if (tierOrAge.includes('0_3') || tierOrAge.includes('TIER_0')) age = 2;
    else if (tierOrAge.includes('4_6') || tierOrAge.includes('TIER_1_EARLY')) age = 5;
    else if (tierOrAge.includes('7_9') || tierOrAge.includes('TIER_2_MIDDLE') || tierOrAge.includes('TIER_1_AGES_8_9')) age = 8;
    else if (tierOrAge.includes('10_12') || tierOrAge.includes('TIER_3_PRE_TEEN') || tierOrAge.includes('TIER_2_AGES_10_11')) age = 11;
    else if (tierOrAge.includes('13_15') || tierOrAge.includes('TIER_4_EARLY_ADOLESCENCE') || tierOrAge.includes('TIER_3_AGES_12_13')) age = 14;
    else if (tierOrAge.includes('16_18') || tierOrAge.includes('TIER_5_LATE') || tierOrAge.includes('TIER_4_AGES_14_PLUS')) age = 17;
  }

  if (age <= 3) return DAILY_ADVISORY_SCRIPTS[DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3]!;
  if (age <= 6) return DAILY_ADVISORY_SCRIPTS[DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6]!;
  if (age <= 9) return DAILY_ADVISORY_SCRIPTS[DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9]!;
  if (age <= 12) return DAILY_ADVISORY_SCRIPTS[DevelopmentalTier.TIER_3_PRE_TEEN_10_12]!;
  if (age <= 15) return DAILY_ADVISORY_SCRIPTS[DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15]!;
  return DAILY_ADVISORY_SCRIPTS[DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18]!;
}

export function DailyAdvisoryScriptCard({
  child,
  className,
}: DailyAdvisoryScriptCardProps) {
  const [copied, setCopied] = React.useState(false);
  const script = resolveAdvisoryScript(child?.developmentalTier ?? child?.age);
  const childName = child?.name ?? 'Your Child';

  const handleCopyScript = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(script.whatToSay);
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
        'border-[#E3E3DC] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(17,20,19,0.04)] rounded-[10px] overflow-hidden',
        className
      )}
    >
      <CardHeader className="p-5 pb-3 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#EAF3EE] text-[#143D2B] font-bold">
              <MessageSquare className="h-4 w-4" />
            </span>
            <span className="text-xs font-mono font-medium text-[#143D2B] uppercase tracking-wider">
              Daily Calm Advisory Script
            </span>
          </div>

          <Badge
            variant="outline"
            className="text-[10px] font-mono border-[#E3E3DC] text-[#143D2B] bg-[#EAF3EE]"
          >
            <Brain className="h-3 w-3 mr-1" />
            {script.neurobiologyPillar}
          </Badge>
        </div>

        <div>
          <CardTitle className="font-serif text-base sm:text-lg font-semibold text-[#111413] leading-snug">
            {script.scenarioTitle}
          </CardTitle>
          <CardDescription className="text-xs text-[#494F4C] mt-0.5 leading-relaxed">
            {script.scenarioContext.replace('your tween', `${childName}`).replace('your child', `${childName}`)}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3.5">
        {/* Contrast Grid: What NOT to say vs What TO say */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Reactive (What NOT to say) */}
          <div className="rounded-[8px] border border-[#DC2626]/20 bg-[#FFF5F5] p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#DC2626]">
              <XCircle className="h-4 w-4 text-[#DC2626] shrink-0" />
              <span>What NOT to Say (Reactive)</span>
            </div>
            <p className="font-serif italic text-xs text-[#111413] leading-relaxed">
              {script.whatNotToSay}
            </p>
            <p className="text-[11px] font-mono text-[#DC2626]/90 leading-snug pt-0.5">
              ⚠️ {script.notToSayWhy}
            </p>
          </div>

          {/* Empathetic & Firm (What TO say) */}
          <div className="rounded-[8px] border border-[#143D2B]/20 bg-[#EAF3EE]/50 p-3.5 space-y-1.5 relative">
            <div className="flex items-center justify-between gap-1 text-xs font-mono font-medium text-[#143D2B]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#143D2B] shrink-0" />
                <span>What TO Say (Empathetic & Firm)</span>
              </div>
              <button
                onClick={handleCopyScript}
                className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-[#143D2B] hover:text-[#111413] bg-white px-2 py-0.5 rounded-[4px] border border-[#E3E3DC] transition-colors cursor-pointer"
                title="Copy dialogue to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-[#143D2B]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-serif italic text-xs font-medium text-[#111413] leading-relaxed">
              {script.whatToSay}
            </p>
            <p className="text-[11px] font-mono text-[#143D2B]/90 leading-snug pt-0.5">
              ✅ {script.toSayWhy}
            </p>
          </div>
        </div>

        {/* Practice in AI Voice Sparring Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1 rounded-[8px] bg-[#F4F4F0] border border-[#E3E3DC] p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-[#143D2B] text-white shadow-2xs">
              <Mic className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-[#111413] block">
                Practice in AI Voice Sparring Simulator
              </span>
              <span className="text-[11px] text-[#858C88]">
                Spar against an AI simulating {childName}&apos;s emotional pushback before real-life moments.
              </span>
            </div>
          </div>

          <Link
            href={`/advisor?scenario=${script.scenarioId}`}
            className="w-full sm:w-auto shrink-0"
          >
            <Button
              size="sm"
              className="w-full sm:w-auto min-h-[44px] gap-1.5 bg-[#111413] hover:bg-[#143D2B] text-white text-xs font-medium rounded-[5px] shadow-[0_1px_2px_rgba(17,20,19,0.08)] px-4 transition-colors"
            >
              <span>Practice Dialogue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
