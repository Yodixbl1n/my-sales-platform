'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LIME = '#d9f24f';

export default function DemoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/demo')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (j.success) {
          router.replace('/dashboard');
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <p className="text-xl">Запускаем демо-режим...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white px-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-black tracking-tighter mb-4">
          ДЕМО-РЕЖИМ <span style={{ color: LIME }}>НЕДОСТУПЕН</span>
        </h1>
        <p className="text-white/60 mb-8">
          Чтобы получить доступ к демо-версии курса, напиши мне в Telegram:
        </p>
        <a
          href="https://t.me/nikpavlovv"
          target="_blank"
          className="block px-8 py-4 rounded-full font-black text-black mb-4"
          style={{ background: LIME }}
        >
          Написать в Telegram
        </a>
        <a href="/login" className="text-sm text-white/40 underline">
          Уже есть аккаунт? Войти
        </a>
      </div>
    </div>
  );
}
