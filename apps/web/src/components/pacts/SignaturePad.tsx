'use client';

import * as React from 'react';
import { RotateCcw, CheckCircle2, PenTool, Eraser } from 'lucide-react';
import { CommitmentParty } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface SignaturePadProps {
  label: string;
  signatoryName: string;
  party: CommitmentParty;
  commitmentPledge: string;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  className?: string;
}

export function SignaturePad({
  label,
  signatoryName,
  party,
  commitmentPledge,
  value,
  onChange,
  className,
}: SignaturePadProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasDrawn, setHasDrawn] = React.useState(!!value);
  const isParent = party === CommitmentParty.PARENT;

  // Set up canvas context and load initial value if present
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#0F172A'; // Canonical Deep Slate

    // If an existing signature data URL is supplied, draw it
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setHasDrawn(true);
      };
      img.src = value;
    }
  }, [value]);

  const getCanvasCoordinates = (
    e: React.PointerEvent<HTMLCanvasElement>
  ): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Capture pointer events for seamless drawing
    canvas.setPointerCapture(e.pointerId);

    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const endDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      // In case pointer wasn't captured
    }

    setIsDrawing(false);

    // Export high-quality base64 PNG data URL
    const dataUrl = canvas.toDataURL('image/png');
    onChange(dataUrl);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
    onChange(null);
  };

  return (
    <div
      className={cn(
        'rounded-xl border p-5 bg-white shadow-sm transition-all',
        isParent
          ? 'border-amber-200/90 hover:border-amber-300'
          : 'border-teal-200/90 hover:border-teal-300',
        className
      )}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={isParent ? 'accent' : 'default'}
            className="text-[11px] font-semibold"
          >
            {isParent ? 'Parent Co-Signer' : 'Child Co-Signer'}
          </Badge>
          <span className="text-sm font-bold text-slate-900">
            {signatoryName}
          </span>
        </div>

        {hasDrawn ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Signed Digitally
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <PenTool className="h-3.5 w-3.5 text-slate-400" />
            Awaiting Signature
          </span>
        )}
      </div>

      {/* Commitment Pledge Text */}
      <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 mb-4 text-xs text-slate-600 leading-relaxed italic">
        &ldquo;{commitmentPledge}&rdquo;
      </div>

      {/* Canvas Drawing Surface */}
      <div className="relative rounded-xl border-2 border-dashed border-slate-300 bg-[#FCFCFD] overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={endDrawing}
          onPointerCancel={endDrawing}
          aria-label={`${label} signature canvas`}
          className="w-full h-36 touch-none cursor-crosshair select-none block"
        />

        {/* Empty Canvas Placeholder Guide */}
        {!hasDrawn && !isDrawing && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400 gap-1.5">
            <PenTool className="h-5 w-5 text-slate-300" />
            <span className="text-xs font-medium">
              Sign here using finger, stylus, or mouse
            </span>
          </div>
        )}

        {/* Refrigerator Treaty Signature Baseline Line */}
        <div className="absolute bottom-6 left-6 right-6 border-b border-slate-200 pointer-events-none" />
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-[11px] text-slate-400">
          Digital canvas signature verified with Alongside timestamp
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          disabled={!hasDrawn}
          className="h-8 text-xs text-slate-500 hover:text-slate-800 gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear & Re-sign
        </Button>
      </div>
    </div>
  );
}
