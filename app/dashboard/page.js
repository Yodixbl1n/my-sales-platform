'use client';
import { useEffect, useState } from 'react';

const DARK = '#0d0d17';
const CARD = 'rgba(255,255,255,0.06)';
const CARD_BORDER = 'rgba(255,255,255,0.1)';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => setUser(j.user))
      .catch(() => location.href = '/');
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

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: DARK }}>
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    if (status === 'locked') return <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>🔒 Закрытый</span>;
    if (status === 'pending') return <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(234,179,8,0.2)', color: '#fde047' }}>⏳ Ждёт материал</span>;
    return <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.2)', color: '#86efac' }}>✅ Доступен</span>;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: DARK }}>
      {/* Header */}
      <header className="sticky top-0 z-10" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderBottom: `1px solid ${CARD_BORDER}` }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
              NP
            </div>
            <div>
              <p className="text-white font-semibold">NP Sales</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{user.name || 'User'} • {user.email}</p>
            </div>
          </div>
          <button
            onClick={() => { document.cookie = 'token=; path=/; max-age=0'; location.href = '/'; }}
            className="text-sm px-4 py-2 rounded-lg transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)', border: `1px solid ${CARD_BORDER}` }}
          >
            Выйти
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: CARD, border: `1px solid ${CARD_BORDER}` }}>
          <h1 className="text-3xl font-bold text-white mb-2">Привет, {user.name}! 👋</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Добро пожаловать в закрытое образовательное пространство NP Sales.
            Здесь собраны все необходимые материалы, лекции и инструменты для вашего профессионального роста.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl p-6" style={{ backgroundColor: CARD, border: `1px solid ${CARD_BORDER}` }}>
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Прогресс обучения</p>
            <p className="text-4xl font-bold text-white">0%</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>пройдено</p>
          </div>
          <div className="rounded-2xl p-6" style={{ backgroundColor: CARD, border: `1px solid ${CARD_BORDER}` }}>
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Материалы курса</p>
            <p className="text-4xl font-bold text-white">{totalLessons}</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>уроков в {modules.length} модулях</p>
          </div>
          <div className="rounded-2xl p-6" style={{ backgroundColor: CARD, border: `1px solid ${CARD_BORDER}` }}>
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Наше сообщество</p>
            <p className="text-lg font-semibold text-white mb-2">Закрытый Telegram-канал</p>
            <a href="https://t.me/nikpavlovv" target="_blank" className="text-sm" style={{ color: '#c084fc' }}>
              Перейти в канал →
            </a>
          </div>
        </div>

        {/* Course Content */}
        <div className="rounded-3xl p-8" style={{ backgroundColor: CARD, border: `1px solid ${CARD_BORDER}` }}>
          <h2 className="text-2xl font-bold text-white mb-6">Курс по продажам — содержание</h2>

          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${CARD_BORDER}` }}>
                <button
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                  className="w-full flex items-center justify-between p-5 transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                      {module.id}
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-semibold">{module.title}</p>
                        {getStatusBadge(module.status)}
                      </div>
                      <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{module.lessons.length} уроков</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 transition-transform flex-shrink-0 ${activeModule === module.id ? 'rotate-180' : ''}`} style={{ color: 'rgba(255,255,255,0.5)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeModule === module.id && (
                  <div className="p-5 space-y-2" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
                    {module.lessons.map((lesson, idx) => (
                      <button
                        key={idx}
                        disabled={module.status === 'locked'}
                        className="w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.04)',
                          color: module.status === 'locked' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)',
                          cursor: module.status === 'locked' ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                          {module.status === 'locked' ? '🔒' : idx + 1}
                        </div>
                        {lesson}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          NP Sales • Nik Pavlov • {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
