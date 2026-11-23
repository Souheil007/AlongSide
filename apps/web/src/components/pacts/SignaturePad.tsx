'use client';

import * as React from 'react';
import { RotateCcw, Check, PenTool, Type } from 'lucide-react';
import { CommitmentParty } from '@alongside/shared';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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
  const [mode, setMode] = React.useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = React.useState('');
  const isParent = party === CommitmentParty.PARENT;

  // Set up crisp HiDPI canvas and restore saved signature if present
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 400;
    const height = rect.height || 152;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = '#111413';

    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        setHasDrawn(true);
      };
      img.src = value;
    }
  }, [value, mode]);

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
    if (mode !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'draw') return;
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
      // Ignore if pointer was not captured
    }

    setIsDrawing(false);
    const dataUrl = canvas.toDataURL('image/png');
    onChange(dataUrl);
  };

  const renderTypedSignature = (text: string) => {
    setTypedName(text);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 400;
    const height = rect.height || 152;
    ctx.clearRect(0, 0, width, height);

    const trimmed = text.trim();
    if (!trimmed) {
      setHasDrawn(false);
      onChange(null);
      return;
    }

    ctx.fillStyle = '#111413';
    ctx.font = 'italic 500 34px Georgia, "Newsreader", serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(trimmed, 28, height * 0.54, width - 56);
    setHasDrawn(true);
    onChange(canvas.toDataURL('image/png'));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width || 400, rect.height || 152);
      }
    }
    setTypedName('');
    setHasDrawn(false);
    onChange(null);
  };

  return (
    <div
      className={cn(
        'rounded-[16px] border bg-[var(--elevated)] p-5 sm:p-6 transition-colors space-y-4',
        hasDrawn
          ? isParent
            ? 'border-[var(--amber-border)]'
            : 'border-[var(--spruce-border)]'
          : 'border-[var(--hairline)]',
        className
      )}
    >
      {/* Signer Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-[12px] font-semibold',
              isParent ? 'text-[var(--amber)]' : 'text-[var(--spruce)]'
            )}
          >
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                isParent ? 'bg-[var(--amber)]' : 'bg-[var(--spruce)]'
              )}
              aria-hidden="true"
            />
            <span>{isParent ? "Parent's turn" : `Hand the screen to ${signatoryName}`}</span>
          </span>
          <h4 className="font-serif-almanac text-[20px] font-semibold text-[var(--ink)]">
            {signatoryName}
          </h4>
        </div>

        <div className="flex items-center gap-1.5">
          {hasDrawn ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--spruce-soft)] border border-[var(--spruce-border)] px-2.5 py-1 text-[12px] font-semibold text-[var(--spruce)]">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Signed</span>
            </span>
          ) : (
            <span className="text-[12px] font-medium text-[var(--mute)]">
              Waiting to sign
            </span>
          )}
        </div>
      </div>

      {/* Personal Pledge Quote */}
      <p className="font-serif-almanac italic text-[15.5px] leading-[1.52] text-[var(--body)] rounded-[10px] bg-[var(--canvas-subtle)] px-4 py-3">
        &ldquo;{commitmentPledge}&rdquo;
      </p>

      {/* Draw vs Type Switcher */}
      <div className="flex items-center justify-between gap-2">
        <div
          role="group"
          aria-label={`${label} input mode`}
          className="inline-flex rounded-[8px] border border-[var(--hairline)] bg-[var(--canvas-subtle)] p-0.5 text-[12px]"
        >
          <button
            type="button"
            onClick={() => setMode('draw')}
            aria-pressed={mode === 'draw'}
            className={cn(
              'inline-flex min-h-[34px] items-center gap-1.5 rounded-[6px] px-2.5 font-medium transition-colors cursor-pointer',
              mode === 'draw'
                ? 'bg-[var(--elevated)] text-[var(--ink)] font-semibold'
                : 'text-[var(--body)] hover:text-[var(--ink)]'
            )}
          >
            <PenTool className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Draw</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('type')}
            aria-pressed={mode === 'type'}
            className={cn(
              'inline-flex min-h-[34px] items-center gap-1.5 rounded-[6px] px-2.5 font-medium transition-colors cursor-pointer',
              mode === 'type'
                ? 'bg-[var(--elevated)] text-[var(--ink)] font-semibold'
                : 'text-[var(--body)] hover:text-[var(--ink)]'
            )}
          >
            <Type className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Type</span>
          </button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          disabled={!hasDrawn}
          className="h-9 text-[12px] text-[var(--mute)] hover:text-[var(--ink)] gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Clear</span>
        </Button>
      </div>

      {/* Optional Typed Input Field */}
      {mode === 'type' && (
        <Input
          value={typedName}
          onChange={(e) => renderTypedSignature(e.target.value)}
          placeholder={`Type ${signatoryName} to sign`}
          aria-label={`Type ${label}`}
        />
      )}

      {/* Tactile Archival Paper Signature Surface */}
      <div className="relative overflow-hidden rounded-[12px] border border-[#ddd5c2] bg-[#FAF7F2]">
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={endDrawing}
          onPointerCancel={endDrawing}
          aria-label={`${label} signature canvas`}
          className={cn(
            'block h-36 w-full touch-none select-none',
            mode === 'draw' ? 'cursor-crosshair' : 'pointer-events-none'
          )}
        />

        {!hasDrawn && !isDrawing && mode === 'draw' && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-[var(--mute)]">
            <span className="text-[13px] font-medium">
              Sign with a finger, stylus, or mouse
            </span>
          </div>
        )}

        {/* Archival Signature Baseline */}
        <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-end gap-2 border-b border-[#cfc7b4] pb-0.5">
          <span className="font-serif-almanac text-[13px] text-[#9b9384]">×</span>
        </div>
      </div>
    </div>
  );
}
