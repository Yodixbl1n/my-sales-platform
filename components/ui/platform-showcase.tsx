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
        {/* Три карточки статистики сверху */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="rounded-2xl p-3 md:p-4" style={{ background: 'radial-gradient(130% 130% at 85% 0%, #7c3aed 0%, #5b21b6 40%, #0f766e 80%)' }}>
            <p className="text-[9px] md:text-[10px] text-white/70 mb-1">ТВОЙ ПРОГРЕСС</p>
            <p className="text-xl md:text-2xl font-black tracking-tighter" style={{ color: LIME }}>34<span className="text-xs md:text-sm">%</span></p>
            <p className="text-[8px] md:text-[9px] text-white/60 mt-1">24 из 75 уроков</p>
          </div>
          <div className="rounded-2xl p-3 md:p-4 border border-white/10 bg-[#141414]">
            <p className="text-[9px] md:text-[10px] text-white/60 mb-1">ВСЕГО УРОКОВ</p>
            <p className="text-xl md:text-2xl font-black tracking-tighter" style={{ color: '#e879f9' }}>75</p>
            <p className="text-[8px] md:text-[9px] text-white/40 mt-1">100% практика</p>
          </div>
          <div className="rounded-2xl p-3 md:p-4 border border-white/10 bg-[#141414]">
            <p className="text-[9px] md:text-[10px] text-white/60 mb-1">МОДУЛЕЙ</p>
            <p className="text-xl md:text-2xl font-black tracking-tighter">8</p>
            <p className="text-[8px] md:text-[9px] text-white/40 mt-1">от базы до мастерства</p>
          </div>
        </div>

        {/* Урок по центру */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 md:p-5">
          <p className="text-[9px] md:text-[10px] tracking-widest mb-1" style={{ color: LIME }}>МОДУЛЬ 1 · УРОК 4 / 11</p>
          <p className="font-bold text-xs md:text-sm mb-3">Установление контакта: вербальное и невербальное</p>
          <div className="space-y-2 mb-4">
            <div className="h-2 rounded-full bg-white/10 w-full"></div>
            <div className="h-2 rounded-full bg-white/10 w-5/6"></div>
            <div className="h-2 rounded-full bg-white/10 w-4/6"></div>
            <div className="h-2 rounded-full w-3/6" style={{ background: 'rgba(217,242,79,0.15)' }}></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 h-9 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white/60">← Предыдущий урок</div>
            <div className="flex-1 h-9 rounded-full flex items-center justify-center text-[10px] font-black text-black" style={{ background: LIME }}>✓ Урок пройден → Следующий</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlatformShowcase() {
  return (
    <section className="relative">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-xs md:text-sm tracking-[0.3em] text-white/50 mb-4">ВНУТРИ ПЛАТФОРМЫ</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              ТВОЙ ЛИЧНЫЙ <span style={{ color: LIME }}>КАБИНЕТ</span>
            </h2>
            <p className="text-white/50 mt-4 text-base md:text-lg max-w-2xl mx-auto">
              Модули и уроки слева, прогресс сверху, урок по центру — всё в одном месте
            </p>
          </>
        }
      >
        <DashboardMock />
      </ContainerScroll>
    </section>
  );
}
