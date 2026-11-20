import {
  AcademyCategory,
  ChapterPriority,
  DevelopmentalTier,
  EpisodeRole,
  LessonArchetype,
  type AlmanacLessonPayload,
  type MasterVideoLectureDTO,
} from '@alongside/shared';
import type {
  AcademyChapterSeedData,
  AcademyLessonSeedData,
  AcademyModuleSeedData,
} from './types.js';

export interface BespokeEpisodeInput {
  slug: string;
  /** Plain human catalog/API title (non-clinical, de-jargoned) */
  title: string;
  readingMinutes?: number;
  audioDurationSeconds?: number;
  archetype?: LessonArchetype;
  payload: AlmanacLessonPayload;
}

export interface BespokeCourseInput {
  slug: string;
  category: AcademyCategory;
  developmentalTier: DevelopmentalTier;
  title: string;
  reliefSubtitle: string;
  tonightQuickWinTitle: string;
  summary: string;
  coverImageUrl: string;
  sortOrder: number;
  featuredVideoLecture?: MasterVideoLectureDTO | null;
  episodes: BespokeEpisodeInput[];
}

function buildBackupMarkdown(
  title: string,
  payload: AlmanacLessonPayload
): string {
  const instinct1 = payload.instincts[0];
  const instinct2 = payload.instincts[1];
  const rows: string[] = [];
  if (instinct1) {
    rows.push(
      `| ${instinct1.label} | ${instinct1.whyText} | ${payload.calmScriptPlain} |`
    );
  }
  if (instinct2) {
    rows.push(
      `| ${instinct2.label} | ${instinct2.whyText} | ${payload.pushbacks[0]?.script ?? payload.calmScriptPlain} |`
    );
  }

  const movesList = payload.moves
    .map((m, idx) => `${idx + 1}. **${m.title}:** ${m.desc}`)
    .join('\n');

  return [
    `# ${title}`,
    '',
    '## Part 1: The Everyday Moment',
    payload.sceneBody,
    '',
    '## Part 2: Inside Your Child’s Growing Mind',
    payload.beat2Lead,
    '',
    payload.scienceDeepDive,
    '',
    `> **Key Takeaway:** ${payload.almanacTruth}`,
    '',
    '## Part 3: Comparative Dialogue Scripts',
    '| What NOT to Say | Why It Backfires | What to Say Instead |',
    '| :--- | :--- | :--- |',
    ...rows,
    '',
    '### Delivery Tip:',
    `> ${payload.deliveryCues.join(' · ')}`,
    '',
    '## Part 4: Tonight’s Small Experiment',
    movesList,
    '',
    '### A Note for You as a Parent',
    payload.closingNote,
  ].join('\n');
}

function resolvePriorityForRole(role: EpisodeRole, index: number): number {
  if (index === 0 || role === EpisodeRole.FAST_WIN) {
    return ChapterPriority.PRIORITY_1_CRITICAL;
  }
  if (role === EpisodeRole.LONG_TERM_BOND) {
    return ChapterPriority.PRIORITY_3_SCAFFOLDING;
  }
  return ChapterPriority.PRIORITY_2_ROUTINES;
}

export function buildBespokeCourse(
  input: BespokeCourseInput
): AcademyModuleSeedData {
  const lessons: AcademyLessonSeedData[] = input.episodes.map((ep, idx) => {
    const sortOrder = idx + 1;
    const p = ep.payload;
    const deliveryTip = p.deliveryCues.join(' · ');
    const dialogueCards = p.instincts.map((inst, i) => ({
      instinctiveMistake: inst.label.replace(/^[“"]|[”"]$/g, ''),
      whyItBackfires: inst.whyText,
      empatheticScript:
        i === 0
          ? p.calmScriptPlain.replace(/^[“"]|[”"]$/g, '')
          : (p.pushbacks[0]?.script ?? p.calmScriptPlain).replace(
              /^[“"]|[”"]$/g,
              ''
            ),
      deliveryTip,
    }));

    return {
      slug: ep.slug,
      title: ep.title,
      archetype: ep.archetype ?? LessonArchetype.EVERYDAY_BEHAVIOR,
      episodeRole: p.episodeRole,
      contentMarkdown: buildBackupMarkdown(ep.title, p),
      readingMinutes: ep.readingMinutes ?? 3,
      sortOrder,
      audioUrl: `https://assets.alongside.care/academy/audio/${ep.slug}.mp3`,
      audioDurationSeconds: ep.audioDurationSeconds ?? 165,
      reliefTagline: p.deck,
      whatNotToSay: dialogueCards[0]?.instinctiveMistake ?? null,
      deliveryTip,
      dialogueCards,
      thirtySecondGlance: {
        coreProblem: p.almanacTruth,
        immediateShift: p.moves[0]?.title ?? deliveryTip,
        exactWords: p.calmScriptPlain.replace(/^[“"]|[”"]$/g, ''),
      },
      almanacPayload: p,
    };
  });

  const p1Lessons = lessons.filter(
    (l, i) => resolvePriorityForRole(l.episodeRole ?? EpisodeRole.FAST_WIN, i) === ChapterPriority.PRIORITY_1_CRITICAL
  );
  const p2Lessons = lessons.filter(
    (l, i) => resolvePriorityForRole(l.episodeRole ?? EpisodeRole.FAST_WIN, i) === ChapterPriority.PRIORITY_2_ROUTINES
  );
  const p3Lessons = lessons.filter(
    (l, i) => resolvePriorityForRole(l.episodeRole ?? EpisodeRole.FAST_WIN, i) === ChapterPriority.PRIORITY_3_SCAFFOLDING
  );

  const chapters: AcademyChapterSeedData[] = [];
  if (p1Lessons.length > 0) {
    chapters.push({
      slug: `${input.slug}-chapter-1-critical`,
      title: 'Chapter 1: Immediate Calm & Fast Win',
      summary: 'Your highest-leverage mental shift and exact words for tonight.',
      priority: ChapterPriority.PRIORITY_1_CRITICAL,
      sortOrder: 1,
      lessons: p1Lessons,
    });
  }
  if (p2Lessons.length > 0) {
    chapters.push({
      slug: `${input.slug}-chapter-2-routines`,
      title: 'Chapter 2: Inside Their Mind & Daily Rhythms',
      summary: 'Decode the biology underneath and reset predictable household rhythms.',
      priority: ChapterPriority.PRIORITY_2_ROUTINES,
      sortOrder: 2,
      lessons: p2Lessons,
    });
  }
  if (p3Lessons.length > 0) {
    chapters.push({
      slug: `${input.slug}-chapter-3-scaffolding`,
      title: 'Chapter 3: Long-Term Bond & Skills',
      summary: 'Build lasting confidence, repair, and family trust together.',
      priority: ChapterPriority.PRIORITY_3_SCAFFOLDING,
      sortOrder: 3,
      lessons: p3Lessons,
    });
  }

  return {
    slug: input.slug,
    category: input.category,
    title: input.title,
    reliefSubtitle: input.reliefSubtitle,
    tonightQuickWinTitle: input.tonightQuickWinTitle,
    summary: input.summary,
    coverImageUrl: input.coverImageUrl,
    featuredVideoLecture: input.featuredVideoLecture ?? null,
    developmentalTier: input.developmentalTier,
    sortOrder: input.sortOrder,
    chapters,
    lessons,
  };
}
