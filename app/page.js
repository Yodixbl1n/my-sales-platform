'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Проверяем авторизацию
    (async () => {
      const res = await fetch('/api/me').catch(()=>null);
      if (res && res.ok) {
        const j = await res.json();
        setUser(j.user);
        setShowCodeForm(true);
      }
    })();

    // Загружаем Telegram виджет только на клиенте
    if (!user) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.async = true;
      script.setAttribute('data-telegram-login', process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || '');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '12');
      script.setAttribute('data-auth-url', '/api/auth');
      script.setAttribute('data-request-access', 'write');
      
      const container = document.getElementById('tg-widget');
      if (container) {
        container.innerHTML = '';
        container.appendChild(script);
      }
    }
  }, [user]);

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-lg text-center text-white">
        <h1 className="text-3xl font-semibold mb-6">🔒 Закрытый доступ</h1>
        <p className="mb-6 text-white/80">Вход только для участников сообщества</p>

        {!user && (
          <div className="flex flex-col items-center gap-6">
            <div id="tg-widget" />
            <p className="text-sm text-white/80">Войдите через Telegram, затем введите инвайт-код.</p>
          </div>
        )}

        {user && !showCodeForm && (
          <div>
            <p className="mb-4">Вы вошли как <strong>{user.first_name}</strong></p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded" onClick={() => setShowCodeForm(true)}>Ввести инвайт-код</button>
          </div>
        )}

        {showCodeForm && <InviteForm setMessage={setMessage} />}

        {message && <p className="mt-4 text-sm text-red-200">{message}</p>}
      </div>
    </div>
  );
}

function InviteForm({ setMessage }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const j = await res.json();
    setLoading(false);
    if (j.success) {
      location.href = '/dashboard';
    } else {
      setMessage(j.message || 'Ошибка');
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
      <input
        className="rounded-md p-3 bg-white/5 text-white placeholder-white/60 border border-white/10"
        placeholder="Инвайт-код"
        value={code}
        onChange={e => setCode(e.target.value.toUpperCase())}
      />
      <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Проверяю...' : 'Подтвердить код'}
      </button>
    </form>
  );
}
