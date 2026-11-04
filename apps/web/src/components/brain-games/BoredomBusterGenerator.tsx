'use client';

import * as React from 'react';
import {
  Sparkles,
  Dices,
  Layers,
  Clock,
  Compass,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ShieldAlert,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  BOREDOM_BUSTER_PROMPTS,
  WHINING_VALLEY_STAGES,
  type BoredomBusterPrompt,
} from '@/lib/api/brainGames';

export function BoredomBusterGenerator() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [currentPrompt, setCurrentPrompt] = React.useState<BoredomBusterPrompt>(
    BOREDOM_BUSTER_PROMPTS[0]!
  );
  const [isRolling, setIsRolling] = React.useState(false);
  const [showWhiningGuide, setShowWhiningGuide] = React.useState(true);

  const filteredPrompts = React.useMemo(() => {
    if (selectedCategory === 'all') return BOREDOM_BUSTER_PROMPTS;
    return BOREDOM_BUSTER_PROMPTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleRollPrompt = () => {
    setIsRolling(true);
    setTimeout(() => {
      const candidates = filteredPrompts.filter((p) => p.id !== currentPrompt.id);
      const pool = candidates.length > 0 ? candidates : filteredPrompts;
      const nextIndex = Math.floor(Math.random() * pool.length);
      setCurrentPrompt(pool[nextIndex] || pool[0]!);
      setIsRolling(false);
    }, 250);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-50/50 via-slate-50 to-white border-b border-slate-100 p-5 sm:p-6 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white shadow-xs">
                <Compass className="h-4 w-4" />
              </span>
              <Badge
                variant="outline"
                className="text-[11px] font-bold text-teal-900 bg-teal-50 border-teal-200"
              >
                100% Screen-Free Dopamine Reset
              </Badge>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Only Simple Household Materials
            </span>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            The Boredom Buster Protocol Generator
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-slate-600">
            Neuroscience-backed screen-free challenges designed to catalyze the Default Mode Network and spark autonomous imaginative play.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 space-y-6">
          {/* Category Filter Pills & Roll Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Challenges' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'science', label: 'Science' },
                { id: 'art', label: 'Art & Drama' },
                { id: 'movement', label: 'Movement' },
                { id: 'mystery', label: 'Logic & Mystery' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    const matching =
                      cat.id === 'all'
                        ? BOREDOM_BUSTER_PROMPTS
                        : BOREDOM_BUSTER_PROMPTS.filter((p) => p.category === cat.id);
                    if (matching[0]) setCurrentPrompt(matching[0]);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] ${
                    selectedCategory === cat.id
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <Button
              type="button"
              onClick={handleRollPrompt}
              disabled={isRolling}
              className="min-h-[44px] gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-xs transition-all shrink-0"
            >
              <Dices className={`h-4 w-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? 'Rolling...' : 'Roll New Challenge'}</span>
            </Button>
          </div>

          {/* Active Challenge Display Card */}
          <div className="rounded-2xl border-2 border-teal-200/80 bg-gradient-to-br from-teal-50/40 via-white to-amber-50/20 p-5 sm:p-6 space-y-5 shadow-2xs relative">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-md bg-teal-100 text-teal-900 px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
                {currentPrompt.categoryLabel}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-white/80 border border-slate-200/80 px-2.5 py-1 rounded-full">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span>~{currentPrompt.timeEstimateMinutes} mins flow</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentPrompt.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {currentPrompt.challenge}
              </p>
            </div>

            {/* Household Materials Needed */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Grab These from Around the House:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentPrompt.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Dual Insights: Neuro Benefit & Secret Parent Tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="rounded-xl bg-teal-50/70 border border-teal-200 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-900">
                  <Sparkles className="h-3.5 w-3.5 text-teal-700" />
                  <span>Neurodevelopmental Engine:</span>
                </div>
                <p className="text-xs text-teal-950 font-medium leading-relaxed">
                  {currentPrompt.neuroBenefit}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-900">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-700" />
                  <span>Parent Coaching Cue:</span>
                </div>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  {currentPrompt.secretTipForParents}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parental Guidance Section: The 15-Minute Whining Valley */}
      <Card className="border-amber-200/80 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 shadow-xs">
        <CardHeader className="p-5 sm:p-6 pb-3 border-b border-amber-100 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-700" />
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900">
                Surviving the 15-Minute "Whining Valley"
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-600">
              Why boredom is neurological gold—and how giving into screen rescue aborts the creative ignition sequence.
            </CardDescription>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowWhiningGuide(!showWhiningGuide)}
            className="text-xs font-semibold text-amber-900 hover:bg-amber-100/60"
          >
            {showWhiningGuide ? 'Collapse Guide' : 'Expand Guide'}
          </Button>
        </CardHeader>

        {showWhiningGuide && (
          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="rounded-xl bg-white border border-amber-200/80 p-4 space-y-1 text-xs text-slate-700">
              <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wider">
                The Science of Screen Rescues:
              </span>
              <p className="leading-relaxed">
                When a child says <em>“I’m bored!”</em> and we hand them an iPad, we unintentionally teach their brain that discomfort must be instantaneously medicated with external dopamine. Allowing boredom forces the brain’s <strong>Default Mode Network</strong> to scan its own internal memory and curiosity bank, birthing true original thought.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {WHINING_VALLEY_STAGES.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase">
                      {step.stage}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {step.badge}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-2.5 text-[11px] text-slate-800 space-y-0.5">
                    <span className="font-bold text-slate-900 block text-[10px] uppercase">
                      Parent Script:
                    </span>
                    <p className="italic leading-snug">{step.parentAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
