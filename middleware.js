import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch {
    // Токен невалидный или истёк — чистим cookie и редиректим
    const res = NextResponse.redirect(new URL('/login', req.url));
    res.cookies.set('token', '', { maxAge: 0, path: '/' });
    return res;
  }
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/certificate', '/certificate/:path*'],
};
