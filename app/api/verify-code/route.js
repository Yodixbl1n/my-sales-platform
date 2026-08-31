import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabaseClient';

/**
 * Проверяет валидность инвайт-кода БЕЗ его "сжигания".
 * Код помечается как used только при успешной регистрации в /api/register.
 * Это решает проблему, когда пользователь ввёл код, но закрыл вкладку
 * до завершения регистрации — код остаётся валидным.
 *
 * Возвращает: { success: true, codeId, type }
 */
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const code = (body.code || '').toUpperCase().trim();

  if (!code) {
    return NextResponse.json({ success: false, message: 'Введите код' }, { status: 400 });
  }

  const SUPABASE = createSupabaseClient();
  
  const { data, error } = await SUPABASE
    .from('invite_codes')
    .select('id, code, type, used')
    .eq('code', code)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('verify-code DB error:', error);
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ success: false, message: 'Неверный код. Проверьте и попробуйте снова.' }, { status: 400 });
  }

  if (data.used) {
    return NextResponse.json({ success: false, message: 'Этот код уже был использован.' }, { status: 400 });
  }

  // ВАЖНО: НЕ помечаем код как used здесь.
  // Код будет помечен только при успешной регистрации в /api/register.
  return NextResponse.json({ 
    success: true, 
    codeId: data.id,
    type: data.type || 'free'
  });
}
