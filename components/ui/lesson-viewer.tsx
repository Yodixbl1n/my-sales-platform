'use client';
import React from "react";
import { X } from "lucide-react";
import { CONTENT_1_4 } from "@/lib/content-part1";
import { CONTENT_PRACTICE as PRACTICE } from "@/lib/content-practice";
import { CONTENT_5_8 } from "@/lib/content-part2";

const LIME = '#d9f24f';
const COURSE: Record<number, { title: string; body: string[] }[]> = { ...CONTENT_1_4, ...CONTENT_5_8 };

export function LessonViewer({
  lesson,
  onClose,
  inline = false,
}: {
  lesson: { m: number; l: number } | null;
  onClose: () => void;
  inline?: boolean;
}) {
  if (!lesson) return null;
  const items = COURSE[lesson.m] || [];
  const rawItem = items[lesson.l];
  const practiceFallback = !rawItem && PRACTICE[lesson.m] && lesson.l === items.length
    ? { title: PRACTICE[lesson.m].title, body: PRACTICE[lesson.m].body }
    : null;
  const item = rawItem || practiceFallback;
  if (!item) return null;

  return (
    <div className={inline ? "" : "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"} style={inline ? {} : { background: 'rgba(0,0,0,0.85)' }} onClick={inline ? undefined : onClose}>
      <div
        className={inline ? "w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-4 sm:p-8" : "w-full max-w-2xl max-h-[95vh] sm:max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-8 flex flex-col"}
        onClick={inline ? undefined : (e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="mb-6 flex items-start justify-between gap-4 flex-shrink-0">
          <h3 className="text-lg sm:text-2xl font-black leading-tight">
            <span style={{ color: LIME }}>{lesson.m}.{lesson.l + 1}</span> — {item.title}
          </h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10 flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Контент */}
        <div className="space-y-3 flex-1 overflow-y-auto">
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
