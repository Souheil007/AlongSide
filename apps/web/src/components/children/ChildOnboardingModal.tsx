'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import type { ChildDTO } from '@alongside/shared';
import { useChildContextStore } from '@/stores/useChildContextStore';

const DynamicChildOnboardingFlow = dynamic(
  () => import('./ChildOnboardingFlow').then((mod) => mod.ChildOnboardingFlow),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 bg-[#FAF9F5] flex flex-col items-center justify-center h-full min-h-[360px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#143D2B] border-t-transparent animate-spin" />
          <p className="text-xs font-medium text-[#494F4C]">Loading sibling setup...</p>
        </div>
      </div>
    ),
  }
);

export interface ChildOnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (child: ChildDTO) => void;
}

export function ChildOnboardingModal({
  open,
  onOpenChange,
  onSuccess,
}: ChildOnboardingModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  const handleSuccess = (child: ChildDTO) => {
    // Synchronize store and select active child
    const store = useChildContextStore.getState();
    const existing = store.children;
    if (!existing.some((c) => c.id === child.id)) {
      store.setChildren([...existing, child]);
    }
    store.setActiveChild(child.id);

    if (onSuccess) {
      onSuccess(child);
    }
  };

  if (!open || !mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111413]/55 backdrop-blur-[2px] transition-opacity animate-in fade-in-0 duration-200"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-[101] w-full max-w-[484px] h-full flex flex-col bg-[#FAF9F5] shadow-[-20px_0_60px_rgba(14,24,19,0.28)] border-l border-[#E3E3DC] animate-in slide-in-from-right duration-300">
        <DynamicChildOnboardingFlow
          isModal
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </div>
    </div>,
    document.body
  );
}
