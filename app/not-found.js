import Link from 'next/link';

const LIME = '#d9f24f';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <p
          className="text-8xl md:text-9xl font-black tracking-tighter"
          style={{ color: LIME, textShadow: '0 0 40px rgba(217,242,79,0.4)' }}
        >
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-4 mb-3">
          ТАКОЙ СТРАНИЦЫ НЕТ
        </h1>
        <p className="text-white/50 mb-8 leading-relaxed max-w-md mx-auto">
          Страница сказала «я подумаю» — и исчезла.
          Зато главная и курс — на месте.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 rounded-full font-black text-black transition-transform hover:scale-105"
          style={{ background: LIME, boxShadow: '0 0 40px rgba(217,242,79,0.3)' }}
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
