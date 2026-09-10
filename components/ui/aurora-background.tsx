'use client';

/**
 * AuroraBackground — живой фон с плавающими лаймовыми световыми пятнами.
 * Fixed-позиционирование, pointer-events-none, работает поверх чёрного фона.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(15vw,-8vh) scale(1.15); }
          66% { transform: translate(-10vw,12vh) scale(0.9); }
        }
        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0,0) scale(1.1); }
          33% { transform: translate(-18vw,10vh) scale(0.95); }
          66% { transform: translate(12vw,-15vh) scale(1.2); }
        }
        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20vw,20vh) scale(1.3); }
        }
        @keyframes aurora-drift-4 {
          0%, 100% { transform: translate(0,0) scale(0.9); }
          50% { transform: translate(-15vw,-10vh) scale(1.1); }
        }
      `}</style>
      {/* Главное пятно — лаймовое, сверху справа */}
      <div
        className="absolute rounded-full"
        style={{
          top: '-15%',
          right: '-10%',
          width: '55vw',
          height: '55vw',
          maxWidth: 900,
          maxHeight: 900,
          background: 'radial-gradient(circle, rgba(217,242,79,0.18) 0%, rgba(217,242,79,0.04) 45%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'aurora-drift-1 22s ease-in-out infinite',
        }}
      />
      {/* Второе пятно — лаймовое, снизу слева */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: '-20%',
          left: '-15%',
          width: '60vw',
          height: '60vw',
          maxWidth: 1000,
          maxHeight: 1000,
          background: 'radial-gradient(circle, rgba(217,242,79,0.12) 0%, rgba(217,242,79,0.03) 45%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'aurora-drift-2 28s ease-in-out infinite',
        }}
      />
      {/* Третье — мягкое, по центру */}
      <div
        className="absolute rounded-full"
        style={{
          top: '40%',
          left: '50%',
          width: '40vw',
          height: '40vw',
          maxWidth: 700,
          maxHeight: 700,
          background: 'radial-gradient(circle, rgba(217,242,79,0.06) 0%, transparent 60%)',
          filter: 'blur(100px)',
          transform: 'translate(-50%,-50%)',
          animation: 'aurora-drift-3 35s ease-in-out infinite',
        }}
      />
      {/* Четвёртое — едва заметное, для глубины */}
      <div
        className="absolute rounded-full"
        style={{
          top: '70%',
          right: '20%',
          width: '30vw',
          height: '30vw',
          maxWidth: 500,
          maxHeight: 500,
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'aurora-drift-4 40s ease-in-out infinite',
        }}
      />
    </div>
  );
}
