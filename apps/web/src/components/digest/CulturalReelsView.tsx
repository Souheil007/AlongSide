'use client';

import * as React from 'react';
import {
  Play,
  X,
  Sparkles,
  Clock,
  Volume2,
  Check,
  ChevronRight,
  Film,
  Copy,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface ReelItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  gradient: string;
  category: string;
  caption: string;
  pediatricTitle: string;
  pediatricDesc: string;
  script: string;
}

export const CULTURAL_REELS_BY_STAGE: Record<'INFANT' | 'ELEMENTARY' | 'ADOLESCENT', ReelItem[]> = {
  ADOLESCENT: [
    {
      id: 'j-reel-1',
      title: "What is a 'Crashout' & Why Teens Fear It",
      duration: '0:45',
      views: '8.4k parents',
      gradient: 'from-purple-900 to-slate-900',
      category: 'Emotional Dynamics',
      caption: '"Bro had a complete crashout during 4th period..." It means an irreversible loss of emotional composure in front of peers.',
      pediatricTitle: 'Why Teens Dread Losing Composure',
      pediatricDesc:
        "At 14, peer status is neurologically felt as biological survival. A 'crashout' is devastating because it signals a breakdown in emotional armor. When Julian seems tense after school, don't interrogate him about grades; ask if the day felt loud or chaotic.",
      script:
        '"It sounds like people were on edge at school today. If you want to vent or just chill, I\'m around."',
    },
    {
      id: 'j-reel-2',
      title: 'Why Discord Voice Calls Last 4+ Hours',
      duration: '0:38',
      views: '12.1k parents',
      gradient: 'from-indigo-900 to-emerald-950',
      category: 'Digital Socializing',
      caption:
        '"They aren\'t actually gaming the whole time; they are just co-existing in a shared virtual room while doing homework."',
      pediatricTitle: 'Parallel Play in the Digital Age',
      pediatricDesc:
        'Teens use persistent voice channels the exact same way 90s kids sat on corded landline phones doing homework in comfortable silence. It provides connection without social performance pressure.',
      script:
        '"I notice you guys keep the call on while studying. I\'ll give you a 15-minute heads up before bedtime curfew."',
    },
    {
      id: 'j-reel-3',
      title: "The Silent Economy of 'Aura Points'",
      duration: '0:40',
      views: '15.3k parents',
      gradient: 'from-amber-900 to-slate-900',
      category: 'Peer Status',
      caption:
        '"Minus 1,000 aura for tripping in the hallway; plus 500 aura for fixing the teacher\'s projector calmly."',
      pediatricTitle: 'The Gamification of Social Standing',
      pediatricDesc:
        "'Aura' is humorous Gen-Z shorthand for charisma, unflappability, and social grace under pressure. Understanding this helps you recognize when teasing feels playful versus when it stings.",
      script:
        '"Handling that flat situation without losing your cool? That\'s at least plus 500 aura in my book."',
    },
  ],
  ELEMENTARY: [
    {
      id: 'm-reel-1',
      title: 'The Recess Pokemon Card Economy',
      duration: '0:42',
      views: '9.2k parents',
      gradient: 'from-emerald-900 to-slate-900',
      category: 'Schoolyard Barter',
      caption:
        '"You broke the pinky promise and traded my shiny Mewtwo!" Why 3rd-graders value cardboard over gold.',
      pediatricTitle: 'Concrete Operational Negotiation',
      pediatricDesc:
        "At 8 years old, children are learning the rules of contractual fairness. Trading cards isn't about the monetary value; it's an exercise in social trust, perceived reciprocity, and boundary-testing.",
      script:
        '"Tell me about the trade you made today. Did both of you walk away feeling like it was fair?"',
    },
    {
      id: 'm-reel-2',
      title: 'Roblox Obbies & Collaborative Ethics',
      duration: '0:36',
      views: '7.8k parents',
      gradient: 'from-teal-900 to-emerald-950',
      category: 'Gaming Dynamics',
      caption:
        '"Don\'t grief my build!" The unwritten moral code inside elementary sandbox worlds.',
      pediatricTitle: 'Digital Co-Op Morality',
      pediatricDesc:
        'When children build together in Roblox or Minecraft, destroyed blocks feel like real-world emotional betrayal. Treating their digital creations with respect builds deep sibling and friend empathy.',
      script:
        '"It sounds like someone broke the building rules you agreed on. How do you guys want to fix it?"',
    },
    {
      id: 'm-reel-3',
      title: 'Why Squishmallows Dominate 3rd Grade',
      duration: '0:39',
      views: '6.5k parents',
      gradient: 'from-pink-900 to-slate-900',
      category: 'Sensory Comfort',
      caption:
        '"They aren\'t just stuffed animals; they are tactile emotional anchors during long school days."',
      pediatricTitle: 'Tactile Emotional Regulation',
      pediatricDesc:
        'Grade school transitions are cognitively demanding. Soft tactile objects provide low-profile soothing during classroom focus periods.',
      script:
        '"Which Squishmallow did you keep in your backpack today for good luck?"',
    },
  ],
  INFANT: [
    {
      id: 'b-reel-1',
      title: "Why 'Ms. Rachel' Cadence Captivates Baby Brains",
      duration: '0:35',
      views: '18.2k parents',
      gradient: 'from-blue-900 to-slate-900',
      category: 'Acoustic Neurobiology',
      caption:
        '"Exaggerated facial phonemes and repetitive musical cadence light up infant language centers."',
      pediatricTitle: 'Parentese & Auditory Mapping',
      pediatricDesc:
        "Babies don't listen to words for semantic meaning; they listen to musical frequency contours. Speaking with higher pitch, elongated vowels, and exaggerated mouth shapes accelerates acoustic mapping in the temporal lobe.",
      script:
        '"When talking with Mateo, pause for 3 full seconds after saying a word to let his brain mirror the mouth shape."',
    },
    {
      id: 'b-reel-2',
      title: 'The High-Chair Gravity Experiment',
      duration: '0:40',
      views: '14.5k parents',
      gradient: 'from-emerald-900 to-teal-950',
      category: 'Cognitive Milestones',
      caption:
        '"He dropped the spoon 12 times in a row. He\'s not defying you; he\'s running a laboratory physics test."',
      pediatricTitle: 'Object Permanence & Cause-and-Effect',
      pediatricDesc:
        "At 14 months, dropping food or utensils is empirical science: 'Does the spoon cease to exist when it leaves my visual field? Does mom make the same predictable acoustic response every time?'",
      script:
        '"Hand the spoon back calmly twice with a smile, then calmly place the bowl on the counter: \'All done dropping for now!\'"',
    },
    {
      id: 'b-reel-3',
      title: 'Mirror Neurons & Repetitive Babble Loops',
      duration: '0:38',
      views: '11.7k parents',
      gradient: 'from-amber-900 to-slate-900',
      category: 'Sensory Attunement',
      caption:
        '"When he says \'Ba-ba\', say \'Ba-ba\' right back. That simple echo builds his social empathy circuitry."',
      pediatricTitle: 'Conversational Serve-and-Return',
      pediatricDesc:
        'Harvard Center on the Developing Child shows that serve-and-return vocal interactions literally build neural architecture. Mimicking his sounds teaches him that communication is bidirectional.',
      script:
        '"Look right into his eyes and mimic his exact pitch. Watch his eyes light up as he realizes you\'re in sync."',
    },
  ],
};

export function resolveReelsStage(child: ChildDTO | null | undefined): 'INFANT' | 'ELEMENTARY' | 'ADOLESCENT' {
  if (!child) return 'ADOLESCENT';
  if (child.age <= 3) return 'INFANT';
  if (child.age <= 10) return 'ELEMENTARY';
  return 'ADOLESCENT';
}

export interface CulturalReelsViewProps {
  child?: ChildDTO | null;
  className?: string;
}

export function CulturalReelsView({ child, className }: CulturalReelsViewProps) {
  const stage = resolveReelsStage(child);
  const reels = CULTURAL_REELS_BY_STAGE[stage];
  const [activeReel, setActiveReel] = React.useState<ReelItem | null>(null);
  const [copiedScript, setCopiedScript] = React.useState(false);

  // Close modal on Escape
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveReel(null);
    }
    if (activeReel) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    return undefined;
  }, [activeReel]);

  const handleCopyScript = (scriptText: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(scriptText);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  return (
    <section className={cn('space-y-4 max-w-7xl mx-auto', className)}>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E3DC] pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#143D2B] font-bold flex items-center gap-1.5">
              <Film className="w-4 h-4 text-[#143D2B]" />
              Pillar 1 · 45-Second Parent Reels
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#EAF3EE] text-[#143D2B] text-[10px] font-mono font-medium">
              Interactive Video Briefings
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#111413]">
            Bite-Sized Cultural Briefings
          </h2>
        </div>
        <p className="text-xs text-[#858C88] font-mono">
          Click any reel card to play briefing with pediatric audio takeaway
        </p>
      </div>

      {/* Reels Grid (3 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reels.map((reel) => (
          <div
            key={reel.id}
            onClick={() => setActiveReel(reel)}
            className="group rounded-2xl border border-[#E3E3DC] bg-white overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#143D2B]/40"
          >
            {/* Video Thumbnail Simulation */}
            <div
              className={cn(
                'h-48 bg-gradient-to-br p-4 flex flex-col justify-between text-white relative overflow-hidden',
                reel.gradient
              )}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-mono tracking-wider uppercase backdrop-blur border border-white/10">
                  {reel.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono backdrop-blur">
                  {reel.duration}
                </span>
              </div>

              {/* Central Play Icon with Pulse */}
              <div className="self-center z-10 w-12 h-12 rounded-full bg-white/20 group-hover:bg-white/30 border border-white/30 flex items-center justify-center backdrop-blur transition transform group-hover:scale-110">
                <Play className="w-5 h-5 text-white fill-current translate-x-0.5" />
              </div>

              <div className="z-10 bg-black/40 p-2 rounded-lg backdrop-blur border border-white/10">
                <p className="text-[11px] text-white/90 italic truncate">{reel.caption}</p>
              </div>
            </div>

            {/* Reel Card Footer */}
            <div className="p-4 space-y-1.5">
              <h4 className="font-serif text-base font-bold text-[#111413] group-hover:text-[#143D2B] transition leading-snug">
                {reel.title}
              </h4>
              <div className="flex items-center justify-between text-[11px] text-[#858C88] font-mono pt-1">
                <span>{reel.views}</span>
                <span className="text-[#143D2B] font-semibold flex items-center gap-1">
                  <span>Play Reel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Reel Modal Player */}
      {activeReel && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden border border-[#E3E3DC] shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Reel Simulation Frame */}
            <div
              className={cn(
                'w-full md:w-1/2 bg-gradient-to-br p-6 flex flex-col justify-between text-white relative min-h-[360px]',
                activeReel.gradient
              )}
            >
              {/* Animated Progress Bar */}
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full animate-[pulse_2s_ease-in-out_infinite] w-3/4 rounded-full" />
              </div>

              {/* Video Central Stage */}
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-6">
                <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur">
                  <Play className="w-8 h-8 text-white fill-current translate-x-0.5" />
                </div>
                <span className="font-mono text-xs text-white/70 tracking-widest uppercase">
                  Reel · {activeReel.duration}
                </span>
                <h3 className="font-serif text-xl font-bold text-white max-w-xs">
                  {activeReel.title}
                </h3>
              </div>

              {/* Live Caption Box */}
              <div className="bg-black/40 backdrop-blur p-3 rounded-xl border border-white/10 space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#EAF3EE] font-bold">
                  Live Audio Caption
                </span>
                <p className="text-xs text-white/90 leading-snug italic">
                  {activeReel.caption}
                </p>
              </div>
            </div>

            {/* Right Reel Pediatric Takeaway & Script */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-white space-y-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
                    Pediatric Breakdown
                  </span>
                  <button
                    onClick={() => setActiveReel(null)}
                    className="text-[#858C88] hover:text-[#111413] p-1 rounded-md"
                    aria-label="Close reel player"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#111413]">
                  {activeReel.pediatricTitle}
                </h4>
                <p className="text-xs text-[#494F4C] leading-relaxed">
                  {activeReel.pediatricDesc}
                </p>

                {/* Parent Calm Response Script with Copy */}
                <div className="p-3 bg-[#EAF3EE] rounded-xl border border-[#143D2B]/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold block">
                      Parent Calm Response Script
                    </span>
                    <button
                      onClick={() => handleCopyScript(activeReel.script)}
                      className="text-[10px] font-mono text-[#143D2B] hover:underline flex items-center gap-1"
                    >
                      {copiedScript ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#143D2B] font-medium italic">
                    {activeReel.script}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3E3DC] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#858C88]">
                  AlongSide Reels
                </span>
                <button
                  onClick={() => setActiveReel(null)}
                  className="px-4 py-2 rounded-xl bg-[#143D2B] text-white font-mono text-xs font-semibold hover:bg-[#0E2A1E] transition"
                >
                  Done Watching
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
