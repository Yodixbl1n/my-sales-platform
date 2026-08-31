import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

/**
 * /api/demo — гостевой доступ без регистрации.
 * Создаёт JWT с ролью 'demo' и free=true.
 * Доступен только модуль 1, первые 3 урока.
 */
export async function GET() {
  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  const payload = {
    id: 'demo-' + Date.now(),
    role: 'demo',
    free: true,
    iat: Math.floor(Date.now() / 1000),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60, // 1 час
  });

  return NextResponse.json({
    success: true,
    user: {
      id: payload.id,
      first_name: 'Гость',
      free: true,
      demo: true,
    },
  });
}
