'use client';

import * as React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Smartphone,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  Download,
  Settings,
  HelpCircle,
  ExternalLink,
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
import { Badge } from '@/components/ui/Badge';
import { formatCurfew12Hour } from '@/stores/usePactStore';
import { getOtaEnrollmentUrl } from '@/lib/api/devices';

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
      // Fallback
      setCopied(false);
    }
  };

  const isIos = activePlatform === DevicePlatform.APPLE_IOS;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-7">
        <DialogHeader className="space-y-1.5 pb-2">
          <div className="flex items-center gap-2">
            <Badge variant="roadActive" className="text-[10px]">
              Road 2 Pact-as-Code
            </Badge>
            <span className="text-xs text-slate-500">Instant OTA Enrollment</span>
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
            One-Tap Device Enrollment for {childName}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-600 leading-relaxed">
            Scan this single cryptographic QR code using {childName}&apos;s camera to install the verified AlongSide bedtime profile.
          </DialogDescription>
        </DialogHeader>

        {/* Platform Selector Switch */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActivePlatform(DevicePlatform.APPLE_IOS)}
            className={`flex-1 py-2 px-3 rounded-lg transition-all text-center ${
              isIos
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Apple iPhone / iPad (.mobileconfig)
          </button>
          <button
            type="button"
            onClick={() => setActivePlatform(DevicePlatform.ANDROID_ENTERPRISE)}
            className={`flex-1 py-2 px-3 rounded-lg transition-all text-center ${
              !isIos
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Android Enterprise
          </button>
        </div>

        {/* QR Code Presentation Box */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-violet-100 bg-gradient-to-b from-violet-50/40 via-white to-slate-50/50 mb-5 text-center">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200/80 mb-3">
            <QRCodeSVG
              value={enrollmentUrl}
              size={180}
              level="H"
              includeMargin={false}
              aria-label={`Enrollment QR Code for ${childName}`}
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-violet-900 mb-1">
            <Moon className="h-4 w-4 text-violet-600" />
            <span>Automated Bedtime Lock: {formattedCurfew} Sharp</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-sm">
            Point {childName}&apos;s device camera at this code to begin OTA configuration.
          </p>
        </div>

        {/* 3-Step Visual Instruction Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 mb-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            3-Step Visual Installation Guide ({isIos ? 'iOS' : 'Android'})
          </h4>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white text-xs font-bold mt-0.5">
                1
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-violet-600" />
                  Scan with Camera App
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Open the built-in Camera on {childName}&apos;s device and tap the yellow Safari / Chrome link banner that appears over the QR code.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white text-xs font-bold mt-0.5">
                2
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5 text-violet-600" />
                  Tap &ldquo;Allow&rdquo; on Profile Prompt
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  When prompted &ldquo;This website is trying to download a configuration profile,&rdquo; tap <strong>Allow</strong>, then tap <strong>Close</strong>.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white text-xs font-bold mt-0.5">
                3
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Settings className="h-3.5 w-3.5 text-violet-600" />
                  Open Settings &rarr; Tap &ldquo;Profile Downloaded&rdquo; &rarr; Tap &ldquo;Install&rdquo;
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Open the Settings app on {childName}&apos;s phone. Right near the top, tap <strong>Profile Downloaded</strong>, tap <strong>Install</strong> in the top right, enter the phone passcode, and confirm.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copy Direct Link Option */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="text-left w-full sm:w-auto">
            <span className="block text-xs font-bold text-slate-800">
              Or open directly in Safari / Chrome:
            </span>
            <span className="block text-[11px] text-slate-500 font-mono truncate max-w-xs">
              {enrollmentUrl}
            </span>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="w-full sm:w-auto gap-1.5 text-xs h-8 shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Copied Link!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Enrollment Link
              </>
            )}
          </Button>
        </div>

        {/* Tamper and Safety Seal Notice */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <Shield className="h-4 w-4 text-teal-600 shrink-0" />
          <span>
            Cryptographically signed with PKCS#7 certificate. Profile removal triggers an instant tamper alert to your parent dashboard.
          </span>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4">
          <Button type="button" onClick={onClose} className="px-6">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
