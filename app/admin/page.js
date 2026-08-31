'use client';
import { useEffect, useState } from 'react';

const LIME = '#d9f24f';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inviteType, setInviteType] = useState('black');
  const [generatedCode, setGeneratedCode] = useState('');
  const [inviteList, setInviteList] = useState([]);

  useEffect(() => {
    if (authed) {
      fetchUsers();
      fetchInvites();
    }
  }, [authed]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.error) {
        setAuthed(false);
        setError('Сессия истекла');
      } else {
        setUsers(data.users || []);
      }
    } catch (err) {
      setAuthed(false);
    }
    setLoading(false);
  };

  const fetchInvites = async () => {
    try {
      const res = await fetch('/api/admin/invite');
      const data = await res.json();
      if (data.invites) setInviteList(data.invites);
    } catch (e) {}
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthed(true);
        setError('');
      } else {
        setError('Неверный пароль');
      }
    } catch (err) {
      setError('Ошибка сети');
    }
  };

  const generateInvite = async () => {
    const res = await fetch('/api/admin/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: inviteType }),
    });
    const data = await res.json();
    if (data.code) {
      setGeneratedCode(data.code);
      await navigator.clipboard.writeText(data.code);
      fetchInvites();
    }
  };

  const setLimit = async (userId, limit) => {
    await fetch('/api/admin/limit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, modules_limit: limit || null }),
    });
    fetchUsers();
  };

  const blockUser = async (userId, blocked) => {
    await fetch('/api/admin/block', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, blocked }),
    });
    fetchUsers();
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#141414] p-8">
          <h1 className="text-2xl font-black mb-6 text-white">Админка NP Sales</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Пароль"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white mb-4"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl font-black text-black"
            style={{ background: LIME }}
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black">Админка NP Sales</h1>
          <button
            onClick={() => { document.cookie = 'admin_token=; path=/; max-age=0'; setAuthed(false); }}
            className="px-4 py-2 rounded-xl border border-white/20 text-sm"
          >
            Выйти
          </button>
        </div>

        {/* Генерация инвайтов */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">🎟 Генерация инвайт-кодов</h2>
          <div className="flex gap-4 flex-wrap items-center mb-4">
            <select
              value={inviteType}
              onChange={(e) => setInviteType(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
            >
              <option value="black">NP BLACK (полный курс, 10 000₽)</option>
              <option value="free">NP FREE (5 бесплатных уроков)</option>
            </select>
            <button
              onClick={generateInvite}
              className="px-6 py-3 rounded-xl font-black text-black"
              style={{ background: LIME }}
            >
              Сгенерировать
            </button>
            {generatedCode && (
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/20 font-mono">
                {generatedCode} <span className="text-xs text-white/40">(скопировано)</span>
              </div>
            )}
          </div>

          {inviteList.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-white/40 mb-2">Последние сгенерированные:</p>
              <div className="space-y-1">
                {inviteList.slice(0, 5).map((inv) => (
                  <div key={inv.id} className="flex justify-between text-xs px-3 py-2 rounded bg-white/5">
                    <code className="font-mono">{inv.code}</code>
                    <span className="text-white/40">{inv.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Таблица пользователей */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">👥 Пользователи ({users.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left px-6 py-4 text-xs text-white/60">Имя</th>
                  <th className="text-left px-6 py-4 text-xs text-white/60">Тариф</th>
                  <th className="text-left px-6 py-4 text-xs text-white/60">Прогресс</th>
                  <th className="text-left px-6 py-4 text-xs text-white/60">Лимит модулей</th>
                  <th className="text-left px-6 py-4 text-xs text-white/60">Статус</th>
                  <th className="text-left px-6 py-4 text-xs text-white/60">Действия</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-white/40">Загрузка...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-white/40">Пока нет пользователей</td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <div className="font-semibold">{user.first_name || user.name || user.username}</div>
                        <div className="text-xs text-white/40">{user.username ? '@' + user.username : ''}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded text-xs font-bold" style={{
                          background: user.free ? 'rgba(255,255,255,0.1)' : LIME,
                          color: user.free ? '#fff' : '#000'
                        }}>
                          {user.free ? 'FREE' : 'BLACK'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {user.progress || 0} / 8 модулей
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.modules_limit || ''}
                          onChange={(e) => setLimit(user.id, parseInt(e.target.value) || null)}
                          className="w-24 px-3 py-2 rounded bg-white/5 border border-white/10 text-sm"
                        >
                          <option value="">Все 8</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {user.blocked ? (
                          <span className="text-red-400 text-sm">🚫 Заблокирован</span>
                        ) : (
                          <span className="text-green-400 text-sm">✓ Активен</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => blockUser(user.id, !user.blocked)}
                          className="px-3 py-1 rounded text-xs border border-white/20 hover:bg-white/5"
                        >
                          {user.blocked ? 'Разблокировать' : 'Заблокировать'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
