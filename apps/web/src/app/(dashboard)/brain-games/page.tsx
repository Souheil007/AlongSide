import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Puzzle,
  Sparkles,
  Clock,
  CheckCircle2,
  Smile,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CANONICAL_BRAIN_GAMES } from '@/lib/api/brainGames';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Brain Games & Purposeful Play — AlongSide Family OS',
  description:
    'Age-indexed purposeful play matrix: puppet emotional sparring, sensory tactile bins, logic puzzles, and boredom busters.',
};

export default function BrainGamesPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-600 text-white shadow-xs">
              <Puzzle className="h-3.5 w-3.5" />
            </span>
            <Badge variant="outline" className="text-[10px] text-amber-800 bg-amber-50 border-amber-200 font-bold">
              Domain Hub 4: Purposeful Play
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Brain Games & Purposeful Play
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Age-indexed screen-free play matrix: puppet sparring, sensory exploration, construction blocks, and dinner dilemma debates.
          </p>
        </div>

        <Link href="/dashboard">
          <Button variant="outline" className="min-h-[44px] gap-2 text-xs font-semibold">
            <span>Back to Family Dashboard</span>
          </Button>
        </Link>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CANONICAL_BRAIN_GAMES.map((game) => (
          <Card key={game.id} className="border-slate-200/90 bg-white hover:border-amber-300 transition-all shadow-xs overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100 bg-gradient-to-r from-amber-50/30 via-white to-transparent">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {game.category.replace('_', ' ')}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  {game.estimatedMinutes} mins • 100% Screen-Free
                </span>
              </div>
              <CardTitle className="text-base font-bold text-slate-900 mt-1">
                {game.title}
              </CardTitle>
              <CardDescription className="text-xs text-slate-600">
                {game.summary}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-5 space-y-3">
              <div className="rounded-xl bg-slate-50 p-3 space-y-1 text-xs text-slate-700">
                <span className="font-bold text-slate-900 text-[11px] uppercase tracking-wider block">
                  Instructions:
                </span>
                <p className="leading-relaxed text-[11px] sm:text-xs">
                  {game.instructions}
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Target Developmental Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {game.targetSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800 border border-teal-200/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
