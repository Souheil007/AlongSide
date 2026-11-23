'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import type { ChildDTO } from '@alongside/shared';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { useChildContextStore } from '@/stores/useChildContextStore';

const DynamicChildOnboardingFlow = dynamic(
  () => import('./ChildOnboardingFlow').then((mod) => mod.ChildOnboardingFlow),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 bg-white rounded-2xl flex items-center justify-center min-h-[360px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#143D2B] border-t-transparent animate-spin" />
          <p className="text-sm font-medium text-[#494F4C]">Loading Child Onboarding...</p>
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl p-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl my-auto"
      >
        {open && (
          <DynamicChildOnboardingFlow
            isModal
            onSuccess={handleSuccess}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
