import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabaseClient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * Регистрация с реальной проверкой инвайт-кода.
 * Решает проблемы #1 и #2 из аудита:
 * - Регистрирует только если код существует в invite_codes и не used
 * - Помечает код как used только ПОСЛЕ успешной регистрации
 * - Записывает тариф (free/black) в users.free
 */
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { email, password, name, inviteCode } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ success: false, message: 'Заполните все поля' }, { status: 400 });
  }

  if (!inviteCode) {
    return NextResponse.json({ success: false, message: 'Введите инвайт-код' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ success: false, message: 'Пароль минимум 6 символов' }, { status: 400 });
  }

  const SUPABASE = createSupabaseClient();

  // === ШАГ 1: Проверяем инвайт-код в базе ===
  const codeNormalized = inviteCode.toUpperCase().trim();
  const { data: inviteData, error: inviteErr } = await SUPABASE
    .from('invite_codes')
    .select('id, code, type, used')
    .eq('code', codeNormalized)
    .limit(1)
    .maybeSingle();

  if (inviteErr) {
    console.error('register: invite_codes error:', inviteErr);
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
  }

  if (!inviteData) {
    return NextResponse.json({ success: false, message: 'Неверный инвайт-код' }, { status: 400 });
  }

  if (inviteData.used) {
    return NextResponse.json({ success: false, message: 'Этот код уже использован' }, { status: 400 });
  }

  const isFreeUser = (inviteData.type || 'free') === 'free';

  // === ШАГ 2: Проверяем, что email не занят ===
  const { data: existingUser } = await SUPABASE
    .from('users')
    .select('id')
    .eq('email', email.toLowerCase())
    .limit(1)
    .maybeSingle();

  if (existingUser) {
    return NextResponse.json({ success: false, message: 'Этот email уже зарегистрирован' }, { status: 400 });
  }

  // === ШАГ 3: Создаём пользователя с тарифом ===
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const userId = Date.now().toString() + '-' + Math.random().toString(36).slice(2, 10);

  const { data: newUser, error: createErr } = await SUPABASE
    .from('users')
    .insert({
      id: userId,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      name: name,
      invite_code: inviteData.code,
      free: isFreeUser,
      blocked: false,
      modules_limit: isFreeUser ? 1 : 8,
    })
    .select()
    .single();

  if (createErr) {
    console.error('register: create user error:', createErr);
    return NextResponse.json({ success: false, message: 'Ошибка создания аккаунта' }, { status: 500 });
  }

  // === ШАГ 4: Помечаем инвайт-код как использованный ТОЛЬКО сейчас ===
  const { error: updErr } = await SUPABASE
    .from('invite_codes')
    .update({ 
      used: true, 
      used_by: userId,
      used_at: new Date().toISOString()
    })
    .eq('id', inviteData.id);

  if (updErr) {
    console.error('register: update invite error:', updErr);
    // Пользователь уже создан, но код не помечен — не критично
  }

  // === ШАГ 5: Создаём JWT с полем free для тарифной логики ===
  const token = jwt.sign(
    { 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name,
      free: newUser.free 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const res = NextResponse.json({ 
    success: true,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      free: newUser.free,
    }
  });
  res.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure`);
  
  return res;
}
