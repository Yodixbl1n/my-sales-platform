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
      {/* Header */}
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
        {/* Hero cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          {/* Gradient card */}
          <div className="relative overflow-hidden rounded-3xl p-10 min-h-[420px] flex flex-col justify-end"
            style={{ background: 'radial-gradient(130% 130% at 85% 0%, #7c3aed 0%, #5b21b6 40%, #0f766e 80%, #b45309 115%)' }}>
            <p className="text-2xl mb-1" style={{ color: LIME }}>Твоё обучение</p>
            <h1 className="text-8xl font-black tracking-tighter mb-8">2026</h1>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="leading-relaxed">Ты в начале пути. Впереди {totalLessons} уроков, которые изменят то, как ты продаёшь.</p>
            </div>
          </div>

          {/* Stats card */}
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

          {/* White card */}
          <div className="rounded-3xl bg-white text-black p-8 min-h-[420px] flex flex-col">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-black text-white px-5 py-2.5 font-semibold text-sm">Твоя цель</span>

git add .
git commit -m "Year Wrapped style dashboard"
git push origin main
git add .
