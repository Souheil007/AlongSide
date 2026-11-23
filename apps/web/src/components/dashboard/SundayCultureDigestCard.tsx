'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Sparkles,
  Flame,
  ArrowRight,
  Copy,
  Check,
  RotateCw,
  Play,
} from 'lucide-react';
import {
  DevelopmentalTier,
  isSlangEligibleTier,
  type ChildDTO,
} from '@alongside/shared';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getLatestDigest, getWeeklyDigestEdition } from '@/lib/api/digest';
import { deriveChildAge } from '@/hooks/useChildAge';
import {
  INFANT_SENSORY_ACTIVITIES,
  TODDLER_SENSORY_ACTIVITIES,
  EARLY_CHILDHOOD_SENSORY_ACTIVITIES,
} from './BilateralPactStatusCard';
import { cn } from '@/lib/utils';

export interface SundayCultureDigestCardProps {
  child: ChildDTO | null;
  variant?: 'default' | 'h2v2';
  scriptSlot?: React.ReactNode;
  className?: string;
}

interface H2v2DecoderItem {
  term: string;
  badge: string;
  definition: string;
  sample: string;
  parentMove: string;
}

const H2V2_FALLBACK_SLANG: H2v2DecoderItem[] = [
  {
    term: 'Crashout',
    badge: 'Cringe 4/5',
    definition: 'An explosive overreaction to a minor setback or losing a game.',
    sample: '“Bro actually crashed out over one lost Roblox round.”',
    parentMove: 'Parent move: understand what they mean, never say it in front of their friends.',
  },
  {
    term: 'Glazing',
    badge: 'Cringe 3/5',
    definition: 'Over-praising someone or trying way too hard to impress them.',
    sample: '“Stop glazing the teacher, we still have homework tonight.”',
    parentMove: 'Parent move: smile lightly and reply “Fair - I just genuinely liked it.”',
  },
  {
    term: 'Cooked',
    badge: 'Cringe 2/5',
    definition: 'Completely exhausted, overwhelmed on a quiz, or out of social energy.',
    sample: '“I forgot my cleats, I’m actually cooked.”',
    parentMove: 'Parent move: great cue to offer a snack and skip heavy questions for 20 minutes.',
  },
];

const TODDLER_DINNER_QUESTIONS = [
  '“If your favorite stuffed animal came to dinner tonight, what food would it sneak first?”',
  '“What sound did you hear outside today that sounded the silliest?”',
  '“Which color on your plate looks the crunchiest right now?”',
];

const H2V2_FALLBACK_VIDEO_TWEEN = {
  youtubeVideoId: '_X0mgOOSpLU',
  title: 'The Power of Believing That You Can Improve',
  presenter: 'Dr. Carol Dweck',
  channelName: 'TED',
  durationMinutes: 10,
  takeaway:
    'Why praising effort and strategy - instead of fixed talent - builds resilient confidence before the middle-school social shift.',
};

const H2V2_FALLBACK_VIDEO_EARLY = {
  youtubeVideoId: 'm_5u8-QSh6A',
  title: 'Serve & Return Interaction Shapes Brain Circuitry',
  presenter: 'Center on the Developing Child',
  channelName: 'Harvard University',
  durationMinutes: 2,
  takeaway:
    'How simple back-and-forth eye contact, warmth, and playful responses physically wire a young child’s language and calm circuits.',
};

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

export function SundayCultureDigestCard({
  child,
  variant = 'default',
  scriptSlot,
  className,
}: SundayCultureDigestCardProps) {
  const [copied, setCopied] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [cringeLevel, setCringeLevel] = React.useState(3);
  const [selectedDecoderIdx, setSelectedDecoderIdx] = React.useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = React.useState(false);

  const effectiveTier = React.useMemo<DevelopmentalTier>(() => {
    if (child) {
      return (child.developmentalTier ?? deriveChildAge(child).developmentalTier) as DevelopmentalTier;
    }
    return DevelopmentalTier.TIER_3_PRE_TEEN_10_12;
  }, [child]);

  const childAge = child?.age ?? 10;
  const isInfant = childAge <= 1;
  const isToddler =
    (childAge >= 2 && childAge <= 3) ||
    String(effectiveTier).includes('TIER_0');
  const isEarlyChildhood =
    (childAge >= 4 && childAge <= 6) ||
    String(effectiveTier).includes('TIER_1_EARLY');
  const isEarlyTier = isInfant || isToddler || isEarlyChildhood;
  const showSlangDecoder = !isEarlyTier && isSlangEligibleTier(effectiveTier);

  // Reset interactive local selections when switching child profile
  React.useEffect(() => {
    setQuestionIndex(0);
    setSelectedDecoderIdx(0);
    setIsPlayingVideo(false);
  }, [child?.id, effectiveTier]);

  const { data } = useQuery({
    queryKey: ['sunday-culture-digest-card'],
    queryFn: getLatestDigest,
    enabled: variant === 'default',
    staleTime: 10 * 60 * 1000,
  });

  const { data: weeklyEdition } = useQuery({
    queryKey: ['home-weekly-digest-edition', effectiveTier, child?.id ?? 'default'],
    queryFn: () =>
      getWeeklyDigestEdition('latest', {
        tier: effectiveTier,
        childId: child?.id,
      }),
    enabled: variant === 'h2v2',
    staleTime: 10 * 60 * 1000,
  });

  if (variant === 'h2v2') {
    // 1. Live age-calibrated Sunday Table prompts
    const dinnerPrompts: string[] =
      weeklyEdition?.dinnerPrompts && weeklyEdition.dinnerPrompts.length > 0
        ? weeklyEdition.dinnerPrompts.map((p) => {
            const trimmed = p.question.trim();
            return trimmed.startsWith('“') || trimmed.startsWith('"')
              ? trimmed
              : `“${trimmed}”`;
          })
        : isEarlyTier
          ? TODDLER_DINNER_QUESTIONS
          : DINNER_QUESTIONS.map((q) => q.prompt);

    const activeDinnerPrompt =
      dinnerPrompts[questionIndex % dinnerPrompts.length] ?? dinnerPrompts[0]!;

    // 2. Live Slang Decoder (ages 7+) OR Screen-Free Play Ideas (ages 0-6)
    const decoderItems: H2v2DecoderItem[] = showSlangDecoder
      ? weeklyEdition?.phrases && weeklyEdition.phrases.length > 0
        ? weeklyEdition.phrases.slice(0, 3).map((phrase) => ({
            term: phrase.word,
            badge: `Cringe ${phrase.cringeLevel}/5`,
            definition: phrase.fullMeaning || phrase.shortMeaning,
            sample: phrase.calmScript,
            parentMove: phrase.cringeLabel
              ? `Parent note: ${phrase.cringeLabel}.`
              : 'Parent move: understand the signal without forcing the slang.',
          }))
        : H2V2_FALLBACK_SLANG
      : (isInfant
          ? INFANT_SENSORY_ACTIVITIES
          : isToddler
            ? TODDLER_SENSORY_ACTIVITIES
            : EARLY_CHILDHOOD_SENSORY_ACTIVITIES
        )
          .slice(0, 3)
          .map((act) => ({
            term: act.title.split(':')[0]!.slice(0, 22),
            badge: act.duration,
            definition: act.description,
            sample: `Try saying: “Let’s explore ${act.title.toLowerCase()} together for ${act.duration}.”`,
            parentMove: 'Screen-free sensory reset that lowers evening restlessness naturally.',
          }));

    const activeDecoder =
      decoderItems[selectedDecoderIdx % decoderItems.length] ?? decoderItems[0]!;

    // 3. Live Featured Weekly Talk video
    const liveVideo = weeklyEdition?.videos?.[0];
    const fallbackVideo = isEarlyTier ? H2V2_FALLBACK_VIDEO_EARLY : H2V2_FALLBACK_VIDEO_TWEEN;
    const featuredVideo = {
      youtubeVideoId: liveVideo?.youtubeVideoId ?? fallbackVideo.youtubeVideoId,
      title: liveVideo?.title ?? fallbackVideo.title,
      presenter: liveVideo?.presenter ?? fallbackVideo.presenter,
      channelName: liveVideo?.channelName ?? fallbackVideo.channelName,
      durationMinutes: liveVideo?.durationMinutes ?? fallbackVideo.durationMinutes,
      takeaway: liveVideo?.takeaway ?? fallbackVideo.takeaway,
    };

    const handleShuffleH2v2 = () => {
      setQuestionIndex((prev) => (prev + 1) % dinnerPrompts.length);
    };

    const handleCopyH2v2 = async () => {
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(activeDinnerPrompt);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch {
        // ignore
      }
    };

    return (
      <div className={cn('space-y-6', className)}>
        {/* ROW 2: 3-Card Daily Ritual Trio (Deep-Spruce Script + Polaroid Table + Slang/Play Decoder) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Card 1: Deep-Spruce Script */}
          {scriptSlot ? <div className="lg:col-span-4">{scriptSlot}</div> : null}

          {/* Card 2: Tactile Polaroid Sunday Table Card */}
          <article
            aria-label="Sunday Table Spark"
            className={cn(
              scriptSlot ? 'lg:col-span-4' : 'lg:col-span-6',
              'bg-white p-3.5 pb-4 rounded-lg border border-black/10 shadow-[0_14px_32px_rgba(45,34,22,0.11)] lg:-rotate-1 hover:rotate-0 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between'
            )}
          >
            <div>
              <div className="w-full aspect-[16/10] overflow-hidden rounded-[4px] bg-[#221E1A]">
                <img
                  src="/images/home/sunday-table.jpg"
                  alt="Warm family dinner table"
                  className="w-full h-full object-cover block"
                />
              </div>
              <div className="mt-3.5 px-1">
                <h3 className="font-serif text-[19px] font-medium text-[#131715] leading-snug">
                  Sunday Table Spark
                </h3>
                <div className="grid mt-1.5">
                  {dinnerPrompts.map((promptText, idx) => {
                    const isCurrent = idx === questionIndex % dinnerPrompts.length;
                    return (
                      <p
                        key={idx}
                        aria-hidden={!isCurrent || undefined}
                        className={cn(
                          'col-start-1 row-start-1 text-[13px] text-[#424A46] leading-relaxed',
                          !isCurrent && 'invisible pointer-events-none select-none'
                        )}
                      >
                        {promptText}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 px-1">
              <button
                type="button"
                onClick={handleShuffleH2v2}
                className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 rounded-full bg-white border border-black/15 hover:border-[#143D2B] hover:text-[#143D2B] hover:bg-[#E5F3EC] text-xs font-semibold text-[#131715] transition cursor-pointer"
              >
                <span>Shuffle card</span>
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleCopyH2v2}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#143D2B] hover:text-[#0E2B1E] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <span>Copy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </article>

          {/* Card 3: Interactive Schoolyard Decoder OR Screen-Free Play Ideas */}
          <article
            aria-label={showSlangDecoder ? 'Schoolyard Decoder' : 'Screen-Free Play Ideas'}
            className={cn(
              scriptSlot ? 'lg:col-span-4' : 'lg:col-span-6',
              'rounded-[1.75rem] bg-white border border-[#143D2B]/10 shadow-[0_10px_30px_rgba(19,23,21,0.045)] p-5 sm:p-6 flex flex-col gap-3.5'
            )}
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.05em] text-[#C85A2B]">
                  {showSlangDecoder
                    ? 'Schoolyard Decoder · Tap a word'
                    : 'Screen-Free Play · Tap an idea'}
                </span>
                <span className="text-[11.5px] font-semibold text-[#143D2B]">
                  {activeDecoder.badge}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {decoderItems.map((item, idx) => {
                  const isActive = idx === selectedDecoderIdx % decoderItems.length;
                  return (
                    <button
                      key={item.term}
                      type="button"
                      onClick={() => setSelectedDecoderIdx(idx)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer',
                        isActive
                          ? 'bg-[#143D2B] border-[#143D2B] text-white'
                          : 'bg-[#FAF8F3] border-black/15 text-[#131715] hover:border-[#143D2B] hover:text-[#143D2B]'
                      )}
                    >
                      {item.term}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 grid p-4 rounded-2xl bg-[#F6F1E7]/90 border-l-[3px] border-[#C85A2B]">
              {decoderItems.map((item, idx) => {
                const isCurrent = idx === selectedDecoderIdx % decoderItems.length;
                return (
                  <div
                    key={item.term}
                    aria-hidden={!isCurrent || undefined}
                    className={cn(
                      'col-start-1 row-start-1 flex flex-col justify-between gap-3',
                      !isCurrent && 'invisible pointer-events-none select-none'
                    )}
                  >
                    <div>
                      <h4 className="font-serif text-xl font-medium text-[#131715]">
                        &ldquo;{item.term}&rdquo;
                      </h4>
                      <p className="text-[13px] text-[#424A46] mt-1 leading-relaxed">
                        {item.definition}
                      </p>
                      <p className="font-serif italic text-[13.5px] text-[#6C7570] mt-2 leading-snug">
                        {item.sample}
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-[#143D2B] pt-2.5 border-t border-black/10 leading-snug">
                      {item.parentMove}
                    </p>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        {/* ROW 3: Widescreen Featured Weekly Talk Band */}
        <article
          aria-label="This Week's Featured Talk"
          className="rounded-[1.75rem] bg-white border border-[#143D2B]/10 shadow-[0_10px_28px_rgba(19,23,21,0.045)] p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          <div className="lg:col-span-5">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#141816]">
              {isPlayingVideo ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${featuredVideo.youtubeVideoId}?autoplay=1&rel=0`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${featuredVideo.youtubeVideoId}/hqdefault.jpg`}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover scale-[1.18] block"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(true)}
                    aria-label={`Play ${featuredVideo.title}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#143D2B] flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.3)] transition-transform hover:scale-105 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-[#143D2B] ml-0.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-3.5">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.05em] text-[#C85A2B]">
                This Week&apos;s Featured Talk · {featuredVideo.durationMinutes} min
              </span>
              <h3 className="font-serif text-xl sm:text-[26px] font-medium text-[#131715] leading-[1.2] mt-1.5">
                {featuredVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#424A46] mt-2 leading-relaxed max-w-2xl">
                {featuredVideo.takeaway}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="text-xs font-semibold text-[#6C7570]">
                {featuredVideo.presenter} · {featuredVideo.channelName}
              </span>
              <Link href="/digest">
                <Button
                  variant="outline"
                  size="sm"
                  className="min-h-[38px] rounded-full px-4 gap-1.5 text-xs font-semibold border-black/15 text-[#131715] hover:border-[#143D2B] hover:text-[#143D2B] hover:bg-[#E5F3EC] cursor-pointer"
                >
                  <span>Open Culture &amp; Trends Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  }

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
