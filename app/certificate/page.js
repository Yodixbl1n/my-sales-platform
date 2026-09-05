'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Balloons = dynamic(
  () => import('@/components/ui/balloons').then((m) => m.Balloons),
  { ssr: false }
);

const LIME = '#d9f24f';

function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#d9f24f', '#ffffff', '#a855f7', '#ec4899', '#fbbf24', '#7dd3fc'];
    const particles = [];
    for (let i = 0; i < 160; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 2,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
      });
    }

    let frame = 0;
    const maxFrames = 260;
    let raf;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame > maxFrames - 60) {
        const fade = Math.max(0, (maxFrames - frame) / 60);
        particles.forEach((p) => (p.opacity = fade));
      }
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.rot += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (frame < maxFrames) raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="no-print fixed inset-0 pointer-events-none z-50" />;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function CertificatePage() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const balloonsRef = useRef(null);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setUser(j.user))
      .catch(() => (location.href = '/login'));

    fetch('/api/progress')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (j.success && Array.isArray(j.modules)) {
          setReady(j.modules.length >= 8);
        } else {
          setReady(false);
        }
      })
      .catch(() => setReady(false));
  }, []);

  useEffect(() => {
    if (user && !ready) location.href = '/dashboard';
    if (ready) {
      const t1 = setTimeout(() => setShowConfetti(true), 600);
      const t2 = setTimeout(() => {
        if (balloonsRef.current?.launchAnimation) {
          balloonsRef.current.launchAnimation();
        }
      }, 1200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [user, ready]);

  const displayName = user ? user.first_name || user.name || user.username || 'Студент' : 'Студент';

  const certId = useMemo(() => {
    if (!user) return '';
    const n = (user.first_name || user.name || user.username || 'X').toUpperCase();
    const hash = n.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return 'NP-' + new Date().getFullYear() + '-' + String(1000 + (hash % 9000));
  }, [user]);

  if (!user || !ready) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Загрузка...</div>;
  }

  const date = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <style>{'@media print { .no-print { display: none !important; } body, html { background: #0a0a0a !important; } } .cert-root { print-color-adjust: exact; -webkit-print-color-adjust: exact; }'}</style>

      {showConfetti && <Confetti />}

      <Balloons ref={balloonsRef} type="default" className="no-print" />

      <div className="no-print absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #d9f24f 0%, transparent 70%)' }} />
      <div className="no-print absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="cert-root relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #131313 0%, #0d0d0d 50%, #161616 100%)',
          border: '1px solid rgba(217,242,79,0.35)',
          boxShadow: '0 0 90px rgba(217,242,79,0.12), 0 40px 100px rgba(0,0,0,0.6)',
        }}
      >
        <div className="absolute inset-3 rounded-xl pointer-events-none" style={{ border: '1px solid rgba(217,242,79,0.4)' }} />
        <div className="absolute inset-4 rounded-lg pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.08)' }} />

        <div className="absolute top-7 left-7 w-9 h-9 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: LIME }} />
        <div className="absolute top-7 right-7 w-9 h-9 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: LIME }} />
        <div className="absolute bottom-7 left-7 w-9 h-9 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: LIME }} />
        <div className="absolute bottom-7 right-7 w-9 h-9 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: LIME }} />

        <motion.div variants={container} initial="hidden" animate="show" className="relative px-8 py-12 md:px-16 md:py-16 text-center">
          <motion.div variants={item} className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black" style={{ background: LIME }}>NP</div>
              <span className="text-lg font-bold tracking-tight text-white">NP<span style={{ color: LIME }}>Sales</span></span>
            </div>
            <span className="text-sm text-white/40">{date}</span>
          </motion.div>

          <motion.p variants={item} className="text-[11px] tracking-[0.4em] text-white/40 mb-6 uppercase">Система обучения продажам</motion.p>
          <motion.h1 variants={item} className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-2" style={{ textShadow: '0 0 40px rgba(217,242,79,0.35)' }}>
            СЕРТИФИКАТ
          </motion.h1>
          <motion.p variants={item} className="text-lg text-white/60 mb-8">о прохождении курса</motion.p>

          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(217,242,79,0.6))' }} />
            <span style={{ color: LIME }}>✦</span>
            <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(90deg, rgba(217,242,79,0.6), transparent)' }} />
          </motion.div>

          <motion.p variants={item} className="text-white/50 mb-4">Настоящим подтверждается, что</motion.p>
          <motion.p variants={item} className="text-4xl md:text-6xl font-black tracking-tight mb-8" style={{ background: 'linear-gradient(135deg, #d9f24f 0%, #eaff8a 50%, #d9f24f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {displayName}
          </motion.p>
          <motion.p variants={item} className="text-white/70 leading-relaxed max-w-xl mx-auto mb-10">
            успешно завершил(а) обучение по программе «Эксперт по продажам», в полном объёме освоив 8 модулей и 75 уроков курса, и подтвердил(а) свои знания, сдав все итоговые тесты.
          </motion.p>

          <motion.div variants={item} className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="relative w-24 h-24 flex-shrink-0" style={{ transform: 'rotate(-8deg)' }}>
              <div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(217,242,79,0.5)' }} />
              <div className="absolute inset-2 rounded-full" style={{ border: '1px solid rgba(217,242,79,0.3)' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl leading-none" style={{ color: LIME }}>✓</span>
                <span className="text-[8px] tracking-[0.2em] mt-1" style={{ color: 'rgba(217,242,79,0.6)' }}>NP SALES</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/40 tracking-widest">№ {certId}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="font-black text-xl text-white">Nik Pavlov</p>
              <div className="w-44 h-px bg-white/20 mx-auto md:ml-auto my-2" />
              <p className="text-sm text-white/50">автор курса, NP Sales</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="no-print flex gap-4 mt-8">
        <button onClick={() => window.print()} className="px-8 py-4 rounded-full font-black text-black transition-transform hover:scale-105" style={{ background: LIME, boxShadow: '0 0 40px rgba(217,242,79,0.3)' }}>
          Скачать PDF
        </button>
        <a href="/dashboard" className="px-8 py-4 rounded-full font-bold text-white border border-white/20">В кабинет</a>
      </div>
      <p className="no-print text-white/40 text-sm mt-4">В окне печати выбери «Сохранить как PDF»</p>
    </div>
  );
}
