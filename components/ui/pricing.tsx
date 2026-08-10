'use client';
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShimmerText } from "./shimmer-text";

const LIME = '#d9f24f';

/* 👇 ТАРИФЫ */
const PLANS = [
  {
    id: "free",
    name: "NP FREE",
    tagline: "Попробуй систему",
    description: "Базовые уроки, которые покажут как устроены продажи. Без регистрации и оплаты.",
    full: 0,
    perMonth: 0,
    features: [
      "5 вводных уроков по продажам",
      "Первые работающие приёмы",
      "Понимание 5 этапов продажи",
      "Доступ к Telegram-каналу",
      "Базовые скрипты и шаблоны",
    ],
    cta: "Начать бесплатно",
    href: "https://t.me/nikpavlovv",
    popular: false,
    highlight: "Идеально для знакомства",
  },
  {
    id: "black",
    name: "NP BLACK",
    tagline: "Полная система продаж",
    description: "Все 8 модулей от первого контакта до закрытия сделки. Нейрохакинг, СПИН, MEDDIC и работа с возражениями.",
    full: 9900,
    perMonth: 2700,
    features: [
      "Все 8 модулей и 49 уроков",
      "Метод СПИН и квалификация MEDDIC",
      "Архитектура ценности и офферы",
      "Отработка «дорого» и «я подумаю»",
      "Upsell, LTV и максимизация прибыли",
      "Нейрохакинг и управление фреймами",
      "Закрытое сообщество и поддержка",
      "Пожизненный доступ к материалам",
    ],
    cta: "Получить полный доступ",
    href: "/login",
    popular: true,
    highlight: "Выбор 90% студентов",
  },
];

/* ---------- Перекатывающиеся цифры ---------- */
function RollingDigit({ digit, delay = 0 }: { digit: number; delay?: number }) {
  return (
    <span className="relative inline-block overflow-hidden" style={{ height: "1em", width: "1ch" }}>
      <motion.span
        className="absolute left-0 top-0 flex w-full flex-col"
        initial={false}
        animate={{ y: -digit + "em" }}
        transition={{ type: "spring", stiffness: 110, damping: 18, delay }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="block w-full text-center" style={{ height: "1em", lineHeight: "1em" }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function RollingNumber({ value }: { value: number }) {
  const parts = value.toLocaleString("ru-RU").split("");
  return (
    <span className="inline-flex" style={{ lineHeight: "1em" }}>
      {parts.map((ch, i) =>
        /\d/.test(ch) ? (
          <RollingDigit key={i} digit={Number(ch)} delay={i * 0.04} />
        ) : (
          <span key={i} className="inline-block" style={{ width: "0.35em" }} />
        )
      )}
    </span>
  );
}

/* ---------- Конфетти ---------- */
function ConfettiBurst({ burst }: { burst: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 320,
        y: (Math.random() - 0.85) * 300,
        rot: (Math.random() - 0.5) * 720,
        color: [LIME, "#ffffff", "#bef264", "#fde047"][i % 4],
        dur: 0.8 + Math.random() * 0.6,
        size: 5 + Math.random() * 5,
      })),
    [burst]
  );
  if (burst === 0) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-10 z-30">
      {pieces.map((p) => (
        <motion.span
          key={burst + "-" + p.id}
          className="absolute rounded-[2px]"
          style={{ width: p.size, height: p.size, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rot }}
          transition={{ duration: p.dur, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ---------- Секция тарифов ---------- */
function Pricing() {
  const [mode, setMode] = useState<"full" | "split">("full");
  const [burst, setBurst] = useState(0);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 pb-24 scroll-mt-6">
      <h2 className="mb-4 text-center text-5xl font-black tracking-tighter md:text-6xl">
        ВЫБЕРИ <span style={{ color: LIME }}>СВОЙ ПУТЬ</span>
      </h2>
      <p className="mb-10 text-center text-lg text-white/50">
        Две программы — одна цель. Ты сам решаешь, как быстро идти.
      </p>

      {/* Переключатель */}
      <div className="mb-14 flex justify-center">
        <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1">
          {([["full", "Полная оплата"], ["split", "Рассрочка 4 мес"]] as const).map(([m, label]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "relative rounded-full px-6 py-2.5 text-sm font-bold transition-colors",
                mode === m ? "text-black" : "text-white/60 hover:text-white"
              )}
            >
              {mode === m && (
                <motion.span
                  layoutId="pricing-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: LIME }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Карточки */}
      <div className="grid gap-8 md:grid-cols-2">
        {PLANS.map((plan) => {
          const price = mode === "full" ? plan.full : plan.perMonth;
          return (
            <div
              key={plan.id}
              onMouseEnter={() => plan.popular && setBurst((b) => b + 1)}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-[#141414] p-10 transition-transform duration-300 hover:-translate-y-2",
                plan.popular 
                  ? "border-transparent" 
                  : "border-white/10"
              )}
              style={
                plan.popular
                  ? { boxShadow: "0 0 0 2px " + LIME + ", 0 0 80px rgba(217,242,79,0.3)" }
                  : undefined
              }
            >
              {plan.popular && (
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-5 py-1.5 text-xs font-black tracking-widest text-black flex items-center gap-1.5"
                  style={{ background: LIME }}
                >
                  <Sparkles className="w-3 h-3" />
                  {plan.highlight.toUpperCase()}
                </span>
              )}
              {plan.popular && <ConfettiBurst burst={burst} />}

              {/* Заголовок с shimmer */}
              <ShimmerText 
                className="text-4xl font-black tracking-tight"
                shimmerColor={plan.popular ? LIME : "#ffffff"}
                baseColor={plan.popular ? "#ffffff" : "#ffffff"}
              >
                {plan.name}
              </ShimmerText>
              
              <p className="mt-3 text-xl font-semibold text-white/90">{plan.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{plan.description}</p>

              {/* Цена */}
              <div className="mt-8 flex items-end gap-2">
                {plan.full === 0 ? (
                  <span className="text-6xl font-black tracking-tighter" style={{ color: "#ffffff" }}>
                    Бесплатно
                  </span>
                ) : (
                  <>
                    <span className="text-6xl font-black tracking-tighter" style={{ color: plan.popular ? LIME : "#ffffff" }}>
                      <RollingNumber value={price} />
                      <span className="ml-1 text-4xl">₽</span>
                    </span>
                    {mode === "split" && (
                      <span className="pb-2 text-sm text-white/50">/ мес × 4</span>
                    )}
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-white/40">
                {plan.full === 0
                  ? "навсегда, без скрытых платежей"
                  : mode === "full"
                  ? "разовый платёж, полный доступ навсегда"
                  : "4 равных платежа, без переплат и процентов"}
              </p>

              {/* Список фич */}
              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/70">
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ background: "rgba(217,242,79,0.12)" }}
                    >
                      <Check className="h-3 w-3" style={{ color: LIME }} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA кнопка */}
              <Link
                href={plan.href}
                target={plan.href.startsWith("http") ? "_blank" : undefined}
                className={cn(
                  "mt-10 rounded-full py-4 text-center font-black text-lg transition-transform hover:scale-105",
                  !plan.popular && "border-2 border-white/20 text-white hover:border-white/50"
                )}
                style={plan.popular ? { background: LIME, color: "#0a0a0a" } : undefined}
              >
                {plan.cta}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Дополнительный текст под карточками */}
      <div className="mt-12 text-center">
        <p className="text-sm text-white/40">
          Не уверен какой тариф выбрать? Начни с бесплатного — посмотри первые уроки и реши.
        </p>
      </div>
    </section>
  );
}

export { Pricing };
