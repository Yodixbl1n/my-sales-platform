'use client';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { Pricing } from '@/components/ui/pricing';
import { SocialProof, AboutAuthor } from '@/components/ui/social-proof';
import { Marquee } from '@/components/ui/marquee';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import Link from 'next/link';

const LIME = '#d9f24f';

export default function Landing() {
  const marqueeItems = ['ПРОДАЖИ', 'ПЕРЕГОВОРЫ', 'ЦЕННОСТЬ', 'ВОЗРАЖЕНИЯ', 'ЗАКРЫТИЕ СДЕЛОК', 'ПРИБЫЛЬ', 'СПИН', 'МЕДДИК', 'НЕЙРОХАКИНГ'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 25s linear infinite; }
        @keyframes glowPulse { 0%,100% { text-shadow: 0 0 20px rgba(217,242,79,0.4); } 50% { text-shadow: 0 0 50px rgba(217,242,79,0.9); } }
        .neon { animation: glowPulse 2.5s ease-in-out infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.9s ease-out both; }
        .fade-up-1 { animation: fadeUp 0.9s ease-out 0.15s both; }
        .fade-up-2 { animation: fadeUp 0.9s ease-out 0.3s both; }
        .fade-up-3 { animation: fadeUp 0.9s ease-out 0.45s both; }
      `}</style>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black" style={{ background: LIME }}>NP</div>
          <span className="text-xl font-bold tracking-tight">NP<span style={{ color: LIME }}>Sales</span></span>
        </div>
        <a
          href="#pricing"
          className="px-6 py-2.5 rounded-full font-bold text-black transition-transform hover:scale-105"
          style={{ background: LIME }}
        >
          Узнать цены
        </a>
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        
        <div className="fade-up inline-block mb-8 px-5 py-2 rounded-full border text-sm font-medium" style={{ borderColor: 'rgba(217,242,79,0.4)', color: LIME }}>
          ⚡ Закрытый курс по продажам
        </div>

        <AnimatedHero />

        <p className="fade-up-2 text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
          Научись продавать — и перестань зависеть от обстоятельств.
          Ты сам находишь клиентов, называешь цену и влияешь на свой доход.
        </p>

        <div className="fade-up-3 flex flex-col sm:flex-row gap-4 justify-center">
          <InteractiveHoverButton
            href="/login"
            text="Получить доступ"
            variant="lime"
            className="w-64 py-5 text-lg"
          />
          <InteractiveHoverButton
            href="https://t.me/nikpavlovv"
            text="Telegram канал"
            variant="outline"
            className="w-64 py-5 text-lg"
          />
        </div>
      </section>

      {/* Marquee */}
      <div className="py-6 border-y overflow-hidden" style={{ borderColor: 'rgba(217,242,79,0.3)', background: 'rgba(217,242,79,0.05)' }}>
        <div className="marquee-track flex whitespace-nowrap gap-8 w-max">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="text-2xl font-black tracking-tight flex items-center gap-8">
              <span style={{ color: idx % 2 === 0 ? LIME : 'rgba(255,255,255,0.8)' }}>{item}</span>
              <span style={{ color: LIME }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* What inside */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-center mb-4">
          ЧТО <span style={{ color: LIME }}>ВНУТРИ</span>
        </h2>
        <p className="text-white/50 text-center text-lg mb-3">Полная система: от первого контакта до закрытия сделки</p>
        <p className="text-white/40 text-center text-sm tracking-widest mb-16">8 МОДУЛЕЙ • 40 УРОКОВ • 100% ПРАКТИКА</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '01', title: 'Базовые понятия', desc: '5 этапов продажи, установление контакта, выявление потребностей, презентация СВЭ' },
            { num: '02', title: 'Метод СПИН и MEDDIC', desc: 'Программирование диалога, квалификация клиента, карта ЛПР' },
            { num: '03', title: 'Архитектура ценности', desc: 'Инжиниринг пре-убеждения, математика ценности, безотказные офферы' },
            { num: '04', title: 'Работа с возражениями', desc: '«Дорого», «Я подумаю», «Нет денег» — формулы амортизации' },
            { num: '05', title: 'Максимизация прибыли', desc: 'Upsell, LTV, Lock-in Strategy, эффект приманки, торги' },
            { num: '06', title: 'Продвинутые техники', desc: 'Белфорт, тактическая эмпатия Криса Восса, Сэндлер, управление фреймами' },
            { num: '07', title: 'Нейрохакинг продаж', desc: 'Дофаминовые петли, захват амигдалы, эффект собственности, окситоциновый взлом' },
            { num: '08', title: 'Ментальное превосходство', desc: 'Адаптация языка, сторителлинг с действием, пресуппозиции, стратегическое влияние' },
          ].map((item) => (
            <div
              key={item.num}
              className="group p-7 rounded-3xl border border-white/10 bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#d9f24f] transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <p className="text-5xl font-black mb-5 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: LIME }}>{item.num}</p>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
              
            </div>
          ))}
        </div>
      </section>

      <Pricing />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          ТВОЯ ТОЧКА Б <span className="neon" style={{ color: LIME }}>БЛИЗКО</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 leading-relaxed">
          Ты заходишь в любой разговор спокойно. Показываешь ценность, уверенно называешь цену
          и знаешь что сказать дальше. Больше не ждёшь шанса — создаёшь его сам.
        </p>
        <Link
          href="/login"
          className="inline-block px-12 py-5 rounded-full font-black text-black text-lg transition-transform hover:scale-105"
          style={{ background: LIME, boxShadow: '0 0 40px rgba(217,242,79,0.4)' }}
        >
          У меня есть код ⚡
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-sm" style={{ background: LIME }}>NP</div>
            <span className="text-white/50 text-sm">NP Sales © 2026 • Система обучения продажам</span>
          </div>
          <a href="https://t.me/nikpavlovv" target="_blank" className="font-bold hover:opacity-70 transition-opacity" style={{ color: LIME }}>
            @nikpavlovv
          </a>
        </div>
      </footer>
    </div>
  );
}
