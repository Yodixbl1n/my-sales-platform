import { ContainerScroll } from './container-scroll-animation';

const LIME = '#d9f24f';

function DashboardMock() {
  const modules = ['Введение', 'СПИН-диалог', 'Ценность', 'Возражения', 'Прибыль', 'Техники', 'Нейро', 'Мастерство'];
  return (
    <div className="flex bg-[#0a0a0a] text-white overflow-hidden" style={{ height: 520 }}>
      {/* Сайдбар — модули слева */}
      <div className="w-52 bg-[#0f0f0f] border-r border-white/10 p-4 hidden sm:flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black text-black" style={{ background: LIME }}>NP</div>
          <span className="font-bold text-xs tracking-tight">NPSales</span>
        </div>
        <div className="space-y-1">
          {modules.map((t, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5" style={{ background: i === 0 ? 'rgba(217,242,79,0.08)' : 'transparent' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0" style={{ background: i < 3 ? LIME : 'rgba(217,242,79,0.12)', color: i < 3 ? '#0a0a0a' : LIME }}>
                {i < 3 ? '✓' : i + 1}
              </span>
              <span className="text-[10px] truncate" style={{ color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Контент справа */}
      <div className="flex-1 p-5 md:p-6 overflow-hidden">
        {/* Badge + приветствие */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold border border-emerald-400/60 bg-emerald-400/10 text-emerald-300 mb-2">
            ★ Рады видеть вас в команде
          </div>
          <p className="text-base md:text-lg font-bold leading-tight">
            Привет, <span style={{ color: LIME }}>Никита</span>! 👋
          </p>
          <p className="text-[8px] md:text-[9px] text-white/50 mt-0.5 max-w-md">
            Добро пожаловать в закрытое образовательное пространство NP Sales.
          </p>
        </div>

        {/* Три карточки статистики сверху */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="rounded-2xl p-3 md:p-4" style={{ background: 'radial-gradient(130% 130% at 85% 0%, #7c3aed 0%, #5b21b6 40%, #0f766e 80%)' }}>
            <p className="text-[8px] md:text-[9px] text-white/70 mb-1 flex items-center gap-1">
              <span className="text-sm">💡</span> ПРОГРЕСС ОБУЧЕНИЯ
            </p>
            <p className="text-xl md:text-2xl font-black tracking-tighter" style={{ color: LIME }}>34<span className="text-xs md:text-sm">%</span></p>
            <p className="text-[8px] md:text-[9px] text-white/60 mt-1">Выполнено 24 из 75 уроков</p>
          </div>
          <div className="rounded-2xl p-3 md:p-4 border border-white/10 bg-[#141414]">
            <p className="text-[8px] md:text-[9px] text-white/60 mb-1 flex items-center gap-1">
              <span className="text-sm">📚</span> МАТЕРИАЛЫ КУРСА
            </p>
            <p className="text-xl md:text-2xl font-black tracking-tighter" style={{ color: '#e879f9' }}>75</p>
            <p className="text-[8px] md:text-[9px] text-white/40 mt-1">уроков в программе</p>
          </div>
          <div className="rounded-2xl p-3 md:p-4 border border-white/10 bg-[#141414]">
            <p className="text-[8px] md:text-[9px] text-white/60 mb-1 flex items-center gap-1">
              <span className="text-sm">💬</span> НАШЕ СООБЩЕСТВО
            </p>
            <p className="text-base md:text-lg font-black tracking-tighter" style={{ color: '#22d3ee' }}>Telegram</p>
            <p className="text-[8px] md:text-[9px] text-white/40 mt-1">Закрытый канал</p>
          </div>
        </div>

        {/* Урок по центру */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 md:p-5">
          <p className="text-[9px] md:text-[10px] tracking-widest mb-1" style={{ color: LIME }}>МОДУЛЬ 1 · УРОК 4 / 11</p>
          <p className="text-sm md:text-base font-bold mb-3">Архитектура идеального звонка — Фреймворк C.U.P.</p>
          <div className="relative"><div className="space-y-2 text-[10px] md:text-xs text-white/70 leading-relaxed blur-[5px] select-none opacity-60 pointer-events-none">
            <p>Научиться выстраивать структуру продающего диалога так, чтобы клиент сам осознал необходимость покупки ещё до того, как ты начнёшь «продавать».</p>
            <p className="font-bold text-white">Формула C.U.P.:</p>
            <p className="pl-3">• <span style={{ color: LIME }}>C</span> — Curiosity (Любопытство)</p>
            <p className="pl-3">• <span style={{ color: LIME }}>U</span> — Uncovering needs (Раскрытие потребностей)</p>
            <p className="pl-3">• <span style={{ color: LIME }}>P</span> — Presenting (Презентация решения)</p></div><div className="absolute inset-0 flex items-center justify-center"><span className="px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold bg-[#0a0a0a]/85 border border-white/15 flex items-center gap-1.5">🔒 Контент урока доступен внутри</span></div></div>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 px-3 py-2 rounded-full text-[10px] md:text-xs font-bold border border-white/20">← Предыдущий</button>
            <button className="flex-1 px-3 py-2 rounded-full text-[10px] md:text-xs font-black text-black" style={{ background: LIME }}>✓ Урок пройден →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlatformShowcase() {
  return (
    <section className="py-14 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
          ТВОЙ <span style={{ color: LIME }}>ЛИЧНЫЙ КАБИНЕТ</span>
        </h2>
        <p className="text-white/50 text-base sm:text-lg">Всё в одном месте: уроки, прогресс, тесты</p>
      </div>
      <ContainerScroll>
        <DashboardMock />
      </ContainerScroll>
    </section>
  );
}
