"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const LIME = "#d9f24f";

function DashboardMock() {
  const modules = [
    { n: 1, t: "Введение и базовые понятия", s: "done" },
    { n: 2, t: "Программирование диалога (СПИН)", s: "done" },
    { n: 3, t: "Архитектура ценности", s: "active" },
    { n: 4, t: "Архитектура возражений", s: "locked" },
    { n: 5, t: "Максимизация прибыли", s: "locked" },
    { n: 6, t: "Продвинутые техники", s: "locked" },
  ];

  return (
    <div className="bg-[#0a0a0a] p-6 md:p-10 text-left text-white">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-black text-xs" style={{ background: LIME }}>NP</div>
          <span className="font-bold text-sm">NP<span style={{ color: LIME }}>Sales</span></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <div className="w-6 h-6 rounded-full" style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }} />
          <span>Nik</span>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-1">
        Привет, <span style={{ color: LIME }}>Nik</span>! 👋
      </h2>
      <p className="text-white/50 text-sm mb-6">Готов прокачать продажи сегодня?</p>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-2xl p-5" style={{ background: 'radial-gradient(130% 130% at 85% 0%, #7c3aed 0%, #5b21b6 40%, #0f766e 80%)' }}>
          <p className="text-xs text-white/70 mb-1">ТВОЙ ПРОГРЕСС</p>
          <p className="text-4xl font-black" style={{ color: LIME }}>33<span className="text-xl">%</span></p>
          <div className="h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "33%", background: LIME }} />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
          <p className="text-xs text-white/50 mb-1">ВСЕГО УРОКОВ</p>
          <p className="text-4xl font-black" style={{ color: '#e879f9' }}>71</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
          <p className="text-xs text-white/50 mb-1">МОДУЛЕЙ</p>
          <p className="text-4xl font-black">8</p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-3">Программа курса</h3>
      <div className="space-y-2">
        {modules.map((m) => (
          <div
            key={m.n}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{
              background: m.s === "active" ? "rgba(217,242,79,0.08)" : "rgba(255,255,255,0.04)",
              border: m.s === "active" ? "1px solid " + LIME : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{
                background: m.s === "done" ? LIME : "rgba(217,242,79,0.12)",
                color: m.s === "done" ? "#0a0a0a" : LIME,
              }}
            >
              {m.s === "done" ? "✓" : m.s === "locked" ? "🔒" : m.n}
            </span>
            <span className={"text-xs md:text-sm flex-1 " + (m.s === "locked" ? "text-white/30" : "text-white/80")}>{m.t}</span>
            {m.s === "active" && (
              <span className="text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: LIME, color: "#0a0a0a" }}>
                СЕЙЧАС
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlatformShowcase() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <p className="text-xs md:text-sm tracking-[0.3em] text-white/50 mb-4">ВНУТРИ ПЛАТФОРМЫ</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            ТВОЙ ЛИЧНЫЙ <span style={{ color: LIME }}>КАБИНЕТ</span>
          </h2>
          <p className="text-white/50 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Прогресс, тесты и последовательное открытие модулей — всё в одном месте
          </p>
        </>
      }
    >
      <DashboardMock />
    </ContainerScroll>
  );
}
