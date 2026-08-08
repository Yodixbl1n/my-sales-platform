import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabaseClient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { email, password, name, inviteCode } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ success: false, message: 'Заполните все поля' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ success: false, message: 'Пароль минимум 6 символов' }, { status: 400 });
  }

  const SUPABASE = createSupabaseClient();

  const { data: existingUser } = await SUPABASE
    .from('users')
    .select('id')
    .eq('email', email.toLowerCase())
    .limit(1)
    .maybeSingle();

  if (existingUser) {
    return NextResponse.json({ success: false, message: 'Этот email уже зарегистрирован' }, { status: 400 });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { data: newUser, error: createErr } = await SUPABASE
    .from('users')
    .insert({
      email: email.toLowerCase(),
      password_hash: passwordHash,
      name: name,
      invite_code: inviteCode
    })
    .select()
    .single();

  if (createErr) {
    return NextResponse.json({ success: false, message: 'Ошибка создания аккаунта' }, { status: 500 });
  }

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, name: newUser.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const res = NextResponse.json({ success: true });
  res.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure`);
  
  return res;
}
