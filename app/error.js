'use client';

const LIME = '#d9f24f';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p
          className="text-8xl md:text-9xl font-black tracking-tighter"
          style={{ color: LIME, textShadow: '0 0 40px rgba(217,242,79,0.4)' }}
        >
          ОЙ.
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-4 mb-3">
          ЧТО-ТО ПОШЛО НЕ ТАК
        </h1>
        <p className="text-white/50 mb-8 leading-relaxed">
          Даже у лучших продавцов иногда срывается сделка.
          Попробуй ещё раз — обычно это чинит всё.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-4 rounded-full font-black text-black transition-transform hover:scale-105"
            style={{ background: LIME, boxShadow: '0 0 40px rgba(217,242,79,0.3)' }}
          >
            Попробовать снова
          </button>
          <a
            href="/"
            className="px-8 py-4 rounded-full font-bold border border-white/20 hover:border-white/50 transition-colors"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}
