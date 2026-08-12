'use client';
import { useEffect, useState } from 'react';

const LIME = '#d9f24f';

export default function CertificatePage() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => setUser(j.user))
      .catch(() => (location.href = '/login'));
    try {
      const done = JSON.parse(localStorage.getItem('np_progress') || '[]');
      setReady(done.length >= 8);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (user && !ready) location.href = '/dashboard';
  }, [user, ready]);

  if (!user || !ready) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Загрузка...</div>;
  }

  const date = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
      <style>{'@media print { .no-print { display: none !important; } body, html { background: #fff !important; } }'}</style>

      <div
        className="w-full max-w-3xl bg-white text-black rounded-3xl p-10 md:p-14 border-8"
        style={{ borderColor: LIME, printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black" style={{ background: LIME }}>NP</div>
            <span className="text-xl font-bold tracking-tight">NP<span style={{ color: '#7a9a00' }}>Sales</span></span>
          </div>
          <span className="text-sm text-black/50">{date}</span>
        </div>

        <p className="text-sm tracking-[0.3em] text-black/50 mb-3">СЕРТИФИКАТ</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">о прохождении курса</h1>

        <p className="text-lg text-black/70 mb-2">Настоящим подтверждается, что</p>
        <p className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#5c7a00' }}>
          {user.first_name || user.name || user.username || 'Студент'}
        </p>
        <p className="text-lg text-black/70 leading-relaxed mb-10">
          полностью прошёл(ла) курс «Эксперт по продажам»: 8 модулей, 71 урок,
          сдал(а) все итоговые тесты — от установления контакта до продвинутых техник переговоров.
        </p>

        <div className="flex items-end justify-between border-t border-black/10 pt-6">
          <div>
            <p className="font-black text-xl">Nik Pavlov</p>
            <p className="text-sm text-black/50">автор курса, NP Sales</p>
          </div>
          <div className="text-4xl">🏆</div>
        </div>
      </div>

      <div className="no-print flex gap-4 mt-8">
        <button
          onClick={() => window.print()}
          className="px-8 py-4 rounded-full font-black text-black transition-transform hover:scale-105"
          style={{ background: LIME }}
        >
          Скачать PDF
        </button>
        <a href="/dashboard" className="px-8 py-4 rounded-full font-bold text-white border border-white/20">
          В кабинет
        </a>
      </div>
      <p className="no-print text-white/40 text-sm mt-4">В окне печати выбери «Сохранить как PDF»</p>
    </div>
  );
}
