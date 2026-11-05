'use client';

import * as React from 'react';
import {
  UtensilsCrossed,
  Sparkles,
  Shuffle,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Calendar,
  MessageCircle,
  HelpCircle,
  Volume2,
} from 'lucide-react';
import type { ChildDTO, DevelopmentalTier } from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
} from '@/stores/useChildContextStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface DinnerQuestion {
  id: string;
  tierKey: 'INFANT' | 'EARLY' | 'ELEMENTARY' | 'TWEEN' | 'TEEN';
  tierLabel: string;
  question: string;
  parentCalmTip: string;
  followUpPrompt: string;
}

export const CANONICAL_DINNER_QUESTIONS: Record<
  'INFANT' | 'EARLY' | 'ELEMENTARY' | 'TWEEN' | 'TEEN',
  DinnerQuestion[]
> = {
  INFANT: [
    {
      id: 'dinner-infant-1',
      tierKey: 'INFANT',
      tierLabel: 'Infancy & Toddlerhood (0–3 yrs)',
      question: 'What was the silliest animal sound or face that made you giggle the hardest today?',
      parentCalmTip: 'Model funny animal noises and wait patiently for turn-taking eye contact.',
      followUpPrompt: 'Can you show me the silliest sound a baby lion makes?',
    },
    {
      id: 'dinner-infant-2',
      tierKey: 'INFANT',
      tierLabel: 'Infancy & Toddlerhood (0–3 yrs)',
      question: 'If baby animals could talk at dinner, what would a puppy ask to eat first?',
      parentCalmTip: 'Engage sensory observation and finger food exploration with zero food pressure.',
      followUpPrompt: 'Would the puppy like crunchy carrots or sweet bananas better?',
    },
  ],
  EARLY: [
    {
      id: 'dinner-early-1',
      tierKey: 'EARLY',
      tierLabel: 'Early Childhood (4–6 yrs)',
      question: 'If all your stuffed animals came to life while we were asleep, what secret game would they play first?',
      parentCalmTip: 'Validate their boundless imaginative world without evaluating logic.',
      followUpPrompt: 'Who do you think would be the boss of the stuffed animal club?',
    },
    {
      id: 'dinner-early-2',
      tierKey: 'EARLY',
      tierLabel: 'Early Childhood (4–6 yrs)',
      question: 'If you could invent a new flavor of ice cream that no one has ever tasted, what would it look like?',
      parentCalmTip: 'Ask about sensory details (color, toppings, smells) to encourage descriptive language.',
      followUpPrompt: 'Would you serve it in a giant waffle cone or a spaceship bowl?',
    },
  ],
  ELEMENTARY: [
    {
      id: 'dinner-elem-1',
      tierKey: 'ELEMENTARY',
      tierLabel: 'Elementary (7–9 yrs)',
      question: 'If you could invent a brand new school subject that every kid in the world had to take, what would the homework be?',
      parentCalmTip: 'Start by answering first with a humorous subject (like "Pillow Fort Engineering").',
      followUpPrompt: 'What kind of test would the teacher give at the end of the year?',
    },
    {
      id: 'dinner-elem-2',
      tierKey: 'ELEMENTARY',
      tierLabel: 'Elementary (7–9 yrs)',
      question: 'What was something that happened at school this week that made you or your friends laugh out loud?',
      parentCalmTip: 'Focus on social humor rather than academic performance to keep shields down.',
      followUpPrompt: 'Did the teacher laugh too, or was it a quiet inside joke?',
    },
    {
      id: 'dinner-elem-3',
      tierKey: 'ELEMENTARY',
      tierLabel: 'Elementary (7–9 yrs)',
      question: 'If you had a superpower for just 24 hours, but could only use it to help someone else, what would you do?',
      parentCalmTip: 'Nurtures early empathy and cooperative perspective-taking without preaching.',
      followUpPrompt: 'Who in our family or class would be the most surprised?',
    },
  ],
  TWEEN: [
    {
      id: 'dinner-tween-1',
      tierKey: 'TWEEN',
      tierLabel: 'Pre-Teen / Tween (10–12 yrs)',
      question: 'If your favorite game or YouTuber had to survive in a zombie apocalypse, who gets eliminated first and why?',
      parentCalmTip: 'Do not critique the YouTuber. Lean into the hypothetical scenario with curiosity.',
      followUpPrompt: 'Who would end up building the ultimate survival fortress?',
    },
    {
      id: 'dinner-tween-2',
      tierKey: 'TWEEN',
      tierLabel: 'Pre-Teen / Tween (10–12 yrs)',
      question: 'If you could design any app or device that doesn’t exist yet, what real-world problem would it solve?',
      parentCalmTip: 'Explore what annoys or excites them about current digital platforms.',
      followUpPrompt: 'Would the app be free, or would people pay to escape annoying ads?',
    },
    {
      id: 'dinner-tween-3',
      tierKey: 'TWEEN',
      tierLabel: 'Pre-Teen / Tween (10–12 yrs)',
      question: 'What is one trend or slang word that everyone at school is obsessed with that you think is completely overrated?',
      parentCalmTip: 'Provides psychological safety to express independent taste apart from the peer herd.',
      followUpPrompt: 'Why do you think it caught on so fast in the first place?',
    },
  ],
  TEEN: [
    {
      id: 'dinner-teen-1',
      tierKey: 'TEEN',
      tierLabel: 'Teen / Adolescence (13–18 yrs)',
      question: 'Do you think people our age are generally happier or more stressed out because of group chats and social media?',
      parentCalmTip: 'Listen without jumping to advice. Reflect their thoughts back: "That makes sense why you feel that pressure."',
      followUpPrompt: 'What is the most exhausting part of keeping up with daily notifications?',
    },
    {
      id: 'dinner-teen-2',
      tierKey: 'TEEN',
      tierLabel: 'Teen / Adolescence (13–18 yrs)',
      question: 'If our entire family took a 72-hour screen-free camping trip, what would everyone complain about first?',
      parentCalmTip: 'Make fun of your own screen habits first to defuse defensive barriers.',
      followUpPrompt: 'What board game or playlist would keep us from going completely crazy?',
    },
    {
      id: 'dinner-teen-3',
      tierKey: 'TEEN',
      tierLabel: 'Teen / Adolescence (13–18 yrs)',
      question: 'What is one thing adults misunderstand the most about how friendships work online today?',
      parentCalmTip: 'Treat them as the expert on their generational reality. Validate their perspective.',
      followUpPrompt: 'What’s a rule or boundary you set for yourself in chats that works well?',
    },
  ],
};

export function resolveDinnerTier(child?: ChildDTO | null): 'INFANT' | 'EARLY' | 'ELEMENTARY' | 'TWEEN' | 'TEEN' {
  if (!child) return 'TWEEN';

  const age = child.age;
  const tierStr = String(child.developmentalTier || '');

  if (age <= 3 || tierStr.includes('0_3') || tierStr.includes('TIER_0')) return 'INFANT';
  if (age <= 6 || tierStr.includes('4_6') || tierStr.includes('TIER_1_EARLY')) return 'EARLY';
  if (age <= 9 || tierStr.includes('7_9') || tierStr.includes('TIER_1_AGES_8_9') || tierStr.includes('TIER_2_MIDDLE')) return 'ELEMENTARY';
  if (age <= 12 || tierStr.includes('10_11') || tierStr.includes('10_12') || tierStr.includes('TIER_3_PRE_TEEN')) return 'TWEEN';
  return 'TEEN';
}

export interface DinnerConversationStartersProps {
  child?: ChildDTO | null;
  className?: string;
}

export function DinnerConversationStarters({
  child: propChild,
  className,
}: DinnerConversationStartersProps) {
  const storeActiveChild = useChildContextStore(selectActiveChild);
  const activeChild = propChild !== undefined ? propChild : storeActiveChild;

  const resolvedTier = resolveDinnerTier(activeChild);
  const questionsForTier = CANONICAL_DINNER_QUESTIONS[resolvedTier] || CANONICAL_DINNER_QUESTIONS.TWEEN;

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [savedQuestionIds, setSavedQuestionIds] = React.useState<string[]>([]);

  // Reset index if tier changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [resolvedTier]);

  const currentQuestion = questionsForTier[currentIndex % questionsForTier.length]!;

  const handleShuffle = () => {
    setCurrentIndex((prev) => (prev + 1) % questionsForTier.length);
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(currentQuestion.question);
      }
      setCopied(true);
      setToastMessage('Question copied to clipboard! Ready for Sunday dinner.');
      setTimeout(() => {
        setCopied(false);
        setToastMessage(null);
      }, 3000);
    } catch {
      // Fallback for environments where clipboard is restricted
      setCopied(true);
      setToastMessage('Question copied to clipboard! Ready for Sunday dinner.');
      setTimeout(() => {
        setCopied(false);
        setToastMessage(null);
      }, 3000);
    }
  };

  const isSaved = savedQuestionIds.includes(currentQuestion.id);

  const handleToggleSave = () => {
    setSavedQuestionIds((prev) => {
      if (prev.includes(currentQuestion.id)) {
        return prev.filter((id) => id !== currentQuestion.id);
      } else {
        return [...prev, currentQuestion.id];
      }
    });
  };

  const childDisplayName = activeChild?.name || 'Pre-Teen';

  return (
    <section
      aria-labelledby="dinner-starter-heading"
      className={cn('relative', className)}
    >
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          data-testid="toast-notification"
          className="mb-4 rounded-xl border border-teal-400/50 bg-teal-900/95 px-4 py-3 text-xs sm:text-sm text-teal-100 shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-teal-300 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-teal-300 hover:text-white text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl border border-teal-200/90 bg-gradient-to-br from-teal-850 via-teal-900 to-slate-900 p-6 sm:p-10 text-white shadow-lg">
        {/* Ambient radial glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Header meta badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-700/80 border border-teal-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-100">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              <span>Sunday Dinner Conversation Starter</span>
            </span>

            <span
              data-testid="dinner-tier-badge"
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-950/60 border border-teal-400/30 px-3 py-1 text-xs font-medium text-teal-200"
            >
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              <span>Tailored for {childDisplayName} ({currentQuestion.tierLabel})</span>
            </span>

            {isSaved && (
              <span
                data-testid="saved-indicator"
                className="inline-flex items-center gap-1 rounded-full bg-amber-500/30 border border-amber-400/40 px-2.5 py-0.5 text-[11px] font-bold text-amber-200"
              >
                <BookmarkCheck className="h-3 w-3 text-amber-300" />
                <span>Saved for Sunday</span>
              </span>
            )}
          </div>

          {/* Current Question Quote */}
          <div className="space-y-3">
            <h2
              id="dinner-starter-heading"
              data-testid="dinner-question-text"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white"
            >
              &ldquo;{currentQuestion.question}&rdquo;
            </h2>

            <p className="text-teal-100/90 text-xs sm:text-sm leading-relaxed">
              Open-ended, non-confrontational questions designed to spark natural family dialogue without triggering defensive adolescent shutdowns.
            </p>
          </div>

          {/* Parent Calm Strategy Box */}
          <div className="rounded-2xl border border-teal-500/30 bg-teal-950/50 p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-teal-100/90">
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-300 uppercase tracking-wider text-[11px] block">
                Parent Calm Rule of Engagement
              </span>
              <span className="text-[11px] text-teal-400 font-mono">
                Prompt {currentIndex + 1} of {questionsForTier.length}
              </span>
            </div>
            <p className="leading-relaxed font-normal">
              {currentQuestion.parentCalmTip} Start by answering the question yourself first to model vulnerability and curiosity.
            </p>
            {currentQuestion.followUpPrompt && (
              <div className="pt-1.5 text-xs text-teal-200/90 flex items-baseline gap-1.5 border-t border-teal-800/60">
                <span className="font-semibold text-teal-300 shrink-0">Follow-up:</span>
                <span className="italic">&ldquo;{currentQuestion.followUpPrompt}&rdquo;</span>
              </div>
            )}
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Copy Question Button */}
            <Button
              type="button"
              data-testid="copy-question-btn"
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-teal-400/40 gap-2 text-xs font-semibold"
              aria-label="Copy question to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Question Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-teal-200" />
                  <span>Copy Question</span>
                </>
              )}
            </Button>

            {/* Shuffle Question Button */}
            <Button
              type="button"
              data-testid="shuffle-question-btn"
              onClick={handleShuffle}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-teal-400/40 gap-2 text-xs font-semibold"
              aria-label="Shuffle dinner question"
            >
              <Shuffle className="h-3.5 w-3.5 text-teal-200" />
              <span>Shuffle Question</span>
            </Button>

            {/* Save to Sunday Dinner List */}
            <Button
              type="button"
              data-testid="save-question-btn"
              onClick={handleToggleSave}
              variant="outline"
              size="sm"
              className={cn(
                'gap-2 text-xs font-semibold transition-all border-teal-400/40',
                isSaved
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/60 hover:bg-amber-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              )}
              aria-label={isSaved ? 'Remove from Sunday Dinner list' : 'Save to Sunday Dinner list'}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-3.5 w-3.5 text-amber-300" />
                  <span>Saved to Dinner List</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-3.5 w-3.5 text-teal-200" />
                  <span>Save to Sunday Dinner List</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
