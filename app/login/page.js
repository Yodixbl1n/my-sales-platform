'use client';
import { useState } from 'react';
import Link from 'next/link';
import { DotPattern } from '@/components/ui/dot-pattern';

const LIME = '#d9f24f';

export default function Login() {
  const [step, setStep] = useState('code');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  async function verifyCode(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase().trim() })
      });
      const j = await res.json();

      if (j.success) {
        setMessageType('success');
        setMessage('Код подтверждён! Теперь создайте аккаунт.');
        setStep('register');
      } else {
        setMessageType('error');
        setMessage(j.message || 'Неверный код');
      }
    } catch (err) {
      setMessageType('error');
      setMessage('Ошибка сервера. Попробуйте позже.');
    }

    setLoading(false);
  }

  async function register(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    if (password.length < 6) {
      setMessageType('error');
      setMessage('Пароль должен быть минимум 6 символов');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          name: name.trim(),
          inviteCode: code.toUpperCase().trim()
        })
      });
      const j = await res.json();

      if (j.success) {
        setMessageType('success');
        setMessage('Аккаунт создан! Перенаправляю...');
        setTimeout(() => { location.href = '/dashboard'; }, 1000);
      } else {
        setMessageType('error');
        setMessage(j.message || 'Ошибка регистрации');
      }
    } catch (err) {
      setMessageType('error');
      setMessage('Ошибка сервера. Попробуйте позже.');
    }

    setLoading(false);
  }

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password })
      });
      const j = await res.json();

      if (j.success) {
        setMessageType('success');
        setMessage('Вход выполнен! Перенаправляю...');
        setTimeout(() => { location.href = '/dashboard'; }, 1000);
      } else {
        setMessageType('error');
        setMessage(j.message || 'Неверный email или пароль');
      }
    } catch (err) {
      setMessageType('error');
      setMessage('Ошибка сервера. Попробуйте позже.');
    }

    setLoading(false);
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff'
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <DotPattern animated className="fixed inset-0 opacity-40 [mask-image:radial-gradient(600px_circle_at_center,rgba(217,242,79,0.35),transparent)]" />
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black" style={{ background: LIME }}>NP</div>
          <span className="text-xl font-bold tracking-tight">NP<span style={{ color: LIME }}>Sales</span></span>
        </Link>
        <Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">
          ← На главную
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-[#141414] p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'rgba(217,242,79,0.12)' }}>
                {isLogin ? '🔓' : step === 'code' ? '🔐' : '⚡'}
              </div>
              <h1 className="text-3xl font-black tracking-tight mb-2">
                {isLogin ? 'Вход' : step === 'code' ? 'Закрытый доступ' : 'Регистрация'}
              </h1>
              <p className="text-white/50">
                {isLogin
                  ? 'Введите email и пароль'
                  : step === 'code'
                    ? 'Введите инвайт-код для доступа'
                    : 'Создайте аккаунт'}
              </p>
            </div>

            {step === 'code' && !isLogin && (
              <form onSubmit={verifyCode} className="space-y-4">
                <input
                  type="text"
                  style={inputStyle}
                  className="w-full rounded-2xl p-4 text-center text-xl tracking-widest font-mono placeholder-white/30 focus:outline-none focus:border-[#d9f24f] transition-colors"
                  placeholder="XXXX-XXXX"
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  maxLength={20}
                  autoFocus
                />

                <button
                  type="submit"
                  disabled={loading || !code.trim()}
                  className="w-full py-4 rounded-full font-black text-black text-lg transition-transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: LIME, boxShadow: '0 0 30px rgba(217,242,79,0.3)' }}
                >
                  {loading ? 'Проверяю...' : 'Проверить код ⚡'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="w-full text-white/50 hover:text-white py-2 text-sm transition-colors"
                >
                  Уже есть аккаунт? Войти
                </button>
              </form>
            )}

            {step === 'register' && (
              <form onSubmit={register} className="space-y-4">
                <input
                  type="text"
                  style={inputStyle}
                  className="w-full rounded-2xl p-4 placeholder-white/30 focus:outline-none focus:border-[#d9f24f] transition-colors"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                />

                <input
                  type="email"
                  style={inputStyle}
                  className="w-full rounded-2xl p-4 placeholder-white/30 focus:outline-none focus:border-[#d9f24f] transition-colors"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  style={inputStyle}
                  className="w-full rounded-2xl p-4 placeholder-white/30 focus:outline-none focus:border-[#d9f24f] transition-colors"
                  placeholder="Пароль (минимум 6 символов)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  disabled={loading || !email.trim() || !password || !name.trim()}
                  className="w-full py-4 rounded-full font-black text-black text-lg transition-transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: LIME, boxShadow: '0 0 30px rgba(217,242,79,0.3)' }}
                >
                  {loading ? 'Создаю аккаунт...' : 'Зарегистрироваться ⚡'}
                </button>
              </form>
            )}

            {isLogin && (
              <form onSubmit={login} className="space-y-4">
                <input
                  type="email"
                  style={inputStyle}
                  className="w-full rounded-2xl p-4 placeholder-white/30 focus:outline-none focus:border-[#d9f24f] transition-colors"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />

                <input
                  type="password"
                  style={inputStyle}
                  className="w-full rounded-2xl p-4 placeholder-white/30 focus:outline-none focus:border-[#d9f24f] transition-colors"
                  placeholder="Пароль"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  disabled={loading || !email.trim() || !password}
                  className="w-full py-4 rounded-full font-black text-black text-lg transition-transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: LIME, boxShadow: '0 0 30px rgba(217,242,79,0.3)' }}
                >
                  {loading ? 'Вхожу...' : 'Войти ⚡'}
                </button>

                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setStep('code'); }}
                  className="w-full text-white/50 hover:text-white py-2 text-sm transition-colors"
                >
                  Нет аккаунта? Ввести инвайт-код
                </button>
              </form>
            )}

            {message && (
              <div
                className="mt-4 p-4 rounded-2xl text-center text-sm font-medium"
                style={messageType === 'success'
                  ? { background: 'rgba(217,242,79,0.12)', color: LIME }
                  : { background: 'rgba(239,68,68,0.12)', color: '#fca5a5' }}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-white/30 text-sm">
        NP Sales © 2026 • <a href="https://t.me/nikpavlovv" target="_blank" className="hover:text-white/60 transition-colors">@nikpavlovv</a>
      </footer>
    </div>
  );
}
