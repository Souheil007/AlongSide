'use client';

import * as React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldAlert,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import {
  CANONICAL_READINESS_QUESTIONS,
  READINESS_CHAPTERS,
  personalizeReadinessCopy,
  type ReadinessQuestion,
  type ReadinessQuestionOption,
  useReadinessStore,
} from '@/stores/useReadinessStore';
import { useChild } from '@/hooks/useChildren';
import { Button } from '@/components/ui/Button';
import { ReadinessScoreCard } from './ReadinessScoreCard';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export interface ReadinessWizardProps {
  child?: ChildDTO;
  childId?: string;
  childName?: string;
  onCompleted?: () => void;
  className?: string;
}

export function ReadinessWizard({
  child,
  childId: propChildId,
  childName: propChildName,
  onCompleted,
  className,
}: ReadinessWizardProps) {
  const targetChildId = child?.id || propChildId || '';
  const targetChildName = child?.name || propChildName || 'your child';

  const {
    currentQuestionIndex,
    answers,
    result,
    isSubmitting,
    setChild,
    setAnswer,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    reset,
    setResult,
    setIsSubmitting,
    computeLocalResult,
  } = useReadinessStore();

  const { submitReadiness } = useChild(targetChildId);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [showInsight, setShowInsight] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (targetChildId) {
      setChild(targetChildId, targetChildName);
    }
  }, [targetChildId, targetChildName, setChild]);

  // Collapse the optional insight when advancing to a fresh question so every screen stays calm
  React.useEffect(() => {
    setShowInsight(false);
  }, [currentQuestionIndex]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
          );
        }
      });
      return () => mm.revert();
    },
    { scope: cardRef, dependencies: [currentQuestionIndex] }
  );

  const questions = CANONICAL_READINESS_QUESTIONS;
  const question: ReadinessQuestion | undefined = questions[currentQuestionIndex];
  const currentAnswer = question ? answers[question.dimensionKey] : undefined;
  const answeredCount = Object.keys(answers).length;
  const isCurrentAnswered = Boolean(currentAnswer);
  const isFinalStep = currentQuestionIndex === questions.length - 1;
  const firstUnansweredIndex = questions.findIndex(
    (q) => !answers[q.dimensionKey]
  );
  const allAnswered = firstUnansweredIndex === -1;

  const handleSelectOption = React.useCallback(
    (option: ReadinessQuestionOption) => {
      if (!question) return;
      setAnswer(question.dimensionKey, {
        questionId: question.id,
        dimensionKey: question.dimensionKey,
        score: option.score,
        maxScore: 10,
        selectedOptionId: option.id,
      });
      setSubmitError(null);
    },
    [question, setAnswer]
  );

  const handleSubmit = React.useCallback(async () => {
    if (!allAnswered) {
      jumpToQuestion(firstUnansweredIndex);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const localResult = computeLocalResult();

    try {
      const formattedAnswers = Object.values(answers).map((ans) => ({
        questionId: ans.questionId,
        dimensionKey: ans.dimensionKey,
        score: ans.score,
        maxScore: ans.maxScore,
        selectedOptionId: ans.selectedOptionId,
      }));

      await submitReadiness({
        answers: formattedAnswers,
      });

      setResult(localResult);
      onCompleted?.();
    } catch (err) {
      console.warn('Readiness API submission fallback to local calculation:', err);
      setResult(localResult);
      onCompleted?.();
    } finally {
      setIsSubmitting(false);
    }
  }, [
    allAnswered,
    firstUnansweredIndex,
    jumpToQuestion,
    setIsSubmitting,
    computeLocalResult,
    answers,
    submitReadiness,
    setResult,
    onCompleted,
  ]);

  const handleNext = React.useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    }
  }, [currentQuestionIndex, questions.length, nextQuestion]);

  // Keyboard ergonomics: 1-4 picks an option, Enter advances once answered
  React.useEffect(() => {
    if (result || !question) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (event.key >= '1' && event.key <= '4') {
        const option = question.options[Number(event.key) - 1];
        if (option) {
          event.preventDefault();
          handleSelectOption(option);
        }
      } else if (event.key === 'Enter' && isCurrentAnswered && !isSubmitting) {
        if (target?.tagName === 'BUTTON') return;
        event.preventDefault();
        if (isFinalStep) {
          void handleSubmit();
        } else {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    result,
    question,
    isCurrentAnswered,
    isFinalStep,
    isSubmitting,
    handleSelectOption,
    handleNext,
    handleSubmit,
  ]);

  const handleRetake = () => {
    reset();
    setSubmitError(null);
  };

  if (result) {
    return (
      <ReadinessScoreCard
        childId={targetChildId}
        childName={targetChildName}
        result={result}
        onRetake={handleRetake}
        dashboardHref="/devices"
        className={className}
      />
    );
  }

  if (!question) {
    return null;
  }

  const activeChapter = READINESS_CHAPTERS.find((c) => c.id === question.chapter);
  const personalizedQuestion = personalizeReadinessCopy(
    question.questionText,
    targetChildName
  );

  return (
    <div className={cn('space-y-6', className)}>
      {/* Quiet Editorial Header */}
      <header className="space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-serif-almanac text-[26px] sm:text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--ink)]">
            Device readiness check-in
          </h1>
          <span className="text-[13px] font-medium text-[var(--mute)] tabular-nums">
            {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <p className="text-sm text-[var(--body)] leading-relaxed max-w-[58ch]">
          Pick what happens on an ordinary week with {targetChildName}. Honest answers
          give you a clearer roadmap—there are no wrong choices here.
        </p>
      </header>

      {/* 3-Chapter Progress Rail */}
      <nav
        aria-label="Check-in chapters"
        className="grid grid-cols-3 gap-2.5 sm:gap-3"
      >
        {READINESS_CHAPTERS.map((chapter) => {
          const chapterQuestions = questions
            .map((q, idx) => ({ q, idx }))
            .filter(({ q }) => q.chapter === chapter.id);
          const isCurrentChapter = chapter.id === question.chapter;
          const chapterDone = chapterQuestions.every(({ q }) =>
            Boolean(answers[q.dimensionKey])
          );

          return (
            <div key={chapter.id} className="space-y-2">
              <div className="flex items-center justify-between gap-1">
                <span
                  className={cn(
                    'text-[12px] sm:text-[13px] font-medium truncate transition-colors',
                    isCurrentChapter
                      ? 'text-[var(--spruce)] font-semibold'
                      : chapterDone
                        ? 'text-[var(--ink)]'
                        : 'text-[var(--mute)]'
                  )}
                >
                  {chapter.title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {chapterQuestions.map(({ q, idx }) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = Boolean(answers[q.dimensionKey]);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => jumpToQuestion(idx)}
                      aria-label={`Question ${idx + 1}: ${q.shortLabel}`}
                      title={q.shortLabel}
                      className="group relative flex-1 py-2 focus-visible:outline-none cursor-pointer"
                    >
                      <span
                        className={cn(
                          'block h-1.5 w-full rounded-full transition-colors duration-200',
                          isCurrent
                            ? 'bg-[var(--spruce)]'
                            : isAnswered
                              ? 'bg-[#6fa088]'
                              : 'bg-[var(--hairline)] group-hover:bg-[#cfc9bc]'
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Main Editorial Question Card */}
      <section
        ref={cardRef}
        aria-live="polite"
        className="overflow-hidden rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)]"
      >
        {/* Warm Sand Scene Header */}
        <div className="border-b border-[var(--hairline-soft)] bg-[var(--trigger-bg)] px-5 py-6 sm:px-8 sm:py-7 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[13px] font-semibold text-[var(--amber)]">
              {question.sceneTag}
            </span>
            {activeChapter && (
              <span className="text-[12px] text-[var(--mute)]">
                {question.shortLabel}
              </span>
            )}
          </div>

          <h2 className="font-serif-almanac text-[23px] sm:text-[28px] font-medium leading-[1.24] tracking-[-0.015em] text-[var(--ink)]">
            {personalizedQuestion}
          </h2>
        </div>

        {/* Options & Calm Actions */}
        <div className="px-5 py-6 sm:px-8 sm:py-7 space-y-5">
          <div
            className="space-y-2.5"
            role="radiogroup"
            aria-label={personalizedQuestion}
          >
            {question.options.map((option, idx) => {
              const isSelected = currentAnswer?.selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectOption(option)}
                  className={cn(
                    'w-full flex items-start gap-3.5 rounded-[12px] border px-4 py-3.5 sm:px-5 sm:py-4 text-left transition-colors duration-150 min-h-[64px] cursor-pointer',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spruce)] focus-visible:ring-offset-2',
                    isSelected
                      ? 'border-[var(--spruce)] bg-[var(--spruce-soft)]'
                      : 'border-[var(--hairline)] bg-[var(--canvas)] hover:border-[var(--spruce-border)] hover:bg-[var(--canvas-subtle)]'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold tabular-nums transition-colors',
                      isSelected
                        ? 'border-[var(--spruce)] bg-[var(--spruce)] text-white'
                        : 'border-[var(--hairline)] bg-[var(--elevated)] text-[var(--mute)]'
                    )}
                  >
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    ) : (
                      idx + 1
                    )}
                  </span>

                  <span className="flex-1 space-y-0.5">
                    <span className="block text-[15px] font-semibold leading-snug text-[var(--ink)]">
                      {option.headline}
                    </span>
                    <span className="block text-[13.5px] leading-[1.48] text-[var(--body)]">
                      {option.text}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quiet On-Demand Developmental Context */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowInsight((prev) => !prev)}
              aria-expanded={showInsight}
              className="inline-flex min-h-[40px] items-center gap-1.5 text-[13px] font-medium text-[var(--mute)] transition-colors hover:text-[var(--spruce)] cursor-pointer"
            >
              <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Why we ask this</span>
              {showInsight ? (
                <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>

            {showInsight && (
              <div className="mt-2 rounded-[12px] bg-[var(--canvas-subtle)] px-4 py-3.5 text-[13.5px] leading-[1.58] text-[var(--body)] almanac-rise-in">
                {question.expertInsight}
              </div>
            )}
          </div>

          {submitError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800"
            >
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex items-center justify-between gap-3 border-t border-[var(--hairline-soft)] pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0 || isSubmitting}
              className="gap-1.5 rounded-[8px]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back</span>
            </Button>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-[12px] text-[var(--mute)] tabular-nums">
                {answeredCount} of {questions.length} answered
              </span>

              {isFinalStep ? (
                <Button
                  type="button"
                  variant="forest"
                  onClick={handleSubmit}
                  disabled={!isCurrentAnswered || isSubmitting}
                  isLoading={isSubmitting}
                  className="gap-2 rounded-[8px] px-5"
                >
                  <span>
                    {allAnswered
                      ? `See ${targetChildName}'s snapshot`
                      : `Review remaining (${questions.length - answeredCount})`}
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="forest"
                  onClick={handleNext}
                  disabled={!isCurrentAnswered}
                  className="gap-1.5 rounded-[8px] px-5"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
