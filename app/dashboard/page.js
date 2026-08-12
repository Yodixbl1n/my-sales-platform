'use client';
import { useEffect, useState } from 'react';
import { Trophy, TrendingUp, Sparkles } from 'lucide-react';
import { ModuleQuiz } from '@/components/ui/module-quiz';
import { LessonViewer } from '@/components/ui/lesson-viewer';
import { Loader } from '@/components/ui/loader';

const LIME = '#d9f24f';

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [openLesson, setOpenLesson] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [upsell, setUpsell] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('np_plan') === 'free') {
      setUser({ name: 'Гость', free: true });
      return;
    }
    fetch('/api/me')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => setUser(j.user))
      .catch(() => (location.href = '/login'));
  }, []);

  useEffect(() => {
    try {
      setCompleted(JSON.parse(localStorage.getItem('np_progress') || '[]'));
      setCompletedLessons(JSON.parse(localStorage.getItem('np_lessons') || '[]'));
    } catch (e) {}
  }, []);

  const unlocked = (id) => id === 1 || completed.includes(id - 1);
  const isFree = !!(user && user.free);

  // Урок открыт, только если модуль открыт И предыдущий урок пройден
  const lessonUnlocked = (m, l) => {
    if (!unlocked(m)) return false;
    if (isFree && (m !== 1 || l > 4)) return false;
    if (l === 0) return true;
    return completedLessons.includes(m + '-' + (l - 1));
  };

  const completeModule = (id) => {
    setCompleted((prev) => {
      const next = [...new Set([...prev, id])];
      localStorage.setItem('np_progress', JSON.stringify(next));
      return next;
    });
  };

  const modules = [
    { id: 1, title: 'Введение и базовые понятия',
      lessons: [
        'Глоссарий экспертных продаж и философия',
        'Классическая архитектура — 5 этапов продажи',
        'Установление контакта: вербальное и невербальное',
        'Правила звонка, слова-табу и топ-4 ошибки',
        'Выявление потребности: типы вопросов',
        'Техники слушания',
        'Презентация по принципу СВЭ',
        'Дополнительные вопросы клиента и завершение',
        'Управление внутренним состоянием (НЛП)',
        'Цифровая прослушка и самоанализ',
        'Практика и типичные ошибки',
      ] },
    { id: 2, title: 'Программирование диалога (СПИН)',
      lessons: [
        'Программирование диалога и фрейминг',
        'Ситуационные вопросы (С)',
        'Проблемные вопросы (П)',
        'Извлекающие вопросы (И)',
        'Направляющие вопросы (Н)',
        'Экологичность СПИН',
        'Карта ЛПР',
        'Сквозной скрипт + MEDDIC',
        'Практика и типичные ошибки',
      ] },
    { id: 3, title: 'Архитектура ценности',
      lessons: [
        'Инжиниринг пре-убеждения',
        'Математика ценности',
        'Стратегия рынка одного игрока',
        'Психологические усилители (Чалдини)',
        'Лид-магниты и взаимный обмен',
        'Экономика внимания',
        'Авторитет и соц. доказательство',
        'Аудит обвинений',
        'Практика и типичные ошибки',
      ] },
    { id: 4, title: 'Архитектура возражений',
      lessons: [
        'Универсальный алгоритм',
        'Возражение «Дорого»',
        'Возражение «Я подумаю»',
        'Возражение «У конкурентов дешевле»',
        'Возражение «Нужно посоветоваться»',
        'Возражение «Нет денег»',
        'Искусство жёсткого «нет»',
        'Защита цены по Кеннеди',
        'Практика и типичные ошибки',
      ] },
    { id: 5, title: 'Максимизация прибыли',
      lessons: [
        'Анатомия скидки',
        'Архитектура Up-sell',
        'Cross-sell',
        'LTV по Карлу Сьюэллу',
        'Практика и типичные ошибки',
      ] },
    { id: 6, title: 'Продвинутые техники',
      lessons: [
        'Метод «Прямой линии» Белфорта',
        'Правило «трёх десяток»',
        'Асимметрия информации (BlackRock)',
        'MEDDIC',
        'Управление тональностью голоса',
        'Фреймы Клаффа',
        'Крис Восс — отражение',
        'Негативный реверс Сэндлера',
        'Брекетинг',
        'Эффект приманки',
        'Lock-in Strategy',
        'Практика и типичные ошибки',
      ] },
    { id: 7, title: 'Нейрохакинг продаж',
      lessons: [
        'Дофаминовое «выжигание»',
        'Захват амигдалы',
        'Нейро-зеркалирование',
        'Окситоциновый взлом',
        'Серотониновый сдвиг статуса',
        'Взлом кортизола',
        'Нейролингвистический рефрейминг',
        'Феномен Баадера-Майнхоф',
        'Практика и типичные ошибки',
      ] },
    { id: 8, title: 'Ментальное превосходство',
      lessons: [
        'Адаптация языка под тип собеседника',
        'Работа со слепой зоной клиента',
        'Сторителлинг с действием',
        'Негативный реверс на закрытии',
        'Работа с обобщениями',
        'Пресуппозиции',
        'Практика и типичные ошибки',
      ] },
  ];

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const visibleModules = isFree ? modules.filter((mm) => mm.id === 1) : modules;
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  const markLessonComplete = (m, l, openNext = true) => {
    const key = m + '-' + l;
    if (!completedLessons.includes(key)) {
      const next = [...completedLessons, key];
      setCompletedLessons(next);
      localStorage.setItem('np_lessons', JSON.stringify(next));
    }
    const module = modules.find(mod => mod.id === m);
    const isLast = module ? l + 1 >= shownLessons.length : true;
    setSuccessMsg(isLast ? '🏆 Модуль пройден! Остался тест!' : '🎉 Молодец! Урок пройден!');
    setTimeout(() => {
      setSuccessMsg(null);
      if (module && !isLast) {
        if (isFree && m === 1 && l === 4) {
          setOpenLesson(null);
          setActiveModule(m);
        } else {
          if (openNext) setOpenLesson({ m: m, l: l + 1 });
        }
      } else {
        setOpenLesson(null);
        setActiveModule(m);
      }
    }, 1600);
  };

  const goToPrevLesson = (m, l) => {
    if (l > 0) {
      setOpenLesson({ m: m, l: l - 1 });
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader label="ЗАГРУЖАЕМ ТВОЙ ПРОГРЕСС..." /></div>;
  }

  const badge = (id) => {
    if (completed.includes(id)) return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(217,242,79,0.15)', color: LIME }}>✅ Пройден</span>;
    if (unlocked(id)) return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(217,242,79,0.15)', color: LIME }}>▶ Доступен</span>;
    return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>🔒 Закрыт</span>;
  };

  const displayName = user.first_name || user.name || user.username || 'друг';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black" style={{ background: LIME }}>NP</div>
          <span className="text-xl font-bold tracking-tight">NP<span style={{ color: LIME }}>Sales</span></span>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{displayName}</span>
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-white/10 bg-[#141414] p-2 z-50 shadow-2xl">
                <a href="/certificate" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5">🏆 Мой сертификат</a>
                <a href="/#pricing" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5">⚡ Тарифы и оплата</a>
                <a href="https://t.me/nikpavlovv" target="_blank" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5">💬 Написать автору</a>
                <button
                  onClick={() => { document.cookie = 'token=; path=/; max-age=0'; localStorage.removeItem('np_plan'); location.href = '/'; }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5"
                  style={{ color: '#fca5a5' }}
                >
                  🚪 Выйти
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            Привет, <span style={{ color: LIME }}>{displayName}</span>! <span className="inline-block animate-pulse">👋</span>
          </h1>
          <p className="text-white/50 mt-2 text-lg">Готов прокачать продажи сегодня?</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          <div className="relative overflow-hidden rounded-3xl p-8 min-h-[420px] flex flex-col justify-between"
            style={{ background: 'radial-gradient(130% 130% at 85% 0%, #7c3aed 0%, #5b21b6 40%, #0f766e 80%, #b45309 115%)' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" style={{ color: LIME }} />
                <p className="text-sm tracking-widest text-white/70">ТВОЙ ПРОГРЕСС</p>
              </div>
              <div className="flex items-baseline gap-3 mt-4">
                <p className="text-7xl md:text-8xl font-black tracking-tighter" style={{ color: LIME }}>{progressPercent}</p>
                <p className="text-3xl font-black" style={{ color: LIME }}>%</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: progressPercent + '%', background: LIME }} />
              </div>
              <div className="flex justify-between mt-3 text-xs text-white/60">
                <span>{completedLessons.length} из {totalLessons} {pluralize(completedLessons.length, 'урок', 'урока', 'уроков')}</span>
                <span>{completed.length} из {modules.length} модулей</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 mt-6">
              <p className="leading-relaxed text-sm">
                {progressPercent === 0 && "Ты в начале пути. Начни с первого урока — каждый шаг приближает к статусу эксперта."}
                {progressPercent > 0 && progressPercent < 25 && "Отличный старт! Продолжай в том же духе."}
                {progressPercent >= 25 && progressPercent < 50 && "Четверть пути пройдена. Системность — ключ к результату."}
                {progressPercent >= 50 && progressPercent < 75 && "Больше половины позади. Ты уже видишь разницу в переговорах."}
                {progressPercent >= 75 && progressPercent < 100 && "Финишная прямая. Осталось совсем немного."}
                {progressPercent === 100 && "🏆 Все уроки пройдены! Теперь сдай тесты и получи статус эксперта."}
              </p>
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
                <Sparkles className="w-4 h-4" />
                100% практика
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-[#141414] text-white p-8 min-h-[420px] flex flex-col border border-white/10">
            <div className="flex items-center justify-between">
              <span className="rounded-full px-5 py-2.5 font-semibold text-sm" style={{ background: LIME, color: '#0a0a0a' }}>Твоя цель</span>
              <span className="text-white/30 text-xl tracking-widest">•••</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              <div className="w-28 h-28 rounded-full flex items-center justify-center mb-6" style={{ background: LIME }}>
                <Trophy className="w-12 h-12 text-black" strokeWidth={1.5} />
              </div>
              <p className="text-sm tracking-widest text-white/50 mb-2">ТЫ СТАНОВИШЬСЯ</p>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-white">Экспертом<br />по продажам</h2>
            </div>
            <p className="text-white/70 leading-relaxed border-t border-white/10 pt-5">
              Уверенность в каждом разговоре. Ты знаешь как показать ценность, отработать возражения и закрыть сделку.
            </p>
          </div>
        </div>

        {completed.length === modules.length && (
          <a
            href="/certificate"
            className="block mb-6 rounded-2xl p-5 text-center font-black text-black transition-transform hover:scale-[1.02]"
            style={{ background: LIME, boxShadow: '0 0 40px rgba(217,242,79,0.35)' }}
          >
            🏆 ВСЕ МОДУЛИ ПРОЙДЕНЫ — ЗАБРАТЬ СЕРТИФИКАТ
          </a>
        )}

        <h2 className="text-3xl font-black tracking-tight mb-6">Программа курса</h2>
        <div className="space-y-4">
          {visibleModules.map((module) => {
            const moduleLessonsDone = module.lessons.filter((_, idx) => completedLessons.includes(module.id + '-' + idx)).length;
            const shownLessons = isFree ? module.lessons.slice(0, 5) : module.lessons;
            const allLessonsDone = isFree ? (module.id === 1 && moduleLessonsDone >= 5) : moduleLessonsDone === shownLessons.length;
            const moduleProgress = Math.round((moduleLessonsDone / shownLessons.length) * 100);

            return (
              <div key={module.id} className="rounded-3xl border border-white/10 bg-[#141414] overflow-hidden">
                <button
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-5 flex-1 text-left">
                    <span className="text-2xl font-black w-10 flex-shrink-0" style={{ color: LIME }}>{module.id}</span>
                    <div className="flex-1">
                      <p className="font-bold text-lg">{module.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-white/40 text-sm">
                          {moduleLessonsDone}/{shownLessons.length} {pluralize(shownLessons.length, 'урок', 'урока', 'уроков')}
                        </p>
                        {moduleLessonsDone > 0 && (
                          <div className="flex-1 max-w-[120px] h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: moduleProgress + '%', background: LIME }} />
                          </div>
                        )}
                      </div>
                    </div>
                    {badge(module.id)}
                  </div>
                  <svg className={'w-5 h-5 text-white/40 transition-transform flex-shrink-0 ml-4 ' + (activeModule === module.id ? 'rotate-180' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeModule === module.id && (
                  <div className="px-6 pb-6 space-y-2">
                    {shownLessons.map((lesson, idx) => {
                      const lessonDone = completedLessons.includes(module.id + '-' + idx);
                      const canOpen = lessonUnlocked(module.id, idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => lessonUnlocked(module.id, idx) && setOpenLesson({ m: module.id, l: idx })}
                          className="w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-colors"
                          style={{
                            background: lessonDone ? 'rgba(217,242,79,0.08)' : 'rgba(255,255,255,0.04)',
                            color: !lessonUnlocked(module.id, idx) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.85)',
                            cursor: !lessonUnlocked(module.id, idx) ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{
                              background: lessonDone ? LIME : 'rgba(217,242,79,0.12)',
                              color: lessonDone ? '#0a0a0a' : LIME,
                            }}
                          >
                            {!lessonUnlocked(module.id, idx) ? '🔒' : lessonDone ? '✓' : idx + 1}
                          </span>
                          <span className={"flex-1 " + (lessonDone ? 'line-through text-white/50' : '')}>{lesson}</span>
                          {lessonUnlocked(module.id, idx) && !lessonDone && (
                            <span
                              onClick={(e) => { e.stopPropagation(); markLessonComplete(module.id, idx, false); }}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 hover:scale-110 transition-transform"
                              style={{ background: LIME, color: '#0a0a0a' }}
                              title="Отметить пройденным"
                            >
                              ✓
                            </span>
                          )}
                        </div>
                      );
                    })}

                    {unlocked(module.id) && (allLessonsDone ? (
                      <ModuleQuiz
                        moduleId={module.id}
                        passed={completed.includes(module.id)}
                        onPass={() => { completeModule(module.id); if (isFree) setUpsell(true); }}
                      />
                    ) : (
                      <div className="mt-4 p-4 rounded-2xl text-sm text-white/50 border border-white/10 bg-black/20">
                        🔒 Тест откроется после прохождения всех уроков модуля ({moduleLessonsDone}/{shownLessons.length})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isFree && (
          <div className="mt-6 rounded-3xl border border-dashed p-8 text-center" style={{ borderColor: 'rgba(217,242,79,0.4)', background: 'rgba(217,242,79,0.04)' }}>
            <p className="text-2xl md:text-3xl font-black tracking-tighter mb-2">🔒 ЕЩЁ 7 МОДУЛЕЙ И 66 УРОКОВ</p>
            <p className="text-white/50 mb-6 max-w-md mx-auto">Продвинутые техники, нейрохакинг и ментальное превосходство — в полной версии курса.</p>
            <a href="https://t.me/nikpavlovv" target="_blank" className="inline-block px-8 py-4 rounded-full font-black text-black transition-transform hover:scale-105" style={{ background: LIME }}>
              Купить полный курс
            </a>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between text-sm text-white/40">
          <span>NP Sales • Nik Pavlov • 2026</span>
          <a href="https://t.me/nikpavlovv" target="_blank" className="hover:text-white transition-colors" style={{ color: LIME }}>@nikpavlovv</a>
        </div>
      </main>

      {upsell && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="max-w-md w-full rounded-3xl border border-white/10 bg-[#141414] p-8 text-center">
            <p className="text-4xl mb-4">🔥</p>
            <h3 className="text-2xl font-black tracking-tighter mb-3">ВВОДНЫЙ БЛОК ПРОЙДЕН!</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Ты прошёл первые 5 уроков и увидел систему изнутри.
              Дальше — полная версия: 8 модулей, 71 урок, тесты и практика.
            </p>
            <a href="https://t.me/nikpavlovv" target="_blank" className="block px-8 py-4 rounded-full font-black text-black mb-3" style={{ background: LIME }}>
              Купить продолжение в Telegram
            </a>
            <a href="/#pricing" className="block px-8 py-4 rounded-full font-bold border border-white/20">Посмотреть тарифы</a>
            <button onClick={() => setUpsell(false)} className="mt-4 text-sm text-white/40 underline">Позже</button>
          </div>
        </div>
      )}

      <LessonViewer
        lesson={openLesson}
        onClose={() => setOpenLesson(null)}
        onComplete={() => openLesson && markLessonComplete(openLesson.m, openLesson.l)}
        onBack={() => openLesson && goToPrevLesson(openLesson.m, openLesson.l)}
        isComplete={openLesson ? completedLessons.includes(openLesson.m + '-' + openLesson.l) : false}
        isFirst={openLesson ? openLesson.l === 0 : true}
      />

      {successMsg && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none">
          <style>{'@keyframes pop { 0% { transform: scale(0.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }'}</style>
          <div
            className="rounded-3xl px-10 py-8 text-center text-2xl font-black text-black"
            style={{ background: LIME, boxShadow: '0 0 80px rgba(217,242,79,0.6)', animation: 'pop 0.25s ease-out' }}
          >
            {successMsg}
          </div>
        </div>
      )}
    </div>
  );
}
