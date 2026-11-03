'use client';

import * as React from 'react';
import type { ChildDTO } from '@alongside/shared';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { ChildOnboardingFlow } from './ChildOnboardingFlow';

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
    if (onSuccess) {
      onSuccess(child);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-2xl">
        <ChildOnboardingFlow
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
