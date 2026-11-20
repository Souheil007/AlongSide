'use client';

import * as React from 'react';
import type { EditorialIllustrationKey } from '@alongside/shared';

export interface EditorialSpotArtProps {
  illustration: EditorialIllustrationKey;
  caption: string;
}

/**
 * Unboxed ink-and-wash editorial spot illustrations (Interactive Almanac v2).
 * Never trapped inside circular icon badges; adapts smoothly to Light & Nightstand CSS tokens.
 */
export function EditorialSpotArt({
  illustration,
  caption,
}: EditorialSpotArtProps) {
  return (
    <figure
      className="flex flex-col items-center justify-center m-0"
      data-testid={`editorial-art-${illustration}`}
    >
      <div className="w-full max-w-[240px]">
        {renderArtSvg(illustration)}
      </div>
      <figcaption className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-[var(--mute)] text-center">
        {caption}
      </figcaption>
    </figure>
  );
}

function renderArtSvg(key: EditorialIllustrationKey): React.ReactNode {
  switch (key) {
    case 'plate':
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M44 134C22 92 48 36 106 26C166 16 226 48 232 104C238 158 186 194 122 188C74 184 58 160 44 134Z" fill="var(--art-wash)" />
          <path d="M188 52L224 62L210 156L176 146Z" fill="var(--art-wash-spruce)" stroke="var(--spruce)" strokeWidth="1.3" strokeLinejoin="round" opacity="0.85" />
          <ellipse cx="126" cy="108" rx="68" ry="62" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.5" />
          <ellipse cx="126" cy="108" rx="53" ry="48" stroke="var(--hairline)" strokeWidth="1.2" strokeDasharray="3 4" />
          <path d="M84 102C84 87 96 78 110 78C124 78 134 87 134 102V125C134 130 130 134 125 134H93C88 134 84 130 84 125V102Z" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.6" />
          <path d="M97 96C104 92 114 92 121 96" stroke="var(--amber)" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M142 84C152 80 166 84 170 94C173 102 167 109 156 111C146 113 138 106 138 97C138 91 139 86 142 84Z" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.5" />
          <path d="M145 93L164 99M144 101L160 105" stroke="var(--spruce)" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
          <path d="M144 132C151 124 161 120 172 119" stroke="var(--spruce)" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="156" cy="120" rx="6" ry="3.2" transform="rotate(-26 156 120)" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.3" />
          <ellipse cx="168" cy="124" rx="5.5" ry="3" transform="rotate(14 168 124)" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.3" />
          <path d="M36 74V146M30 74V94C30 98 33 100 36 100C39 100 42 98 42 94V74M36 74V98" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.72" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M48 118C34 72 72 28 134 26C194 24 234 66 222 122C210 174 156 196 104 184C68 176 56 146 48 118Z" fill="var(--art-wash-spruce)" />
          <path d="M126 174C126 130 128 84 134 40" stroke="var(--spruce)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M128 74C154 58 180 62 186 80C172 96 148 96 128 74Z" fill="var(--elevated)" stroke="var(--spruce)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M127 110C96 92 70 98 66 118C84 134 108 130 127 110Z" fill="var(--elevated)" stroke="var(--spruce)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M127 142C152 128 174 132 178 148C164 162 144 160 127 142Z" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M196 58C206 69 210 84 207 99" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 5" />
          <path d="M54 88C46 99 44 114 48 128" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 5" />
          <circle cx="134" cy="36" r="3.5" fill="var(--amber)" />
        </svg>
      );
    case 'cup':
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M40 126C28 78 66 32 130 28C194 24 232 68 224 124C216 174 164 192 106 184C68 178 48 156 40 126Z" fill="var(--art-wash)" />
          <path d="M52 154H208" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
          <path d="M96 64H164L156 144C155.3 150 150.5 154 144.5 154H115.5C109.5 154 104.7 150 104 144L96 64Z" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M101 102C112 96 126 108 138 102C146 98 154 100 159 103L156 144C155.3 150 150.5 154 144.5 154H115.5C109.5 154 104.7 150 104 144L101 102Z" fill="var(--spruce-soft)" />
          <ellipse cx="130" cy="64" rx="34" ry="7.5" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.6" />
          <path d="M130 34C130 34 136 44 136 48C136 51.3 133.3 54 130 54C126.7 54 124 51.3 124 48C124 44 130 34 130 34Z" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.5" />
          <path d="M74 88C66 96 66 114 74 122" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M186 88C194 96 194 114 186 122" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'moon_bed':
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M42 122C30 74 72 28 136 26C198 24 234 70 222 126C210 176 154 194 98 184C64 178 48 150 42 122Z" fill="var(--art-wash-spruce)" />
          <path d="M168 48C152 52 142 66 142 82C142 100 156 114 174 114C181 114 188 112 193 108C184 118 168 122 153 116C136 109 128 90 135 73C141 59 154 50 168 48Z" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="98" cy="64" r="2.6" fill="var(--amber)" />
          <circle cx="116" cy="48" r="1.8" fill="var(--spruce)" />
          <circle cx="80" cy="82" r="1.8" fill="var(--spruce)" />
          <rect x="64" y="122" width="132" height="34" rx="12" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.6" />
          <path d="M78 122V112C78 106 83 102 89 102H118C124 102 128 106 128 112V122" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.5" />
          <path d="M64 138H196" stroke="var(--hairline)" strokeWidth="1.3" strokeDasharray="3 4" />
          <path d="M74 156V166M186 156V166" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'clock_rhythm':
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M44 128C28 84 62 30 126 26C190 22 232 64 224 122C216 174 166 194 108 186C68 180 54 156 44 128Z" fill="var(--art-wash)" />
          <circle cx="130" cy="106" r="56" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.6" />
          <circle cx="130" cy="106" r="46" stroke="var(--hairline)" strokeWidth="1.2" strokeDasharray="3 4" />
          <path d="M130 60V68M176 106H168M130 152V144M84 106H92" stroke="var(--spruce)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M130 106L130 78M130 106L152 118" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="130" cy="106" r="4" fill="var(--amber)" />
          <path d="M168 64C182 76 190 90 190 106" stroke="var(--amber)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 5" />
          <path d="M70 106C70 90 78 76 92 64" stroke="var(--spruce)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 5" />
        </svg>
      );
    case 'blocks_play':
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M38 124C26 76 68 30 132 28C194 26 234 72 224 124C214 174 162 194 104 184C64 176 46 154 38 124Z" fill="var(--art-wash-spruce)" />
          <path d="M50 158H210" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
          <rect x="74" y="114" width="46" height="44" rx="6" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.6" />
          <rect x="128" y="114" width="46" height="44" rx="6" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.6" />
          <rect x="102" y="70" width="46" height="44" rx="6" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.6" />
          <path d="M108 70L125 46L142 70H108Z" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="182" cy="72" r="4" fill="var(--amber)" opacity="0.85" />
          <path d="M174 88C184 82 192 84 198 92" stroke="var(--spruce)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 4" />
        </svg>
      );
    case 'device_dock':
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M44 126C28 80 68 28 134 26C198 24 234 68 222 124C210 174 156 194 102 184C64 176 52 152 44 126Z" fill="var(--art-wash)" />
          <rect x="92" y="48" width="76" height="106" rx="14" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.6" />
          <path d="M118 58H142" stroke="var(--hairline)" strokeWidth="2" strokeLinecap="round" />
          <path d="M118 92C118 82 126 76 135 78C128 82 126 92 132 98C136 102 142 103 147 101C143 108 134 111 126 108C120 105 118 99 118 92Z" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.5" />
          <path d="M74 154H186L178 168H82L74 154Z" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M180 68C190 76 194 88 192 100" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 5" />
        </svg>
      );
    case 'compass_teen':
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M44 126C30 78 70 28 134 26C198 24 234 70 222 124C210 176 156 194 100 184C64 178 52 152 44 126Z" fill="var(--art-wash-spruce)" />
          <circle cx="130" cy="106" r="56" fill="var(--elevated)" stroke="var(--ink)" strokeWidth="1.6" />
          <circle cx="130" cy="106" r="44" stroke="var(--hairline)" strokeWidth="1.2" strokeDasharray="3 4" />
          <path d="M130 68L142 106L130 144L118 106L130 68Z" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M130 68L142 106H118L130 68Z" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="130" cy="106" r="4" fill="var(--ink)" />
        </svg>
      );
    case 'heart_bridge':
    default:
      return (
        <svg viewBox="0 0 260 210" fill="none" className="w-full h-auto block" aria-hidden="true">
          <path d="M42 126C28 80 66 30 130 26C194 22 234 68 224 122C214 174 162 194 104 184C64 178 50 154 42 126Z" fill="var(--art-wash)" />
          <circle cx="94" cy="108" r="34" fill="var(--elevated)" stroke="var(--spruce)" strokeWidth="1.6" />
          <circle cx="166" cy="108" r="24" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.6" />
          <path d="M108 82C122 66 146 66 160 84" stroke="var(--spruce)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 4" />
          <path d="M108 134C122 150 146 150 160 132" stroke="var(--amber)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 4" />
          <circle cx="94" cy="108" r="10" fill="var(--spruce-soft)" stroke="var(--spruce)" strokeWidth="1.4" />
          <circle cx="166" cy="108" r="7" fill="var(--elevated)" stroke="var(--amber)" strokeWidth="1.4" />
        </svg>
      );
  }
}
