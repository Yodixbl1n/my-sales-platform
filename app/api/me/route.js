import { NextResponse } from 'next/server';
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

export async function GET(req) {
  const cookies = parseCookies(req.headers.get('cookie') || '');
  const token = cookies.token;
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });
  const user = verifyToken(token);
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, user });
}
