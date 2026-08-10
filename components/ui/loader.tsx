'use client';
import React from "react";

const LIME = '#d9f24f';

export function Loader({ label = 'ЗАГРУЖАЕМ...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <style>{'@keyframes np-spin { to { transform: rotate(360deg); } } @keyframes np-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.92); opacity: 0.7; } }'}</style>
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{ borderTopColor: LIME, borderRightColor: LIME, animation: 'np-spin 0.9s linear infinite' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-black"
            style={{ background: LIME, animation: 'np-pulse 1.2s ease-in-out infinite' }}
          >
            NP
          </div>
        </div>
      </div>
      <p className="text-xs tracking-[0.3em] text-white/50">{label}</p>
    </div>
  );
}
