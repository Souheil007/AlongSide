'use client';

import * as React from 'react';
import type { VoicePersona } from '@/lib/audio/narratorEngine';
import { cn } from '@/lib/utils';

export interface AlmanacVoiceRibbonProps {
  isPlaying: boolean;
  isPausedMidway: boolean;
  voicePersona: VoicePersona;
  playbackSpeed: 1 | 1.25 | 1.5;
  ariaLabel: string;
  onTogglePlay: () => void;
  className?: string;
}

const LOGICAL_WIDTH = 148;
const LOGICAL_HEIGHT = 38;

interface RibbonPalette {
  spruce: string;
  amber: string;
  mute: string;
  hairline: string;
}

function parseColorToRgba(rawColor: string, alpha: number): string {
  const color = rawColor.trim();
  const safeAlpha = Math.max(0, Math.min(1, alpha));

  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0]! + hex[0]!, 16);
      const g = parseInt(hex[1]! + hex[1]!, 16);
      const b = parseInt(hex[2]! + hex[2]!, 16);
      return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
    }
  }

  const rgbMatch = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${safeAlpha})`;
  }

  return `rgba(20, 61, 43, ${safeAlpha})`;
}

function readPalette(el: HTMLElement | null): RibbonPalette {
  if (!el || typeof window === 'undefined') {
    return {
      spruce: '#143d2b',
      amber: '#b45309',
      mute: '#858c88',
      hairline: '#e3e3dc',
    };
  }
  const styles = window.getComputedStyle(el);
  return {
    spruce: styles.getPropertyValue('--spruce').trim() || '#143d2b',
    amber: styles.getPropertyValue('--amber').trim() || '#b45309',
    mute: styles.getPropertyValue('--mute').trim() || '#858c88',
    hairline: styles.getPropertyValue('--hairline').trim() || '#e3e3dc',
  };
}

/**
 * Computes a point along one tapered harmonic strand inside [0, 1].
 */
function sampleStrandY(
  u: number,
  midY: number,
  maxAmp: number,
  phase: number,
  freq: number,
  speedSign: number,
  offset: number
): number {
  // Smooth Hanning-style envelope keeps both ends anchored cleanly at midY
  const envelope = Math.pow(Math.sin(Math.PI * u), 1.85);
  const wave = Math.sin(u * Math.PI * 2 * freq - phase * speedSign + offset);
  return midY + wave * envelope * maxAmp;
}

/**
 * Flowing Multi-Harmonic Voice Ribbon
 *
 * A precision acoustic instrument visualizer built on a retina <canvas>:
 * - 3 layered counter-flowing harmonic strands + translucent interference ribbon
 * - Organic speech cadence modulation scaled by playbackSpeed
 * - Tonal palette adapts live to Daylight / Nightstand tokens and Clear / Warm voices
 * - Automatically suspends requestAnimationFrame once settled in Ready/Paused states
 */
export function AlmanacVoiceRibbon({
  isPlaying,
  isPausedMidway,
  voicePersona,
  playbackSpeed,
  ariaLabel,
  onTogglePlay,
  className,
}: AlmanacVoiceRibbonProps) {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Persistent motion state across prop updates for silky ramp-up / damp-down
  const motionRef = React.useRef({
    amp: isPlaying ? 1 : isPausedMidway ? 0.36 : 0.14,
    phase: 0.85,
    cadenceClock: 0.4,
    lastTimestamp: 0,
  });

  // Track theme mutations (e.g. toggling Nightstand mode while paused)
  const [themeRevision, setThemeRevision] = React.useState(0);

  React.useEffect(() => {
    const el = buttonRef.current;
    if (!el || typeof MutationObserver === 'undefined') return;

    const observers: MutationObserver[] = [];
    let current: HTMLElement | null = el.parentElement;
    let depth = 0;

    while (current && depth < 10) {
      const obs = new MutationObserver(() => {
        setThemeRevision((r) => r + 1);
      });
      obs.observe(current, { attributes: true, attributeFilter: ['class'] });
      observers.push(obs);
      current = current.parentElement;
      depth += 1;
    }

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const host = buttonRef.current;
    if (!canvas || !host || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(LOGICAL_WIDTH * dpr);
    canvas.height = Math.round(LOGICAL_HEIGHT * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const palette = readPalette(host);
    const targetAmp = isPlaying ? 1 : isPausedMidway ? 0.36 : 0.14;
    const primaryColor = isPlaying
      ? palette.spruce
      : isPausedMidway
        ? palette.amber
        : palette.spruce;
    const secondaryColor =
      isPlaying && voicePersona === 'warm'
        ? palette.amber
        : isPausedMidway
          ? palette.amber
          : palette.spruce;

    const drawFrame = () => {
      const { amp, phase, cadenceClock } = motionRef.current;
      const w = LOGICAL_WIDTH;
      const h = LOGICAL_HEIGHT;
      const midY = h / 2;
      const padX = 10;
      const drawW = w - padX * 2;

      ctx.clearRect(0, 0, w, h);

      // 1. Subtle ambient glow behind optical center while playing
      if (amp > 0.25) {
        const glowAlpha = Math.min(0.14, (amp - 0.25) * 0.18);
        const radial = ctx.createRadialGradient(w / 2, midY, 2, w / 2, midY, w * 0.44);
        radial.addColorStop(0, parseColorToRgba(primaryColor, glowAlpha));
        radial.addColorStop(1, parseColorToRgba(primaryColor, 0));
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Precision micro-horizon reference hairline (fades cleanly at edges)
      const axisGrad = ctx.createLinearGradient(padX, 0, w - padX, 0);
      axisGrad.addColorStop(0, parseColorToRgba(palette.mute, 0));
      axisGrad.addColorStop(0.2, parseColorToRgba(palette.mute, 0.22));
      axisGrad.addColorStop(0.5, parseColorToRgba(palette.mute, 0.28));
      axisGrad.addColorStop(0.8, parseColorToRgba(palette.mute, 0.22));
      axisGrad.addColorStop(1, parseColorToRgba(palette.mute, 0));
      ctx.beginPath();
      ctx.moveTo(padX, midY);
      ctx.lineTo(w - padX, midY);
      ctx.strokeStyle = axisGrad;
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // Organic speech-cadence swell when active; calm fixed shape when idle/paused
      const cadence = isPlaying
        ? 0.68 +
          0.2 * Math.sin(cadenceClock * 2.5) +
          0.12 * Math.sin(cadenceClock * 5.9 + 1.15)
        : 0.88;

      const baseReach = (h * 0.37) * amp * cadence;
      const steps = 64;

      const makeEdgeGradient = (color: string, edgeAlpha: number, centerAlpha: number) => {
        const grad = ctx.createLinearGradient(padX, 0, w - padX, 0);
        grad.addColorStop(0, parseColorToRgba(color, 0));
        grad.addColorStop(0.16, parseColorToRgba(color, edgeAlpha));
        grad.addColorStop(0.5, parseColorToRgba(color, centerAlpha));
        grad.addColorStop(0.84, parseColorToRgba(color, edgeAlpha));
        grad.addColorStop(1, parseColorToRgba(color, 0));
        return grad;
      };

      // 3. Enclosed translucent interference silk ribbon between Strand 1 & Strand 2
      if (amp > 0.16) {
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const u = i / steps;
          const x = padX + u * drawW;
          const y = sampleStrandY(u, midY, baseReach * 0.96, phase, 2.35, 1.0, 0);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        for (let i = steps; i >= 0; i--) {
          const u = i / steps;
          const x = padX + u * drawW;
          const y = sampleStrandY(u, midY, baseReach * 0.68, phase, 3.2, -0.78, 1.3);
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        const ribbonFillAlpha = isPlaying ? 0.16 : isPausedMidway ? 0.12 : 0.06;
        ctx.fillStyle = makeEdgeGradient(
          secondaryColor,
          ribbonFillAlpha * 0.65,
          ribbonFillAlpha
        );
        ctx.fill();
      }

      // 4. Strand 3 (Back sub-harmonic depth thread)
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = padX + u * drawW;
        const y = sampleStrandY(u, midY, baseReach * 0.52, phase, 1.7, 0.55, 2.4);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = makeEdgeGradient(
        primaryColor,
        isPlaying ? 0.22 : 0.14,
        isPlaying ? 0.34 : 0.22
      );
      ctx.lineWidth = 1.0;
      ctx.lineCap = 'round';
      ctx.stroke();

      // 5. Strand 2 (Counter-flowing harmonic overtone, warms with Amber for 'warm' voice)
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = padX + u * drawW;
        const y = sampleStrandY(u, midY, baseReach * 0.68, phase, 3.2, -0.78, 1.3);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = makeEdgeGradient(
        secondaryColor,
        isPlaying ? 0.45 : isPausedMidway ? 0.36 : 0.2,
        isPlaying ? 0.68 : isPausedMidway ? 0.52 : 0.3
      );
      ctx.lineWidth = 1.35;
      ctx.lineCap = 'round';
      ctx.stroke();

      // 6. Strand 1 (Primary luminous voice ribbon core)
      ctx.save();
      if (isPlaying) {
        ctx.shadowColor = parseColorToRgba(primaryColor, 0.45);
        ctx.shadowBlur = 7;
      }
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = padX + u * drawW;
        const y = sampleStrandY(u, midY, baseReach * 0.96, phase, 2.35, 1.0, 0);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = makeEdgeGradient(
        primaryColor,
        isPlaying ? 0.8 : isPausedMidway ? 0.62 : 0.36,
        isPlaying ? 1.0 : isPausedMidway ? 0.82 : 0.5
      );
      ctx.lineWidth = isPlaying ? 2.0 : 1.65;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      // 7. Precision luminous micro-nodes gliding on the primary crest when playing
      if (amp > 0.55) {
        const nodeAlpha = Math.min(0.95, (amp - 0.55) / 0.45);
        for (const u of [0.34, 0.66]) {
          const nx = padX + u * drawW;
          const ny = sampleStrandY(u, midY, baseReach * 0.96, phase, 2.35, 1.0, 0);

          ctx.beginPath();
          ctx.arc(nx, ny, 3.6, 0, Math.PI * 2);
          ctx.fillStyle = parseColorToRgba(primaryColor, nodeAlpha * 0.24);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(nx, ny, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = parseColorToRgba(primaryColor, nodeAlpha);
          ctx.fill();
        }
      }
    };

    const motionScale = prefersReducedMotion ? 0.58 : 1;

    let rafId: number | null = null;
    motionRef.current.lastTimestamp = 0;

    const tick = (now: number) => {
      const m = motionRef.current;
      const dt = m.lastTimestamp ? Math.min(0.05, (now - m.lastTimestamp) / 1000) : 1 / 60;
      m.lastTimestamp = now;

      // Smooth exponential easing toward target amplitude
      const ease = 1 - Math.exp(-dt * (isPlaying ? 8.5 : 7.0));
      m.amp += (targetAmp - m.amp) * ease;

      // Advance wave phase continuously while playing or while gently settling down
      // Under prefers-reduced-motion, keep the live audio signal flowing at a calmer pace
      const velocity = (isPlaying ? 3.2 : 1.4) * playbackSpeed * motionScale;
      m.phase += dt * velocity * Math.max(0.18, m.amp);
      if (isPlaying) {
        m.cadenceClock += dt * playbackSpeed * motionScale;
      }

      drawFrame();

      const settled = !isPlaying && Math.abs(m.amp - targetAmp) < 0.004;
      if (settled) {
        m.amp = targetAmp;
        drawFrame();
        rafId = null;
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    // Always draw immediately, and run RAF while playing or easing between states
    const needsAnimation =
      isPlaying || Math.abs(motionRef.current.amp - targetAmp) >= 0.004;
    if (needsAnimation) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      motionRef.current.amp = targetAmp;
      drawFrame();
    }

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isPlaying, isPausedMidway, voicePersona, playbackSpeed, themeRevision]);

  const stateName = isPlaying ? 'playing' : isPausedMidway ? 'paused' : 'ready';

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onTogglePlay}
      aria-label={ariaLabel}
      title={ariaLabel}
      data-testid="almanac-voice-ribbon"
      data-state={stateName}
      data-voice={voicePersona}
      className={cn(
        'group relative hidden sm:inline-flex h-[38px] w-[148px] shrink-0 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 cursor-pointer active:scale-[0.98]',
        isPlaying
          ? 'border-[var(--spruce-border)] bg-[var(--canvas-subtle)] shadow-[inset_0_1px_2px_rgba(20,61,43,0.08)]'
          : isPausedMidway
            ? 'border-[var(--amber-border)] bg-[var(--canvas-subtle)] shadow-[inset_0_1px_2px_rgba(180,83,9,0.06)]'
            : 'border-[var(--hairline)] bg-[var(--canvas-subtle)] hover:border-[var(--spruce-border)] shadow-[inset_0_1px_2px_rgba(17,20,19,0.05)]',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        width={LOGICAL_WIDTH}
        height={LOGICAL_HEIGHT}
        className="block h-[38px] w-[148px]"
      />
    </button>
  );
}
