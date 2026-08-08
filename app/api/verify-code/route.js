import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabaseClient';
import { verifyToken } from '../../../lib/jwt';

function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, ...rest] = cookie.trim().split('=');
      cookies[name] = rest.join('=');
    });
  }
  return cookies;
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const cookies = parseCookies(req.headers.get('cookie') || '');
  const token = cookies.token;
  const user = token ? verifyToken(token) : null;
  const user_id = user?.id || body.user_id;

  if (!user_id) {
    return NextResponse.json({ success: false, message: 'Необходимо войти через Telegram' }, { status: 401 });
  }
  const code = (body.code || '').toUpperCase().trim();
  if (!code) {
    return NextResponse.json({ success: false, message: 'Код обязателен' }, { status: 400 });
  }

  const SUPABASE = createSupabaseClient();
  const { data, error } = await SUPABASE
    .from('invite_codes')
    .select('*')
    .eq('code', code)
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ success: false, message: 'DB error' }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ success: false, message: 'Неверный код. Обратитесь к владельцу' }, { status: 400 });
  }
  if (data.used) {
    return NextResponse.json({ success: false, message: 'Код уже использован' }, { status: 400 });
  }

  const { error: updErr } = await SUPABASE
    .from('invite_codes')
    .update({ used: true, used_by: String(user_id) })
    .eq('id', data.id);

  if (updErr) {
    return NextResponse.json({ success: false, message: 'Не удалось обновить код' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
