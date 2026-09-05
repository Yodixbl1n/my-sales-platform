'use client';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { MagicText } from '@/components/ui/magic-text';
import { PlatformShowcase } from '@/components/ui/platform-showcase';
import { Reveal } from '@/components/ui/reveal';
import { StaggeredReveal } from '@/components/ui/staggered-reveal';
import { Pricing } from '@/components/ui/pricing';
import { Faq } from '@/components/ui/faq';
import { Marquee } from '@/components/ui/marquee';
import ArrowFillButton from '@/components/ui/arrow-fill-button';
import Link from 'next/link';

const LIME = '#d9f24f';

export default function Landing() {
  const marqueeItems = ['ПРОДАЖИ', 'ПЕРЕГОВОРЫ', 'ЦЕННОСТЬ', 'ВОЗРАЖЕНИЯ', 'ЗАКРЫТИЕ СДЕЛОК', 'ПРИБЫЛЬ', 'СПИН', 'МЕДДИК', 'НЕЙРОХАКИНГ'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .marquee-track { animation: marquee 25s linear infinite; } @keyframes glowPulse { 0%,100% { text-shadow: 0 0 20px rgba(217,242,79,0.4); } 50% { text-shadow: 0 0 50px rgba(217,242,79,0.9); } } .neon { animation: glowPulse 2.5s ease-in-out infinite; } @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } } .fade-up { animation: fadeUp 0.9s ease-out both; } .fade-up-1 { animation: fadeUp 0.9s ease-out 0.15s both; } .fade-up-2 { animation: fadeUp 0.9s ease-out 0.3s both; } .fade-up-3 { animation: fadeUp 0.9s ease-out 0.45s both; }`}</style>
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-black text-sm" style={{ background: LIME }}>NP</div>
          <span className="text-lg sm:text-xl font-bold tracking-tight">NP<span style={{ color: LIME }}>Sales</span></span>
        </div>
        <ArrowFillButton
          href="#pricing"
          btnText="Узнать цены"
          variant="lime"
        />
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-16 text-center">
        <div className="fade-up inline-block mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-medium" style={{ borderColor: 'rgba(217,242,79,0.4)', color: LIME }}>
          ⚡ Закрытый курс по продажам
        </div>
        <AnimatedHero />
        <p className="fade-up-2 text-base sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
          Научись продавать — и перестань зависеть от обстоятельств.
          Ты сам находишь клиентов, называешь цену и влияешь на свой доход.
        </p>
        <div className="fade-up-3 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <ArrowFillButton
            href="/login"
            btnText="Получить доступ"
            variant="lime"
          />
          <ArrowFillButton
            href="https://t.me/nikpavlovv"
            btnText="Telegram канал"
            variant="outline"
            target="_blank"
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

      {/* Manifesto */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <MagicText text="Продажи — это не талант и не везение. Это навык, который собирается системой: контакт, потребность, ценность, цена. Когда ты ведёшь диалог по системе, клиент перестаёт сопротивляться и сам видит выгоду. Ты больше не уговариваешь — ты предлагаешь решение и спокойно называешь свою цену." />
      </section>

      {/* What inside */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-center mb-4">
            ЧТО <span style={{ color: LIME }}>ВНУТРИ</span>
          </h2>
          <p className="text-white/50 text-center text-base sm:text-lg mb-3">Полная система: от первого контакта до закрытия сделки</p>
          <p className="text-white/40 text-center text-xs sm:text-sm tracking-widest mb-10 sm:mb-16">8 МОДУЛЕЙ • 75 УРОКОВ • 100% ПРАКТИКА</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
              className="group p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#d9f24f] transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <p className="text-3xl sm:text-5xl font-black mb-3 sm:mb-5 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: LIME }}>{item.num}</p>
              <h3 className="text-sm sm:text-xl font-bold mb-1 sm:mb-3 leading-tight">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-xs sm:text-sm hidden sm:block">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq />
      <Pricing />
      <div style={{ minHeight: "120vh" }}>
        <PlatformShowcase />
      </div>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-24">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-center mb-4">
            ТВОЯ ТОЧКА <span className="neon" style={{ color: LIME }}>Б</span>
          </h2>
          <p className="text-white/50 text-center text-base sm:text-lg mb-10 sm:mb-14">Не мечта, а набор навыков, которые можно потрогать</p>
        </Reveal>
        <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 mb-6 sm:mb-10">
          {[
            { num: '01', title: 'Договариваешься с позиции силы', desc: 'Спокойно заходишь в любой разговор и ведёшь его по своим правилам, а не подстраиваешься под собеседника.' },
            { num: '02', title: 'Показываешь ценность, а не скидку', desc: 'Объясняешь, почему твой продукт стоит своих денег, — без оправданий и скидок на входе.' },
            { num: '03', title: 'Отрабатываешь возражения формулами', desc: '«Дорого», «я подумаю» и «мне надо посоветоваться» перестают быть стоп-фактором и становятся шагом к сделке.' },
            { num: '04', title: 'Создаёшь себе доход сам', desc: 'Находишь клиентов, договариваешься и превращаешь навык в деньги — в любой нише, с любым продуктом, в любой стране.' },
          ].map((item) => (
            <div key={item.num} className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-5 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#d9f24f]">
              <p className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: LIME }}>{item.num}</p>
              <h3 className="text-base sm:text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141414] p-5 sm:p-8 mb-8 sm:mb-10">
          <p className="text-white/70 leading-relaxed text-center text-sm sm:text-base">
            NP Sales не обещает миллион за ночь. Он даёт рабочую систему переговоров, которая остаётся с тобой при любой смене работы, ниши или продукта. Чем чаще применяешь её в реальных разговорах — тем сильнее становится навык.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <ArrowFillButton
            href="/login"
            btnText="Забрать систему ⚡"
            variant="lime"
          />
          <ArrowFillButton
            href="/demo"
            btnText="Попробовать бесплатно"
            variant="outline"
          />
        </div>
        <p className="text-center text-sm text-white/40 mt-5 sm:mt-6">
          Уже есть инвайт-код? <Link href="/login" className="underline" style={{ color: LIME }}>Войти</Link>
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 sm:py-10 px-4 sm:px-6">
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
