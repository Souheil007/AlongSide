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

  // Click outside listener and Escape key to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
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
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[5px] border border-[#143D2B]/20 bg-[#EAF3EE] px-3 py-2 text-xs font-semibold text-[#143D2B] transition-colors hover:bg-[#D1E7DD] focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
          aria-label="Add child profile"
        >
          <Plus className="h-4 w-4 text-[#143D2B]" />
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

  // Expanded Variant: Rendered as a full interactive segmented list / bar
  if (variant === 'expanded') {
    return (
      <div className={cn('flex flex-wrap items-center gap-2', className)}>
        <div className="flex flex-wrap items-center gap-1.5 rounded-[6px] bg-[#F4F4F0] p-1.5 border border-[#E3E3DC]">
          {children.map((child) => {
            const isSelected = child.id === activeChild?.id;
            const horizon = getChildDevelopmentalHorizon(child.developmentalTier || child.age);
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => handleSelectChild(child.id)}
                className={cn(
                  'flex min-h-[44px] items-center gap-2.5 rounded-[5px] px-3.5 py-2 text-xs font-semibold transition-all',
                  isSelected
                    ? 'bg-white text-[#111413] shadow-xs border border-[#E3E3DC]'
                    : 'text-[#494F4C] hover:text-[#111413] hover:bg-[#EDEDEA]'
                )}
                aria-pressed={isSelected}
              >
                <div
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-[4px] text-xs font-bold text-white shadow-2xs',
                    isSelected ? 'bg-[#143D2B]' : 'bg-[#858C88]'
                  )}
                >
                  {child.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span>{child.name}</span>
                    <span className="text-[10px] text-[#858C88] font-normal font-mono">
                      • {formatChildAge(child)}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#858C88] font-medium">
                    {horizon.tierLabel.split(':')[1]?.trim() || horizon.stage}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setOnboardingOpen(true)}
          className="flex min-h-[44px] items-center gap-1.5 rounded-[5px] border border-dashed border-[#143D2B]/30 bg-[#EAF3EE]/60 px-3.5 py-2 text-xs font-semibold text-[#143D2B] transition-colors hover:bg-[#EAF3EE]"
          aria-label="Add another child"
        >
          <Plus className="h-4 w-4 text-[#143D2B]" />
          <span className="hidden sm:inline">Add Child</span>
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
        aria-label={`Active child: ${activeChild?.name || 'Select Child'}`}
        className={cn(
          'group inline-flex min-h-[44px] items-center gap-2 rounded-[5px] border border-[#E3E3DC] bg-white px-3 py-1.5 text-left text-xs font-medium text-[#111413] shadow-2xs transition-all hover:border-[#111413] hover:bg-[#F4F4F0] focus:outline-none focus:ring-2 focus:ring-[#143D2B]/30',
          variant === 'compact' && 'min-h-[38px] px-2 py-1 text-xs',
          isOpen && 'border-[#143D2B] ring-2 ring-[#143D2B]/20'
        )}
      >
        {/* Child Avatar with Initial */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#143D2B] text-[11px] font-bold text-white shadow-2xs group-hover:scale-105 transition-transform">
          {activeChild?.name ? (
            activeChild.name.charAt(0).toUpperCase()
          ) : (
            <User className="h-3.5 w-3.5" />
          )}
        </div>

        {/* Child Info */}
        <div className="flex flex-col min-w-0 pr-0.5">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-bold text-[#111413] text-xs sm:text-sm">
              {activeChild?.name || 'Select Child'}
            </span>
            {activeChild && (
              <span className="shrink-0 rounded-full bg-[#EAF3EE] px-2 py-0.5 text-[10px] font-semibold text-[#143D2B] border border-[#143D2B]/20 font-mono">
                {formatChildAge(activeChild)}
              </span>
            )}
          </div>
          {variant !== 'compact' && horizon && (
            <span className="truncate text-[10px] text-[#858C88] hidden sm:inline-block max-w-[140px]">
              {horizon.tierLabel.split(':')[1]?.trim() || horizon.stage}
            </span>
          )}
        </div>

        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-[#858C88] transition-transform duration-200 group-hover:text-[#111413]',
            isOpen && 'rotate-180 text-[#143D2B]'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Family Children list"
          className="absolute right-0 sm:left-0 sm:right-auto z-50 mt-2 w-72 origin-top-left rounded-[10px] border border-[#E3E3DC] bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-2 border-b border-[#E3E3DC] flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#858C88]">
              Family Children ({children.length})
            </span>
            <span className="text-[10px] text-[#143D2B] font-semibold font-mono">Instant Switch</span>
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
                    'w-full flex items-center justify-between gap-3 rounded-[5px] px-2.5 py-2 text-left text-xs transition-colors min-h-[44px]',
                    isSelected
                      ? 'bg-[#EAF3EE] text-[#143D2B] font-semibold'
                      : 'hover:bg-[#F4F4F0] text-[#494F4C]'
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] text-xs font-bold shadow-2xs',
                        isSelected ? 'bg-[#143D2B] text-white' : 'bg-[#F4F4F0] text-[#494F4C] border border-[#E3E3DC]'
                      )}
                    >
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-semibold text-[#111413] text-xs">
                          {child.name}
                        </span>
                        <span className="shrink-0 text-[10px] text-[#858C88] font-mono">
                          • {formatChildAge(child)}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#858C88] truncate">
                        {childHorizon.stage}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-[#143D2B] text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 mt-1 border-t border-[#E3E3DC]">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setOnboardingOpen(true);
              }}
              className="w-full flex min-h-[40px] items-center justify-center gap-1.5 rounded-[5px] border border-dashed border-[#143D2B]/30 bg-[#EAF3EE]/50 py-2 text-xs font-semibold text-[#143D2B] transition-colors hover:bg-[#EAF3EE]"
            >
              <Plus className="h-3.5 w-3.5 text-[#143D2B]" />
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
