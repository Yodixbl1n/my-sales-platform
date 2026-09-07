import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { verifyTelegramAuth } from '../../../lib/telegram';
import { createSupabaseClient } from '../../../lib/supabaseClient';

export async function GET(req) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const valid = verifyTelegramAuth(params, process.env.TELEGRAM_BOT_TOKEN);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid telegram auth' }, { status: 400 });
  }

  const SUPABASE = createSupabaseClient();
  
  // Upsert пользователя (создаём если новый, обновляем если существует)
  await SUPABASE.from('users').upsert({
    id: String(params.id),
    first_name: params.first_name,
    last_name: params.last_name || null,
    username: params.username || null
  });

  // Получаем актуальные данные из БД (включая free и blocked)
  const { data: existingUser } = await SUPABASE
    .from('users')
    .select('id, first_name, last_name, username, free, blocked')
    .eq('id', String(params.id))
    .limit(1)
    .maybeSingle();

  const tokenPayload = {
    id: params.id,
    first_name: params.first_name,
    last_name: params.last_name || null,
    username: params.username || null,
    auth_date: params.auth_date,
    free: existingUser?.free ?? true, // Новые пользователи = free по умолчанию
    blocked: existingUser?.blocked ?? false,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

  const res = NextResponse.redirect(new URL('/dashboard', req.url));
  
  const isSecure = process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true';
  const cookieOptions = [
    'HttpOnly',
    'Path=/',
    'Max-Age=604800',
    'SameSite=Lax'
  ];
  if (isSecure) cookieOptions.push('Secure');
  
  res.headers.set('Set-Cookie', `token=${token}; ${cookieOptions.join('; ')}`);
  // Удаляем demo_token при Telegram-логине, чтобы полный доступ имел приоритет
  res.headers.append('Set-Cookie', 'demo_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure');
  return res;
}
