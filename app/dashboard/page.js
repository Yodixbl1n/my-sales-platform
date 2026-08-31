'use client';
import { useEffect, useState } from 'react';
import { LessonViewer } from '@/components/ui/lesson-viewer';
import { ModuleQuiz } from '@/components/ui/module-quiz';
import { X } from 'lucide-react';
import { Loader } from '@/components/ui/loader';

const LIME = '#d9f24f';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [openLesson, setOpenLesson] = useState(null);
  const [activeModule, setActiveModule] = useState(1);
  const [quizModule, setQuizModule] = useState(null);
  const [upsell, setUpsell] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const modules = [
    { id: 1, title: 'Введение и базовые понятия',
      lessons: ['Философия продаж: от «впаривания» к помощи', 'Глоссарий: Лид, Контакт, Потребность', 'Глоссарий: СВЭ, Возражение, ЛПР, Оффер', 'Глоссарий: Квалификация, Клоузинг, Upsell, LTV', '5 этапов продажи + установление контакта', 'Архитектура идеального звонка — Фреймворк C.U.P.', 'Выявление потребности: вопросы и слушание', 'Презентация, вопросы, завершение', 'Управление внутренним состоянием (НЛП)', 'Прослушка, самоанализ, спарринги', 'Методика ФБР, эмоциональный дожим, Джим Кэмп', 'Практика и типичные ошибки Модуля 1'] },
    { id: 2, title: 'Программирование диалога (СПИН)',
      lessons: ['Программирование диалога и фрейминг', 'СПИН: Ситуационные вопросы (С)', 'СПИН: Проблемные вопросы (П)', 'СПИН: Извлекающие вопросы (И)', 'СПИН: Направляющие вопросы (Н)', 'Экологичность СПИН и вопрос-крючок', 'Карта ЛПР и сквозной скрипт', 'Фреймворки квалификации: BANT, CHAMP, GPCT, MEDDIC', 'Практика и ошибки Модуля 2'] },
    { id: 3, title: 'Архитектура ценности',
      lessons: ['Пре-убеждение и первое впечатление', 'Формула ценности Хормози', 'Рынок одного игрока', '6 принципов влияния Чалдини', 'Лид-магниты и воронки', 'Экономика внимания', 'Триггер единства', 'Практика и ошибки Модуля 3'] },
    { id: 4, title: 'Архитектура возражений',
      lessons: ['Универсальный алгоритм отработки возражений', 'Возражения «дорого» и «я подумаю»', 'AAAR и Бумеранг: как превращать «нет» и «я подумаю» в сделку', 'Возражения «у конкурентов дешевле» и «нужно посоветоваться»', 'Возражение «нет денег» и экологичное увольнение', 'Защита цены (Кеннеди) и Feel-Felt-Found', 'Эффект рамки и избегание потерь', 'Якорный эффект в переговорах о цене', 'Большая картина: как соединить C.U.P., AAAR и Бумеранг', 'Практика и ошибки Модуля 4'] },
    { id: 5, title: 'Максимизация прибыли',
      lessons: ['Анатомия скидки и правило обмена уступками', 'Архитектура Up-sell и Cross-sell', 'LTV и пост-продажное обслуживание', 'RFM-анализ: как находить самых ценных клиентов', 'Почему удержание важнее привлечения: статистика', 'Окно возможностей для Up-sell: момент решает всё', 'Отток клиентов (churn) и проактивное внимание', 'NPS (индекс потребительской лояльности)'] },
    { id: 6, title: 'Продвинутые техники',
      lessons: ['Метод «Прямой линии» Джордана Белфорта', 'Правило «трёх десяток» Белфорта', 'Продажа через асимметрию информации (модель BlackRock)', 'Фреймворк квалификации MEDDIC', 'Управление тональностью голоса', 'Темп и тон речи как маркер экспертности', 'Управление фреймами Орена Клаффа (Pitch Anything)', 'Тактическая эмпатия Криса Восса (Never Split the Difference)', 'Негативный реверс Дэвида Сэндлера (Sandler Selling)', 'Защита цены методом брекетинга (Bracketing)', 'Упреждающий удар по возражениям (Objection Preemption)', 'Модель асимметричного доминирования (эффект приманки)', 'Фреймворк «Институционального захвата» (Lock-in Strategy)'] },
    { id: 7, title: 'Нейрохакинг продаж',
      lessons: ['Дофаминовое «выжигание» и петля ожидания', 'Эффект Зейгарник и теория информационного разрыва', 'Захват амигдалы через «иллюзию угрозы» (Amygdala Hijack)', 'Нейро-зеркалирование через «эффект собственности»', 'Окситоциновый взлом «свой/чужой»', 'Серотониновый сдвиг статуса (The Serotonin Status Swap)', 'Взлом кортизола через управляемый стресс', 'Нейролингвистический рефрейминг контекста (Sleight of Mouth)', 'Феномен Баадера-Майнхоф (иллюзия частотности)'] },
    { id: 8, title: 'Ментальное превосходство',
      lessons: ['BATNA — фундамент реальной переговорной силы (Фишер и Юри)', 'Адаптация языка под тип собеседника (спиральная динамика)', 'Работа со слепой зоной клиента', 'Сторителлинг с встроенным действием', 'Негативный реверс на этапе закрытия', 'Работа с обобщениями клиента (техника «квантора общности»)', 'Пресуппозиции (техника из НЛП)'] },
  ];

  useEffect(() => {
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setUser(j.user))
      .catch(() => (location.href = '/login'));
    // Загружаем прогресс с сервера (вместо localStorage)
    fetch('/api/progress')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (j.success) {
          setCompleted(j.modules || []);
          setCompletedLessons(j.lessons || []);
        }
      })
      .catch(() => {});
  }, []);

  const isFree = !!(user && user.free);
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const visibleModules = isFree ? modules.filter((mm) => mm.id === 1) : modules;
  const progressPercent = totalLessons ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  const unlocked = (id) => id === 1 || completed.includes(id - 1);
  const lessonUnlocked = (m, l) => {
    if (!unlocked(m)) return false;
    if (isFree && (m !== 1 || l > 4)) return false;
    if (l === 0) return true;
    return completedLessons.includes(m + '-' + (l - 1));
  };
  const allLessonsDone = (m) => {
    const module = modules.find((mod) => mod.id === m);
    if (!module) return false;
    const need = isFree && m === 1 ? 5 : module.lessons.length;
    let done = 0;
    for (let i = 0; i < need; i++) if (completedLessons.includes(m + '-' + i)) done++;
    return done >= need;
  };

  const markLessonComplete = (m, l, openNext = true) => {
    const key = m + '-' + l;
    if (!completedLessons.includes(key)) {
      const next = [...completedLessons, key];
      setCompletedLessons(next);
      // Отправляем на сервер (вместо localStorage)
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'lesson', module: m, lesson: l })
      }).catch(() => {});
    }
    const module = modules.find((mod) => mod.id === m);
    const isLast = module ? l + 1 >= module.lessons.length : true;
    setSuccessMsg(isLast ? '🏆 Модуль пройден! Остался тест!' : '🎉 Молодец! Урок пройден!');
    setTimeout(() => {
      setSuccessMsg(null);
      if (isFree && m === 1 && l === 4) {
        setOpenLesson(null);
        setUpsell(true);
        return;
      }
      if (module && !isLast && openNext) {
        setOpenLesson({ m, l: l + 1 });
      } else {
        setOpenLesson(null);
        setActiveModule(m);
      }
    }, 1400);
  };

  const completeModule = (id) => {
    if (!completed.includes(id)) {
      const next = [...completed, id];
      setCompleted(next);
      // Отправляем на сервер (вместо localStorage)
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'module', module: id })
      }).catch(() => {});
    }
  };

  const logout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    localStorage.removeItem('np_plan');
    location.href = '/';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader label="ЗАГРУЖАЕМ ТВОЙ ПРОГРЕСС..." />
      </div>
    );
  }

  const displayName = user.first_name || user.name || user.username || 'друг';
  const currentModule = openLesson ? modules.find((m) => m.id === openLesson.m) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ===== САЙДБАР (модули + уроки слева) ===== */}
      <aside
        className={
          'fixed lg:sticky top-0 left-0 h-screen w-80 bg-[#0f0f0f] border-r border-white/10 z-40 flex flex-col transition-transform duration-300 ' +
          (sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')
        }
      >
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black" style={{ background: LIME }}>NP</div>
          <span className="font-bold tracking-tight">NP<span style={{ color: LIME }}>Sales</span></span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {visibleModules.map((module) => {
            const isOpen = activeModule === module.id;
            const isUnlocked = unlocked(module.id);
            return (
              <div key={module.id}>
                <button
                  onClick={() => setActiveModule(isOpen ? null : module.id)}
                  className="w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 transition-colors"
                  style={{
                    background: isOpen ? 'rgba(217,242,79,0.08)' : 'transparent',
                    color: isUnlocked ? '#fff' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: completed.includes(module.id) ? LIME : isUnlocked ? 'rgba(217,242,79,0.12)' : 'rgba(255,255,255,0.06)',
                      color: completed.includes(module.id) ? '#0a0a0a' : isUnlocked ? LIME : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {completed.includes(module.id) ? '✓' : isUnlocked ? module.id : '🔒'}
                  </span>
                  <span className="flex-1 text-sm font-semibold">{module.title}</span>
                  <span className="text-white/30 text-xs">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {module.lessons.map((lesson, idx) => {
                      const canOpen = lessonUnlocked(module.id, idx);
                      if (isFree && module.id === 1 && idx > 4) return null;
                      const done = completedLessons.includes(module.id + '-' + idx);
                      const isActive = openLesson && openLesson.m === module.id && openLesson.l === idx;
                      return (
                        <button
                          key={idx}
                          disabled={!canOpen}
                          onClick={() => {
                            setOpenLesson({ m: module.id, l: idx });
                            setSidebarOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors"
                          style={{
                            background: isActive ? 'rgba(217,242,79,0.15)' : 'transparent',
                            color: !canOpen ? 'rgba(255,255,255,0.25)' : done ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)',
                            cursor: canOpen ? 'pointer' : 'not-allowed',
                          }}
                        >
                          <span className="flex-shrink-0" style={{ color: done ? LIME : 'inherit' }}>
                            {!canOpen ? '🔒' : done ? '✓' : '○'}
                          </span>
                          <span className="truncate">{lesson}</span>
                        </button>
                      );
                    })}
                    {allLessonsDone(module.id) && !completed.includes(module.id) && (
                      <button
                        onClick={() => { setQuizModule(module.id); setSidebarOpen(false); }}
                        className="w-full mt-1 px-3 py-2 rounded-lg text-xs font-bold text-black transition-transform hover:scale-[1.02]"
                        style={{ background: LIME }}
                      >
                        🎯 Пройти тест модуля
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {isFree && (
            <div className="mt-3 p-4 rounded-xl border border-dashed" style={{ borderColor: 'rgba(217,242,79,0.4)', background: 'rgba(217,242,79,0.04)' }}>
              <p className="text-sm font-black tracking-tight mb-1">🔒 ЕЩЁ 7 МОДУЛЕЙ</p>
              <p className="text-xs text-white/50 mb-3">Полная версия: продвинутые техники, нейрохакинг, ментальное превосходство.</p>
              <a href="https://t.me/nikpavlovv" target="_blank" className="block text-center px-3 py-2 rounded-full text-xs font-black text-black" style={{ background: LIME }}>
                Купить полный курс
              </a>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-white/10">
          <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white transition-colors">
            🚪 Выйти
          </button>
        </div>
      </aside>

      {/* ===== ОСНОВНАЯ ОБЛАСТЬ ===== */}
      <main className="flex-1 min-w-0">
        {/* Верхняя панель */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center">☰</button>
            <div>
              <p className="text-sm sm:text-base font-bold leading-tight">Привет, {displayName}! 👋</p>
              <p className="text-xs text-white/40">Готов прокачать продажи сегодня?</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}
            >
              {displayName.charAt(0).toUpperCase()}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#141414] p-2 z-50 shadow-2xl">
                <a href="/certificate" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5">🏆 Мой сертификат</a>
                <a href="/#pricing" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5">⚡ Тарифы и оплата</a>
                <a href="https://t.me/nikpavlovv" target="_blank" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5">💬 Написать автору</a>
                <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5" style={{ color: '#fca5a5' }}>🚪 Выйти</button>
              </div>
            )}
          </div>
        </div>

        {/* Баннер сертификата */}
        {completed.length === modules.length && (
          <a href="/certificate" className="block mx-3 sm:mx-6 mt-3 sm:mt-6 rounded-2xl p-4 sm:p-5 text-center font-black text-black transition-transform hover:scale-[1.01]" style={{ background: LIME, boxShadow: '0 0 40px rgba(217,242,79,0.35)' }}>
            🏆 ВСЕ МОДУЛИ ПРОЙДЕНЫ — ЗАБРАТЬ СЕРТИФИКАТ
          </a>
        )}

        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          {/* ===== ТРИ КАРТОЧКИ СТАТИСТИКИ (вернул) ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6" style={{ background: 'radial-gradient(130% 130% at 85% 0%, #7c3aed 0%, #5b21b6 40%, #0f766e 80%)' }}>
              <p className="text-[10px] sm:text-xs text-white/70 mb-1">ТВОЙ ПРОГРЕСС</p>
              <p className="text-3xl sm:text-5xl font-black tracking-tighter" style={{ color: LIME }}>
                {progressPercent}<span className="text-xl sm:text-2xl">%</span>
              </p>
              <p className="text-[10px] sm:text-xs text-white/60 mt-2">{completedLessons.length} из {totalLessons} уроков</p>
              <p className="text-[10px] sm:text-xs text-white/60">{completed.length} из {modules.length} модулей</p>
            </div>
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-4 sm:p-6 flex flex-col justify-between">
              <p className="text-[10px] sm:text-xs text-white/60 mb-1">ВСЕГО УРОКОВ</p>
              <p className="text-3xl sm:text-5xl font-black tracking-tighter" style={{ color: '#e879f9' }}>{totalLessons}</p>
              <p className="text-[10px] sm:text-xs text-white/40 mt-2">100% практика</p>
            </div>
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-4 sm:p-6 flex flex-col justify-between">
              <p className="text-[10px] sm:text-xs text-white/60 mb-1">МОДУЛЕЙ</p>
              <p className="text-3xl sm:text-5xl font-black tracking-tighter">{modules.length}</p>
              <p className="text-[10px] sm:text-xs text-white/40 mt-2">Ты становишься экспертом</p>
            </div>
          </div>

          {/* ===== УРОК ПО ЦЕНТРУ (или подсказка) ===== */}
          {openLesson && currentModule ? (
            <div>
              <button onClick={() => setOpenLesson(null)} className="text-sm text-white/40 hover:text-white mb-4 flex items-center gap-2">
                ← Назад к программе
              </button>
              <p className="text-xs tracking-widest mb-2" style={{ color: LIME }}>
                МОДУЛЬ {currentModule.id} · УРОК {openLesson.l + 1} / {currentModule.lessons.length}
              </p>
              <LessonViewer inline lesson={openLesson} onClose={() => setOpenLesson(null)} onComplete={() => markLessonComplete(openLesson.m, openLesson.l, false)} />

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-10">
                <button
                  onClick={() => openLesson.l > 0 && setOpenLesson({ m: openLesson.m, l: openLesson.l - 1 })}
                  disabled={openLesson.l === 0}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-4 rounded-full text-sm sm:text-base font-bold border transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: openLesson.l === 0 ? 'rgba(255,255,255,0.25)' : '#fff', cursor: openLesson.l === 0 ? 'not-allowed' : 'pointer' }}
                >
                  ← Предыдущий урок
                </button>
                <button
                  onClick={() => markLessonComplete(openLesson.m, openLesson.l)}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-4 rounded-full text-sm sm:text-base font-black text-black transition-transform hover:scale-[1.02]"
                  style={{ background: LIME, boxShadow: '0 0 30px rgba(217,242,79,0.3)' }}
                >
                  ✓ Урок пройден → Следующий
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-6 sm:p-10 text-center">
              <p className="text-xl sm:text-2xl font-black tracking-tight mb-2">Выбери урок слева 👈</p>
              <p className="text-white/50">Нажми на модуль, затем на урок — и он откроется прямо здесь.</p>
            </div>
          )}

          <p className="text-sm text-white/40 mt-8">NP Sales • Nik Pavlov • 2026 · <a href="https://t.me/nikpavlovv" target="_blank" className="underline" style={{ color: LIME }}>@nikpavlovv</a></p>
        </div>
      </main>

      {/* ===== МОДАЛКИ ===== */}
      {quizModule && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setQuizModule(null)}>
          <div className="w-full max-w-xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-3 sm:p-5 border-b border-white/10 flex-shrink-0">
              <h3 className="text-base sm:text-lg font-black">📝 Тест по модулю {quizModule}</h3>
              <button onClick={() => setQuizModule(null)} className="rounded-full p-2 hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-6 flex-1 overflow-y-auto">
              <ModuleQuiz
                moduleId={quizModule}
                passed={completed.includes(quizModule)}
                onPass={() => {
                  completeModule(quizModule);
                }}
                onClose={() => setQuizModule(null)}
              />
            </div>
          </div>
        </div>
      )}

      {upsell && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.9)' }}>
          <div className="max-w-md w-full rounded-3xl border border-white/10 bg-[#141414] p-8 text-center">
            <p className="text-4xl mb-4">🔥</p>
            <h3 className="text-2xl font-black tracking-tighter mb-3">ВВОДНЫЙ БЛОК ПРОЙДЕН!</h3>
            <p className="text-white/60 mb-6 leading-relaxed">Ты прошёл первые 5 уроков и увидел систему изнутри. Дальше — полная версия: 8 модулей, 75 уроков, тесты и практика.</p>
            <a href="https://t.me/nikpavlovv" target="_blank" className="block px-8 py-4 rounded-full font-black text-black mb-3" style={{ background: LIME }}>Купить продолжение в Telegram</a>
            <button onClick={() => setUpsell(false)} className="mt-2 text-sm text-white/40 underline">Позже</button>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] px-6 py-3 rounded-full font-bold text-black" style={{ background: LIME, boxShadow: '0 0 40px rgba(217,242,79,0.4)' }}>
          {successMsg}
        </div>
      )}
    </div>
  );
}
