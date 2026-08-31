'use client';
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const LIME = '#d9f24f';

/**
 * LessonViewer — загружает контент урока через серверный API /api/lesson.
 * Это решает проблему #7 из аудита: платный контент больше НЕ попадает в JS-бандл.
 * Проверка доступа (авторизация + тариф + блокировка) происходит на сервере.
 */
export function LessonViewer({
  lesson,
  onClose,
  inline = false,
}: {
  lesson: { m: number; l: number } | null;
  onClose: () => void;
  inline?: boolean;
}) {
  const [content, setContent] = useState<{ title: string; body: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lesson) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setContent(null);

    fetch(`/api/lesson?moduleId=${lesson.m}&lessonId=${lesson.l}`)
      .then(async (r) => {
        if (r.status === 401) {
          location.href = '/login';
          throw new Error('Сессия истекла');
        }
        if (r.status === 403) {
          const j = await r.json().catch(() => ({}));
          if (j.error?.includes('blocked')) {
            throw new Error('Аккаунт заблокирован. Обратитесь к поддержке.');
          }
          throw new Error(j.error || 'Нет доступа к этому уроку');
        }
        if (!r.ok) {
          throw new Error('Не удалось загрузить урок');
        }
        const j = await r.json();
        if (!j.success || !j.lesson) {
          throw new Error('Урок не найден');
        }
        if (!cancelled) setContent(j.lesson);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [lesson?.m, lesson?.l]);

  if (!lesson) return null;

  return (
    <div
      className={inline ? "" : "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"}
      style={inline ? {} : { background: 'rgba(0,0,0,0.85)' }}
      onClick={inline ? undefined : onClose}
    >
      <div
        className={inline
          ? "w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-4 sm:p-8"
          : "w-full max-w-2xl max-h-[95vh] sm:max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-4 sm:p-8 flex flex-col"}
        onClick={inline ? undefined : (e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="mb-6 flex items-start justify-between gap-4 flex-shrink-0">
          <h3 className="text-lg sm:text-2xl font-black leading-tight">
            <span style={{ color: LIME }}>{lesson.m}.{lesson.l + 1}</span>
            {content ? ` — ${content.title}` : ''}
          </h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10 flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Загрузка */}
        {loading && (
          <div className="py-12 text-center flex-1 flex flex-col items-center justify-center">
            <div className="inline-block w-8 h-8 border-2 border-white/20 rounded-full animate-spin" style={{ borderTopColor: LIME }} />
            <p className="text-sm text-white/50 mt-3">Загружаем урок...</p>
          </div>
        )}

        {/* Ошибка */}
        {error && !loading && (
          <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <p className="text-sm font-bold" style={{ color: '#fca5a5' }}>⚠️ {error}</p>
          </div>
        )}

        {/* Контент */}
        {content && !loading && (
          <div className="space-y-3 flex-1 overflow-y-auto">
            {content.body.map((line, i) => {
              if (line.startsWith('## ')) {
                return <h4 key={i} className="pt-3 text-lg font-bold" style={{ color: LIME }}>{line.slice(3)}</h4>;
              }
              if (line.startsWith('- ')) {
                return (
                  <div key={i} className="flex gap-2 text-white/75">
                    <span style={{ color: LIME }}>•</span>
                    <span>{line.slice(2)}</span>
                  </div>
                );
              }
              if (line.startsWith('💡 ')) {
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-4 text-sm leading-relaxed text-white/85"
                    style={{ background: 'rgba(217,242,79,0.08)', border: '1px solid rgba(217,242,79,0.25)' }}
                  >
                    {line.slice(2)}
                  </div>
                );
              }
              if (line.startsWith('⚠️ ')) {
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-4 text-sm leading-relaxed text-white/70"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
                  >
                    {line.slice(3)}
                  </div>
                );
              }
              return <p key={i} className="leading-relaxed text-white/80">{line}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
