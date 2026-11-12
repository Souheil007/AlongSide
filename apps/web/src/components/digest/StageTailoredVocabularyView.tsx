'use client';

import * as React from 'react';
import {
  MessageSquare,
  Search,
  Check,
  Copy,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DevelopmentalTier, type ChildDTO } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface VocabularyTerm {
  word: string;
  phonetic: string;
  type: string;
  definition: string;
  example: string;
  parentResponse: string;
}

export interface StageVocabularyConfig {
  eligibleForSlang: boolean;
  category: string;
  bannerNotice?: string;
  terms: VocabularyTerm[];
}

export const STAGE_VOCABULARY_DATA: Record<
  'INFANT' | 'TODDLER' | 'ELEMENTARY' | 'ADOLESCENT',
  StageVocabularyConfig
> = {
  ADOLESCENT: {
    eligibleForSlang: true,
    category: 'Adolescent Peer Vernacular',
    terms: [
      {
        word: 'Crashout',
        phonetic: '/ kræʃ · aʊt /',
        type: 'Verb / Noun',
        definition:
          'An explosive, reckless reaction to provocation where someone sacrifices their status or consequences in front of peers.',
        example:
          '"He lost his temper over a dropped pencil and had a total crashout in history class."',
        parentResponse:
          '"Sounds like things got heated fast. Did he end up cooling down afterwards?"',
      },
      {
        word: 'Aura Points',
        phonetic: '/ ˈɔː · rə · pɔɪnts /',
        type: 'Noun Phrase',
        definition:
          'An imaginary social scorecard measuring cool composure, confidence, and effortless grace under pressure.',
        example:
          '"Stumbling on the stairs is minus 500 aura; helping the custodian carry chairs is plus 1,000 aura."',
        parentResponse:
          '"Maintaining your calm during that difficult moment was definitely high aura in my book."',
      },
      {
        word: 'Cooked',
        phonetic: '/ kʊkt /',
        type: 'Adjective',
        definition:
          'Exhausted, in deep trouble, or having zero chance of recovery on a test or difficult situation.',
        example:
          '"I didn\'t study for the chemistry mid-term; I am completely cooked."',
        parentResponse:
          '"If you\'re feeling cooked, let\'s take a 10-minute break and tackle the review sheet together."',
      },
      {
        word: 'Locked In',
        phonetic: '/ lɑːkt · ɪn /',
        type: 'Verb Phrase',
        definition:
          'In a state of hyper-focus, total dedication, and zero distraction.',
        example:
          '"He put his headphones on, shut off Discord, and was fully locked in on that essay."',
        parentResponse:
          '"I see you locked in on that project. I\'ll make sure the house stays quiet for you."',
      },
      {
        word: 'Rizz',
        phonetic: '/ rɪz /',
        type: 'Noun (from Charisma)',
        definition:
          'The ability to effortlessly charm, engage, or connect with people through smooth conversation and authentic confidence.',
        example:
          '"He gave an impromptu speech during student council and had unspoken rizz."',
        parentResponse:
          '"Real charisma isn\'t about pickup lines; it\'s being a thoughtful listener who makes others feel heard."',
      },
      {
        word: 'Mewing',
        phonetic: '/ ˈmjuː · ɪŋ /',
        type: 'Verb / Non-verbal Meme',
        definition:
          'Pressing the tongue against the roof of the mouth to define the jawline; often paired with putting a finger to the lips to humorously silence someone.',
        example:
          '"He couldn\'t answer the teacher\'s question because he was mid-mewing streak."',
        parentResponse:
          '"I see the jawline commitment! But let\'s save the silent treatment for TikTok, not our dinner table."',
      },
      {
        word: 'Sigma',
        phonetic: '/ ˈsɪɡ · mə /',
        type: 'Noun / Persona',
        definition:
          'A self-reliant, lone-wolf archetype who does not conform to peer social hierarchies. Often used with playful sarcasm.',
        example:
          '"He turned down the crowded party to finish his robotics code—true sigma focus."',
        parentResponse:
          '"Being comfortable in your own lane without needing crowd approval is a real superpower."',
      },
      {
        word: 'Delulu',
        phonetic: '/ də · ˈluː · luː /',
        type: 'Adjective (from Delusional)',
        definition:
          'Holding unrealistically optimistic beliefs or romantic hopes; embraced with humorous self-awareness.',
        example:
          '"Thinking I can write a 5-page history paper in 45 minutes is completely delulu."',
        parentResponse:
          '"A little optimistic confidence is great, but let\'s build a realistic plan before bedtime."',
      },
      {
        word: 'Side Eye',
        phonetic: '/ saɪd · aɪ /',
        type: 'Noun / Non-verbal Gesture',
        definition:
          'A skeptical, judgmental sidelong glance expressing silent disbelief, suspicion, or second-hand embarrassment.',
        example:
          '"She gave him the bombastic side eye when he claimed he ran a 5-minute mile."',
        parentResponse:
          '"I caught that look! What did you disagree with there?"',
      },
      {
        word: 'Main Character',
        phonetic: '/ meɪn · ˈkær · ɪk · tər /',
        type: 'Noun Phrase',
        definition:
          'Acting as if the world revolves around one\'s own dramatic narrative; can be positive (self-confidence) or negative (self-absorbed).',
        example:
          '"Walking through the school hallway in slow motion with headphones on is main character energy."',
        parentResponse:
          '"You are the author of your own story! Just remember everyone else has their own story too."',
      },
      {
        word: 'Rent Free',
        phonetic: '/ rent · friː /',
        type: 'Idiom',
        definition:
          'Obsessing over a slight, person, or argument that keeps occupying thoughts without any productive outcome.',
        example:
          '"That comment from gym class last Tuesday is still living in my head rent free."',
        parentResponse:
          '"When something is living rent free in your mind, writing it down or letting it go evicts it."',
      },
      {
        word: 'Valid',
        phonetic: '/ ˈvæl · ɪd /',
        type: 'Adjective',
        definition:
          'Legitimate, reasonable, or fully justified; used to acknowledge someone\'s emotional reaction or choice.',
        example:
          '"Canceling plans because you were up late studying for biology is completely valid."',
        parentResponse:
          '"Your feeling is completely valid. Let\'s figure out what we can do next."',
      },
    ],
  },
  ELEMENTARY: {
    eligibleForSlang: true,
    category: 'Elementary Recess & Gaming Vernacular',
    terms: [
      {
        word: 'Griefing',
        phonetic: '/ ˈɡriː · fɪŋ /',
        type: 'Verb',
        definition:
          "Deliberately sabotaging someone else's digital build, creative world, or game progress.",
        example:
          '"He came into our Minecraft village and started griefing our flower garden!"',
        parentResponse:
          '"That feels really unfair when you worked hard on it. Let\'s make sure the world has saving backups."',
      },
      {
        word: 'No Backsies',
        phonetic: '/ noʊ · ˈbæk · siz /',
        type: 'Phrase / Recess Law',
        definition:
          'The unwritten recess law that once a physical card or toy trade is executed, it cannot be reversed.',
        example:
          '"We shook hands on the holographic Pikachu—no backsies!"',
        parentResponse:
          '"Even with \'no backsies,\' if someone felt pressured, good friends check in to make it right."',
      },
      {
        word: 'Duping',
        phonetic: '/ ˈdjuː · pɪŋ /',
        type: 'Verb',
        definition:
          'Using a game glitch to duplicate rare items or tricks; also used when someone pulls an unfair trick.',
        example:
          '"She said she had two Mewtwos because of duping in the game."',
        parentResponse:
          '"Do you think getting items through shortcuts is as fun as earning them?"',
      },
      {
        word: 'Bruh / Oof',
        phonetic: '/ brʌ / uːf /',
        type: 'Exclamation',
        definition:
          'Universal vocal reaction to an awkward mistake, clumsy fall, or mild disappointment.',
        example:
          '"I dropped my pencil case right as the bell rang... big oof."',
        parentResponse:
          '"Oof indeed! Did everything survive the fall?"',
      },
      {
        word: 'Nerfed / Buffed',
        phonetic: '/ nɜːft / bʌft /',
        type: 'Adjective / Game Balancing',
        definition:
          'When an update weakens an overpowered weapon/character (nerfed), or strengthens an underperforming one (buffed). Also used playfully when bedtime rules change.',
        example:
          '"Roblox nerfed the hoverboard speed, but my weekend playtime just got buffed."',
        parentResponse:
          '"Sounds like the game makers wanted to keep matches fair. Do you agree with the nerf?"',
      },
      {
        word: 'Spawn Camping',
        phonetic: '/ spɔːn · ˈkæm · pɪŋ /',
        type: 'Verb / Gaming Tactic',
        definition:
          'Waiting at the exact physical spot where defeated players respawn to eliminate them before they can react. Considered poor sportsmanship.',
        example:
          '"Stop spawn camping the portal! Let me at least equip my shield!"',
        parentResponse:
          '"That feels really cheap when you don\'t even get a fair chance to step out. Good sportsmanship gives people room to play."',
      },
      {
        word: 'NPC',
        phonetic: '/ ˌen · piː · ˈsiː /',
        type: 'Noun (Non-Playable Character)',
        definition:
          'Originally video game background characters with scripted lines. Used playfully to describe someone acting robotic or without independent thought.',
        example:
          '"Look at the crossing guard waiting with both hands raised, total NPC behavior."',
        parentResponse:
          '"Predictable routines are what keep school crossings safe! Everyone has their own deep inner world."',
      },
      {
        word: 'Clutched / Clutch',
        phonetic: '/ klʌtʃt /',
        type: 'Verb / Adjective',
        definition:
          'Pulling off an unexpected victory or crucial save right when defeat seemed certain, especially under high game pressure.',
        example:
          '"Maya clutched the final 1v3 round on Bedwars with only 5 health left!"',
        parentResponse:
          '"Staying calm when the pressure was high took serious focus. How did you manage that adrenaline?"',
      },
      {
        word: 'Sus',
        phonetic: '/ sʌs /',
        type: 'Adjective (from Suspicious)',
        definition:
          'Suspicious, questionable, or untrustworthy behavior hinting that someone is hiding a secret or pulling a prank.',
        example:
          '"Why are you hiding that tablet behind the sofa cushion? That\'s mad sus."',
        parentResponse:
          '"If something feels \'sus\' or off, trusting your gut feeling is always a smart reflex."',
      },
      {
        word: 'Cap / No Cap',
        phonetic: '/ kæp / noʊ · kæp /',
        type: 'Noun / Slang Rule',
        definition:
          '\'Cap\' means a lie or exaggeration; \'No cap\' means absolute truth, no exaggeration or false bragging.',
        example:
          '"I got 100 on the spelling bee without studying, no cap!"',
        parentResponse:
          '"No cap? That\'s awesome! Honesty builds way more trust than trying to sound cool."',
      },
      {
        word: 'Jinx',
        phonetic: '/ dʒɪŋks /',
        type: 'Recess Law / Game',
        definition:
          'When two people say the same word simultaneously; the first to say \'Jinx!\' binds the other to silence until their name is spoken.',
        example:
          '"Jinx! You owe me a soda! You can\'t speak until someone says your name!"',
        parentResponse:
          '"Recess games are fun, but remember classroom rules come first—you can always answer your teacher."',
      },
      {
        word: 'Tryhard',
        phonetic: '/ ˈtraɪ · hɑːrd /',
        type: 'Noun',
        definition:
          'Someone putting excessive, overly serious effort into a casual playground game where everyone else was just trying to relax.',
        example:
          '"He brought specialized soccer cleats to recess kickball, what a tryhard."',
        parentResponse:
          '"Sometimes people care a lot about doing their best. As long as they play fair, passion is fine."',
      },
    ],
  },
  INFANT: {
    eligibleForSlang: false,
    category: 'Infant Acoustic Signals (0–12m) & Pre-Verbal Cues',
    bannerNotice:
      'Youth internet slang is not applicable to an infant. AlongSide conditionally presents this Stage-Appropriate Pre-Verbal Signal Decoder.',
    terms: [
      {
        word: 'Referential Pointing',
        phonetic: '[ Extended index finger + eye gaze ]',
        type: 'Social Milestone',
        definition:
          'Pointing at an object while looking back at your eyes to verify shared attention and mutual discovery.',
        example:
          'Baby points at the mobile or window and makes an excited "Ooo!" sound until you look up.',
        parentResponse:
          '"Yes, look at the big fan spinning around! (Validates their perceptual discovery)."',
      },
      {
        word: 'Lip Trills / Raspberries',
        phonetic: '[ Pbbbbbt sound with tongue ]',
        type: 'Motor Milestone',
        definition:
          'Vibrating lips to experiment with air pressure, oral-motor control, and acoustic echo.',
        example:
          'Blowing raspberries into high-chair tray or onto your shoulder during burping.',
        parentResponse:
          '"Blow a raspberry right back with a giggle! It reinforces motor vocal play."',
      },
      {
        word: "Repetitive Syllable Echo ('Ba-Ba')",
        phonetic: '/ bɑː · bɑː /',
        type: 'Phonetic Milestone',
        definition:
          'Canonical babbling practicing bilabial consonants (B, M, P) before true first words emerge.',
        example:
          'Sitting on the rug repeating "Ba-ba-ba" while holding a soft toy.',
        parentResponse:
          '"Ba-ba! Are you holding your blue ball? That is a blue ball!"',
      },
      {
        word: "Dunstan Acoustic Reflex ('Neh' / Sucking)",
        phonetic: '[ Tongue pressing palate during pre-cry ]',
        type: 'Acoustic Signal',
        definition:
          'The pre-cry acoustic signal triggered by the physiological sucking reflex signaling hunger before frantic meltdowns.',
        example:
          'Baby rhythmically vocalizes "Neh... neh..." while turning head and rooting.',
        parentResponse:
          '"I hear your hunger sound. Let\'s get your milk ready right now."',
      },
      {
        word: 'Canonical Babbling Chains',
        phonetic: '/ da-da-da / ma-ma-ma /',
        type: 'Vocal Rhythm',
        definition:
          'Rhythmic syllable chains practicing vocal cord tension and auditory feedback loops.',
        example:
          'Lying on the activity mat having an animated vocal conversation with the ceiling fan.',
        parentResponse:
          '"Listen to those stories! Tell me more about what you see up there."',
      },
      {
        word: 'Social Smile Attunement',
        phonetic: '[ Reciprocal facial mirroring ]',
        type: 'Vagal Nerve Engagement',
        definition:
          'Voluntary reciprocal smiles in response to caregiver eye contact and vocal inflection, distinct from neonatal sleep smiles.',
        example:
          'Baby lights up with a full gummy grin when you lean in and say good morning.',
        parentResponse:
          '"Return the smile warmly with a gentle touch. This builds vagal safety foundations."',
      },
      {
        word: 'Object Permanence Search',
        phonetic: '[ Persistent gaze under blanket ]',
        type: 'Cognitive Leap',
        definition:
          'Actively lifting a cloth to find a toy that disappeared, recognizing things exist even when out of view.',
        example:
          'Reaching under the swaddle blanket to retrieve the dropped teething ring.',
        parentResponse:
          '"You found it! You knew it was still hiding right under that blanket!"',
      },
      {
        word: 'Cooing & Vowel Melodies',
        phonetic: '/ uː · aː /',
        type: 'Glottal Vocalization',
        definition:
          'Soft, melodic open vowel sounds produced during periods of calm, content wakefulness.',
        example:
          'Making gentle "Oooo... aaaa..." sounds after a warm feed and burp.',
        parentResponse:
          '"Echo the vowel sounds back softly. This is baby\'s very first conversation."',
      },
    ],
  },
  TODDLER: {
    eligibleForSlang: false,
    category: 'Toddler First-Word Explosion (12–36m) & Autonomy Gestures',
    bannerNotice:
      'Youth internet slang is not applicable to a toddler. AlongSide presents this Toddler Language Explosion & Autonomy Decoder.',
    terms: [
      {
        word: "Declarative 'No!' ('Mine!')",
        phonetic: '/ noʊ / maɪn /',
        type: 'Autonomy Gesture',
        definition:
          'Frontal-limbic autonomy surge practicing individuation, self-identity, and personal agency.',
        example:
          'Toddler shakes their head and shouts "No coat!" while running across the hallway.',
        parentResponse:
          '"You want to choose your clothes yourself! Would you like the blue jacket or the red sweater?"',
      },
      {
        word: "Protoword Jargon ('Wawa')",
        phonetic: '/ wɑː · wɑː /',
        type: 'Expressive Milestone',
        definition:
          'Consistent phonetic approximation invented by toddler to represent a specific object or desire.',
        example:
          'Points to the kitchen sink and repeatedly says "Wawa!".',
        parentResponse:
          '"Water! You are thirsty and would like a cool cup of water."',
      },
      {
        word: "Two-Word Combinations ('More Up')",
        phonetic: '[ Telegraphic Speech ]',
        type: 'Syntactic Emergence',
        definition:
          'Linking two semantic concepts without syntax to express desire or observation.',
        example:
          'Reaches both arms up and says "More up, dada!".',
        parentResponse:
          '"Up you go! Big lift all the way to the sky!"',
      },
      {
        word: 'Referential Pointing & Gaze Check',
        phonetic: '[ Pointing + eye contact confirmation ]',
        type: 'Joint Attention',
        definition:
          'Extended index finger accompanied by eye checking to share discoveries with caregiver.',
        example:
          'Mateo points at the garbage truck and looks back to confirm you are watching together.',
        parentResponse:
          '"Look at that big green truck lifting the bin! So loud and strong!"',
      },
      {
        word: 'Parallel Play Vocalizations',
        phonetic: '[ Side-by-side monologue ]',
        type: 'Social Milestone',
        definition:
          'Narrating vehicle sounds or animal noises alongside another child without direct conversational turn-taking.',
        example:
          'Driving toy cars next to a peer while both say "Vroom vroom!" independently.',
        parentResponse:
          '"You two are both driving fast fire engines! Great building together."',
      },
      {
        word: 'Echolalia Bridge',
        phonetic: '[ Immediate phrase echo ]',
        type: 'Auditory Processing',
        definition:
          'Repeating the final word or phrase of an adult sentence to process its semantic meaning.',
        example:
          'Parent says "Time for shoes!" and toddler immediately echoes "Shoes... shoes!".',
        parentResponse:
          '"Yes, your red sneakers! Let\'s slip them onto your feet."',
      },
      {
        word: "Overextension ('All Dogs Are Doggies')",
        phonetic: '[ Broad Categorization ]',
        type: 'Semantic Generalization',
        definition:
          'Using a single familiar category label for all creatures sharing common visual traits.',
        example:
          'Pointing at a horse or goat in a picture book and happily shouting "Doggie!".',
        parentResponse:
          '"That animal has four legs like a doggie! That one is a big horse. Neigh!"',
      },
      {
        word: 'Social Referencing Gaze',
        phonetic: '[ Checking caregiver expression ]',
        type: 'Emotional Calibration',
        definition:
          'Looking back at parent\'s facial expression before touching an unfamiliar object or exploring a new step.',
        example:
          'Toddler pauses before climbing the play slide and looks directly at your face.',
        parentResponse:
          '"Give a calm, reassuring smile: \'You are safe. Hold the railing with both hands.\'"',
      },
    ],
  },
};

export function resolveVocabStage(
  child: ChildDTO | null | undefined
): 'INFANT' | 'TODDLER' | 'ELEMENTARY' | 'ADOLESCENT' {
  if (!child) return 'ADOLESCENT';
  if (child.developmentalTier === DevelopmentalTier.TIER_0A_INFANCY_0_1) return 'INFANT';
  if (
    child.developmentalTier === DevelopmentalTier.TIER_0B_TODDLER_1_2 ||
    child.developmentalTier === DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3
  ) {
    return 'TODDLER';
  }
  if (typeof child.ageMonths === 'number' && child.ageMonths <= 12) return 'INFANT';
  if (typeof child.ageMonths === 'number' && child.ageMonths <= 36) return 'TODDLER';
  if (child.age <= 1) return 'INFANT';
  if (child.age <= 3) return 'TODDLER';
  if (child.age <= 10) return 'ELEMENTARY';
  return 'ADOLESCENT';
}

export const VOCABULARY_PAGE_SIZE = 4;

export interface StageTailoredVocabularyViewProps {
  child?: ChildDTO | null;
  className?: string;
}

export function StageTailoredVocabularyView({
  child,
  className,
}: StageTailoredVocabularyViewProps) {
  const stage = resolveVocabStage(child);
  const config = STAGE_VOCABULARY_DATA[stage];
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [copiedWord, setCopiedWord] = React.useState<string | null>(null);

  // Reset to page 1 whenever search query or child stage changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, stage]);

  const filteredTerms = React.useMemo(() => {
    if (!searchQuery.trim()) return config.terms;
    const q = searchQuery.toLowerCase();
    return config.terms.filter(
      (t) =>
        t.word.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.example.toLowerCase().includes(q)
    );
  }, [config.terms, searchQuery]);

  // Paginate 4 terms per page
  const totalPages = Math.ceil(filteredTerms.length / VOCABULARY_PAGE_SIZE) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * VOCABULARY_PAGE_SIZE;
  const paginatedTerms = filteredTerms.slice(startIndex, startIndex + VOCABULARY_PAGE_SIZE);

  const handleCopy = (word: string, textToCopy: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedWord(word);
      setTimeout(() => setCopiedWord(null), 2000);
    }
  };

  return (
    <section className={cn('space-y-5 max-w-7xl mx-auto', className)}>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E3DC] pb-3">
        <div className="space-y-0.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#143D2B] font-bold flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#143D2B]" />
            Pillar 4 · Stage-Tailored Micro-Language Decoder
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#111413]">
            {config.eligibleForSlang
              ? 'Decode Modern Youth Vocabulary'
              : 'Stage-Appropriate Pre-Verbal Decoder'}
          </h2>
        </div>
        <span className="text-xs font-mono text-[#858C88] bg-[#F4F4F0] px-3 py-1 rounded-full border border-[#E3E3DC]">
          {config.category}
        </span>
      </div>

      {/* Reassurance Banner for Infants */}
      {!config.eligibleForSlang && config.bannerNotice && (
        <div className="p-4 sm:p-5 bg-[#EAF3EE] rounded-2xl border border-[#143D2B]/30 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-[#143D2B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#143D2B] block">
              Pre-Device Sanctuary Active
            </span>
            <p className="text-xs sm:text-sm text-[#143D2B] leading-relaxed">
              {config.bannerNotice}
            </p>
          </div>
        </div>
      )}

      {/* Search Input for Slang-Eligible Stages */}
      {config.eligibleForSlang && (
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858C88]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${config.category.toLowerCase()}...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3E3DC] bg-white text-xs sm:text-sm text-[#111413] placeholder-[#858C88] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/20 focus:border-[#143D2B] transition"
          />
        </div>
      )}

      {/* Empty State */}
      {filteredTerms.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-[#E3E3DC] space-y-2">
          <p className="font-serif text-base font-bold text-[#111413]">
            No terms found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs text-[#858C88]">
            Try searching for another word or clear your search query to view the full catalog.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs"
          >
            Clear Search
          </Button>
        </div>
      ) : (
        /* Terms Grid (2 Columns, Exactly 4 Terms per Page) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paginatedTerms.map((term) => (
            <div
              key={term.word}
              className="rounded-3xl border border-[#E3E3DC] bg-white p-6 space-y-4 shadow-xs hover:border-[#143D2B]/30 transition"
            >
              {/* Card Header: Word, Phonetic, Type & Copy Script Button */}
              <div className="flex items-start justify-between gap-3 border-b border-[#E3E3DC]/60 pb-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111413]">
                      {term.word}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs text-[#858C88]">
                      {term.phonetic}
                    </span>
                    <span className="text-[#858C88]/40">•</span>
                    <span className="font-mono text-[11px] font-semibold text-[#143D2B]">
                      {term.type}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(term.word, term.parentResponse)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E3E3DC] bg-[#FBFBF9] hover:bg-[#EAF3EE] text-[#143D2B] text-xs font-mono font-medium transition cursor-pointer shrink-0"
                  title="Copy calm parent response to clipboard"
                >
                  {copiedWord === term.word ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#858C88]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Definition */}
              <p className="text-xs sm:text-sm text-[#494F4C] leading-relaxed">
                {term.definition}
              </p>

              {/* Schoolyard/Real-Life Example Context */}
              <div className="p-3.5 rounded-xl bg-[#FBFBF9] border border-[#E3E3DC]/60 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-[#858C88] tracking-wider block">
                  In Context
                </span>
                <p className="font-serif italic text-xs text-[#111413]">
                  {term.example}
                </p>
              </div>

              {/* Parent Calm Script */}
              <div className="p-3.5 rounded-xl bg-[#EAF3EE]/60 border border-[#143D2B]/15 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-[#143D2B] tracking-wider block">
                  Parent Calm Script
                </span>
                <p className="font-serif text-xs text-[#143D2B] leading-relaxed">
                  {term.parentResponse}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls Bar (Option 1) */}
      {filteredTerms.length > VOCABULARY_PAGE_SIZE && (
        <div className="pt-4 border-t border-[#E3E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="font-mono text-[#858C88]">
            Showing {filteredTerms.length > 0 ? startIndex + 1 : 0}–
            {Math.min(startIndex + VOCABULARY_PAGE_SIZE, filteredTerms.length)} of{' '}
            {filteredTerms.length} terms
          </span>

          <div className="flex items-center gap-2 self-start sm:self-auto font-mono">
            <Button
              variant="outline"
              size="sm"
              disabled={validPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="gap-1 min-h-[38px] px-3.5 rounded-xl border-[#E3E3DC] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous 4</span>
            </Button>

            <span className="px-3 py-1.5 rounded-xl bg-[#F4F4F0] border border-[#E3E3DC] text-[#111413] font-bold">
              Page {validPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={validPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="gap-1 min-h-[38px] px-3.5 rounded-xl border-[#E3E3DC] disabled:opacity-40 cursor-pointer"
            >
              <span>Next 4</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
