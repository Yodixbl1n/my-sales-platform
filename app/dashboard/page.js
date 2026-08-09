'use client';
import { useEffect, useState } from 'react';

const LIME = '#d9f24f';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => setUser(j.user))
      .catch(() => (location.href = '/login'));
  }, []);

  const modules = [
    { id: 1, title: 'Введение и базовые понятия', status: 'ready',
      lessons: ['Разделы-заглушки: глоссарий, философия продаж, архитектура уверенности, цифровая прослушка','Алгоритм коммуникации с клиентом (5 этапов)','Этап 1. Установление контакта (вербальное/невербальное, правила звонка, слова-табу, топ-4 ошибки)','Этап 2. Выявление потребности (типы вопросов, техники слушания)','Этап 3. Презентация (СВЭ)','Работа с дополнительными вопросами клиента','Этап 5. Завершение контакта','Доп.: методика ФБР, квалификация лидов, эмоциональный дожим, техники Джима Кэмпа'] },
    { id: 2, title: 'Программирование диалога и квалификация (СПИН)', status: 'ready',
      lessons: ['Структура СПИН (С-П-И-Н), фрейминг, экологичность, карта ЛПР','Фреймворк квалификации MEDDIC (M-E-D-D-I-C)'] },
    { id: 3, title: 'Архитектура ценности и инжиниринг пре-убеждения', status: 'pending',
      lessons: ['Список тем (пока без развёрнутого контента — ждём материал)'] },
    { id: 4, title: 'Архитектура отработки возражений', status: 'pending',
      lessons: ['Список тем + метод Гэвина Кеннеди (пока без развёрнутого контента — ждём материал)'] },
    { id: 5, title: 'Максимизация прибыли (Upsell, торги и LTV)', status: 'ready',
      lessons: ['Базовая структура (скидки, upsell/cross-sell, LTV по Сьюэллу)','Эффект приманки (Decoy Effect) — пример пакетов','Lock-in Strategy (встраивание в инфраструктуру клиента)'] },
    { id: 6, title: 'Продвинутые техники (закрытый блок)', status: 'locked',
      lessons: ['Метод «Прямой линии» Белфорта','Асимметрия информации (BlackRock)','MEDDIC (повтор-ссылка на Модуль 2)','Управление тональностью голоса','Управление фреймами Клаффа','Тактическая эмпатия Криса Восса','Негативный реверс Сэндлера','Брекетинг (защита цены)','Упреждающий удар по возражениям','Темп и тон речи (Pace & Pitch Anchor)'] },
    { id: 7, title: 'Нейрохакинг продаж', status: 'ready',
      lessons: ['Дофаминовые петли','Захват амигдалы','Эффект собственности (зеркальные нейроны)','Окситоциновый взлом «свой/чужой»','Серотониновый сдвиг статуса','Кортизоловая ловушка','Нейролингвистический рефрейминг','Феномен Баадера-Майнхоф'] },
    { id: 8, title: 'Мастер-класс по ментальному превосходству и стратегическому влиянию', status: 'ready',
      lessons: ['Адаптация языка под тип собеседника','Работа со слепой зоной клиента','Сторителлинг с встроенным действием','Негативный реверс на закрытии','Работа с обобщениями клиента','Пресуппозиции','Заметка: часть формулировок смягчена по этическим соображениям'] }
  ];

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);

  if (!user) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Загрузка...</div>;
  }

  const badge = (status) => {
    if (status === 'locked') return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>🔒 Закрытый</span>;
    if (status === 'pending') return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(234,179,8,0.15)', color: '#fde047' }}>⏳ Ждёт материал</span>;
    return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(217,242,79,0.15)', color: LIME }}>✅ Доступен</span>;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black" style={{ background: LIME }}>NP</div>
          <span className="text-xl font-bold tracking-tight">NP<span style={{ color: LIME }}>Sales</span></span>
        </div>
        <button
          onClick={() => { document.cookie = 'token=; path=/; max-age=0'; location.href = '/'; }}
          className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}>
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium">{user.name}</span>
          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          <div className="relative overflow-hidden rounded-3xl p-10 min-h-[420px] flex flex-col justify-end"
            style={{ background: 'radial-gradient(130% 130% at 85% 0%, #7c3aed 0%, #5b21b6 40%, #0f766e 80%, #b45309 115%)' }}>
            <p className="text-2xl mb-1" style={{ color: LIME }}>Твоё обучение</p>
            <h1 className="text-8xl font-black tracking-tighter mb-8">2026</h1>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="leading-relaxed">Ты в начале пути. Впереди {totalLessons} уроков, которые изменят то, как ты продаёшь.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#141414] p-8 flex flex-col justify-between min-h-[420px]">
            <div>
              <p className="text-sm tracking-widest text-white/50 mb-3">ВСЕГО УРОКОВ</p>
              <p className="text-7xl font-black tracking-tighter" style={{ color: '#e879f9' }}>{totalLessons}</p>
            </div>
            <div>
              <p className="text-sm tracking-widest text-white/50 mb-3">МОДУЛЕЙ</p>
              <p className="text-6xl font-black tracking-tighter">{modules.length}</p>
              <span className="inline-flex items-center gap-2 mt-5 rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: 'rgba(217,242,79,0.12)', color: LIME }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                100% практика
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-white text-black p-8 min-h-[420px] flex flex-col">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-black text-white px-5 py-2.5 font-semibold text-sm">Твоя цель</span>
              <span className="text-black/30 text-xl tracking-widest">•••</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l10 6-10 6L2 8l10-6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l10 6 10-6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 16l10 6 10-6" />
                </svg>
              </div>
              <p className="text-sm tracking-widest text-black/50 mb-2">ТЫ СТАНОВИШЬСЯ</p>
              <h2 className="text-4xl font-black leading-tight tracking-tight">Эксперт<br />по продажам</h2>
            </div>
            <p className="text-black/70 leading-relaxed border-t border-black/10 pt-5">
              Уверенность в каждом разговоре. Ты знаешь как показать ценность, отработать возражения и закрыть сделку.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-black tracking-tight mb-6">Программа курса</h2>
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="rounded-3xl border border-white/10 bg-[#141414] overflow-hidden">
              <button
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-5 flex-1 text-left">
                  <span className="text-2xl font-black w-10 flex-shrink-0" style={{ color: LIME }}>{module.id}</span>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{module.title}</p>
                    <p className="text-white/40 text-sm mt-0.5">{module.lessons.length} уроков</p>
                  </div>
                  {badge(module.status)}
                </div>
                <svg className={`w-5 h-5 text-white/40 transition-transform flex-shrink-0 ml-4 ${activeModule === module.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeModule === module.id && (
                <div className="px-6 pb-6 space-y-2">
                  {module.lessons.map((lesson, idx) => (
                    <button
                      key={idx}
                      disabled={module.status === 'locked'}
                      className="w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-colors"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        color: module.status === 'locked' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.85)',
                        cursor: module.status === 'locked' ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(217,242,79,0.12)', color: LIME }}>
                        {module.status === 'locked' ? '🔒' : idx + 1}
                      </span>
                      {lesson}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between text-sm text-white/40">
          <span>NP Sales • Nik Pavlov • 2026</span>
          <a href="https://t.me/nikpavlovv" target="_blank" className="hover:text-white transition-colors" style={{ color: LIME }}>@nikpavlovv</a>
        </div>
      </main>
    </div>
  );
}
