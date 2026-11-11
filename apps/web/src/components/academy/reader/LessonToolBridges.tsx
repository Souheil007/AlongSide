'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bot, FileText, BookmarkCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface LessonToolBridgesProps {
  scenarioPrompt?: string;
  pactClause?: string;
  isNightstandMode?: boolean;
  className?: string;
}

export function LessonToolBridges({
  scenarioPrompt,
  pactClause,
  isNightstandMode = false,
  className,
}: LessonToolBridgesProps) {
  const [savedToVault, setSavedToVault] = React.useState<boolean>(false);

  const advisorHref = scenarioPrompt
    ? `/advisor?scenario=${encodeURIComponent(scenarioPrompt)}`
    : '/advisor';

  const agreementsHref = pactClause
    ? `/agreements?clause=${encodeURIComponent(pactClause)}`
    : '/agreements';

  const handleSaveVault = () => {
    setSavedToVault(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const existing = JSON.parse(
          window.localStorage.getItem('alongside-script-vault') || '[]'
        );
        existing.push({
          scenario: scenarioPrompt || 'Academy Lesson Script',
          savedAt: new Date().toISOString(),
        });
        window.localStorage.setItem(
          'alongside-script-vault',
          JSON.stringify(existing)
        );
      } catch {
        // ignore
      }
    }
    setTimeout(() => setSavedToVault(false), 2500);
  };

  return (
    <section
      data-testid="tool-bridges"
      aria-label="Integrated Tool Action Bridges"
      className={cn(
        'rounded-2xl border p-5 sm:p-6 space-y-4 my-8 shadow-xs transition-colors',
        isNightstandMode
          ? 'bg-stone-900 border-stone-800 text-stone-200'
          : 'bg-white border-slate-200/90 text-slate-800',
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
        <Sparkles className="h-4 w-4 text-teal-600" />
        <span>Active Tool Bridges · Practice &amp; Enforce</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
        {/* 1. AI Sparring Sandbox */}
        <Link href={advisorHref} className="block">
          <Button
            type="button"
            variant="outline"
            data-testid="practice-with-ai-advisor-btn"
            className={cn(
              'w-full h-auto py-3 px-3.5 flex flex-col items-start gap-1 text-left rounded-xl border transition-all',
              isNightstandMode
                ? 'bg-stone-800/80 border-stone-700 hover:border-teal-500 text-stone-200'
                : 'bg-teal-50/40 border-teal-200 hover:border-teal-400 text-slate-900'
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-1.5 font-bold text-xs text-teal-700 dark:text-teal-300">
                <Bot className="h-3.5 w-3.5" />
                Practice with AI
              </span>
              <ArrowRight className="h-3 w-3 text-teal-600" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-normal leading-tight">
              Spar in the 24/7 simulator before using live
            </p>
          </Button>
        </Link>

        {/* 2. Add Clause to Family Pact */}
        <Link href={agreementsHref} className="block">
          <Button
            type="button"
            variant="outline"
            data-testid="add-clause-pact-btn"
            className={cn(
              'w-full h-auto py-3 px-3.5 flex flex-col items-start gap-1 text-left rounded-xl border transition-all',
              isNightstandMode
                ? 'bg-stone-800/80 border-stone-700 hover:border-indigo-500 text-stone-200'
                : 'bg-indigo-50/40 border-indigo-200 hover:border-indigo-400 text-slate-900'
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-1.5 font-bold text-xs text-indigo-700 dark:text-indigo-300">
                <FileText className="h-3.5 w-3.5" />
                Add to Family Pact
              </span>
              <ArrowRight className="h-3 w-3 text-indigo-600" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-normal leading-tight">
              Embed this boundary into device rules
            </p>
          </Button>
        </Link>

        {/* 3. Pocket Script Vault */}
        <Button
          type="button"
          variant="outline"
          onClick={handleSaveVault}
          data-testid="save-to-vault-btn"
          className={cn(
            'w-full h-auto py-3 px-3.5 flex flex-col items-start gap-1 text-left rounded-xl border transition-all sm:col-span-2 md:col-span-1',
            isNightstandMode
              ? 'bg-stone-800/80 border-stone-700 hover:border-amber-500 text-stone-200'
              : 'bg-amber-50/40 border-amber-200 hover:border-amber-400 text-slate-900'
          )}
        >
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center gap-1.5 font-bold text-xs text-amber-700 dark:text-amber-300">
              <BookmarkCheck className="h-3.5 w-3.5" />
              {savedToVault ? 'Saved to Vault!' : 'Save to Vault'}
            </span>
            <ArrowRight className="h-3 w-3 text-amber-600" />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-stone-400 font-normal leading-tight">
            Pin to quick-reference mobile pocket drawer
          </p>
        </Button>
      </div>
    </section>
  );
}
