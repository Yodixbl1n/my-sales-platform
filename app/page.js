'use client';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
              NP
            </div>
            <span className="text-white font-bold text-xl">NP Sales</span>
          </div>
          <Link 
            href="/login"
            className="text-white/70 hover:text-white px-6 py-2.5 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 text-sm font-medium"
          >
            Войти
          </Link>
        </header>

        {/* Hero Content */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="text-purple-300 text-sm">Закрытый курс по продажам</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Твой доход начинается с{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                умения продавать
              </span>
            </h1>
            
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Научись продавать — и перестань зависеть от обстоятельств.
              Когда ты умеешь продавать, ты можешь находить клиентов,
              дороже оценивать себя и сам влиять на то, сколько зарабатываешь.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                Получить доступ
              </Link>
              <a
                href="https://t.me/nikpavlovv"
                target="_blank"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                Telegram канал
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div>
                <p className="text-3xl font-bold text-white">8</p>
                <p className="text-white/50 text-sm mt-1">модулей</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">49</p>
                <p className="text-white/50 text-sm mt-1">уроков</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">∞</p>
                <p className="text-white/50 text-sm mt-1">доступ</p>
              </div>
            </div>
          </div>
        </main>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/30 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* What Inside Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Что внутри</h2>
          <p className="text-white/50 text-center mb-16 max-w-2xl mx-auto">
            Полная система продаж: от первого контакта до закрытия сделки
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Базовые понятия', desc: '5 этапов продажи, установление контакта, выявление потребностей' },
              { icon: '🧠', title: 'Метод СПИН', desc: 'Программирование диалога, квалификация, фреймворк MEDDIC' },
              { icon: '💎', title: 'Архитектура ценности', desc: 'Инжиниринг пре-убеждения, математика ценности, офферы' },
              { icon: '🛡️', title: 'Работа с возражениями', desc: '«Дорого», «Я подумаю», «Нет денег» и другие' },
              { icon: '💰', title: 'Максимизация прибыли', desc: 'Upsell, LTV, Lock-in Strategy, эффект приманки' },
              { icon: '🔥', title: 'Продвинутые техники', desc: 'Белфорт, Крис Восс, Сэндлер, нейрохакинг продаж' },
            ].map((item, idx) => (
              <div key={idx} className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готов прокачать навык продаж?
            </h2>
            <p className="text-white/60 mb-8">
              Доступ по инвайт-коду. Код выдаётся при покупке курса.
            </p>
            <Link
              href="/login"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              Ввести инвайт-код
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              NP
            </div>
            <span className="text-white/60 text-sm">NP Sales © 2026</span>
          </div>
          <a
            href="https://t.me/nikpavlovv"
            target="_blank"
            className="text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            @nikpavlovv
          </a>
        </div>
      </footer>
    </div>
  );
}
