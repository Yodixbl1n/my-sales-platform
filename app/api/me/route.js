import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '../../../lib/supabaseClient';

/**
 * Возвращает информацию о текущем пользователе.
 * Решает проблемы #3 и #10 из аудита:
 * - Проверяет поле blocked в БД (заблокированные получают 403)
 * - Возвращает first_name/username для Telegram-логинов
 * - Возвращает free для тарифной логики
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // === Запрашиваем актуальные данные из БД ===
  const SUPABASE = createSupabaseClient();
  const { data: user, error } = await SUPABASE
    .from('users')
    .select('id, email, name, first_name, last_name, username, free, blocked, modules_limit')
    .eq('id', payload.id)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('/api/me DB error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  if (!user) {
    // Пользователь из токена не найден в БД — возможно, удалён
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  // === Блокировка: если пользователь заблокирован — 403 ===
  if (user.blocked === true) {
    return NextResponse.json(
      { error: 'Account blocked', blocked: true },
      { status: 403 }
    );
  }

  // === Возвращаем полные данные, включая Telegram-поля и тариф ===
  return NextResponse.json({ 
    user: { 
      id: user.id, 
      email: user.email,
      name: user.name,
      first_name: user.first_name || payload.first_name,
      last_name: user.last_name || payload.last_name,
      username: user.username || payload.username,
      free: user.free ?? false,
      modules_limit: user.modules_limit ?? 8,
    } 
  });
}
