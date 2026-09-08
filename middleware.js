import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  // Проверяем оба токена: обычный (token) и демо (demo_token)
  const token = req.cookies.get('token')?.value || req.cookies.get('demo_token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch {
    // Токен невалидный или истёк — чистим оба cookie и редиректим
    const res = NextResponse.redirect(new URL('/login', req.url));
    res.cookies.set('token', '', { maxAge: 0, path: '/' });
    res.cookies.set('demo_token', '', { maxAge: 0, path: '/' });
    return res;
  }
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/certificate', '/certificate/:path*'],
};
