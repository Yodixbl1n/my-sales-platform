import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '../../../../lib/supabaseClient';

/**
 * POST /api/admin/set-plan
 * Меняет тариф пользователя: free=true (FREE) / free=false (BLACK).
 * Защита: admin_token cookie с role='admin' (как в /api/admin/limit и /invite).
 */
export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const { user_id, free } = body;

  if (!user_id || typeof free !== 'boolean') {
    return NextResponse.json({ error: 'user_id and free (boolean) required' }, { status: 400 });
  }

  const SUPABASE = createSupabaseClient();
  const { error } = await SUPABASE
    .from('users')
    .update({ free })
    .eq('id', user_id);

  if (error) {
    console.error('set-plan error:', error);
    return NextResponse.json({ error: 'Update failed', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, user_id, free });
}
