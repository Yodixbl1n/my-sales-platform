'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [codes, setCodes] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  async function loginAndFetch() {
    setMessage('Запрос...');
    try {
      const headers = { 'x-admin-password': password };
      const resCodes = await fetch('/api/get-codes', { headers });
      if (!resCodes.ok) throw new Error('Auth failed');
      const jc = await resCodes.json();
      setCodes(jc.codes || []);
      const resUsers = await fetch('/api/get-users', { headers });
      const ju = await resUsers.json();
      setUsers(ju.users || []);
      setMessage('');
    } catch (e) {
      setMessage('Неверный пароль или ошибка сервера');
    }
  }

  async function createCode() {
    setMessage('Создаю код...');
    const res = await fetch('/api/create-code', {
      method: 'POST',
      headers: { 'x-admin-password': password }
    });
    const j = await res.json();
    if (j.success) {
      setCodes(prev => [{ code: j.code, used: false, created_at: new Date().toISOString() }, ...prev]);
      setMessage('Код создан: ' + j.code);
    } else {
      setMessage(j.message || 'Ошибка');
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-lg text-white">
        <h2 className="text-2xl font-semibold mb-4">Админ-панель</h2>
        <p className="mb-4 text-white/80">Введите ADMIN_PASSWORD для доступа.</p>

        <div className="flex gap-2 mb-4 flex-wrap">
          <input 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="rounded-md p-2 bg-white/5 text-white flex-1"
          />
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded" onClick={loginAndFetch}>Войти</button>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded" onClick={createCode}>Сгенерировать код</button>
        </div>

        {message && <p className="text-sm mb-4 text-yellow-200">{message}</p>}

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Коды ({codes.length})</h3>
          <div className="grid gap-2 max-h-60 overflow-y-auto">
            {codes.map((c, i) => (
              <div key={i} className="flex justify-between bg-white/5 p-2 rounded text-sm">
                <div className="font-mono">{c.code}</div>
                <div className={c.used ? 'text-red-300' : 'text-green-300'}>
                  {c.used ? 'использован' : 'активен'}
                </div>
              </div>
            ))}
            {codes.length === 0 && <div className="text-sm text-white/70">Нет кодов</div>}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Пользователи ({users.length})</h3>
          <div className="grid gap-2 max-h-60 overflow-y-auto">
            {users.map((u) => (
              <div key={u.id} className="flex justify-between bg-white/5 p-2 rounded text-sm">
                <div>{u.first_name} {u.username ? `(@${u.username})` : ''}</div>
                <div className="text-white/70">{new Date(u.created_at).toLocaleString()}</div>
              </div>
            ))}
            {users.length === 0 && <div className="text-sm text-white/70">Нет пользователей</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
