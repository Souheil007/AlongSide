'use client';

import * as React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Smartphone,
  Copy,
  Check,
  Shield,
  Download,
  Settings,
  Moon,
} from 'lucide-react';
import { DevicePlatform } from '@alongside/shared';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { formatCurfew12Hour } from '@/stores/usePactStore';
import { getOtaEnrollmentUrl } from '@/lib/api/devices';
import { cn } from '@/lib/utils';

export interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollmentToken: string;
  childName: string;
  curfewTime?: string;
  platform?: DevicePlatform;
}

export function EnrollmentModal({
  isOpen,
  onClose,
  enrollmentToken,
  childName,
  curfewTime = '20:30',
  platform = DevicePlatform.APPLE_IOS,
}: EnrollmentModalProps) {
  const [copied, setCopied] = React.useState(false);
  const [activePlatform, setActivePlatform] = React.useState<DevicePlatform>(platform);

  const formattedCurfew = formatCurfew12Hour(curfewTime);
  const enrollmentUrl = getOtaEnrollmentUrl(enrollmentToken);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(enrollmentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const isIos = activePlatform === DevicePlatform.APPLE_IOS;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 bg-[var(--elevated)] border-[var(--hairline)]">
        <DialogHeader className="space-y-1.5 pb-2">
          <span className="text-[12.5px] font-semibold text-[var(--spruce)]">
            Pact-as-Code setup · Zero spyware
          </span>
          <DialogTitle className="font-serif-almanac text-[24px] font-semibold text-[var(--ink)] tracking-tight">
            Set up {childName}&apos;s {formattedCurfew} bedtime dock
          </DialogTitle>
          <DialogDescription className="text-[13.5px] text-[var(--body)] leading-relaxed">
            Scan this code with {childName}&apos;s camera to turn on automatic nightly downtime.
          </DialogDescription>
        </DialogHeader>

        {/* Platform Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--canvas-subtle)] border border-[var(--hairline)] rounded-[10px] mb-4 text-[13px] font-medium">
          <button
            type="button"
            onClick={() => setActivePlatform(DevicePlatform.APPLE_IOS)}
            className={cn(
              'flex-1 min-h-[38px] py-2 px-3 rounded-[7px] transition-colors text-center cursor-pointer',
              isIos
                ? 'bg-[var(--elevated)] text-[var(--ink)] font-semibold shadow-2xs'
                : 'text-[var(--body)] hover:text-[var(--ink)]'
            )}
          >
            iPhone / iPad (.mobileconfig)
          </button>
          <button
            type="button"
            onClick={() => setActivePlatform(DevicePlatform.ANDROID_ENTERPRISE)}
            className={cn(
              'flex-1 min-h-[38px] py-2 px-3 rounded-[7px] transition-colors text-center cursor-pointer',
              !isIos
                ? 'bg-[var(--elevated)] text-[var(--ink)] font-semibold shadow-2xs'
                : 'text-[var(--body)] hover:text-[var(--ink)]'
            )}
          >
            Android device
          </button>
        </div>

        {/* QR Code Box */}
        <div className="flex flex-col items-center justify-center p-6 rounded-[14px] border border-[#E6DEC9] bg-[#FAF7F2] mb-5 text-center">
          <div className="p-4 bg-white rounded-[14px] border border-[var(--hairline)] mb-3">
            <QRCodeSVG
              value={enrollmentUrl}
              size={176}
              level="H"
              includeMargin={false}
              aria-label={`Enrollment QR Code for ${childName}`}
            />
          </div>

          <div className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--spruce)] mb-1">
            <Moon className="h-4 w-4" aria-hidden="true" />
            <span>Pauses apps at {formattedCurfew} nightly</span>
          </div>
          <p className="text-[12.5px] text-[var(--body)] max-w-sm">
            Point {childName}&apos;s camera at this code—emergency calls and parents stay open 24/7.
          </p>
        </div>

        {/* 3-Step Installation Guide */}
        <div className="rounded-[14px] border border-[var(--hairline)] bg-[var(--canvas)] p-4 mb-4 space-y-3">
          <h4 className="text-[13px] font-semibold text-[var(--ink)]">
            3 quick steps on {childName}&apos;s {isIos ? 'iPhone or iPad' : 'Android device'}
          </h4>

          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--spruce)] text-white text-[12px] font-semibold mt-0.5 tabular-nums">
                1
              </span>
              <div className="space-y-0.5">
                <div className="text-[13px] font-semibold text-[var(--ink)] flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                  <span>Scan with the Camera app</span>
                </div>
                <p className="text-[12.5px] text-[var(--body)] leading-relaxed">
                  Open the camera on {childName}&apos;s device and tap the link banner that pops up.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--spruce)] text-white text-[12px] font-semibold mt-0.5 tabular-nums">
                2
              </span>
              <div className="space-y-0.5">
                <div className="text-[13px] font-semibold text-[var(--ink)] flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                  <span>Tap &ldquo;Allow&rdquo; on the profile prompt</span>
                </div>
                <p className="text-[12.5px] text-[var(--body)] leading-relaxed">
                  When prompted to download the configuration profile, tap <strong>Allow</strong>, then <strong>Close</strong>.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--spruce)] text-white text-[12px] font-semibold mt-0.5 tabular-nums">
                3
              </span>
              <div className="space-y-0.5">
                <div className="text-[13px] font-semibold text-[var(--ink)] flex items-center gap-1.5">
                  <Settings className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                  <span>Open Settings → Profile Downloaded → Install</span>
                </div>
                <p className="text-[12.5px] text-[var(--body)] leading-relaxed">
                  Open Settings on {childName}&apos;s phone, tap <strong>Profile Downloaded</strong> near the top, tap <strong>Install</strong>, and confirm with the passcode.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Copy Direct Link */}
        <div className="rounded-[12px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="text-left w-full sm:w-auto min-w-0">
            <span className="block text-[12.5px] font-semibold text-[var(--ink)]">
              Or open this link on the device
            </span>
            <span className="block text-[11.5px] text-[var(--mute)] font-mono truncate max-w-xs">
              {enrollmentUrl}
            </span>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="w-full sm:w-auto gap-1.5 text-xs min-h-[40px] shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--spruce)]" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy link</span>
              </>
            )}
          </Button>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2 text-[12px] text-[var(--mute)] pt-2 border-t border-[var(--hairline-soft)]">
          <Shield className="h-4 w-4 text-[var(--spruce)] shrink-0" aria-hidden="true" />
          <span>
            Signed with a cryptographic PKCS#7 certificate. If the profile is removed, you get a calm notice in Alongside.
          </span>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="button" variant="forest" onClick={onClose} className="px-6 rounded-[8px]">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
