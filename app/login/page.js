'use client';
import { useState } from 'react';

export default function Home() {
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
        setTimeout(() => {
          location.href = '/dashboard';
        }, 1000);
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
        setTimeout(() => {
          location.href = '/dashboard';
        }, 1000);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/10">
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Вход' : step === 'code' ? 'Закрытый доступ' : 'Регистрация'}
            </h1>
            <p className="text-white/70">
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
                className="w-full rounded-xl p-4 bg-white/5 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-center text-xl tracking-widest font-mono"
                placeholder="XXXX-XXXX"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                maxLength={20}
                autoFocus
              />
              
              <button 
                type="submit"
                disabled={loading || !code.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? 'Проверяю...' : 'Проверить код'}
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="w-full text-white/60 hover:text-white py-2 text-sm"
              >
                Уже есть аккаунт? Войти
              </button>
            </form>
          )}

          {step === 'register' && (
            <form onSubmit={register} className="space-y-4">
              <input
                type="text"
                className="w-full rounded-xl p-4 bg-white/5 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                placeholder="Ваше имя"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
              
              <input
                type="email"
                className="w-full rounded-xl p-4 bg-white/5 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              
              <input
                type="password"
                className="w-full rounded-xl p-4 bg-white/5 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                placeholder="Пароль (минимум 6 символов)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              
              <button 
                type="submit"
                disabled={loading || !email.trim() || !password || !name.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? 'Создаю аккаунт...' : 'Зарегистрироваться'}
              </button>
            </form>
          )}

          {isLogin && (
            <form onSubmit={login} className="space-y-4">
              <input
                type="email"
                className="w-full rounded-xl p-4 bg-white/5 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
              
              <input
                type="password"
                className="w-full rounded-xl p-4 bg-white/5 text-white placeholder-white/50 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              
              <button 
                type="submit"
                disabled={loading || !email.trim() || !password}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? 'Вхожу...' : 'Войти'}
              </button>

              <button
                type="button"
                onClick={() => { setIsLogin(false); setStep('code'); }}
                className="w-full text-white/60 hover:text-white py-2 text-sm"
              >
                Нет аккаунта? Ввести инвайт-код
              </button>
            </form>
          )}

          {message && (
            <div className={`mt-4 p-4 rounded-xl text-center ${
              messageType === 'success' 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
