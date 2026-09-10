const LIME = '#d9f24f';

const CARDS = [
  { tag: 'МОДУЛЬ 01 · УРОК 04', title: 'Фреймворк C.U.P.', note: 'Архитектура идеального звонка', progress: 34, rot: -14, x: -52, z: -60, delay: 0, hide: 'hidden sm:block' },
  { tag: 'МОДУЛЬ 04 · УРОК 02', title: 'Возражение «дорого»', note: 'AAAR и Бумеранг', progress: 72, rot: -7, x: -26, z: -30, delay: 0.7, hide: '' },
  { tag: 'МОДУЛЬ 07 · УРОК 01', title: 'Дофаминовое выжигание 🧠', note: 'Нейрохакинг продаж', progress: 100, rot: 0, x: 0, z: 0, delay: 1.4, hide: '' },
  { tag: 'МОДУЛЬ 02 · УРОК 03', title: 'СПИН: Проблемные вопросы', note: 'Программирование диалога', progress: 58, rot: 7, x: 26, z: -30, delay: 2.1, hide: '' },
  { tag: 'МОДУЛЬ 08 · УРОК 07', title: 'Пресуппозиции', note: 'Ментальное превосходство', progress: 12, rot: 14, x: 52, z: -60, delay: 2.8, hide: 'hidden sm:block' },
];

const STYLE = `
@keyframes hc-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}
`;

/**
 * HeroCards3D — плавающий веер карточек уроков в перспективе.
 * Чистый CSS: покачивание + глубина через translateZ/rotateY.
 */
export function HeroCards3D() {
  return (
    <>
      <style>{STYLE}</style>
      <div className="relative mx-auto max-w-4xl px-4 overflow-hidden" style={{ perspective: '1200px', height: 320 }} aria-hidden>
        <div
          className="relative w-full h-full"
          style={{ transform: 'rotateX(10deg)', transformStyle: 'preserve-3d' }}
        >
          {CARDS.map((c, i) => (
            <div
              key={i}
              className={`absolute left-1/2 top-1/2 ${c.hide}`}
              style={{
                width: 250,
                transform: `translate(-50%,-50%) translateX(${c.x}%) rotateY(${c.rot}deg) translateZ(${c.z}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ animation: `hc-float 7s ease-in-out ${c.delay}s infinite` }}>
                <div
                  className="rounded-2xl border bg-[#141414]/95 p-4 backdrop-blur"
                  style={{
                    borderColor: i === 2 ? LIME : 'rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 70px rgba(0,0,0,0.55)',
                  }}
                >
                  <p className="text-[9px] tracking-widest font-bold" style={{ color: LIME }}>{c.tag}</p>
                  <p className="font-bold text-sm text-white mt-1">{c.title}</p>
                  <p className="text-[11px] text-white/50 mt-0.5">{c.note}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: c.progress + '%', background: LIME }} />
                  </div>
                  <p className="text-[10px] text-white/40 mt-1">{c.progress}% пройдено</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
