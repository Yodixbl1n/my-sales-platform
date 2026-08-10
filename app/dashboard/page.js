'use client';
import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { ModuleQuiz } from '@/components/ui/module-quiz';
import { LessonViewer } from '@/components/ui/lesson-viewer';

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
  const [openLesson, setOpenLesson] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => setUser(j.user))
      .catch(() => (location.href = '/login'));
  }, []);

  useEffect(() => {
    try {
      setCompleted(JSON.parse(localStorage.getItem('np_progress') || '[]'));
    } catch (e) {}
  }, []);

  const unlocked = (id) => id === 1 || completed.includes(id - 1);

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
        'Глоссарий экспертных продаж и философия: от «впаривания» к помощи',
        'Классическая архитектура — 5 обязательных этапов продажи',
        'Установление контакта: вербальное и невербальное, голос как лицо продавца',
        'Правила звонка, слова-табу и топ-4 ошибки при контакте',
        'Выявление потребности: открытые, альтернативные и закрытые вопросы',
        'Техники слушания: активно-безоценочное как рабочая техника',
        'Презентация по принципу СВЭ (свойство → выгода → эмоция)',
        'Дополнительные вопросы клиента и завершение контакта',
        'Управление внутренним состоянием (НЛП): 4 принципа уверенности',
        'Цифровая прослушка, самоанализ, спарринги + методика ФБР и Джим Кэмп',
      ] },
    { id: 2, title: 'Программирование диалога и квалификация (СПИН)',
      lessons: [
        'Программирование диалога и фрейминг',
        'Ситуационные вопросы (С) — аудит точки А и точки Б',
        'Проблемные вопросы (П) — поиск «узких горлышек»',
        'Извлекающие вопросы (И) — масштабирование боли',
        'Направляющие вопросы (Н) — клиент продаёт себе сам',
        'Экологичность СПИН и архитектура идеального перехода',
        'Карта ЛПР: выход на директора в B2B-сделках',
        'Сводная практика: сквозной скрипт квалификации + MEDDIC',
      ] },
    { id: 3, title: 'Архитектура ценности и инжиниринг пре-убеждения',
      lessons: [
        'Инжиниринг пре-убеждения: подготовка восприятия до аргументации',
        'Математика ценности: формула безотказного оффера',
        'Стратегия «рынка одного игрока» и вакуум продаж',
        'Психологические усилители: дефицит, срочность, гарантии (Чалдини)',
        'Архитектура лид-магнитов и триггер взаимного обмена',
        'Экономика внимания и правило «3.5 к 1»',
        'Авторитет, соц. доказательство, триггер единства и общий враг',
        'Аудит обвинений и «правило 100» в трафике',
      ] },
    { id: 4, title: 'Архитектура отработки возражений',
      lessons: [
        'Универсальный алгоритм: согласие → переход → аргумент → призыв',
        'Возражение «Дорого»: смещение фокуса на окупаемость',
        'Возражение «Я подумаю»: вскрытие истинной причины',
        'Возражение «У конкурентов дешевле»: разница в содержании и результате',
        'Возражение «Мне нужно посоветоваться»: вовлечение второго человека',
        'Возражение «Нет денег»: смещение приоритета без давления',
        'Искусство жёсткого «нет»: экологичное увольнение клиента',
        'Защита цены по методу Гэвина Кеннеди',
      ] },
    { id: 5, title: 'Максимизация прибыли (Upsell, торги и LTV)',
      lessons: [
        'Анатомия скидки и правило «обмена уступками»',
        'Архитектура Up-sell: дорогая версия в момент готовности платить',
        'Cross-sell: сопутствующий продукт, усиливающий результат',
        'LTV и пост-продажное обслуживание по Карлу Сьюэллу',
      ] },
    { id: 6, title: 'Продвинутые техники (закрытый блок)',
      lessons: [
        'Блок А: метод «Прямой линии» Белфорта и механика зацикливания',
        'Блок А: правило «трёх десяток» — продукт, продавец, компания',
        'Блок Б: продажа через асимметрию информации (модель BlackRock)',
        'Блок Б: MEDDIC — закрытый чек-лист квалификации B2B',
        'Блок В: управление тональностью голоса и Pace & Pitch Anchor',
        'Блок Г: фреймы Клаффа — «Приз» и «Интрига»',
        'Блок Г: Крис Восс — отражение, провокация на «нет», калиброванные вопросы',
        'Блок Г: негативный реверс Сэндлера',
        'Блок Г: брекетинг и упреждающий удар по возражениям',
        'Блок Д: эффект приманки (асимметричное доминирование)',
        'Блок Д: Lock-in Strategy (институциональный захват)',
      ] },
    { id: 7, title: 'Нейрохакинг продаж',
      lessons: [
        'Урок 1: дофаминовое «выжигание» и петля ожидания',
        'Урок 2: захват амигдалы через «иллюзию угрозы»',
        'Урок 3: нейро-зеркалирование и эффект собственности',
        'Урок 4: окситоциновый взлом «свой/чужой»',
        'Урок 5: серотониновый сдвиг статуса',
        'Урок 6: взлом кортизола через управляемый стресс',
        'Урок 7: нейролингвистический рефрейминг (Sleight of Mouth)',
        'Урок 8: феномен Баадера-Майнхоф',
      ] },
    { id: 8, title: 'Мастер-класс по ментальному превосходству и стратегическому влиянию',
      lessons: [
        'Адаптация языка под тип собеседника (3 профиля)',
        'Работа со слепой зоной клиента: факт вместо совета',
        'Сторителлинг с встроенным действием',
        'Негативный реверс на этапе закрытия',
        'Работа с обобщениями клиента («квантор общности»)',
        'Пресуппозиции (техника из НЛП)',
      ] },
  ];

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);

  if (!user) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Загрузка...</div>;
  }

  const badge = (id) => {
    if (completed.includes(id)) return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(217,242,79,0.15)', color: LIME }}>✅ Пройден</span>;
    if (unlocked(id)) return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(217,242,79,0.15)', color: LIME }}>▶ Доступен</span>;
    return <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>🔒 Закрыт</span>;
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
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">2026</h1>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="leading-relaxed">Ты в начале пути. Впереди {totalLessons} {pluralize(totalLessons, 'урок', 'урока', 'уроков')}, которые изменят то, как ты продаёшь.</p>
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
              <h2 className="text-4xl font-black leading-tight tracking-tight text-white">Эксперт<br />по продажам</h2>
            </div>
            <p className="text-white/70 leading-relaxed border-t border-white/10 pt-5">
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
                    <p className="text-white/40 text-sm mt-0.5">{module.lessons.length} {pluralize(module.lessons.length, 'урок', 'урока', 'уроков')}</p>
                  </div>
                  {badge(module.id)}
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
                      disabled={!unlocked(module.id)}
                      onClick={() => setOpenLesson({ m: module.id, l: idx })}
                      className="w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-colors"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        color: !unlocked(module.id) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.85)',
                        cursor: !unlocked(module.id) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(217,242,79,0.12)', color: LIME }}>
                        {!unlocked(module.id) ? '🔒' : idx + 1}
                      </span>
                      {lesson}
                    </button>
                  ))}
                  {unlocked(module.id) && (
                    <ModuleQuiz
                      moduleId={module.id}
                      passed={completed.includes(module.id)}
                      onPass={() => completeModule(module.id)}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </main>
      <LessonViewer lesson={openLesson} onClose={() => setOpenLesson(null)} />
      <main className="hidden">
          <span>NP Sales • Nik Pavlov • 2026</span>
          <a href="https://t.me/nikpavlovv" target="_blank" className="hover:text-white transition-colors" style={{ color: LIME }}>@nikpavlovv</a>
        </div>
      </main>
    </div>
  );
}
