import { NextResponse } from 'next/server';
import { createSupabaseClient } from '../../../lib/supabaseClient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req) {
  // Удаляем демо-токен при обычном логине, чтобы он не конфликтовал
  const cookieStore = await cookies();
  cookieStore.delete('demo_token');
  
  const body = await req.json().catch(() => ({}));
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Заполните все поля' }, { status: 400 });
  }

  const SUPABASE = createSupabaseClient();

  const { data: user, error } = await SUPABASE
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .limit(1)
    .maybeSingle();

  if (error || !user) {
    return NextResponse.json({ success: false, message: 'Неверный email или пароль' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  
  if (!isMatch) {
    return NextResponse.json({ success: false, message: 'Неверный email или пароль' }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, free: user.free ?? false },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const res = NextResponse.json({ success: true });
  res.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure`);
  // Удаляем demo_token через Set-Cookie, чтобы он не конфликтовал с полным доступом
  res.headers.append('Set-Cookie', 'demo_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure');
  
  return res;
}
