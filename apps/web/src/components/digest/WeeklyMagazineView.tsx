'use client';

import * as React from 'react';
import {
  BookOpen,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  Quote,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import { cn } from '@/lib/utils';

export interface MagazineArticle {
  id: string;
  isLead: boolean;
  title: string;
  category: string;
  readTime: string;
  byline: string;
  summary: string;
  content: string[];
  takeaway: string;
}

export const MAGAZINE_ARTICLES_BY_STAGE: Record<
  'INFANT' | 'ELEMENTARY' | 'ADOLESCENT',
  MagazineArticle[]
> = {
  ADOLESCENT: [
    {
      id: 'j-blog-1',
      isLead: true,
      category: 'Adolescent Neurobiology',
      title: 'The Algorithmic Rage-Bait Trap: Why Teen Feeds Push Controversy in 2026',
      readTime: '5 min read',
      byline: 'By Dr. Aris Thorne · Adolescent Neurobiology',
      summary:
        'Short-form video algorithms have shifted from showing silly dance trends to optimizing for high-arousal negative emotion. How 14-year-old brains process conflict, and how to build immunity without taking the phone away.',
      content: [
        'Over the past 18 months, algorithmic recommendation engines on major platforms have subtly re-indexed their engagement metrics. The content that keeps a 14-year-old boy scrolling past 10:00 PM is no longer dance videos or harmless gameplay clips; it is moral outrage, conflict sparring, and ideological rage-bait.',
        'Adolescent brain architecture makes teenagers uniquely vulnerable to this mechanic. The amygdala is in a state of hyper-reactivity, while the prefrontal cortex—which governs impulse suppression and perspective-taking—remains under construction until age 25.',
        'Instead of criticizing what Julian watches, invite metacognition: "Do you ever notice how an app serves you a video that makes you instantly angry within 10 seconds? That\'s deliberate engineering." When teenagers realize they are being manipulated by Silicon Valley engineers, their natural desire for autonomy kicks in.',
      ],
      takeaway:
        'Help your teen view outrage feeds as corporate manipulation rather than personal entertainment.',
    },
    {
      id: 'j-blog-2',
      isLead: false,
      category: 'Family Communication',
      title: "The Death of the 'How Was School?' Question",
      readTime: '3 min read',
      byline: 'By Elena Rostova · Family Communication',
      summary:
        'Why generic inquiries trigger immediate monosyllabic shutdowns, and three low-stakes conversational alternatives that actually work.',
      content: [
        'When an adolescent walks through the door after seven hours of social surveillance and academic evaluation, their cognitive tank is empty. Asking "How was your day?" demands an executive summary they cannot provide.',
        'Try the "Side-by-Side Zero Eye Contact" method: talk while driving or while preparing food. Ask: "Who had the funniest take in English today?" or "Did anything unexpectedly weird happen?"',
      ],
      takeaway:
        'Eliminate interrogation-style inquiries; replace with parallel activity observation.',
    },
    {
      id: 'j-blog-3',
      isLead: false,
      category: 'Sleep Science',
      title: 'Late-Night Discord & Sleep Architecture',
      readTime: '4 min read',
      byline: 'By Dr. Marcus Vance · Pediatric Sleep Medicine',
      summary:
        'Why the 8:30 PM device dock curfew preserves REM cycles without causing FOMO panic in 9th graders.',
      content: [
        'Sleep during adolescence is when neural pruning and memory consolidation occur. When blue light and alert notifications interrupt sleep cycles, daytime emotional volatility spikes by 40%.',
        'Alongside\'s automated device profile curfew removes the parent from the role of enforcer: the device locks neutrally at 8:30 PM, making boundary adherence non-negotiable and stress-free.',
      ],
      takeaway:
        'Automated neutral enforcement preserves both family harmony and deep restorative sleep.',
    },
  ],
  ELEMENTARY: [
    {
      id: 'm-blog-1',
      isLead: true,
      category: 'Child Psychology',
      title:
        'The Blacktop Barter Market: How 3rd Grade Playground Trades Teach Real Ethics',
      readTime: '4 min read',
      byline: 'By Dr. Claire Moreau · Child Developmental Psychology',
      summary:
        "Trading Pokemon cards, scented erasers, and hair clips is your child's first independent economic system. What to do when a trade goes sour.",
      content: [
        'Every elementary school blacktop operates an unregulated barter economy. Between the jungle gym and the four-square court, 8-year-olds negotiate trades involving holographic cards, mini plushies, and mechanical pencils.',
        'Jean Piaget identified age 8 as the transition into "concrete operational thinking." Children are intensely preoccupied with fairness, equity, and rules. However, their perspective-taking is still developing; what feels like a "fair swap" during recess can trigger tears on the bus ride home.',
        'When Maya comes home upset about an uneven trade, resist the urge to email the teacher immediately. Instead, coach her: "What made you agree in the moment? Next time, let\'s practice taking a 24-hour pause before finalizing a big trade."',
      ],
      takeaway:
        'Use playground trades as a real-world sandbox to practice negotiation and assertiveness.',
    },
    {
      id: 'm-blog-2',
      isLead: false,
      category: 'Digital Play',
      title: "Minecraft Bedrock: The Ethics of 'Griefing'",
      readTime: '3 min read',
      byline: 'By Daniel Hayes · Digital Play Educator',
      summary:
        'Why destroying digital blocks feels like physical vandalism to an 8-year-old child.',
      content: [
        'To an adult, a Minecraft house is a temporary arrangement of digital pixels. To an 8-year-old who spent three hours mining cobble, it is personal architecture.',
        'Establish clear family server rules: no pouring lava, no breaking chests, and always ask permission before renovating shared spaces.',
      ],
      takeaway: 'Respect digital creation as authentic emotional labor.',
    },
    {
      id: 'm-blog-3',
      isLead: false,
      category: 'Developmental Health',
      title: 'The Pre-Device Sanctuary Advantage',
      readTime: '4 min read',
      byline: 'By Dr. Aris Thorne · Developmental Science',
      summary:
        'Why keeping Maya on Road 1 (Pre-Device) through grade school protects imaginative play and social resilience.',
      content: [
        'Children without smartphones develop richer real-world problem-solving skills and higher tolerance for boredom. They learn to navigate playground disagreements face-to-face.',
        'AlongSide celebrates the Pre-Device journey as a badge of developmental honor, not technological deprivation.',
      ],
      takeaway:
        'Road 1 provides the cognitive quiet necessary for deep childhood friendships to take root.',
    },
  ],
  INFANT: [
    {
      id: 'b-blog-1',
      isLead: true,
      category: 'Early Neurodevelopment',
      title:
        'The Science of Acoustic Nesting: Why Familiar Voices Settle the Infant Nervous System',
      readTime: '4 min read',
      byline: 'By Dr. Sophie Alverez · Pediatric Neurodevelopment',
      summary:
        'Before babies understand vocabulary, their autonomic nervous systems regulate through vocal tone, breath rhythm, and maternal/paternal pitch.',
      content: [
        'At 14 months, an infant\'s brain is adding more than 1 million neural connections per second. While parents often worry about "early educational enrichment" or sensory flashcards, neuroscience confirms that human voice cadence is the ultimate cognitive catalyst.',
        'Singing the same simple nursery melody (like "The Wheels on the Bus" or a calm bedtime lullaby) creates an auditory anchor. When Mateo hears that familiar contour, cortisol levels drop and oxytocin surges.',
        'At 14 months, Mateo is in AlongSide\'s Pre-Device Sanctuary. The American Academy of Pediatrics advises zero digital media exposure (excluding live video chat with family). Mateo does not need a tablet; he needs pots, wooden spoons, grass, and your responsive eyes.',
      ],
      takeaway:
        'Your voice and eye contact provide richer neurological wiring than any digital application.',
    },
    {
      id: 'b-blog-2',
      isLead: false,
      category: 'Speech & Language',
      title: "Pre-Verbal Phonemes: What 'Ah-Da' Really Means",
      readTime: '3 min read',
      byline: 'By Elena Rostova · Early Speech Pathologist',
      summary:
        'How referential pointing combined with repeated syllables marks the leap into symbolic thinking.',
      content: [
        'When Mateo points at the dog and vocalizes "Da!", he is performing referential triangulation. He isn\'t just seeing the dog; he is checking if YOU see the dog.',
        'Confirm the referent: "Yes! That is the dog, Cooper. He is wagging his tail." This bridges gesture into language.',
      ],
      takeaway:
        'Always acknowledge pointing gestures with immediate naming and shared eye gaze.',
    },
    {
      id: 'b-blog-3',
      isLead: false,
      category: 'Sensory Health',
      title: 'High-Chair Sensory Architecture',
      readTime: '3 min read',
      byline: 'By Dr. Claire Moreau · Sensory Integration',
      summary:
        'Why smearing pureed carrots on the tray is necessary tactile feedback for motor planning.',
      content: [
        'Messy eating is motor learning. Feeling squishy avocado textures between fingers integrates tactile processing before oral acceptance.',
        'Let Mateo squish, poke, and examine textures without rushing to wipe his hands every 30 seconds.',
      ],
      takeaway:
        'Tactile play during meals strengthens sensory processing and fine motor grip.',
    },
  ],
};

export function resolveMagazineStage(child: ChildDTO | null | undefined): 'INFANT' | 'ELEMENTARY' | 'ADOLESCENT' {
  if (!child) return 'ADOLESCENT';
  if (child.age <= 3) return 'INFANT';
  if (child.age <= 10) return 'ELEMENTARY';
  return 'ADOLESCENT';
}

export interface WeeklyMagazineViewProps {
  child?: ChildDTO | null;
  className?: string;
}

export function WeeklyMagazineView({ child, className }: WeeklyMagazineViewProps) {
  const stage = resolveMagazineStage(child);
  const articles = MAGAZINE_ARTICLES_BY_STAGE[stage];
  const leadArticle = articles.find((a) => a.isLead) || articles[0];
  const companionArticles = articles.filter((a) => a.id !== leadArticle?.id);

  const [activeArticle, setActiveArticle] = React.useState<MagazineArticle | null>(null);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveArticle(null);
    }
    if (activeArticle) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    return undefined;
  }, [activeArticle]);

  return (
    <section className={cn('space-y-5 max-w-7xl mx-auto', className)}>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E3DC] pb-3">
        <div className="space-y-0.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#143D2B] font-bold flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#143D2B]" />
            Pillar 2 · Weekly Magazine & Field Dispatches
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#111413]">
            This Week in Child Development
          </h2>
        </div>
        <span className="text-xs font-mono text-[#858C88]">
          3 Curated Essays for This Stage
        </span>
      </div>

      {/* Grid: Lead Story + 2 Companion Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lead Story (7 cols) */}
        {leadArticle && (
          <article className="lg:col-span-7 rounded-3xl border border-[#E3E3DC] bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#EAF3EE] text-[#143D2B] font-mono text-xs font-semibold">
                  Featured Lead Story · {leadArticle.category}
                </span>
                <span className="font-mono text-xs text-[#858C88] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {leadArticle.readTime}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#111413] leading-snug">
                {leadArticle.title}
              </h3>

              <p className="text-[#858C88] font-mono text-xs">
                {leadArticle.byline}
              </p>

              <p className="text-sm sm:text-base text-[#494F4C] leading-relaxed">
                {leadArticle.summary}
              </p>

              {/* Lead Takeaway Callout */}
              <div className="p-4 bg-[#F4F4F0] rounded-2xl border border-[#E3E3DC] space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold block">
                  Key Pediatric Takeaway
                </span>
                <p className="text-xs text-[#111413] font-medium leading-relaxed">
                  {leadArticle.takeaway}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveArticle(leadArticle)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143D2B] text-white font-mono text-xs font-semibold hover:bg-[#0E2A1E] transition"
              >
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        )}

        {/* 2 Companion Columns (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {companionArticles.map((article) => (
            <article
              key={article.id}
              className="flex-1 rounded-3xl border border-[#E3E3DC] bg-white p-6 flex flex-col justify-between space-y-3 shadow-xs hover:border-[#143D2B]/30 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#143D2B] font-semibold">
                    {article.category}
                  </span>
                  <span className="text-[#858C88]">{article.readTime}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#111413] leading-snug">
                  {article.title}
                </h4>
                <p className="text-xs text-[#494F4C] line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#E3E3DC]">
                <span className="text-[11px] text-[#858C88] font-mono truncate max-w-[180px]">
                  {article.byline}
                </span>
                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-xs font-mono text-[#143D2B] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-[#E3E3DC] shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E3E3DC] pb-4 gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold">
                  {activeArticle.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#111413] leading-snug">
                  {activeArticle.title}
                </h3>
                <span className="font-mono text-xs text-[#858C88] block">
                  {activeArticle.byline} · {activeArticle.readTime}
                </span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-[#858C88] hover:text-[#111413] p-1.5 rounded-md"
                aria-label="Close article"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-sm text-[#494F4C] leading-relaxed">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Pediatric Takeaway */}
            <div className="p-4 bg-[#F4F4F0] rounded-2xl border border-[#E3E3DC] space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#143D2B] font-bold block">
                Pediatric Key Takeaway
              </span>
              <p className="text-xs text-[#111413] font-medium leading-relaxed">
                {activeArticle.takeaway}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-[#143D2B] text-white font-mono text-xs font-semibold hover:bg-[#0E2A1E] transition"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
