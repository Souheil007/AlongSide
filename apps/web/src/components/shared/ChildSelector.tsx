'use client';

import * as React from 'react';
import { ChevronDown, Plus, Check, User, Sparkles } from 'lucide-react';
import type { ChildDTO } from '@alongside/shared';
import {
  useChildContextStore,
  selectActiveChild,
  formatChildAge,
  getChildDevelopmentalHorizon,
} from '@/stores/useChildContextStore';
import { useChildren } from '@/hooks/useChildren';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';
import { cn } from '@/lib/utils';

export interface ChildSelectorProps {
  className?: string;
  variant?: 'header' | 'compact' | 'expanded';
}

export function ChildSelector({ className, variant = 'header' }: ChildSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [onboardingOpen, setOnboardingOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Read from store
  const { children, activeChildId, setActiveChild, setChildren, fetchChildren } =
    useChildContextStore();

  // Sync with react-query useChildren hook
  const { children: queryChildren, isLoading: queryLoading } = useChildren();

  React.useEffect(() => {
    if (queryChildren && queryChildren.length > 0) {
      setChildren(queryChildren);
    } else if (!queryLoading && children.length === 0) {
      // Fetch or seed default demo children if none exists
      fetchChildren();
    }
  }, [queryChildren, queryLoading]);

  // Click outside listener to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const activeChild = selectActiveChild({ children, activeChildId });

  const handleSelectChild = (childId: string) => {
    setActiveChild(childId);
    setIsOpen(false);
  };

  const handleAddChildSuccess = (newChild: ChildDTO) => {
    setOnboardingOpen(false);
    setChildren([...children, newChild]);
    setActiveChild(newChild.id);
  };

  if (!activeChild && children.length === 0) {
    return (
      <div className={cn('relative inline-flex items-center', className)}>
        <button
          type="button"
          onClick={() => setOnboardingOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50/80 px-2.5 py-1.5 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <Plus className="h-3.5 w-3.5 text-teal-600" />
          <span>Add Child</span>
        </button>
        <ChildOnboardingModal
          open={onboardingOpen}
          onOpenChange={setOnboardingOpen}
          onSuccess={handleAddChildSuccess}
        />
      </div>
    );
  }

  const horizon = activeChild
    ? getChildDevelopmentalHorizon(activeChild.developmentalTier || activeChild.age)
    : null;

  return (
    <div ref={dropdownRef} className={cn('relative inline-block text-left', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-1.5 text-left text-xs font-medium text-slate-800 shadow-2xs transition-all hover:border-teal-300 hover:bg-slate-50/90 focus:outline-none focus:ring-2 focus:ring-teal-600/30',
          variant === 'compact' && 'px-2 py-1 text-xs',
          isOpen && 'border-teal-500 ring-2 ring-teal-500/20'
        )}
      >
        {/* Child Avatar with Initial */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-[11px] font-bold text-white shadow-2xs group-hover:scale-105 transition-transform">
          {activeChild?.name ? activeChild.name.charAt(0).toUpperCase() : <User className="h-3.5 w-3.5" />}
        </div>

        {/* Child Info */}
        <div className="flex flex-col min-w-0 pr-0.5">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-bold text-slate-900 text-xs sm:text-sm">
              {activeChild?.name || 'Select Child'}
            </span>
            {activeChild && (
              <span className="shrink-0 rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700 border border-teal-200/60">
                {formatChildAge(activeChild)}
              </span>
            )}
          </div>
          {variant !== 'compact' && horizon && (
            <span className="truncate text-[10px] text-slate-500 hidden sm:inline-block max-w-[140px]">
              {horizon.tierLabel.split(':')[1]?.trim() || horizon.stage}
            </span>
          )}
        </div>

        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 group-hover:text-slate-600',
            isOpen && 'rotate-180 text-teal-600'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 sm:left-0 sm:right-auto z-50 mt-2 w-72 origin-top-left rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Family Children ({children.length})
            </span>
            <span className="text-[10px] text-teal-700 font-medium">Instant Switch</span>
          </div>

          <div className="py-1 max-h-60 overflow-y-auto space-y-1">
            {children.map((child) => {
              const isSelected = child.id === activeChild?.id;
              const childHorizon = getChildDevelopmentalHorizon(
                child.developmentalTier || child.age
              );
              return (
                <button
                  key={child.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectChild(child.id)}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 text-left text-xs transition-colors',
                    isSelected
                      ? 'bg-teal-50/90 text-teal-900 font-medium'
                      : 'hover:bg-slate-50 text-slate-700'
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold shadow-2xs',
                        isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                      )}
                    >
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-semibold text-slate-900 text-xs">
                          {child.name}
                        </span>
                        <span className="shrink-0 text-[10px] text-slate-500 font-normal">
                          • {formatChildAge(child)}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate">
                        {childHorizon.stage}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-teal-600 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 mt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setOnboardingOpen(true);
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-teal-300 bg-teal-50/50 py-2 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-100/70"
            >
              <Plus className="h-3.5 w-3.5 text-teal-700" />
              <span>Add Another Child Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* Child Onboarding Modal */}
      <ChildOnboardingModal
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        onSuccess={handleAddChildSuccess}
      />
    </div>
  );
}
