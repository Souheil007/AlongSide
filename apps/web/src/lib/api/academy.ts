import {
  AcademyCategory,
  DevelopmentalTier,
  AcademyCategoryStatsDTO,
  AcademyModuleDTO,
  AcademyModuleDetailDTO,
  AcademyLessonDTO,
  AcademyLessonCompletionResponseDTO,
} from '@alongside/shared';
import { apiClient } from './client';
import {
  MOCK_ACADEMY_CATEGORIES,
  MOCK_ACADEMY_MODULES,
  MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR,
  MOCK_LESSON_DETAIL_ADRENARCHE,
} from './mocks';

export interface CategoriesResponse {
  categories: AcademyCategoryStatsDTO[];
}

export interface ModulesResponse {
  modules: AcademyModuleDTO[];
}

export interface ModuleDetailResponse {
  module: AcademyModuleDetailDTO;
}

export interface LessonDetailResponse {
  lesson: AcademyLessonDTO;
}

/**
 * Fetch all canonical academy categories with course and lesson count statistics, optionally filtered by tier.
 */
export async function getAcademyCategories(params?: {
  tier?: DevelopmentalTier | string;
}): Promise<AcademyCategoryStatsDTO[]> {
  try {
    const queryParams: Record<string, string | undefined> = {};
    if (params?.tier && params.tier !== 'ALL') {
      queryParams.tier = params.tier;
    }
    const searchString = new URLSearchParams(
      Object.entries(queryParams).filter(
        (entry): entry is [string, string] => entry[1] !== undefined
      )
    ).toString();
    const endpoint = `/api/v1/academy/categories${searchString ? `?${searchString}` : ''}`;
    const res = await apiClient<CategoriesResponse>(endpoint, {
      method: 'GET',
    });
    return res.categories ?? [];
  } catch (err) {
    if (params?.tier && params.tier !== 'ALL') {
      return Object.values(AcademyCategory).map((cat) => {
        const catModules = MOCK_ACADEMY_MODULES.filter(
          (m) =>
            m.category === cat &&
            (m.developmentalTier === params.tier ||
              (params.tier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 &&
                (m.developmentalTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
                  m.developmentalTier === DevelopmentalTier.TIER_0B_TODDLER_1_2 ||
                  m.developmentalTier === DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3 ||
                  m.developmentalTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3)))
        );
        const meta = MOCK_ACADEMY_CATEGORIES.find((c) => c.category === cat);
        return {
          category: cat,
          title: meta?.title ?? cat,
          description: meta?.description ?? '',
          moduleCount: catModules.length,
          lessonCount: catModules.reduce((acc, m) => acc + m.lessonCount, 0),
        };
      });
    }
    // Graceful offline fallback to canonical category metadata
    return MOCK_ACADEMY_CATEGORIES;
  }
}

export const LOCAL_STORAGE_COMPLETED_KEY = 'alongside-completed-lessons';
export const LOCAL_STORAGE_ACTIVITY_KEY = 'alongside-learning-activity-v1';

export interface LearningActivityRecord {
  lessonId: string;
  date: string; // 'YYYY-MM-DD'
  minutes: number;
}

export function getLocalCompletedLessonIds(): Set<string> {
  if (typeof window === 'undefined' || !window.localStorage) {
    return new Set<string>();
  }
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_COMPLETED_KEY);
    if (!raw) return new Set<string>();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set<string>();
  }
}

export function getLearningActivityRecords(): LearningActivityRecord[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_ACTIVITY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Calculates start of current calendar week (Monday 00:00:00 local time).
 */
export function getStartOfWeekDate(reference: Date = new Date()): string {
  const d = new Date(reference);
  const day = d.getDay();
  // distance back to Monday: Sunday (0) is 6 days back, Monday (1) is 0 days back, etc.
  const distanceToMonday = (day + 6) % 7;
  d.setDate(d.getDate() - distanceToMonday);
  return d.toISOString().split('T')[0] ?? '';
}

export function recordLearningActivity(lessonId: string, minutes: number = 4): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    const records = getLearningActivityRecords();
    const todayStr = new Date().toISOString().split('T')[0] ?? '';
    const existing = records.find((r) => r.lessonId === lessonId && r.date === todayStr);
    if (existing) {
      existing.minutes = Math.max(existing.minutes, minutes);
    } else {
      records.push({ lessonId, date: todayStr, minutes });
    }
    window.localStorage.setItem(LOCAL_STORAGE_ACTIVITY_KEY, JSON.stringify(records));
    if (typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('alongside-learning-activity-updated'));
      } catch {
        // silent fallback
      }
    }
  } catch {
    // silent fallback
  }
}

/**
 * Record active time spent reading a lesson (increments minutes for today).
 */
export function recordActiveReadingTime(lessonId: string, minutesToAdd: number = 1): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    const records = getLearningActivityRecords();
    const todayStr = new Date().toISOString().split('T')[0] ?? '';
    const existing = records.find((r) => r.lessonId === lessonId && r.date === todayStr);
    if (existing) {
      existing.minutes += minutesToAdd;
    } else {
      records.push({ lessonId, date: todayStr, minutes: minutesToAdd });
    }
    window.localStorage.setItem(LOCAL_STORAGE_ACTIVITY_KEY, JSON.stringify(records));
    if (typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('alongside-learning-activity-updated'));
      } catch {
        // silent fallback
      }
    }
  } catch {
    // silent fallback
  }
}

export function saveLocalCompletedLessonId(lessonId: string, readingMinutes: number = 4): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    const set = getLocalCompletedLessonIds();
    set.add(lessonId);
    window.localStorage.setItem(LOCAL_STORAGE_COMPLETED_KEY, JSON.stringify(Array.from(set)));
    recordLearningActivity(lessonId, readingMinutes);
    if (typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('alongside-learning-activity-updated'));
      } catch {
        // silent fallback
      }
    }
  } catch {
    // silent fallback
  }
}

export function calculateHabitStreakAndMinutes(allModules?: AcademyModuleDTO[]): {
  streakDays: number;
  minsLearnedThisWeek: number;
} {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0] ?? '';
  const mondayStr = getStartOfWeekDate(now);

  // 1. Calculate explicit minutes recorded in activity records for this calendar week
  const activityRecords = getLearningActivityRecords();
  const dateSet = new Set<string>();
  let recordedWeekMinutes = 0;

  for (const r of activityRecords) {
    if (r.date) {
      dateSet.add(r.date);
      if (r.date >= mondayStr) {
        recordedWeekMinutes += Number(r.minutes) || 0;
      }
    }
  }

  // 2. Calculate fallback minutes from completed module lessons
  let moduleMins = 0;
  let totalCompletedLessons = 0;

  if (allModules && allModules.length > 0) {
    for (const mod of allModules) {
      if (mod.lessons && mod.lessons.length > 0) {
        for (const les of mod.lessons) {
          if (les.isCompleted) {
            moduleMins += les.readingMinutes || 4;
            totalCompletedLessons++;
          }
        }
      } else if (mod.completedLessonCount) {
        moduleMins += mod.completedLessonCount * 4;
        totalCompletedLessons += mod.completedLessonCount;
      }
    }
  }

  // Also factor local storage completed lesson count if modules wasn't populated
  const localCompleted = getLocalCompletedLessonIds();
  if (totalCompletedLessons === 0 && localCompleted.size > 0) {
    totalCompletedLessons = localCompleted.size;
    moduleMins = totalCompletedLessons * 4;
  }

  // If user completed a lesson in the current session but dateSet is empty
  if (totalCompletedLessons > 0 && dateSet.size === 0) {
    dateSet.add(todayStr);
  }

  // Determine final minutes learned this week:
  // Take the highest of explicit recorded weekly minutes or completed module lesson minutes
  const minsLearnedThisWeek = Math.max(
    recordedWeekMinutes,
    totalCompletedLessons > 0 ? moduleMins : 0
  );

  if (dateSet.size === 0 && totalCompletedLessons === 0) {
    return {
      streakDays: 0,
      minsLearnedThisWeek: 0,
    };
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0] ?? '';

  // A streak is only active if the parent completed a lesson today or yesterday
  if (!dateSet.has(todayStr) && !dateSet.has(yesterdayStr)) {
    return {
      streakDays: 0,
      minsLearnedThisWeek,
    };
  }

  // Count consecutive days backwards
  let streak = 0;
  const checkDate = dateSet.has(todayStr) ? new Date(now) : new Date(yesterday);

  while (true) {
    const dStr = checkDate.toISOString().split('T')[0] ?? '';
    if (dateSet.has(dStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    streakDays: Math.max(1, streak),
    minsLearnedThisWeek,
  };
}

/**
 * Fetch all academy modules, optionally filtered by category and/or developmental tier.
 */
export async function getAcademyModules(params?: {
  category?: AcademyCategory | string;
  tier?: DevelopmentalTier | string;
}): Promise<AcademyModuleDTO[]> {
  let modules: AcademyModuleDTO[] = [];
  try {
    const queryParams: Record<string, string | undefined> = {};
    if (params?.category && params.category !== 'ALL') {
      queryParams.category = params.category;
    }
    if (params?.tier && params.tier !== 'ALL') {
      queryParams.tier = params.tier;
    }

    const res = await apiClient<ModulesResponse>('/api/v1/academy/modules', {
      method: 'GET',
      params: queryParams,
    });
    modules = res.modules ?? [];
  } catch (err) {
    // Offline fallback filtering
    let filtered = [...MOCK_ACADEMY_MODULES];
    if (params?.category && params.category !== 'ALL') {
      filtered = filtered.filter((m) => m.category === params.category);
    }
    if (params?.tier && params.tier !== 'ALL') {
      filtered = filtered.filter(
        (m) =>
          m.developmentalTier === params.tier ||
          (params.tier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3 &&
            (m.developmentalTier === DevelopmentalTier.TIER_0A_INFANCY_0_1 ||
              m.developmentalTier === DevelopmentalTier.TIER_0B_TODDLER_1_2 ||
              m.developmentalTier === DevelopmentalTier.TIER_0C_OLDER_TODDLER_2_3 ||
              m.developmentalTier === DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3))
      );
    }
    modules = filtered;
  }

  // Merge locally completed lessons into module list
  const localCompleted = getLocalCompletedLessonIds();
  if (localCompleted.size > 0 && modules.length > 0) {
    modules = modules.map((m) => {
      if (!m.lessons || m.lessons.length === 0) return m;
      const updatedLessons = m.lessons.map((l) => ({
        ...l,
        isCompleted: l.isCompleted || localCompleted.has(l.id),
      }));
      const completedCount = updatedLessons.filter((l) => l.isCompleted).length;
      return {
        ...m,
        lessons: updatedLessons,
        completedLessonCount: Math.max(m.completedLessonCount, completedCount),
        isCompleted: m.lessonCount > 0 && completedCount === m.lessonCount,
      };
    });
  }

  return modules;
}

/**
 * Fetch detailed module structure including its prioritized chapters and lessons.
 */
export async function getAcademyModuleBySlug(
  slug: string
): Promise<AcademyModuleDetailDTO> {
  let mod: AcademyModuleDetailDTO;
  try {
    const res = await apiClient<ModuleDetailResponse>(`/api/v1/academy/modules/${slug}`, {
      method: 'GET',
    });
    mod = res.module;
  } catch (err) {
    if (slug === MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR.slug) {
      mod = MOCK_MODULE_DETAIL_TWEEN_BEHAVIOR;
    } else {
      const foundModule = MOCK_ACADEMY_MODULES.find((m) => m.slug === slug);
      if (foundModule) {
        const lessons = foundModule.lessons || [];
        const ch1Lessons = lessons.slice(0, 1);
        const ch2Lessons = lessons.slice(1, 3);
        const ch3Lessons = lessons.slice(3, 4);

        mod = {
          ...foundModule,
          chapterCount: 3,
          lessonCount: lessons.length,
          completedLessonCount: 0,
          isCompleted: false,
          chapters: [
            {
              id: `ch-${foundModule.id}-p1`,
              moduleId: foundModule.id,
              slug: `${foundModule.slug}-p1-critical`,
              title: 'Priority 1: Critical Win',
              summary: "Master tonight's immediate de-escalation quick win and somatic reset.",
              priority: 1,
              sortOrder: 1,
              lessonCount: ch1Lessons.length,
              completedLessonCount: 0,
              isCompleted: false,
              lessons: ch1Lessons,
            },
            {
              id: `ch-${foundModule.id}-p2`,
              moduleId: foundModule.id,
              slug: `${foundModule.slug}-p2-routines`,
              title: 'Priority 2: Biological Root & Routines',
              summary: 'Unpack the neurobiology and install predictable daily household routines.',
              priority: 2,
              sortOrder: 2,
              lessonCount: ch2Lessons.length,
              completedLessonCount: 0,
              isCompleted: false,
              lessons: ch2Lessons,
            },
            {
              id: `ch-${foundModule.id}-p3`,
              moduleId: foundModule.id,
              slug: `${foundModule.slug}-p3-scaffolding`,
              title: 'Priority 3: Scaffolding & Long-Term Repair',
              summary: 'Long-term developmental scaffolding, emotional repair, and resilience building.',
              priority: 3,
              sortOrder: 3,
              lessonCount: ch3Lessons.length,
              completedLessonCount: 0,
              isCompleted: false,
              lessons: ch3Lessons,
            },
          ],
          lessons,
        };
      } else {
        throw err;
      }
    }
  }

  // Merge locally completed lessons into module detail
  const localCompleted = getLocalCompletedLessonIds();
  if (localCompleted.size > 0 && mod.lessons) {
    mod.lessons = mod.lessons.map((l) => ({
      ...l,
      isCompleted: l.isCompleted || localCompleted.has(l.id),
    }));
    mod.completedLessonCount = mod.lessons.filter((l) => l.isCompleted).length;
    mod.isCompleted = mod.lessonCount > 0 && mod.completedLessonCount === mod.lessonCount;
    if (mod.chapters) {
      mod.chapters = mod.chapters.map((ch) => {
        const chLessons = (ch.lessons || []).map((l) => ({
          ...l,
          isCompleted: l.isCompleted || localCompleted.has(l.id),
        }));
        const chCompleted = chLessons.filter((l) => l.isCompleted).length;
        return {
          ...ch,
          lessons: chLessons,
          completedLessonCount: chCompleted,
          isCompleted: chLessons.length > 0 && chCompleted === chLessons.length,
        };
      });
    }
  }

  return mod;
}

/**
 * Fetch all academy modules, optionally filtered by developmental tier (legacy backward compatibility).
 */
export async function getModulesByTier(
  tier?: DevelopmentalTier
): Promise<ModulesResponse> {
  const modules = await getAcademyModules(tier ? { tier } : undefined);
  return { modules };
}

/**
 * Fetch detailed module structure including its list of lessons by slug (legacy backward compatibility).
 */
export async function getModuleBySlug(
  slug: string
): Promise<ModuleDetailResponse> {
  const module = await getAcademyModuleBySlug(slug);
  return { module };
}

/**
 * Fetch a single lesson by its ID.
 */
export async function getLesson(
  id: string
): Promise<LessonDetailResponse> {
  let res: LessonDetailResponse;
  try {
    res = await apiClient<LessonDetailResponse>(`/api/v1/academy/lessons/${id}`, {
      method: 'GET',
    });
  } catch (err) {
    if (id === MOCK_LESSON_DETAIL_ADRENARCHE.id) {
      res = { lesson: MOCK_LESSON_DETAIL_ADRENARCHE };
    } else {
      throw err;
    }
  }

  const localCompleted = getLocalCompletedLessonIds();
  if (localCompleted.has(res.lesson.id)) {
    res.lesson.isCompleted = true;
  }
  return res;
}

/**
 * Mark a lesson complete for the authenticated parent (with local storage fallback).
 */
export async function markLessonComplete(
  id: string,
  readingMinutes?: number
): Promise<AcademyLessonCompletionResponseDTO> {
  // Always mark completed in local storage for instant optimistic persistence
  saveLocalCompletedLessonId(id, readingMinutes || 4);

  try {
    return await apiClient<AcademyLessonCompletionResponseDTO>(
      `/api/v1/academy/lessons/${id}/complete`,
      {
        method: 'POST',
        body: JSON.stringify({}),
      }
    );
  } catch (err) {
    // If guest, offline, or session expired, return successful optimistic response
    return {
      progress: {
        id: `local-progress-${id}`,
        userId: 'local-parent',
        lessonId: id,
        isCompleted: true,
        completedAt: new Date().toISOString(),
      },
      module: {
        id: 'local-module',
        slug: 'current-course',
        title: 'Current Course',
        lessonCount: 4,
        completedLessonCount: 1,
        percentComplete: 25,
        isCompleted: false,
      },
    };
  }
}
