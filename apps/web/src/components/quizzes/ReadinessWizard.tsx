'use client';

import * as React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import {
  CANONICAL_READINESS_QUESTIONS,
  type ReadinessQuestion,
  type ReadinessQuestionOption,
  useReadinessStore,
} from '@/stores/useReadinessStore';
import { useChild } from '@/hooks/useChildren';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { ReadinessScoreCard } from './ReadinessScoreCard';

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
  const targetChildName = child?.name || propChildName || 'Your child';

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

  // Sync child to store on mount
  React.useEffect(() => {
    if (targetChildId) {
      setChild(targetChildId, targetChildName);
    }
  }, [targetChildId, targetChildName, setChild]);

  const questions = CANONICAL_READINESS_QUESTIONS;
  const question: ReadinessQuestion | undefined = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const currentAnswer = question ? answers[question.dimensionKey] : undefined;

  const handleSelectOption = (option: ReadinessQuestionOption) => {
    if (!question) return;
    setAnswer(question.dimensionKey, {
      questionId: question.id,
      dimensionKey: question.dimensionKey,
      score: option.score,
      maxScore: 10,
      selectedOptionId: option.id,
    });
    setSubmitError(null);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Compute the clinical evaluation locally
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
      // Graceful fallback to local computation so the parent is never blocked
      console.warn('Readiness API submission fallback to local calculation:', err);
      setResult(localResult);
      onCompleted?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    reset();
    setSubmitError(null);
  };

  // If assessment has been completed and result exists, render the ScoreCard
  if (result) {
    return (
      <ReadinessScoreCard
        childId={targetChildId}
        childName={targetChildName}
        result={result}
        onRetake={handleRetake}
        dashboardHref="/dashboard"
        className={className}
      />
    );
  }

  if (!question) {
    return null;
  }

  const isCurrentAnswered = Boolean(currentAnswer);
  const isFinalStep = currentQuestionIndex === questions.length - 1;
  const allAnswered = questions.every((q) => Boolean(answers[q.dimensionKey]));

  return (
    <div className={`max-w-3xl mx-auto space-y-6 ${className || ''}`}>
      {/* Top Header & Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5 text-teal-800">
            <Brain className="h-4 w-4 text-teal-600" />
            First-Phone Readiness Assessment • {targetChildName}
          </span>
          <span>
            Question {currentQuestionIndex + 1} of {questions.length} ({progressPercent}%)
          </span>
        </div>

        <Progress
          value={progressPercent}
          max={100}
          className="h-2"
          indicatorClassName="bg-teal-600 transition-all duration-300"
        />

        {/* Step Indicator Navigation Buttons */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
          {questions.map((q: ReadinessQuestion, idx: number) => {
            const answered = Boolean(answers[q.dimensionKey]);
            const isCurrent = idx === currentQuestionIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => jumpToQuestion(idx)}
                className={`h-2 flex-1 rounded-full transition-all duration-200 min-w-[20px] ${
                  isCurrent
                    ? 'bg-teal-600 ring-2 ring-teal-400 ring-offset-1'
                    : answered
                    ? 'bg-emerald-400'
                    : 'bg-slate-200'
                }`}
                title={`Step ${idx + 1}: ${q.dimensionName}`}
                aria-label={`Jump to question ${idx + 1}: ${q.dimensionName}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-2">
            <Badge variant="roadPre" className="text-[11px] font-semibold">
              Dimension {currentQuestionIndex + 1}: {question.dimensionName}
            </Badge>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {question.questionText}
          </CardTitle>

          {question.clinicalInsight && (
            <CardDescription className="flex items-start gap-2 p-3 rounded-lg bg-teal-50/60 border border-teal-100 text-teal-900 text-xs sm:text-sm leading-relaxed">
              <Sparkles className="h-4 w-4 text-teal-700 shrink-0 mt-0.5" />
              <span>
                <strong>Why This Matters:</strong> {question.clinicalInsight}
              </span>
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Options Radiogroup */}
          <div className="space-y-2.5" role="radiogroup" aria-label={question.questionText}>
            {question.options.map((option: ReadinessQuestionOption) => {
              const isSelected = currentAnswer?.selectedOptionId === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      handleSelectOption(option);
                    }
                  }}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer min-h-[56px] select-none ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/50 shadow-sm ring-1 ring-teal-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                  </div>

                  <div className="space-y-0.5 flex-1">
                    <p className={`text-sm font-semibold ${isSelected ? 'text-teal-950' : 'text-slate-900'}`}>
                      {option.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {submitError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-red-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0 || isSubmitting}
              className="gap-1.5 text-xs sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            {isFinalStep ? (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isCurrentAnswered || !allAnswered || isSubmitting}
                isLoading={isSubmitting}
                className="gap-2 shadow-sm min-w-[140px]"
              >
                Submit & View Report
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className="gap-1.5 shadow-sm min-w-[110px]"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
