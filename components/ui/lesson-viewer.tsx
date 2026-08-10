'use client';
import React from "react";
import { X } from "lucide-react";
import { CONTENT_1_4 } from "@/lib/content-part1";
import { CONTENT_5_8 } from "@/lib/content-part2";

const LIME = '#d9f24f';
const COURSE: Record<number, { title: string; body: string[] }[]> = { ...CONTENT_1_4, ...CONTENT_5_8 };

export function LessonViewer({ lesson, onClose }: { lesson: { m: number; l: number } | null; onClose: () => void }) {
  if (!lesson) return null;
  const items = COURSE[lesson.m] || [];
  const item = items[lesson.l];
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#141414] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-black leading-tight">
            <span style={{ color: LIME }}>{lesson.m}.{lesson.l + 1}</span> — {item.title}
          </h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10 flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          {item.body.map((line, i) => {
            if (line.startsWith('## ')) return <h4 key={i} className="pt-3 text-lg font-bold" style={{ color: LIME }}>{line.slice(3)}</h4>;
            if (line.startsWith('- ')) return <div key={i} className="flex gap-2 text-white/75"><span style={{ color: LIME }}>•</span><span>{line.slice(2)}</span></div>;
            if (line.startsWith('💡 ')) return <div key={i} className="rounded-2xl p-4 text-sm leading-relaxed text-white/85" style={{ background: 'rgba(217,242,79,0.08)', border: '1px solid rgba(217,242,79,0.25)' }}>{line.slice(2)}</div>;
            if (line.startsWith('⚠️ ')) return <div key={i} className="rounded-2xl p-4 text-sm leading-relaxed text-white/70" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>{line.slice(3)}</div>;
            return <p key={i} className="leading-relaxed text-white/80">{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
