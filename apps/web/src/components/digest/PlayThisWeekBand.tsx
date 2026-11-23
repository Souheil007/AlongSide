'use client';

import * as React from 'react';
import { Check, RotateCw } from 'lucide-react';
import { DevelopmentalTier } from '@alongside/shared';
import { cn } from '@/lib/utils';

export type PlayStageKey = 'infant' | 'toddler' | 'preschool' | 'earlyElementary';
export type PlayMoodFilter = 'all' | 'calm' | 'energy' | 'nomess';

export interface ScreenFreePlayIdea {
  id: string;
  title: string;
  meta: string;
  tags: Array<'calm' | 'energy' | 'nomess'>;
  summary: string;
  steps: [string, string, string];
  materials: string[];
  why: string;
}

export interface PlayStageBundle {
  stageKey: PlayStageKey;
  stageLabel: string;
  ageRangeLabel: string;
  ideas: ScreenFreePlayIdea[];
}

function formatChildName(raw?: string | null): string {
  const trimmed = raw?.trim();
  if (!trimmed) return 'your child';
  if (trimmed.toLowerCase().startsWith('your ')) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * Determines whether the "Play this week" screen-free studio band should appear
 * inside Culture & Trends (strictly Ages 0–8; omitted for Ages 9–18).
 */
export function isPlayThisWeekEligible(
  age?: number | null,
  tier?: DevelopmentalTier | string | null
): boolean {
  if (typeof age === 'number' && Number.isFinite(age)) {
    return age <= 8;
  }
  const tierStr = String(tier || '');
  if (!tierStr) return false;
  if (tierStr.includes('TIER_0') || tierStr.includes('TIER_1_EARLY')) {
    return true;
  }
  return false;
}

/**
 * Resolves the calibrated 0–8 play bucket so activities stay strictly age-appropriate.
 */
export function resolvePlayStageKey(
  age?: number | null,
  tier?: DevelopmentalTier | string | null
): PlayStageKey {
  const tierStr = String(tier || '');
  if ((typeof age === 'number' && age <= 1) || tierStr.includes('TIER_0A')) {
    return 'infant';
  }
  if (
    (typeof age === 'number' && age >= 2 && age <= 3) ||
    tierStr.includes('TIER_0')
  ) {
    return 'toddler';
  }
  if (
    (typeof age === 'number' && age >= 4 && age <= 6) ||
    tierStr.includes('TIER_1_EARLY')
  ) {
    return 'preschool';
  }
  return 'earlyElementary';
}

export const PLAY_STAGE_BUNDLES: Record<PlayStageKey, PlayStageBundle> = {
  infant: {
    stageKey: 'infant',
    stageLabel: 'Infancy',
    ageRangeLabel: 'Ages 0–1',
    ideas: [
      {
        id: 'inf-mirror-tummy',
        title: 'Floor Mirror Tummy-Time Smiles',
        meta: 'ACTIVE PLAY · 10 MIN · NO MESS',
        tags: ['energy', 'nomess'],
        summary: 'Prop a baby-safe mirror on a soft mat so baby lifts their chest to greet their own reflection.',
        steps: [
          'Spread a cozy blanket in natural window light and prop a baby-safe mirror at eye level.',
          'Lie down face-to-face beside baby so they see both faces smiling back.',
          'Name what they see softly: “There are your eyes! There is your smile!”',
        ],
        materials: ['Soft blanket', 'Baby-safe floor mirror'],
        why: 'Builds neck and shoulder strength while sparking early visual tracking and social reciprocity.',
      },
      {
        id: 'inf-fabric-grasp',
        title: 'Soft Fabric Texture Basket',
        meta: 'CALM BEFORE BED · 10 MIN · NO MESS',
        tags: ['calm', 'nomess'],
        summary: 'Offer 3 clean household fabrics—cotton, knit, and silk—for gentle palmar grasping and touch.',
        steps: [
          'Place 3 clean fabrics (washcloth, soft scarf, knit burp cloth) within easy reach.',
          'Brush one gently across baby’s palms and toes while speaking slowly.',
          'Pause quietly as baby crumples, grips, and explores each surface.',
        ],
        materials: ['Cotton washcloth', 'Soft scarf', 'Knit cloth'],
        why: 'Contrasting textures stimulate fingertip nerve wiring while keeping sensory input calm and unhurried.',
      },
      {
        id: 'inf-puppet-mirror',
        title: 'Sock Puppet Vocal Peek-a-Boo',
        meta: 'SPEECH SPARK · 10 MIN · NO MESS',
        tags: ['calm', 'nomess'],
        summary: 'Use a soft sock or plush animal at eye level for slow, back-and-forth vowel sounds.',
        steps: [
          'Slip a clean soft sock onto your hand about 15 inches from baby’s face.',
          'Make one warm, slow vowel sound (“Ooooh!” or “Mooo!”) and pause 5 seconds.',
          'Echo back every coo, kick, or smile as a real conversation turn.',
        ],
        materials: ['Clean soft sock or plush toy', 'Quiet corner'],
        why: 'Serve-and-return pauses activate mirror neurons and build the foundation for early speech.',
      },
      {
        id: 'inf-warm-sponge',
        title: 'Warm Water Sponge Dabbing',
        meta: 'CALM BEFORE BED · 15 MIN · SENSORY',
        tags: ['calm', 'energy'],
        summary: 'Dab lukewarm water across hands and feet on a towel for soothing sensory grounding.',
        steps: [
          'Lay baby on a thick dry bath towel with a small bowl of lukewarm water nearby.',
          'Gently squeeze a soft sponge onto hands, wrists, and toes with calm narration.',
          'Wrap up snugly in a warm dry towel afterward to anchor bedtime calm.',
        ],
        materials: ['Thick bath towel', 'Soft sponge', 'Bowl of lukewarm water'],
        why: 'Warm tactile input eases late-day fussiness and cues the body to settle for evening sleep.',
      },
    ],
  },
  toddler: {
    stageKey: 'toddler',
    stageLabel: 'Toddlerhood',
    ageRangeLabel: 'Ages 2–3',
    ideas: [
      {
        id: 'tod-texture-trail',
        title: 'Texture Trail: Carpet, Tile & Soft Blankets',
        meta: 'CALM BEFORE BED · 15 MIN · NO MESS',
        tags: ['calm', 'nomess'],
        summary: 'Lay a towel, soft blanket, and rug in a short path—walk barefoot together and name each feeling.',
        steps: [
          'Lay 3 different textures in a short line across the hallway or living room.',
          'Take off socks together and step slowly from one square to the next.',
          'Whisper together whether each spot feels “soft”, “bumpy”, or “cool”.',
        ],
        materials: ['Bath towel', 'Soft blanket', 'Living room rug'],
        why: 'Barefoot sensory contrasts ground busy toddler nervous systems and naturally lower evening restlessness.',
      },
      {
        id: 'tod-tape-rescue',
        title: 'Painter’s Tape Animal Rescue',
        meta: 'DEEP FOCUS · 15 MIN · NO MESS',
        tags: ['nomess', 'calm'],
        summary: 'Tape 4 small toy animals to a baking tray with painter’s tape for a focused rescue mission.',
        steps: [
          'Press 4 plastic animals onto a tray or table with short strips of painter’s tape.',
          'Invite your toddler to peel each edge slowly to free the trapped animals.',
          'Stay nearby quietly while they practice patience and finger dexterity.',
        ],
        materials: ['Painter’s tape', '4 small toy animals', 'Baking tray'],
        why: 'Peeling tape strengthens pincer grip and holds single-task attention for 15+ screen-free minutes.',
      },
      {
        id: 'tod-box-tunnel',
        title: 'Cardboard Box Tunnel Crawl',
        meta: 'BURN ENERGY · 20 MIN · NO MESS',
        tags: ['energy', 'nomess'],
        summary: 'Open both ends of a shipping box or drape a sheet over two chairs for an indoor crawl tunnel.',
        steps: [
          'Open both flaps of a sturdy box (or drape a blanket across two dining chairs).',
          'Roll a soft ball through first so your toddler crawls after it to the other side.',
          'Greet them with a calm “peek-a-boo!” at each exit.',
        ],
        materials: ['Cardboard box or 2 chairs', 'Light blanket', 'Soft ball'],
        why: 'Heavy crawling work compresses joints and burns off late-afternoon cortisol without overstimulation.',
      },
      {
        id: 'tod-scent-match',
        title: 'Kitchen Scent Sniff & Match',
        meta: 'CALM BEFORE BED · 10 MIN · NO MESS',
        tags: ['calm', 'nomess'],
        summary: 'Put orange peel, cinnamon, and mint in small bowls—take slow sniffs together with eyes closed.',
        steps: [
          'Place 3 gentle kitchen scents (orange peel, cinnamon, mint) into small cups.',
          'Take slow belly sniffs together with eyes closed and guess each scent.',
          'Let your toddler pick their favorite “cozy nighttime smell”.',
        ],
        materials: ['3 small bowls', 'Orange peel', 'Cinnamon or mint'],
        why: 'Slow nasal breathing paired with gentle aromas directly activates the parasympathetic calm response.',
      },
    ],
  },
  preschool: {
    stageKey: 'preschool',
    stageLabel: 'Early Childhood',
    ageRangeLabel: 'Ages 4–6',
    ideas: [
      {
        id: 'pre-laser-maze',
        title: 'Hallway Painter’s Tape Laser Maze',
        meta: 'BURN ENERGY · 20 MIN · NO MESS',
        tags: ['energy', 'nomess'],
        summary: 'Crisscross painter’s tape low and high down the hallway for a secret-agent obstacle crawl.',
        steps: [
          'Tape 6 zigzag lines of painter’s tape across a hallway at ankle, knee, and waist heights.',
          'Challenge your child to step over and crawl under without breaking a single “laser”.',
          'Time a calm slow-motion round where moving quietly earns bonus points.',
        ],
        materials: ['Painter’s tape', 'Hallway wall'],
        why: 'Full-body motor planning and careful balance burn excess afternoon restlessness while training impulse control.',
      },
      {
        id: 'pre-shadow-theater',
        title: 'Flashlight Shadow Creature Theater',
        meta: 'CALM BEFORE BED · 20 MIN · NO MESS',
        tags: ['calm', 'nomess'],
        summary: 'Dim the room and shine a lamp at a blank wall to act out a 2-minute shadow story together.',
        steps: [
          'Prop a flashlight or bedside lamp aimed at an open wall in a dim room.',
          'Make animals with hands—or tape cardboard cutouts onto wooden spoons.',
          'Ask: “What problem is the shadow creature trying to solve tonight?”',
        ],
        materials: ['Flashlight or lamp', 'Blank wall', 'Optional cardboard scraps'],
        why: 'Symbolic storytelling builds Theory of Mind and transitions naturally into a dark, quiet bedtime room.',
      },
      {
        id: 'pre-mirror-blocks',
        title: 'Mirror-Image Architectural Blocks',
        meta: 'DEEP FOCUS · 15 MIN · NO MESS',
        tags: ['calm', 'nomess'],
        summary: 'Lay a ribbon down the middle of the table and challenge your child to mirror your block build.',
        steps: [
          'Place a strip of ribbon or tape down the center of the table as the “mirror line”.',
          'Build a simple 3-block shape on your side and invite them to build its exact reflection.',
          'Switch roles so your child leads and you copy their blueprint.',
        ],
        materials: ['Wooden or foam blocks', 'Ribbon or tape'],
        why: 'Trains spatial working memory, symmetry, and calm turn-taking without screens or noise.',
      },
      {
        id: 'pre-pillow-lava',
        title: 'Living Room Pillow Island Crossing',
        meta: 'BURN ENERGY · 20 MIN · NO MESS',
        tags: ['energy', 'nomess'],
        summary: 'Space sofa cushions across the rug as stepping islands to cross from couch to doorway.',
        steps: [
          'Place 4–5 sturdy cushions across the rug just within a safe toddler-to-preschool step.',
          'Pick up the back island and pass it forward to keep building the bridge.',
          'Finish with a slow “deep breath freeze” when you reach the far side.',
        ],
        materials: ['4–5 couch cushions or folded towels', 'Living room rug'],
        why: 'Combining movement bursts with deliberate freeze pauses strengthens early prefrontal braking circuits.',
      },
    ],
  },
  earlyElementary: {
    stageKey: 'earlyElementary',
    stageLabel: 'Early Elementary',
    ageRangeLabel: 'Ages 7–8',
    ideas: [
      {
        id: 'el-marble-coaster',
        title: '6-Second Cardboard Marble Coaster',
        meta: 'MAKER BUILD · 25 MIN · NO MESS',
        tags: ['energy', 'nomess'],
        summary: 'Tape cardboard tubes to the wall so a marble takes at least 6 full seconds to reach a cup.',
        steps: [
          'Cut 3 paper towel tubes lengthwise into open tracks and grab painter’s tape.',
          'Tape them zigzagging down a wall or cabinet so the marble rolls slowly into a cup.',
          'Use a stopwatch together—if it’s too fast, ask “How can we add a gentler slope?”',
        ],
        materials: ['Paper towel tubes', 'Painter’s tape', '1 marble', 'Plastic cup'],
        why: 'Iterative trial-and-error builds frustration tolerance and sustained offline focus after gaming or TV.',
      },
      {
        id: 'el-blindfold-architect',
        title: 'Blindfold Tactile Architect',
        meta: 'CALM BEFORE BED · 15 MIN · NO MESS',
        tags: ['calm', 'nomess'],
        summary: 'Identify and stack 5 household objects strictly by touch while blindfolded.',
        steps: [
          'Gather 5 safe geometric items (cup, wooden block, small box, spoon, book).',
          'Put on a sleep mask or close eyes; explore each object by touch alone.',
          'Sort them from largest to smallest or build a balanced tower without peeking.',
        ],
        materials: ['Sleep mask or scarf', '5 household objects'],
        why: 'Non-visual problem-solving sharpens working memory and slows down racing evening minds.',
      },
      {
        id: 'el-paperclip-lab',
        title: 'Floating Paperclip Water Lab',
        meta: 'QUIET SCIENCE · 15 MIN · TABLETOP',
        tags: ['calm'],
        summary: 'Float a metal paperclip on water using surface tension—then break it with one drop of soap.',
        steps: [
          'Fill a clean bowl with still water and lay a postage-stamp square of tissue gently on top.',
          'Rest a dry metal paperclip on the tissue, then nudge the paper down so the clip floats.',
          'Touch the water edge with a toothpick dipped in dish soap and watch what happens.',
        ],
        materials: ['Bowl of water', 'Dry metal paperclips', 'Tissue square', 'Dish soap + toothpick'],
        why: 'Hands-on hypothesis testing delivers real curiosity dopamine without algorithmic feeds.',
      },
      {
        id: 'el-cipher-hunt',
        title: 'Secret Shift-3 Living Room Hunt',
        meta: 'BURN ENERGY · 25 MIN · NO MESS',
        tags: ['energy', 'nomess'],
        summary: 'Shift letters forward by 3 (A→D, B→E) to hide 3 coded clues around the house.',
        steps: [
          'Write a quick decoder strip together (A=D, B=E, C=F) on one slip of paper.',
          'Encode 3 short hiding spots (like “SOFA” → “VRID”) and place each clue in order.',
          'Swap roles so your child writes the next secret trail for you to crack.',
        ],
        materials: ['Paper strips', 'Pencil'],
        why: 'Combines physical movement around the house with algorithmic decoding and deductive logic.',
      },
    ],
  },
};

export function getPlayStageBundle(
  age?: number | null,
  tier?: DevelopmentalTier | string | null
): PlayStageBundle {
  const key = resolvePlayStageKey(age, tier);
  return PLAY_STAGE_BUNDLES[key];
}

const FILTER_OPTIONS: Array<{ id: PlayMoodFilter; label: string }> = [
  { id: 'all', label: 'All ideas' },
  { id: 'calm', label: 'Calm before bed' },
  { id: 'energy', label: 'Burn energy' },
  { id: 'nomess', label: 'No mess' },
];

export interface PlayThisWeekBandProps {
  childId?: string | null;
  childName: string;
  childAge?: number | null;
  tier?: DevelopmentalTier | string | null;
  className?: string;
}

export function PlayThisWeekBand({
  childId,
  childName,
  childAge,
  tier,
  className,
}: PlayThisWeekBandProps) {
  const eligible = isPlayThisWeekEligible(childAge, tier);
  const bundle = React.useMemo(
    () => getPlayStageBundle(childAge, tier),
    [childAge, tier]
  );

  const [filter, setFilter] = React.useState<PlayMoodFilter>('all');
  const [activeId, setActiveId] = React.useState<string>(bundle.ideas[0]!.id);
  const [playedToday, setPlayedToday] = React.useState<Record<string, boolean>>({});

  const storageKey = React.useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return `alongside_play_done_${childId ?? 'default'}_${today}`;
  }, [childId]);

  // Reset active selection when switching child or developmental stage
  React.useEffect(() => {
    setFilter('all');
    setActiveId(bundle.ideas[0]!.id);
  }, [bundle.stageKey, childId, bundle.ideas]);

  // Hydrate today's played checkmarks from localStorage
  React.useEffect(() => {
    setPlayedToday({});
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setPlayedToday(parsed as Record<string, boolean>);
        }
      }
    } catch {
      // Ignore storage access restrictions
    }
  }, [storageKey]);

  if (!eligible) {
    return null;
  }

  const displayName = formatChildName(childName);
  const filteredIdeas =
    filter === 'all'
      ? bundle.ideas
      : bundle.ideas.filter((idea) => idea.tags.includes(filter));
  const safePool = filteredIdeas.length > 0 ? filteredIdeas : bundle.ideas;
  const activeIdea = safePool.find((idea) => idea.id === activeId) ?? safePool[0]!;
  const companionIdeas = bundle.ideas
    .filter((idea) => idea.id !== activeIdea.id)
    .slice(0, 3);
  const isPlayed = Boolean(playedToday[activeIdea.id]);

  const handleShuffle = () => {
    const idx = safePool.findIndex((idea) => idea.id === activeIdea.id);
    const next = safePool[(idx + 1) % safePool.length] ?? safePool[0]!;
    setActiveId(next.id);
  };

  const handleTogglePlayed = () => {
    setPlayedToday((prev) => {
      const next = { ...prev, [activeIdea.id]: !prev[activeIdea.id] };
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // Ignore storage restrictions
        }
      }
      return next;
    });
  };

  return (
    <section
      id="play-this-week"
      aria-labelledby="play-this-week-heading"
      data-testid="play-this-week-band"
      className={cn(
        'scroll-mt-24 border-t border-[#131715]/10 pt-9 sm:pt-10',
        className
      )}
    >
      {/* Band Header + Quiet Mood Filters */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2
            id="play-this-week-heading"
            className="font-serif text-[23px] sm:text-[27px] font-normal tracking-[-0.02em] text-[#131715]"
          >
            Play this week
          </h2>
          <p className="mt-0.5 text-[13.5px] text-[#59625D]">
            Zero-prep screen-free play for {displayName} · {bundle.stageLabel} ({bundle.ageRangeLabel}).
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter screen-free play ideas"
          className="flex flex-wrap items-center gap-1.5"
        >
          {FILTER_OPTIONS.map((opt) => {
            const isSelected = filter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setFilter(opt.id)}
                className={cn(
                  'min-h-[36px] rounded-full px-3.5 text-[12.5px] font-semibold border transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-[#143D2B] border-[#143D2B] text-white'
                    : 'bg-white border-[#131715]/14 text-[#494F4C] hover:border-[#143D2B] hover:text-[#143D2B]'
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Featured Screen-Free Activity Card */}
      <article
        data-testid={`play-spotlight-${activeIdea.id}`}
        className="rounded-[14px] border border-[#131715]/10 bg-white p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-7 lg:gap-10 items-stretch">
          {/* Left: 3-Step How-To + Actions */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <span className="block font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#B45309]">
                {activeIdea.meta}
              </span>
              <h3 className="font-serif text-[26px] sm:text-[30px] font-normal leading-[1.16] tracking-[-0.015em] text-[#131715] mt-2">
                {activeIdea.title}
              </h3>

              <ol className="mt-4 space-y-2.5">
                {activeIdea.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-baseline gap-3 text-[14px] leading-[1.5] text-[#2A312D]"
                  >
                    <span className="font-mono text-[11px] font-bold text-[#143D2B] w-4 shrink-0 tabular-nums">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                data-testid="play-shuffle-btn"
                onClick={handleShuffle}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-[#143D2B] hover:bg-[#0E2B1E] text-white text-[13.5px] font-semibold transition-colors cursor-pointer"
              >
                <span>Shuffle another idea</span>
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                data-testid="play-done-btn"
                aria-pressed={isPlayed}
                onClick={handleTogglePlayed}
                className={cn(
                  'inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-full border text-[13px] font-semibold transition-colors cursor-pointer',
                  isPlayed
                    ? 'bg-[#EAF3EE] border-[#143D2B] text-[#143D2B]'
                    : 'bg-white border-[#131715]/16 text-[#131715] hover:border-[#143D2B] hover:text-[#143D2B]'
                )}
              >
                {isPlayed ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Played today</span>
                  </>
                ) : (
                  <span>Mark played today</span>
                )}
              </button>
            </div>
          </div>

          {/* Right: Warm Parchment Materials + Why It Helps */}
          <div className="rounded-[12px] bg-[#FAF8F3] p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div>
              <span className="block font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#143D2B]">
                What you need (already at home)
              </span>
              <ul className="mt-3 flex flex-wrap gap-2">
                {activeIdea.materials.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white border border-[#E6E2D8] px-3 py-1 text-[12.5px] font-medium text-[#2A312D]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#E6E2D8] pt-4">
              <span className="block font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#B45309] mb-1.5">
                Why it helps {displayName}
              </span>
              <p className="text-[13.5px] leading-[1.55] text-[#494F4C]">
                {activeIdea.why}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* 3 Quick Swap Cards Below */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {companionIdeas.map((idea) => (
          <button
            key={idea.id}
            type="button"
            onClick={() => setActiveId(idea.id)}
            className="text-left rounded-[12px] border border-[#131715]/10 bg-white hover:border-[#143D2B]/40 p-4 sm:p-5 flex flex-col justify-between gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B]"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[#6C7570]">
              {idea.meta}
            </span>
            <span className="font-serif text-[18px] font-normal leading-[1.25] text-[#131715]">
              {idea.title}
            </span>
            <span className="text-[12.5px] leading-[1.45] text-[#59625D]">
              {idea.summary}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
