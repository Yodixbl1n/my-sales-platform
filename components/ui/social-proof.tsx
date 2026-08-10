'use client';
import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const LIME = '#d9f24f';

export function SocialProof() {
  const stats = [
    { value: "340+", label: "учеников прошли курс" },
    { value: "2.7×", label: "средний рост выручки" },
    { value: "89%", label: "закрыли первую крупную сделку" },
    { value: "14", label: "стран — ученики со всего мира" },
  ];

  const testimonials = [
    {
      text: "До курса я терялся на возражении «дорого». Сейчас закрываю сделки на 800-1200к без скидок. СПИН + MEDDIC — это чит-код.",
      name: "Артём К.",
      role: "B2B менеджер, IT",
    },
    {
      text: "За 2 месяца после курса сделал +1.2М к доходу. Нейрохакинг из 7 модуля изменил то, как я веду первые звонки.",
      name: "Мария Д.",
      role: "Фрилансер, консультации",
    },
    {
      text: "Руковожу отделом из 12 продажников. Внедрил систему из курса — конверсия выросла с 18% до 34% за квартал.",
      name: "Илья В.",
      role: "Head of Sales",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="mb-4 text-center text-5xl font-black tracking-tighter md:text-6xl">
        РЕЗУЛЬТАТЫ <span style={{ color: LIME }}>УЧЕНИКОВ</span>
      </h2>
      <p className="mb-14 text-center text-lg text-white/50">
        Реальные цифры, не обещания. Вот что происходит после курса.
      </p>

      {/* Цифры */}
      <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-white/10 bg-[#141414] p-6 text-center"
          >
            <p className="text-4xl font-black tracking-tighter md:text-5xl" style={{ color: LIME }}>
              {s.value}
            </p>
            <p className="mt-2 text-xs text-white/50 md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Отзывы */}
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex flex-col rounded-3xl border border-white/10 bg-[#141414] p-6"
          >
            <div className="mb-4 flex gap-1" style={{ color: LIME }}>
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <p className="mb-6 flex-1 text-white/80 leading-relaxed">«{t.text}»</p>
            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-black"
                style={{ background: LIME }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs text-white/40">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutAuthor() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="grid gap-10 md:grid-cols-5 items-center rounded-3xl border border-white/10 bg-[#141414] p-10">
        <div className="md:col-span-2 flex justify-center">
          <div
            className="relative h-64 w-64 rounded-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${LIME} 0%, #0a0a0a 100%)`,
            }}
          >
            <span className="text-8xl font-black text-black">NP</span>
            <div
              className="absolute -bottom-2 -right-2 rounded-full px-3 py-1 text-xs font-bold text-black"
              style={{ background: LIME }}
            >
              ✦ АВТОР
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm tracking-widest mb-2" style={{ color: LIME }}>ОБ АВТОРЕ КУРСА</p>
          <h2 className="mb-4 text-4xl font-black tracking-tighter">Nik Pavlov</h2>
          <p className="mb-5 text-white/70 leading-relaxed">
            10+ лет в продажах: от холодных звонков в стартапах до руководства отделами продаж в B2B-компаниях.
            Провёл 2000+ переговоров, закрыл сделок на $15M+. Обучил 340+ человек, которые работают в IT, консалтинге, e-commerce.
          </p>
          <div className="space-y-2 mb-6">
            {[
              "Работал с Яндекс, Тинькофф, международными SaaS",
              "Спикер конференций по продажам",
              "Автор Telegram-канала с 15k+ подписчиков",
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 text-white/80">
                <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: LIME }} />
                <span className="text-sm">{point}</span>
              </div>
            ))}
          </div>
          <a
            href="https://t.me/nikpavlovv"
            target="_blank"
            className="inline-flex items-center gap-2 font-bold text-sm"
            style={{ color: LIME }}
          >
            @nikpavlovv в Telegram →
          </a>
        </div>
      </div>
    </section>
  );
}
