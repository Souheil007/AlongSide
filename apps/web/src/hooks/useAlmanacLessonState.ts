'use client';

import * as React from 'react';
import type {
  AcademyLessonDTO,
  AlmanacLessonPayload,
  ChildPersonalizationContext,
} from '@alongside/shared';
import {
  estimateLessonReadingMinutes,
  interpolateChildCopy,
} from '@alongside/shared';
import {
  getLocalLessonPlaybook,
  markLessonComplete,
  recordActiveReadingTime,
  updateLessonPlaybook,
} from '@/lib/api/academy';
import {
  buildHookingNarrationScript,
  charOffsetToSeconds,
  playNaturalNarrator,
  resolveBeatIndexForChar,
  resolveVoices,
  secondsToCharOffset,
  type NarrationScriptResult,
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
  t: (str: string) => string,
  childName?: string
): NarrationScriptResult {
  return buildHookingNarrationScript(payload, t, childName);
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
  // Default voicePersona is 'clear' (male voice) unless user switches to 'warm'
  const [listenMode, setListenMode] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [hasStartedAudio, setHasStartedAudio] = React.useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState<1 | 1.25 | 1.5>(1);
  const [audioSeconds, setAudioSeconds] = React.useState<number>(0);
  const [speakingBeat, setSpeakingBeat] = React.useState<number | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [, setAudioFileFailed] = React.useState<boolean>(false);
  const [voicePersona, setVoicePersonaState] = React.useState<VoicePersona>('clear');

  const speechCancelRef = React.useRef<(() => void) | null>(null);
  const charOffsetRef = React.useRef<number>(0);
  const audioSecondsRef = React.useRef<number>(0);
  const lastBoundaryAtRef = React.useRef<number>(0);
  const isPlayingRef = React.useRef<boolean>(false);
  isPlayingRef.current = isPlaying;

  // Interactive Beat 1-5 state
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

  // Real spoken narration script & real duration (never static DB placeholder)
  const narration = React.useMemo(
    () => buildAlmanacNarrationScript(payload, t, child?.name?.trim() || undefined),
    [payload, t, child?.name]
  );

  const totalAudioSeconds = narration.estimatedSeconds;

  // Real reading minutes calculated from actual lesson prose
  const realReadingMinutes = React.useMemo(
    () =>
      estimateLessonReadingMinutes({
        almanacPayload: payload,
        contentMarkdown: lesson.contentMarkdown,
        title: lesson.title,
      }),
    [payload, lesson.contentMarkdown, lesson.title]
  );

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

  // Cancel any active speech synthesis cleanly
  const cancelActiveSpeech = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (speechCancelRef.current) {
      speechCancelRef.current();
      speechCancelRef.current = null;
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Reset per-lesson ephemeral state & hydrate playbook state whenever lesson changes
  React.useEffect(() => {
    cancelActiveSpeech();
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
    audioSecondsRef.current = 0;
    charOffsetRef.current = 0;
    lastBoundaryAtRef.current = 0;
    setIsPlaying(false);
    setHasStartedAudio(false);
    setSpeakingBeat(null);
    setAudioFileFailed(false);
  }, [lesson.id, lesson.isCompleted, lesson.playbookState, cancelActiveSpeech]);

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

  // Pause audio while preserving exact char offset & timestamp so user can resume
  const pauseAudio = React.useCallback(() => {
    cancelActiveSpeech();
    // Sync char offset from current elapsed seconds in case browser didn't fire onboundary
    const syncedChar = secondsToCharOffset(
      narration.fullText,
      audioSecondsRef.current,
      totalAudioSeconds,
      narration.beatRanges
    );
    if (Date.now() - lastBoundaryAtRef.current > 1500) {
      charOffsetRef.current = syncedChar;
    }
    setIsPlaying(false);
  }, [cancelActiveSpeech, narration.fullText, narration.beatRanges, totalAudioSeconds]);

  // Backward-compatible alias that pauses without discarding position
  const stopAudio = pauseAudio;

  // Cleanup speech on unmount
  React.useEffect(() => {
    return () => {
      cancelActiveSpeech();
    };
  }, [cancelActiveSpeech]);

  // Smooth playhead ticker while playing (never kills active speech synthesis prematurely)
  React.useEffect(() => {
    if (!isPlaying) return;
    const tickMs = 250;
    const timer = window.setInterval(() => {
      const now = Date.now();
      const boundaryFresh = now - lastBoundaryAtRef.current < 1200;
      if (boundaryFresh) {
        return;
      }

      const speechActive =
        typeof window !== 'undefined' &&
        'speechSynthesis' in window &&
        window.speechSynthesis.speaking;

      setAudioSeconds((prev) => {
        const step = (tickMs / 1000) * playbackSpeed;
        const candidate = prev + step;
        if (candidate >= totalAudioSeconds) {
          // If speech synthesis is still finishing the last sentence, hold near end until onend fires
          if (speechActive) {
            const held = Math.max(0, totalAudioSeconds - 0.5);
            audioSecondsRef.current = held;
            return held;
          }
          cancelActiveSpeech();
          setIsPlaying(false);
          setHasStartedAudio(false);
          setSpeakingBeat(null);
          charOffsetRef.current = 0;
          audioSecondsRef.current = 0;
          return 0;
        }
        audioSecondsRef.current = candidate;
        const estimatedChar = secondsToCharOffset(
          narration.fullText,
          candidate,
          totalAudioSeconds,
          narration.beatRanges
        );
        charOffsetRef.current = estimatedChar;
        setSpeakingBeat(
          resolveBeatIndexForChar(narration.beatRanges, estimatedChar)
        );
        return candidate;
      });
    }, tickMs);

    return () => window.clearInterval(timer);
  }, [
    isPlaying,
    playbackSpeed,
    totalAudioSeconds,
    narration.fullText,
    narration.beatRanges,
    cancelActiveSpeech,
  ]);

  const startSpeechFromOffset = React.useCallback(
    (
      startCharOffset: number,
      rateMultiplier: number,
      persona: VoicePersona
    ) => {
      const safeStartChar = Math.max(
        0,
        Math.min(narration.fullText.length, startCharOffset)
      );
      const startSec = charOffsetToSeconds(
        narration.fullText,
        safeStartChar,
        totalAudioSeconds,
        narration.beatRanges
      );

      charOffsetRef.current = safeStartChar;
      audioSecondsRef.current = startSec;
      setAudioSeconds(startSec);
      setHasStartedAudio(true);

      const initialBeat = resolveBeatIndexForChar(
        narration.beatRanges,
        safeStartChar
      );
      setSpeakingBeat(initialBeat);

      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setIsPlaying(true);
        return;
      }

      cancelActiveSpeech();
      lastBoundaryAtRef.current = 0;

      const cancel = playNaturalNarrator({
        text: narration.fullText,
        startCharOffset: safeStartChar,
        rateMultiplier,
        persona,
        onStart: () => {
          setIsPlaying(true);
          setSpeakingBeat(
            resolveBeatIndexForChar(narration.beatRanges, charOffsetRef.current)
          );
        },
        onBoundary: (globalCharIndex) => {
          lastBoundaryAtRef.current = Date.now();
          charOffsetRef.current = globalCharIndex;
          const mappedSec = charOffsetToSeconds(
            narration.fullText,
            globalCharIndex,
            totalAudioSeconds,
            narration.beatRanges
          );
          audioSecondsRef.current = mappedSec;
          setAudioSeconds(mappedSec);
          setSpeakingBeat(
            resolveBeatIndexForChar(narration.beatRanges, globalCharIndex)
          );
        },
        onEnd: () => {
          setIsPlaying(false);
          setHasStartedAudio(false);
          setSpeakingBeat(null);
          setAudioSeconds(0);
          audioSecondsRef.current = 0;
          charOffsetRef.current = 0;
          lastBoundaryAtRef.current = 0;
          speechCancelRef.current = null;
        },
        onError: () => {
          setIsPlaying(false);
          speechCancelRef.current = null;
        },
      });

      speechCancelRef.current = cancel;
      setIsPlaying(true);
    },
    [
      narration.fullText,
      narration.beatRanges,
      totalAudioSeconds,
      cancelActiveSpeech,
    ]
  );

  // Pre-warm browser speech synthesis voices so first Play click starts synchronously
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      resolveVoices();
    }
  }, []);

  const togglePlayAudio = React.useCallback(() => {
    if (isPlayingRef.current) {
      pauseAudio();
      return;
    }

    const resumeChar =
      audioSecondsRef.current >= totalAudioSeconds - 1
        ? 0
        : charOffsetRef.current;

    startSpeechFromOffset(resumeChar, playbackSpeed, voicePersona);
  }, [
    pauseAudio,
    totalAudioSeconds,
    startSpeechFromOffset,
    playbackSpeed,
    voicePersona,
  ]);

  const seekAudioTo = React.useCallback(
    (targetSeconds: number) => {
      const clampedSec = Math.max(0, Math.min(totalAudioSeconds, targetSeconds));
      const targetChar = secondsToCharOffset(
        narration.fullText,
        clampedSec,
        totalAudioSeconds,
        narration.beatRanges
      );

      audioSecondsRef.current = clampedSec;
      charOffsetRef.current = targetChar;
      setAudioSeconds(clampedSec);

      const beatIdx = resolveBeatIndexForChar(narration.beatRanges, targetChar);
      setSpeakingBeat(clampedSec > 0 || isPlayingRef.current ? beatIdx : null);
      setHasStartedAudio(clampedSec > 0);

      if (isPlayingRef.current) {
        if (clampedSec >= totalAudioSeconds) {
          cancelActiveSpeech();
          setIsPlaying(false);
          setHasStartedAudio(false);
          setSpeakingBeat(null);
          setAudioSeconds(0);
          audioSecondsRef.current = 0;
          charOffsetRef.current = 0;
        } else {
          startSpeechFromOffset(targetChar, playbackSpeed, voicePersona);
        }
      }
    },
    [
      totalAudioSeconds,
      narration.fullText,
      narration.beatRanges,
      cancelActiveSpeech,
      startSpeechFromOffset,
      playbackSpeed,
      voicePersona,
    ]
  );

  const skipAudioSeconds = React.useCallback(
    (deltaSeconds: number) => {
      seekAudioTo(audioSecondsRef.current + deltaSeconds);
    },
    [seekAudioTo]
  );

  const cyclePlaybackSpeed = React.useCallback(() => {
    const next: 1 | 1.25 | 1.5 =
      playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
    setPlaybackSpeed(next);
    if (isPlayingRef.current) {
      startSpeechFromOffset(charOffsetRef.current, next, voicePersona);
    }
  }, [playbackSpeed, startSpeechFromOffset, voicePersona]);

  const setVoicePersona = React.useCallback(
    (nextPersona: VoicePersona) => {
      setVoicePersonaState(nextPersona);
      if (isPlayingRef.current) {
        startSpeechFromOffset(charOffsetRef.current, playbackSpeed, nextPersona);
      }
    },
    [startSpeechFromOffset, playbackSpeed]
  );

  const cycleVoicePersona = React.useCallback(() => {
    const nextPersona: VoicePersona = voicePersona === 'clear' ? 'warm' : 'clear';
    setVoicePersona(nextPersona);
  }, [voicePersona, setVoicePersona]);

  // Clicking "Listen" reveals the Audio Companion WITHOUT auto-playing.
  // Playback only begins when the user explicitly clicks Play/Start.
  const setReadingMode = React.useCallback(
    (mode: 'read' | 'listen') => {
      if (mode === 'read') {
        if (isPlayingRef.current) {
          pauseAudio();
        }
        setListenMode(false);
      } else {
        setListenMode(true);
      }
    },
    [pauseAudio]
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

  // Interactive Beat 3 & 4->5 Playbook persistence handlers
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
      await markLessonComplete(
        lesson.id,
        realReadingMinutes,
        {
          chosenMoveId: effectiveMoveId,
          bookmarkedTruth,
          savedPushbackIds,
        },
        lesson.slug
      );
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
    lesson.slug,
    realReadingMinutes,
    bookmarkedTruth,
    savedPushbackIds,
    onLessonComplete,
  ]);

  /**
   * Automatically completes the current lesson when the parent advances to
   * the next episode or finishes the final episode of a course.
   */
  const completeBeforeNavigate = React.useCallback(async () => {
    if (isCompleted) return;
    const effectiveMoveId = chosenMoveId ?? payload.moves[0]?.id ?? null;
    try {
      await markLessonComplete(
        lesson.id,
        realReadingMinutes,
        {
          chosenMoveId: effectiveMoveId,
          bookmarkedTruth,
          savedPushbackIds,
        },
        lesson.slug
      );
      setIsCompleted(true);
      onLessonComplete?.();
    } catch {
      // Never block navigation on network failure
    }
  }, [
    isCompleted,
    chosenMoveId,
    payload.moves,
    lesson.id,
    lesson.slug,
    realReadingMinutes,
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
    hasStartedAudio,
    playbackSpeed,
    voicePersona,
    setVoicePersona,
    cycleVoicePersona,
    audioSeconds,
    totalAudioSeconds,
    beatRanges: narration.beatRanges,
    realReadingMinutes,
    speakingBeat,
    audioRef,
    onAudioError: () => setAudioFileFailed(true),
    togglePlayAudio,
    skipAudioSeconds,
    seekAudioTo,
    cyclePlaybackSpeed,
    pauseAudio,
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
    completeBeforeNavigate,
    isShareModalOpen,
    setIsShareModalOpen,
    openAdvisorWithLessonContext,
  };
}
