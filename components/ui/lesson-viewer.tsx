'use client';
import React from "react";
import { X, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { CONTENT_1_4 } from "@/lib/content-part1";
import { PRACTICE } from "@/lib/content-practice";
import { CONTENT_5_8 } from "@/lib/content-part2";

const LIME = '#d9f24f';
const COURSE: Record<number, { title: string; body: string[] }[]> = { ...CONTENT_1_4, ...CONTENT_5_8 };

export function LessonViewer({
  lesson,
  onClose,
  onComplete,
  onBack,
  isComplete,
  isFirst,
}: {
  lesson: { m: number; l: number } | null;
  onClose: () => void;
  onComplete: () => void;
  onBack: () => void;
  isComplete: boolean;
  isFirst: boolean;
}) {
  if (!lesson) return null;
  const items = COURSE[lesson.m] || [];
  const item = items[lesson.l];
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#141414] p-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="mb-6 flex items-start justify-between gap-4 flex-shrink-0">
          <h3 className="text-2xl font-black leading-tight">
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

        {/* Блок практики после последнего урока модуля */}
        {(() => {
          const items = COURSE[lesson.m] || [];
          const isLastLesson = lesson.l === items.length - 1;
          const practice = PRACTICE[lesson.m];
          if (!isLastLesson || !practice) return null;
          return (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: LIME }}>
                📚 {practice.title}
              </h4>
              <div className="space-y-2">
                {practice.body.map((line, i) => {
                  if (line.startsWith('## ')) return <h5 key={i} className="pt-2 text-base font-bold" style={{ color: LIME }}>{line.slice(3)}</h5>;
                  if (line.startsWith('- ')) return <div key={i} className="flex gap-2 text-white/75 text-sm"><span style={{ color: LIME }}>•</span><span>{line.slice(2)}</span></div>;
                  if (line.startsWith('💡 ')) return <div key={i} className="rounded-xl p-3 text-sm leading-relaxed text-white/85" style={{ background: 'rgba(217,242,79,0.08)', border: '1px solid rgba(217,242,79,0.25)' }}>{line.slice(2)}</div>;
                  return <p key={i} className="leading-relaxed text-white/80 text-sm">{line}</p>;
                })}
              </div>
            </div>
          );
        })()}

        {/* Нижние кнопки */}
        <div className="mt-6 flex gap-3 flex-shrink-0 border-t border-white/10 pt-5">
          <button
            onClick={onBack}
            disabled={isFirst}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold border border-white/20 text-white/80 hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          <button
            onClick={onComplete}
            disabled={isComplete}
            className="ml-auto flex items-center gap-2 px-6 py-3 rounded-full font-black text-black transition-transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: LIME }}
          >
            {isComplete ? (
              <>
                <CheckCircle className="w-4 h-4" /> Урок пройден
              </>
            ) : (
              <>
                Урок пройден <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
