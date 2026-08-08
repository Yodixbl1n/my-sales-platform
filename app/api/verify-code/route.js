import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabaseClient';

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const code = (body.code || '').toUpperCase().trim();

  if (!code) {
    return NextResponse.json({ success: false, message: 'Введите код' }, { status: 400 });
  }

  const SUPABASE = createSupabaseClient();
  
  const { data, error } = await SUPABASE
    .from('invite_codes')
    .select('*')
    .eq('code', code)
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ success: false, message: 'Неверный код. Проверьте и попробуйте снова.' }, { status: 400 });
  }

  if (data.used) {
    return NextResponse.json({ success: false, message: 'Этот код уже был использован.' }, { status: 400 });
  }

  // Помечаем код как использованный
  const { error: updErr } = await SUPABASE
    .from('invite_codes')
    .update({ used: true, used_by: 'pending-' + Date.now() })
    .eq('id', data.id);

  if (updErr) {
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
