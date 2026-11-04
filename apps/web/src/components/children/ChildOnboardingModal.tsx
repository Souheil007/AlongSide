'use client';

import * as React from 'react';
import type { ChildDTO } from '@alongside/shared';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { ChildOnboardingFlow } from './ChildOnboardingFlow';
import { useChildContextStore } from '@/stores/useChildContextStore';

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
        <ChildOnboardingFlow
          isModal
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
