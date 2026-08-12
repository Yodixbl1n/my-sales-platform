"use client";
import React, { useState } from "react";

const LIME = "#d9f24f";

const FAQS = [
  { q: "Сколько длится доступ к курсу?", a: "На тарифе NP BLACK доступ бессрочный, включая все будущие обновления. На NP FREE первые уроки каждого модуля доступны без ограничения по времени." },
  { q: "Можно ли проходить курс с телефона?", a: "Да. Личный кабинет работает в любом браузере — на телефоне, планшете и компьютере. Устанавливать ничего не нужно." },
  { q: "Как приходит доступ после оплаты?", a: "Сразу после оплаты ты получаешь инвайт-код в Telegram и на почту. Вводишь его на странице входа — и курс открывается мгновенно." },
  { q: "Что если я пойму, что курс мне не подходит?", a: "В течение 7 дней после покупки возвращаю деньги без вопросов и допросов. Достаточно написать мне в Telegram." },
  { q: "Я никогда не работал в продажах — мне подойдёт?", a: "Да. Курс построен с нуля: первые модули разбирают базу, а каждая техника даётся с примерами реальных диалогов. Учатся и фрилансеры, и основатели — все, кто переговаривается и продаёт свою работу." },
  { q: "Чем это отличается от бесплатных уроков на YouTube?", a: "YouTube даёт разрозненные техники без системы. Здесь — последовательная система: модули открываются по порядку, каждый заканчивается тестом и практикой на твоих реальных сделках. Ты не просто смотришь — ты внедряешь навык." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-3xl mx-auto px-6 pb-24">
      <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">
        ЧАСТЫЕ <span style={{ color: LIME }}>ВОПРОСЫ</span>
      </h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-[#141414] overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-bold">{f.q}</span>
              <span
                className="text-2xl flex-shrink-0 transition-transform duration-300"
                style={{ color: LIME, transform: open === i ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden"
              style={{
                maxHeight: open === i ? 300 : 0,
                opacity: open === i ? 1 : 0,
                transition: "all 0.35s ease",
              }}
            >
              <p className="px-5 pb-5 text-white/60 leading-relaxed">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
