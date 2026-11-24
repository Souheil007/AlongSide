'use client';

import * as React from 'react';
import type {
  AcademyLessonDTO,
  AlmanacLessonPayload,
  ChildPersonalizationContext,
} from '@alongside/shared';
import { interpolateChildCopy } from '@alongside/shared';
import {
  getLocalLessonPlaybook,
  markLessonComplete,
  recordActiveReadingTime,
  updateLessonPlaybook,
} from '@/lib/api/academy';
import {
  buildHookingNarrationScript,
  playNaturalNarrator,
  type VoicePersona,
} from '@/lib/audio/narratorEngine';

export const BEAT_CHAPTER_LABELS = [
  'The Mirror',
  'Inside Mind',
  'Practice',
  'One Move',
  'Pocket Card',
] as const;

export interface UseAlmanacLessonStateOptions {
  lesson: AcademyLessonDTO;
  payload: AlmanacLessonPayload;
  child?: ChildPersonalizationContext | null;
  onLessonComplete?: () => void;
}

export function buildAlmanacNarrationScript(
  payload: AlmanacLessonPayload,
  t: (str: string) => string
): { fullText: string; estimatedSeconds: number } {
  return buildHookingNarrationScript(payload, t);
}

export function useAlmanacLessonState({
  lesson,
  payload,
  child,
  onLessonComplete,
}: UseAlmanacLessonStateOptions) {
  const fallbackTier = lesson.module?.developmentalTier ?? null;
  const t = React.useCallback(
    (template: string) => interpolateChildCopy(template, child, fallbackTier),
    [child, fallbackTier]
  );

  // Navigation & visual comfort state
  const [activeBeat, setActiveBeat] = React.useState<number>(0);
  const [scrollPercent, setScrollPercent] = React.useState<number>(0);
  const [isNightstandMode, setIsNightstandMode] = React.useState<boolean>(false);

  // Read | Listen Companion Narrator state
  const [listenMode, setListenMode] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState<1 | 1.25 | 1.5>(1);
  const [audioSeconds, setAudioSeconds] = React.useState<number>(0);
  const [speakingBeat, setSpeakingBeat] = React.useState<number | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [audioFileFailed, setAudioFileFailed] = React.useState<boolean>(false);
  const [voicePersona, setVoicePersona] = React.useState<VoicePersona>('warm');
  const speechCancelRef = React.useRef<(() => void) | null>(null);

  // Interactive Beat 1–5 state
  const [selectedPollId, setSelectedPollId] = React.useState<string | null>(null);
  const [selectedInstinctId, setSelectedInstinctId] = React.useState<string | null>(null);
  const [skippedInstinct, setSkippedInstinct] = React.useState<boolean>(false);
  const [activeAnnotationId, setActiveAnnotationId] = React.useState<string | null>(null);
  const [selectedPushbackId, setSelectedPushbackId] = React.useState<string | null>(null);

  // Persisted Playbook state
  const [chosenMoveId, setChosenMoveId] = React.useState<string | null>(
    lesson.playbookState?.chosenMoveId ?? null
  );
  const [bookmarkedTruth, setBookmarkedTruth] = React.useState<boolean>(
    lesson.playbookState?.bookmarkedTruth ?? false
  );
  const [savedPushbackIds, setSavedPushbackIds] = React.useState<string[]>(
    lesson.playbookState?.savedPushbackIds ?? []
  );
  const [isCompleted, setIsCompleted] = React.useState<boolean>(
    Boolean(lesson.isCompleted || lesson.playbookState?.isCompleted)
  );
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState<boolean>(false);

  const narration = React.useMemo(
    () => buildAlmanacNarrationScript(payload, t),
    [payload, t]
  );

  const totalAudioSeconds =
    lesson.audioDurationSeconds && lesson.audioDurationSeconds > 30
      ? lesson.audioDurationSeconds
      : narration.estimatedSeconds;

  // Hydrate persisted Nightstand preference on mount
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      if (window.localStorage.getItem('alongside-nightstand-mode') === 'true') {
        setIsNightstandMode(true);
      }
    } catch {
      // safe fallback
    }
  }, []);

  // Reset per-lesson ephemeral state & hydrate playbook state whenever lesson changes
  React.useEffect(() => {
    const local = getLocalLessonPlaybook(lesson.id);
    setSelectedPollId(null);
    setSelectedInstinctId(null);
    setSkippedInstinct(false);
    setActiveAnnotationId(null);
    setSelectedPushbackId(null);
    setChosenMoveId(
      lesson.playbookState?.chosenMoveId ?? local?.chosenMoveId ?? null
    );
    setBookmarkedTruth(
      Boolean(lesson.playbookState?.bookmarkedTruth || local?.bookmarkedTruth)
    );
    setSavedPushbackIds(
      lesson.playbookState?.savedPushbackIds?.length
        ? lesson.playbookState.savedPushbackIds
        : (local?.savedPushbackIds ?? [])
    );
    setIsCompleted(
      Boolean(
        lesson.isCompleted ||
          lesson.playbookState?.isCompleted ||
          local?.isCompleted
      )
    );
    setSaveError(null);
    setAudioSeconds(0);
    setIsPlaying(false);
    setSpeakingBeat(null);
    setAudioFileFailed(false);
  }, [lesson.id, lesson.isCompleted, lesson.playbookState]);

  // Live 2px scroll-progress hairline + active beat IntersectionObserver
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollPercent(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      setScrollPercent(pct);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      const beatEls = Array.from(
        document.querySelectorAll<HTMLElement>('[data-almanac-beat]')
      );
      if (beatEls.length > 0) {
        observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((e) => e.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible[0]) {
              const beatAttr = visible[0].target.getAttribute('data-almanac-beat');
              const idx = beatAttr ? Number(beatAttr) : 0;
              if (!Number.isNaN(idx)) {
                setActiveBeat(idx);
              }
            }
          },
          { rootMargin: '-22% 0px -52% 0px', threshold: [0.1, 0.35, 0.6] }
        );
        beatEls.forEach((el) => observer?.observe(el));
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, [lesson.id]);

  // Record active reading time (1-minute interval while visible)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        recordActiveReadingTime(lesson.id, 1);
      }
    }, 60000);
    return () => window.clearInterval(interval);
  }, [lesson.id]);

  // Companion narrator timer + beat sync + cleanup
  const stopAudio = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (speechCancelRef.current) {
      speechCancelRef.current();
      speechCancelRef.current = null;
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setSpeakingBeat(null);
  }, []);

  React.useEffect(() => {
    return () => {
      if (speechCancelRef.current) {
        speechCancelRef.current();
        speechCancelRef.current = null;
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setAudioSeconds((prev) => {
        const next = prev + playbackSpeed;
        if (next >= totalAudioSeconds) {
          stopAudio();
          return 0;
        }
        const ratio = next / Math.max(1, totalAudioSeconds);
        const computedBeat = Math.min(4, Math.floor(ratio * 5));
        setSpeakingBeat(computedBeat);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, playbackSpeed, totalAudioSeconds, stopAudio]);

  const startSpeechFallback = React.useCallback(
    (rateMultiplier: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setIsPlaying(true);
        setSpeakingBeat(0);
        return;
      }
      if (speechCancelRef.current) {
        speechCancelRef.current();
        speechCancelRef.current = null;
      }
      const cancel = playNaturalNarrator({
        text: narration.fullText,
        rateMultiplier,
        persona: voicePersona,
        onStart: () => {
          setIsPlaying(true);
          setSpeakingBeat(
            Math.min(4, Math.floor((audioSeconds / Math.max(1, totalAudioSeconds)) * 5))
          );
        },
        onEnd: () => {
          setIsPlaying(false);
          setSpeakingBeat(null);
          setAudioSeconds(0);
          speechCancelRef.current = null;
        },
        onError: () => {
          setIsPlaying(false);
          speechCancelRef.current = null;
        },
      });
      speechCancelRef.current = cancel;
      setIsPlaying(true);
      setSpeakingBeat(
        Math.min(4, Math.floor((audioSeconds / Math.max(1, totalAudioSeconds)) * 5))
      );
    },
    [narration.fullText, audioSeconds, totalAudioSeconds, voicePersona]
  );

  const togglePlayAudio = React.useCallback(() => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    if (lesson.audioUrl && !audioFileFailed && audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setSpeakingBeat(0);
        })
        .catch(() => {
          setAudioFileFailed(true);
          startSpeechFallback(playbackSpeed);
        });
      return;
    }

    startSpeechFallback(playbackSpeed);
  }, [
    isPlaying,
    stopAudio,
    lesson.audioUrl,
    audioFileFailed,
    playbackSpeed,
    startSpeechFallback,
  ]);

  const cyclePlaybackSpeed = React.useCallback(() => {
    const next: 1 | 1.25 | 1.5 =
      playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
    setPlaybackSpeed(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
    if (isPlaying && (!lesson.audioUrl || audioFileFailed)) {
      startSpeechFallback(next);
    }
  }, [playbackSpeed, isPlaying, lesson.audioUrl, audioFileFailed, startSpeechFallback]);

  const cycleVoicePersona = React.useCallback(() => {
    const nextPersona: VoicePersona = voicePersona === 'warm' ? 'clear' : 'warm';
    setVoicePersona(nextPersona);
    if (isPlaying && (!lesson.audioUrl || audioFileFailed)) {
      if (speechCancelRef.current) {
        speechCancelRef.current();
        speechCancelRef.current = null;
      }
      const cancel = playNaturalNarrator({
        text: narration.fullText,
        rateMultiplier: playbackSpeed,
        persona: nextPersona,
        onStart: () => {
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsPlaying(false);
          setSpeakingBeat(null);
          setAudioSeconds(0);
          speechCancelRef.current = null;
        },
        onError: () => {
          setIsPlaying(false);
          speechCancelRef.current = null;
        },
      });
      speechCancelRef.current = cancel;
    }
  }, [voicePersona, isPlaying, lesson.audioUrl, audioFileFailed, narration.fullText, playbackSpeed]);

  const setReadingMode = React.useCallback(
    (mode: 'read' | 'listen') => {
      if (mode === 'read') {
        stopAudio();
        setListenMode(false);
      } else {
        setListenMode(true);
      }
    },
    [stopAudio]
  );

  const toggleNightstandMode = React.useCallback(() => {
    setIsNightstandMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem('alongside-nightstand-mode', String(next));
        } catch {
          // safe fallback
        }
      }
      return next;
    });
  }, []);

  const scrollToBeat = React.useCallback((beatIndex: number) => {
    if (typeof document === 'undefined') return;
    const target = document.querySelector<HTMLElement>(
      `[data-almanac-beat="${beatIndex}"]`
    );
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveBeat(beatIndex);
    }
  }, []);

  const scrollToVideoShelf = React.useCallback(() => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('almanac-master-talk-shelf');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Interactive Beat 3 & 4→5 Playbook persistence handlers
  const toggleAnnotation = React.useCallback((id: string) => {
    setActiveAnnotationId((prev) => (prev === id ? null : id));
  }, []);

  const toggleBookmarkTruth = React.useCallback(() => {
    setBookmarkedTruth((prev) => {
      const next = !prev;
      void updateLessonPlaybook(lesson.id, { bookmarkedTruth: next });
      return next;
    });
  }, [lesson.id]);

  const toggleSavePushback = React.useCallback(
    (pushbackId: string) => {
      setSavedPushbackIds((prev) => {
        const exists = prev.includes(pushbackId);
        const next = exists
          ? prev.filter((id) => id !== pushbackId)
          : [...prev, pushbackId];
        void updateLessonPlaybook(lesson.id, { savedPushbackIds: next });
        return next;
      });
    },
    [lesson.id]
  );

  const selectTonightMove = React.useCallback(
    (moveId: string) => {
      setChosenMoveId(moveId);
      void updateLessonPlaybook(lesson.id, { chosenMoveId: moveId });
    },
    [lesson.id]
  );

  const sealAndSavePocketCard = React.useCallback(async () => {
    if (isSaving) return;
    const effectiveMoveId = chosenMoveId ?? payload.moves[0]?.id ?? null;
    if (!chosenMoveId && effectiveMoveId) {
      setChosenMoveId(effectiveMoveId);
    }
    try {
      setIsSaving(true);
      setSaveError(null);
      await markLessonComplete(lesson.id, lesson.readingMinutes || 3, {
        chosenMoveId: effectiveMoveId,
        bookmarkedTruth,
        savedPushbackIds,
      });
      setIsCompleted(true);
      onLessonComplete?.();
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : 'Could not save your Pocket Card right now. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  }, [
    isSaving,
    chosenMoveId,
    payload.moves,
    lesson.id,
    lesson.readingMinutes,
    bookmarkedTruth,
    savedPushbackIds,
    onLessonComplete,
  ]);

  const openAdvisorWithLessonContext = React.useCallback(() => {
    const prompt = t(payload.advisorPrompt).replace(/^[“"]|[”"]$/g, '');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('alongside:open-advisor', {
          detail: { prompt },
        })
      );
    }
  }, [payload.advisorPrompt, t]);

  return {
    t,
    activeBeat,
    scrollPercent,
    isNightstandMode,
    toggleNightstandMode,
    listenMode,
    setReadingMode,
    isPlaying,
    playbackSpeed,
    voicePersona,
    cycleVoicePersona,
    audioSeconds,
    totalAudioSeconds,
    speakingBeat,
    audioRef,
    onAudioError: () => setAudioFileFailed(true),
    togglePlayAudio,
    cyclePlaybackSpeed,
    stopAudio,
    scrollToBeat,
    scrollToVideoShelf,
    selectedPollId,
    setSelectedPollId,
    selectedInstinctId,
    setSelectedInstinctId,
    skippedInstinct,
    setSkippedInstinct,
    activeAnnotationId,
    toggleAnnotation,
    selectedPushbackId,
    setSelectedPushbackId,
    chosenMoveId,
    selectTonightMove,
    bookmarkedTruth,
    toggleBookmarkTruth,
    savedPushbackIds,
    toggleSavePushback,
    isCompleted,
    isSaving,
    saveError,
    sealAndSavePocketCard,
    isShareModalOpen,
    setIsShareModalOpen,
    openAdvisorWithLessonContext,
  };
}
